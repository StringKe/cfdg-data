import axios from 'axios'

import {
    type UnlinkAllianceInfo,
    type UnlinkResponse,
    type UnlinkUserHeroes,
    type UnlinkUserInfo,
} from '@/types/unlink'

const httpClient = axios.create({
    baseURL: '/api/proxy/unlink',
})

const apiPath = 'app/4872/27453acc319be3d2/index.php'

function isRetSuccess<T>(data: UnlinkResponse<T>) {
    if (data.iRet !== 0) {
        throw new Error(data.sMsg)
    }
}

export async function getUserHeroes(sCode: string) {
    const params = {
        route: 'general/getMyHeroList',
        game: 'wslg',
        iActId: '6230',
        sAppId: 'ULINK-YDYX-959814',
        sCode: sCode,
        eas_url: 'http://wechatmini.qq.com/wslg/1112047372/pages/mine/mine/',
        e_code: '0',
    }

    const response = await httpClient.get<UnlinkUserHeroes>(apiPath, { params })

    if (response.status !== 200) {
        throw new Error('请求失败')
    }
    isRetSuccess(response.data)

    return response.data
}

export async function getUserInfo(sCode: string) {
    const params = {
        route: 'api/index',
        game: 'wslg',
        iActId: '6230',
        sAppId: 'ULINK-YDYX-959814',
        sCode: sCode,
        eas_url: 'http://wechatmini.qq.com/wslg/1112047372/pages/mine/mine/',
        e_code: '0',
    }

    const response = await httpClient.get<UnlinkUserInfo>(apiPath, { params })

    if (response.status !== 200) {
        throw new Error('请求失败')
    }
    isRetSuccess(response.data)

    return response.data
}

export async function getAlliance(sCode: string, page = 1) {
    const params = {
        route: 'alliance/index',
        game: 'wslg',
        iActId: '6230',
        sAppId: 'ULINK-YDYX-959814',
        sCode: sCode,
        eas_url: 'http://wechatmini.qq.com/wslg/1112047372/pages/mine/mine/',
        e_code: '0',
        page,
        order: 'militaryExploits',
    }

    const response = await httpClient.get<UnlinkAllianceInfo>(apiPath, { params })

    if (response.status !== 200) {
        throw new Error('请求失败')
    }
    isRetSuccess(response.data)

    return response.data
}
