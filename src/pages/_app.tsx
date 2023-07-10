import { MantineProvider } from '@mantine/core'
import { type AppType } from 'next/app'
import Head from 'next/head'

import { api } from '@/utils/api'

import '@/styles/globals.scss'

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Page title</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                withCSSVariables
                theme={{
                    colorScheme: 'light',
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
}

export default api.withTRPC(MyApp)
