import Head from 'next/head'
import Link from 'next/link'

export default function Doc() {
    return (
        <>
            <Head>
                <title>获取密钥 - 重返帝国 - 联盟数据工具</title>
                <link
                    rel='icon'
                    href='/logo.png'
                />
            </Head>
            <div className={'container mx-auto'}>
                <Link
                    href='/'
                    className='text-sm font-semibold leading-6 text-gray-900'
                >
                    <span aria-hidden='true'>←</span> 返回首页
                </Link>
                <article className='prose mt-10 lg:prose-xl'>
                    <h1>获取密钥</h1>
                    <p>自行抓包《重返帝国》小程序</p>
                </article>
            </div>
        </>
    )
}
