import { createStyles, Grid, Group, Image, Text } from '@mantine/core'

import { type HeroResList } from '@/types/unlink'

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily || ''}`,
    },
}))

function formatVal(val: string) {
    return (Number(val) / 100).toFixed(2)
}

function Item(props: { label: string; value: string }) {
    return (
        <Group
            noWrap
            spacing={10}
            mt={5}
        >
            <Text
                fz='xs'
                c='dimmed'
            >
                {props.label}
            </Text>
            <Text
                fz='xs'
                c='dimmed'
            >
                {props.value}
            </Text>
        </Group>
    )
}

export function Hero(props: HeroResList) {
    const { classes } = useStyles()
    return (
        <Grid.Col span={4}>
            <Group noWrap>
                <Image
                    src={`https://game.gtimg.cn/images/wslg/pj/${props.obj.img4}`}
                    alt={props.obj.name}
                    width={100}
                    radius='md'
                />
                <div>
                    <Text
                        display={'flex'}
                        fz='xs'
                        tt='uppercase'
                        fw={700}
                        c='dimmed'
                    >
                        {props.obj.class}{' '}
                        {props.star != '0' && (
                            <Text
                                component={'span'}
                                color={'yellow'}
                            >
                                {props.star}星
                            </Text>
                        )}
                        <Text
                            component={'span'}
                            ml={'auto'}
                        >
                            {props.obj.soliderFeatureArr.join(' ')}
                        </Text>
                    </Text>
                    <Text
                        fz='lg'
                        fw={500}
                        className={classes.name}
                    >
                        {props.obj.name}
                        {props.star != '0' && (
                            <Text
                                ml={'4px'}
                                fz={'md'}
                                component={'span'}
                                color={'blue'}
                            >
                                {props.level}级
                            </Text>
                        )}
                    </Text>
                    <Text
                        fz='xs'
                        tt='uppercase'
                        fw={700}
                        c='dimmed'
                    >
                        {props.obj.classDetails}
                    </Text>
                    <Item
                        label={'武力'}
                        value={`${formatVal(props.obj.force)} / +${formatVal(props.obj.incrForce)}`}
                    />
                    <Item
                        label={'谋略'}
                        value={`${formatVal(props.obj.strategy)} / +${formatVal(props.obj.incrStrategy)}`}
                    />
                    <Item
                        label={'守备'}
                        value={`${formatVal(props.obj.defensive)} / +${formatVal(props.obj.incrDefensive)}`}
                    />
                    <Item
                        label={'摧城'}
                        value={`${formatVal(props.obj.destory)} / +${formatVal(props.obj.incrDestory)}`}
                    />
                </div>
            </Group>
        </Grid.Col>
    )
}
