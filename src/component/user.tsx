import { Avatar, Card, createStyles, Grid, rem, Text } from '@mantine/core'
import dayjs from 'dayjs'

import { type UserRes } from '@/types/unlink'

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: '100%',
    },

    avatar: {
        border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}))

export function UserState(props: { label: string; value: string }) {
    return (
        <Grid.Col
            span={3}
            key={props.label}
        >
            <Text
                ta='center'
                fz='lg'
                fw={500}
            >
                {props.value}
            </Text>
            <Text
                ta='center'
                fz='sm'
                c='dimmed'
            >
                {props.label}
            </Text>
        </Grid.Col>
    )
}

export function User(props: UserRes) {
    const { classes, theme } = useStyles()
    const image =
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'

    return (
        <Card
            withBorder
            padding='xl'
            radius='md'
            className={classes.card}
        >
            <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
            <Avatar
                src={props.userInfo.avatar}
                size={80}
                radius={80}
                mx='auto'
                mt={-30}
                className={classes.avatar}
            />
            <Text
                ta='center'
                fz='lg'
                fw={500}
                mt='sm'
            >
                {props.userInfo.nickname}
            </Text>
            <Text
                ta='center'
                fz='sm'
                c='dimmed'
            >
                [{props.roleInfo.guildShortName}] {props.roleInfo.guildFullName}
            </Text>
            <Grid mt='md'>
                <UserState
                    label={'城堡'}
                    value={props.roleInfo.cityCenterLv}
                />
                <UserState
                    label={'位置'}
                    value={`${props.roleInfo.x},${props.roleInfo.y}`}
                />
                <UserState
                    label={'战力'}
                    value={props.roleInfo.power}
                />
                <UserState
                    label={'势力值'}
                    value={props.roleInfo.territoryPower}
                />
                <UserState
                    label={'战功'}
                    value={props.roleInfo.military}
                />
                <UserState
                    label={'繁荣度'}
                    value={props.roleInfo.prosperity}
                />
                <UserState
                    label={'铜币'}
                    value={props.roleInfo.copper}
                />
                <UserState
                    label={'帝国币'}
                    value={props.roleInfo.silverCoin}
                />
                <UserState
                    label={'宝石'}
                    value={props.roleInfo.diamond}
                />
                <UserState
                    label={'英雄'}
                    value={props.roleInfo.heroNum}
                />
                <UserState
                    label={'农民'}
                    value={`${props.roleInfo.peasantNum}/${props.roleInfo.peasantNumMax}`}
                />
                <UserState
                    label={'木头'}
                    value={props.roleInfo.resWood}
                />
                <UserState
                    label={'食物'}
                    value={props.roleInfo.resFood}
                />
                <UserState
                    label={'黄金'}
                    value={props.roleInfo.resGold}
                />
                <UserState
                    label={'石头'}
                    value={props.roleInfo.resStone}
                />
                <UserState
                    label={'注册时间'}
                    value={dayjs.unix(Number(props.roleInfo.registerTime)).format('YYYY-MM-DD')}
                />
                <UserState
                    label={'最后登陆时间'}
                    value={dayjs(Number(props.roleInfo.lastLoginTime)).format('YYYY-MM-DD')}
                />
                <UserState
                    label={'游戏时间'}
                    value={((Number(props.roleInfo.totalLoginTimes) || 0) / 60 / 60).toFixed(2) + '小时'}
                />
            </Grid>
        </Card>
    )
}
