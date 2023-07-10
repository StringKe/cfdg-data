import { Avatar, Box, Button, Container, Grid, Group, NumberInput, Stack, Tabs, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { DataTable } from 'mantine-datatable'
import Head from 'next/head'
import React from 'react'
import * as XLSX from 'xlsx'

import { Hero } from '@/component/hero'
import { User } from '@/component/user'
import { type Alliance, type HeroResList, type Member, type UserRes } from '@/types/unlink'
import { getAlliance, getUserHeroes, getUserInfo } from '@/utils/requests'

function isCircle(user: { x: number; y: number }, circle: { x: number; y: number; range: number; floor: number }) {
    const distance = Math.sqrt(Math.pow(user.x - circle.x, 2) + Math.pow(user.y - circle.y, 2))
    return {
        isCenter: distance <= circle.range + circle.floor && distance >= circle.range - circle.floor,
        centerDistance: distance,
    }
}

function stringToArrayBuffer(str: string) {
    const buf = new ArrayBuffer(str.length)
    const bufView = new Uint8Array(buf)
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    return buf
}

export default function Home() {
    const [sCode, setSCode] = React.useState('')

    const [isSCodeVerify, setIsSCodeVerify] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState<UserRes | null>(null)
    const [userHeroes, setUserHeroes] = React.useState<HeroResList[]>([])
    const [alliance, setAlliance] = React.useState<Alliance | null>(null)

    const rangCheckForm = useForm({
        initialValues: {
            x: 0,
            y: 0,
            range: 100,
            floor: 10,
        },
    })

    const hasAlliance = React.useMemo(() => {
        return !!userInfo?.roleInfo?.guildId
    }, [userInfo])

    const step1VerifyCode = React.useCallback(
        (passSCode?: string) => {
            const useSCode = passSCode ?? sCode ?? ''
            console.log('useSCode: ', useSCode)
            const _sCode = useSCode.trim().length > 0 ? useSCode.trim() : null
            if (!_sCode) {
                alert('请输入正确的密钥')
                return
            }

            const handleError = (type: string) => {
                return (error: unknown) => {
                    console.log(`[${type}] Error: `, error)
                    alert('提供的密钥，无法正确的请求腾讯服务器，请检查是否正确')
                    localStorage.removeItem('sCode')
                }
            }

            getUserInfo(_sCode)
                .then((userRes) => {
                    getUserHeroes(_sCode)
                        .then((heroesRes) => {
                            setUserInfo(userRes.jData)
                            const sortedHeroes = heroesRes.jData.list.sort((a, b) => {
                                return Number(a.id) - Number(b.id)
                            })
                            setUserHeroes(sortedHeroes)
                            setIsSCodeVerify(true)
                            console.log('[Step 1] Success: ', userRes, heroesRes)

                            localStorage.setItem('sCode', _sCode)
                        })
                        .catch(handleError)
                })
                .catch(handleError)
        },
        [sCode],
    )

    const step2GetAllianceInfo = React.useCallback(async () => {
        if (hasAlliance) {
            let page = 1,
                maxPage = 2

            let alliance: Alliance | undefined = undefined

            while (true) {
                console.log('[Step 2] Request: ', page, maxPage)
                const response = await getAlliance(sCode, page)

                if (!alliance) {
                    alliance = response.jData.alliance
                } else {
                    alliance.member = alliance.member.concat(response.jData.alliance.member)
                }
                page = page + 1
                if (Number(response.jData.alliance.totalPage)) {
                    maxPage = Number(response.jData.alliance.totalPage)
                }

                if (page > maxPage) {
                    break
                }
            }

            // 根据 joinTime 排序
            alliance.member = alliance.member.sort((a, b) => {
                return Number(a.joinTime) - Number(b.joinTime)
            })

            setAlliance(alliance)

            console.log('[Step 2] Success: ', alliance)
        }
    }, [hasAlliance, sCode])

    const exportAllianceData = React.useCallback(() => {
        if (alliance) {
            const header = [
                'ID',
                '名字',
                '战力',
                '势力',
                '总战功',
                '攻城总贡献',
                '城堡位置',
                '是否靠近集合点',
                '距离集合点位置',
                '加入时间',
            ]

            const data = alliance.member.map((member) => {
                return [
                    member.openId,
                    member.name,
                    member.power,
                    member.territoryPower,
                    member.militaryExploits,
                    member.contribution,
                    `${member.x},${member.y}`,
                    member.isCenter ? '是' : '否',
                    member.centerDistance,
                    dayjs.unix(Number(member.joinTime)).format('YYYY-MM-DD HH:mm:ss'),
                ]
            })

            const sheet = XLSX.utils.aoa_to_sheet([header, ...data])
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, sheet, '联盟数据')

            const workbook_data = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' }) as string
            const workbook_blob = new Blob([stringToArrayBuffer(workbook_data)], { type: 'application/octet-stream' })

            const fileName = `联盟数据_${alliance.guildName}_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.xlsx`

            const alink = document.createElement('a')
            alink.download = fileName
            alink.target = '_blank'
            alink.style.display = 'none'
            alink.href = URL.createObjectURL(workbook_blob)
            document.body.appendChild(alink)
            alink.click()

            setTimeout(() => {
                document.body.removeChild(alink)
                setTimeout(() => {
                    URL.revokeObjectURL(alink.href)
                }, 1000 * 60)
            }, 1000)
        }
    }, [alliance])

    React.useEffect(() => {
        const _sCode = localStorage.getItem('sCode')
        if (_sCode) {
            setSCode(_sCode)

            setTimeout(() => {
                step1VerifyCode(_sCode)
            }, 1000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Head>
                <title>重返帝国 - 数据工具</title>
                <link
                    rel='icon'
                    href='/logo.png'
                />
            </Head>

            <Container>
                <Stack mt={'18px'}>
                    <TextInput
                        label={'密钥'}
                        placeholder='输入密钥'
                        value={sCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let _sCode: string = e.currentTarget.value.trim()
                            if (_sCode.startsWith('sCode=')) {
                                _sCode = _sCode.replace('sCode=', '')
                            }
                            setSCode(_sCode)
                        }}
                    />
                    <Button
                        onClick={() => step1VerifyCode()}
                        disabled={isSCodeVerify}
                    >
                        {!isSCodeVerify ? '验证密钥' : '验证完成'}
                    </Button>

                    {hasAlliance && (
                        <Button
                            onClick={() => {
                                void step2GetAllianceInfo()
                            }}
                        >
                            获取联盟数据
                        </Button>
                    )}

                    <Stack>
                        {isSCodeVerify && userInfo && (
                            <Tabs
                                keepMounted={false}
                                defaultValue='user'
                            >
                                <Tabs.List>
                                    <Tabs.Tab value='user'>个人信息</Tabs.Tab>
                                    <Tabs.Tab value='heroes'>英雄</Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel
                                    value='user'
                                    pt={'md'}
                                >
                                    <User {...userInfo} />
                                </Tabs.Panel>
                                <Tabs.Panel
                                    value='heroes'
                                    pt={'md'}
                                >
                                    <Grid gutter={'md'}>
                                        {userHeroes.map((hero) => (
                                            <Hero
                                                key={hero.id}
                                                {...hero}
                                            />
                                        ))}
                                    </Grid>
                                </Tabs.Panel>
                            </Tabs>
                        )}
                        {hasAlliance && alliance && (
                            <>
                                <Box>
                                    <Text fz={'lg'}>联盟信息</Text>
                                    <form
                                        onSubmit={rangCheckForm.onSubmit((values) => {
                                            setAlliance((prevState) => {
                                                if (!prevState) {
                                                    return prevState
                                                }
                                                const _alliance = { ...prevState } as Alliance
                                                _alliance.member = _alliance.member.map((member) => {
                                                    const distance = isCircle(
                                                        {
                                                            x: Number(member.x),
                                                            y: Number(member.y),
                                                        },
                                                        {
                                                            x: Number(values.x) || 0,
                                                            y: Number(values.y) || 0,
                                                            range: Number(values.range),
                                                            floor: Number(values.floor),
                                                        },
                                                    )

                                                    return {
                                                        ...member,
                                                        isCenter: distance.isCenter,
                                                        centerDistance: distance.centerDistance,
                                                    }
                                                })
                                                return _alliance
                                            })
                                            console.log('values: ', values)
                                        })}
                                    >
                                        <Stack>
                                            <Group>
                                                <TextInput
                                                    readOnly
                                                    value={alliance.shortName}
                                                    label={'短名'}
                                                    variant='filled'
                                                />
                                                <TextInput
                                                    readOnly
                                                    value={alliance.guildName}
                                                    label={'名字'}
                                                    variant='filled'
                                                />
                                                <TextInput
                                                    readOnly
                                                    value={alliance.enounce}
                                                    label={'宣言'}
                                                    variant='filled'
                                                />
                                                <TextInput
                                                    readOnly
                                                    value={alliance.power}
                                                    label={'战力'}
                                                    variant='filled'
                                                />
                                                <TextInput
                                                    readOnly
                                                    value={alliance.territoryPower}
                                                    label={'势力'}
                                                    variant='filled'
                                                />
                                            </Group>
                                            <Group align={'end'}>
                                                <NumberInput
                                                    label={'横坐标'}
                                                    placeholder='X'
                                                    {...rangCheckForm.getInputProps('x')}
                                                />
                                                <NumberInput
                                                    label={'纵坐标'}
                                                    placeholder='Y'
                                                    {...rangCheckForm.getInputProps('y')}
                                                />
                                                <NumberInput
                                                    label={'半径'}
                                                    defaultValue={100}
                                                    placeholder='半径'
                                                    {...rangCheckForm.getInputProps('range')}
                                                />
                                                <NumberInput
                                                    label={'浮动'}
                                                    defaultValue={10}
                                                    placeholder='差值'
                                                    {...rangCheckForm.getInputProps('floor')}
                                                />
                                                <Button type={'submit'}>检查</Button>
                                            </Group>
                                            <Button onClick={() => exportAllianceData()}>导出数据</Button>
                                        </Stack>
                                    </form>
                                </Box>
                                <DataTable
                                    withBorder
                                    borderRadius='sm'
                                    withColumnBorders
                                    striped
                                    highlightOnHover
                                    records={alliance.member}
                                    columns={[
                                        {
                                            accessor: 'name',
                                            title: '名称',
                                            render: (record: Member) => {
                                                return (
                                                    <Group>
                                                        <Avatar src={record.avatar} />
                                                        <Text component={'span'}>{record.name}</Text>
                                                    </Group>
                                                )
                                            },
                                        },
                                        {
                                            accessor: 'power',
                                            title: '战力',
                                        },
                                        {
                                            accessor: 'territoryPower',
                                            title: '势力',
                                        },
                                        {
                                            accessor: 'militaryExploits',
                                            title: '总战功',
                                        },
                                        {
                                            accessor: 'contribution',
                                            title: '攻城总贡献',
                                        },
                                        {
                                            accessor: '_position',
                                            title: '城堡位置',
                                            render: (record: Member) => {
                                                return `${record.x},${record.y}`
                                            },
                                        },
                                        {
                                            accessor: '_position_center',
                                            title: '是否靠近集合点',
                                            render: (record: Member) => {
                                                return record.isCenter
                                                    ? '是'
                                                    : `否 距离${(record?.centerDistance || 0).toFixed(2)}`
                                            },
                                        },
                                        {
                                            accessor: 'joinTime',
                                            title: '加入时间',
                                            render: (record: Member) => {
                                                return dayjs.unix(Number(record.joinTime)).format('YYYY-MM-DD HH:mm:ss')
                                            },
                                        },
                                    ]}
                                />
                            </>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}
