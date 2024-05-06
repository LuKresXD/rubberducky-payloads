import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
const [downloads, setDownloads] = useState({});




export default function Home() {


    const [pageLoad, setPageLoad] = useState(false);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchDownloads = async () => {
            const res = await fetch('/api/getDownloads');
            const data = await res.json();
            const downloadMap = {};
            data.forEach(d => {
                downloadMap[d.scriptName] = d.count;
            });
            setDownloads(downloadMap);
        };
        fetchDownloads();
        setPageLoad(true)
    }, [])

    return (
        <>
            <Head>
                <title>LuKres.dev</title>
                <link href="https://unpkg.com/pattern.css@1.0.0/dist/pattern.min.css" rel="stylesheet" />
                <meta name="description" content="Luka's (aka LuKres) persownal site" />
                <meta property="og:image" content="https://media.discordapp.net/attachments/1225694526484643914/1232949355464359947/luminal_logo.jpg?ex=662b5111&is=6629ff91&hm=f4452cc2df53b9ef383cdd00430b6d7cde20298b56602c18fcafb54ce6acb7ca&=&format=webp&width=1011&height=1011" />
                <meta property='theme-color' content='#17171a' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='flex h-screen flex-col justify-center pattern-grid-lg text-primary overflow-x-hidden'>
                <div className='max-w-5xl w-full mx-auto'>
                    <h1 className={`${pageLoad ? 'animate-fade-in-top' : 'opacity-0'} text-white font-bold sm:text-6xl text-4xl font-leaguespartan text-center`}>
                        Payloads ⌨️
                    </h1>
                </div>
                <div className="max-w-[76rem] w-full mx-auto xl:px-8 md:px-44 sm:px-16 px-8">
                    <div className="flex xl:flex-row flex-col gap-8 mt-6">
                        <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                            href="https://e-z.host" target="_blank"
                            className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2 duration-500 ease-custom hover:border-blue-700"><img
                            className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                            src="/ezhost.png" alt=""/>
                            <div className="p-4"><h2
                                className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">WinRM</h2>
                                <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                    This script sets up a backdoor on Windows by reporting the device's IP to a Discord webhook, creating a hidden admin user, enabling WinRM, modifying firewall rules, and disabling UAC remote restrictions.
                                </p>
                                <ul className="grid grid-cols-2 gap-4 mt-4">
                                    <li className="rounded-md col-span-2 w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                        <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">0</h3>
                                        <p
                                            className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                    </li>
                                </ul>
                            </div>
                        </a></div>
                        <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                            href="https://e-z.bio" target="_blank"
                            className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2 duration-500 ease-custom hover:border-blue-700"><img
                            className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                            src="/ezbio.png" alt=""/>
                            <div className="p-4"><h2
                                className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">E-Z.Bio</h2>
                                <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">E-Z.Bio
                                    is a feature rich bio link platform with an easy to use interface and tons of
                                    customization options. You can have a full page setup within minutes.</p>
                                <ul className="grid grid-cols-2 gap-4 mt-4">
                                    <li className="rounded-md col-span-2 w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                        <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">0</h3>
                                        <p
                                            className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                    </li>
                                </ul>
                            </div>
                        </a></div>
                        <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                            href="https://discord.com/oauth2/authorize?client_id=1052415589995516014&amp;permissions=8&amp;scope=bot"
                            target="_blank"
                            className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2 duration-500 ease-custom hover:border-blue-700"><img
                            className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                            src="https://r2.e-z.host/2082d908-7c65-4fc3-b02a-5f50f9141543/666x1pn5.png" alt=""/>
                            <div className="p-4"><h2
                                className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">E-Z
                                Tickets</h2><p
                                className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">E-Z
                                Tickets is a light weight discord ticket system that can be setup fully with 1 command.
                                It has everything you would need without the bloat.</p>
                                <ul className="grid grid-cols-2 gap-4 mt-4">
                                    <li className="rounded-md col-span-2 w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                        <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">0</h3>
                                        <p
                                            className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                    </li>
                                </ul>
                            </div>
                        </a></div>
                    </div>
                </div>
            </main>
        </>
    )
}
