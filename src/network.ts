import Taro from '@tarojs/taro'

/**
 * 网络请求模块
 * 封装 Taro.request、Taro.uploadFile、Taro.downloadFile，自动添加项目域名前缀
 * 如果请求的 url 以 http:// 或 https:// 开头，则不会添加域名前缀
 */

// 从环境变量读取域名，使用 Vite 的方式
const PROJECT_DOMAIN = (import.meta.env as any).PROJECT_DOMAIN || 'http://localhost:3000'

export namespace Network {
    const createUrl = (url: string): string => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
        }
        return `${PROJECT_DOMAIN}${url}`
    }

    export const request: typeof Taro.request = option => {
        console.log('[Network Request]', {
            url: createUrl(option.url),
            method: option.method,
            data: option.data,
        })
        
        return Taro.request({
            ...option,
            url: createUrl(option.url),
        })
    }

    export const uploadFile: typeof Taro.uploadFile = option => {
        console.log('[Network UploadFile]', {
            url: createUrl(option.url),
            filePath: option.filePath,
            name: option.name,
        })
        
        return Taro.uploadFile({
            ...option,
            url: createUrl(option.url),
        })
    }

    export const downloadFile: typeof Taro.downloadFile = option => {
        console.log('[Network DownloadFile]', {
            url: createUrl(option.url),
        })
        
        return Taro.downloadFile({
            ...option,
            url: createUrl(option.url),
        })
    }
}