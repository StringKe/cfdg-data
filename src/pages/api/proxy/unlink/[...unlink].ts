import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

const proxyMiddleware = createProxyMiddleware({
    target: 'https://ulink.game.qq.com',
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: {
        // api/proxy/unlink -> /
        '^/api/proxy/unlink': '/',
    },
})

export default function Handle(req: NextApiRequest, res: NextApiResponse) {
    proxyMiddleware(req as never, res as never, (result: unknown) => {
        if (result instanceof Error) {
            throw result
        }
    })
}
