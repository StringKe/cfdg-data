export interface UnlinkResponse<T> {
    iRet: number
    sMsg: string
    jData: T
    execTime: number
    sULinkSerial: string
}

export declare type UnlinkUserHeroes = UnlinkResponse<HeroRes>

export interface HeroRes {
    myCode: number
    myMsg: string
    list: HeroResList[]
}

export interface HeroResList {
    id: string
    level: string
    star: string
    skillInfo: any[]
    obj: HeroResListItem
}

export interface HeroResListItem {
    id: string
    name: string
    nameImg: string
    quality: string
    class: string
    classDetails: string
    season: string
    level: string
    img1: string
    img2: string
    img3: string
    img4: string
    force: string
    strategy: string
    defensive: string
    destory: string
    incrForce: string
    incrStrategy: string
    incrDefensive: string
    incrDestory: string
    masterSkillId: string
    ownSkillId: string
    updateAt: string
    soliderFeatureArr: string[]
    styleStr: string
    qualityStr: string
    updateAtTimestamp: number
}

export declare type UnlinkUserInfo = UnlinkResponse<UserRes>

export interface UserRes {
    myCode: number
    myMsg: string
    gOpenId: string
    isBind: number
    bindInfo: BindInfo
    roleInfo: RoleInfo
    userInfo: UserInfo
    mySeason: string
    imgBaseUrl: string
    disableUgc: number
    systemConfig: SystemConfig
    unreadNum: number
    now: string
    data: string
}

export interface BindInfo {
    area: string
    nickName: string
    openid: string
    partition: string
    platId: string
    roleId: string
    roleName: string
    partitionName: string
}

export interface RoleInfo {
    openId: string
    roleId: string
    roleName: string
    diamond: string
    copper: string
    resFood: string
    resFoodUnsafe: string
    resWood: string
    resWoodUnsafe: string
    resStone: string
    resStoneUnsafe: any
    resGold: string
    resGoldUnsafe: string
    peasantNum: string
    peasantNumMax: string
    lordExp: string
    lordEnergy: string
    vipPoint: string
    vipLevel: string
    lordLv: string
    registerTime: string
    totalLoginTimes: string
    lastLogoutTime: string
    isOnline: string
    guildId: string
    guildShortName: string
    guildCoin: string
    x: string
    y: string
    power: string
    heroNum: string
    civilType: string
    civilAges: string
    lordPointsTotal: string
    lordPointsFightRemaining: string
    lordPointsDevRemaining: string
    lordPointsAidRemaining: string
    cityCenterLv: string
    registerSource: string
    silverCoin: string
    stateId: string
    mainTaskLevel: string
    military: string
    prosperity: string
    cityStyle: string
    territoryCount: string
    guildFullName: string
    territoryPower: string
    roadOfHonorLevel: string
    lastLoginTime: string
    banLogin: string
    banChat: string
    cumulative: string
    allianceTerritoryPower: string
    allianceRoleId: string
}

export interface UserInfo {
    nickname: string
    avatar: string
}

export interface SystemConfig {
    seasonMax: number
}

export declare type UnlinkAllianceInfo = UnlinkResponse<AllianceRes>

export interface AllianceRes {
    myCode: number
    myMsg: string
    alliance: Alliance
}

export interface Alliance {
    enounce: string
    guildId: string
    guildName: string
    language: string
    memberCount: string
    notice: string
    power: string
    shortName: string
    territoryPower: string
    chairmanRoleId: string
    totalPage: string
    member: Member[]
}

export interface Member {
    openId: string
    roleId: string
    gameRoleId: string
    power: string
    joinTime: string
    x: string
    y: string
    name: string
    territoryPower: string
    contribution: string
    militaryExploits: string
    roleName: string
    avatar: string
    isCenter?: boolean
    centerDistance?: number
}
