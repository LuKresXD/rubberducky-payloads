import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';



export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(false);
    const [downloads, setDownloads] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchDownloads = async () => {
            const res = await fetch('/api/getDownloads');
            const data = await res.json();
            const downloadMap: { [key: string]: number } = {};

            data.forEach((data: { scriptName: string, count: number }) => {
                downloadMap[data.scriptName] = data.count;
            });
            setDownloads(downloadMap);
        };
        fetchDownloads();
    }, []);

    const handleDownload = async (scriptName:string) => {
        await fetch('/api/incrementDownload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ scriptName })
        });
        setDownloads((prev: { [key: string]: number }) => {
            const updatedDownloads = { ...prev };
            updatedDownloads[scriptName] = (prev[scriptName] || 0) + 1;
            return updatedDownloads;
        });
    };

    useEffect(() => {
        setPageLoad(true)
    }, [])

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <>
            <Head>
                <title>Payloads ⌨️️</title>
                <link rel="stylesheet" href="https://unpkg.com/pattern.css@1.0.0/dist/pattern.min.css"/>
                <meta name="description" content="All RubberDucky payloads by LuKres"/>
                <meta property='theme-color' content='#17171a'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/keyboard.ico"/>
            </Head>
            <Navbar />
            <div className='flex flex-col h-full justify-between'>
                <main className='flex h-full flex-col justify-center pattern-grid-lg text-primary overflow-x-hidden'>
                    {isLoading && (
                        <div
                            className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-t-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
                    )}
                    <motion.div
                        className={`container mx-auto px-4 sm:px-6 lg:px-8 brightness-100 transition-all ${isLoading ? 'brightness-50' : ''}`}
                        initial={{ transform: 'translateY(30px)', opacity: 0 }}
                        whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
                        viewport={{ amount: 0.1, once: true }}
                        ref={ref}
                    >
                        <div className='max-w-5xl w-full mx-auto'>
                            <h1 className={`${pageLoad ? 'animate-fade-in-top' : 'opacity-0'} text-white font-bold sm:text-6xl text-4xl font-leaguespartan text-center pt-28`}>
                                Payloads ⌨️
                            </h1>
                        </div>
                        <div className="max-w-[76rem] w-full mx-auto xl:px-8 md:px-44 sm:px-16 px-8">
                            <div className="flex xl:flex-row flex-col gap-8 mt-6">
                                <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                                    onClick={() => handleDownload('WinRM')}
                                    href="https://github.com/LuKresXD/rubberducky-payloads/blob/main/payloads/WinRM.txt"
                                    target="_blank"
                                    className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2
                                    duration-500 ease-custom hover:border-blue-700"><img
                                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                                    src="https://i.postimg.cc/1RwCYVJq/usb-rubber-ducky-remote-access-4a7f7f57-e8af-4ac3-9175-13a6ee78fe49-700x.webp"/>
                                    <div className="p-4"><h2
                                        className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">WinRM</h2>
                                        <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                            This script sets up a backdoor on Windows by reporting the device's IP to a
                                            Discord webhook, creating a hidden admin user, enabling WinRM, modifying
                                            firewall rules, and disabling UAC remote restrictions.
                                        </p>
                                        <ul className="grid grid-cols-2 gap-4 mt-4">
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">Windows</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                                            </li>
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{downloads['WinRM'] !== undefined ? downloads['WinRM'] : 'Loading...'}</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                            </li>
                                        </ul>
                                    </div>
                                </a></div>
                                <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                                    onClick={() => handleDownload('IP grabber')}
                                    href="https://github.com/LuKresXD/rubberducky-payloads/blob/main/payloads/IP%20grabber.txt"
                                    target="_blank"
                                    className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2
                                    duration-500 ease-custom hover:border-blue-700"><img
                                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                                    src="https://i.postimg.cc/wTzfKxGb/usb-rubber-ducky-recon-1deb3d2f-c34f-4e16-b26c-699f132ca018-700x.webp"
                                    alt=""/>
                                    <div className="p-4"><h2
                                        className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">IP
                                        grabber</h2>
                                        <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                            This script reports the IP address, hostname, and username of a Windows system
                                            to a Discord webhook for potential monitoring or unauthorized access purposes
                                            using PowerShell commands.
                                        </p>
                                        <ul className="grid grid-cols-2 gap-4 mt-4">
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">Windows</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                                            </li>
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{downloads['IP grabber'] !== undefined ? downloads['IP grabber'] : 'Loading...'}</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                            </li>
                                        </ul>
                                    </div>
                                </a></div>
                                <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                                    onClick={() => handleDownload('Password Stealer')}
                                    href="https://github.com/LuKresXD/rubberducky-payloads/blob/main/payloads/Password%20Stealer.txt"
                                    target="_blank"
                                    className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2
                                    duration-500 ease-custom hover:border-blue-700"><img
                                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                                    src="https://i.postimg.cc/yYTf74q6/usb-rubber-ducky-credentials-fa30d15f-aa2f-46e7-b840-43c6252cd791-700x.webp"
                                    alt=""/>
                                    <div className="p-4"><h2
                                        className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">Password
                                        Stealer</h2>
                                        <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                            This script gains unauthorized remote access to a Windows system by disabling
                                            security measures. It then downloads and runs a tool to extract data and uploads
                                            the collected information to a Discord webhook.
                                        </p>
                                        <ul className="grid grid-cols-2 gap-4 mt-4">
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">Windows</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                                            </li>
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{downloads['Password Stealer'] !== undefined ? downloads['Password Stealer'] : 'Loading...'}</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                            </li>
                                        </ul>
                                    </div>
                                </a></div>
                            </div>
                            <div className="flex xl:flex-row flex-col gap-8 mt-6">
                                <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                                    onClick={() => handleDownload('Tdata MacOS stealer')}
                                    href="https://github.com/LuKresXD/rubberducky-payloads/blob/main/payloads/Tdata%20MacOS%20Stealer.txt"
                                    target="_blank"
                                    className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2
                                    duration-500 ease-custom hover:border-blue-700"><img
                                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                                    src="https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp"/>
                                    <div className="p-4"><h2
                                        className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">Tdata
                                        MacOS stealer</h2>
                                        <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                            This script is designed to steal Telegram user data from a macOS system by
                                            compressing it into a zip file and uploading it to a specified webhook URL.
                                        </p>
                                        <p>!</p>
                                        <p>!</p>
                                        <ul className="grid grid-cols-2 gap-4 mt-4">
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">macOS</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                                            </li>
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{downloads['Tdata MacOS stealer'] !== undefined ? downloads['Tdata MacOS stealer'] : 'Loading...'}</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                            </li>
                                        </ul>
                                    </div>
                                </a></div>
                                <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                                    onClick={() => handleDownload('Tdata AppStore stealer')}
                                    href="https://github.com/LuKresXD/rubberducky-payloads/blob/main/payloads/Tdata%20AppStore%20Stealer.txt"
                                    target="_blank"
                                    className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2
                                    duration-500 ease-custom hover:border-blue-700"><img
                                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                                    src="https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp"/>
                                    <div className="p-4"><h2
                                        className="text-blue-100 font-bold text-center sm:text-2xl text-2xl font-poppins">Tdata
                                        AppStore stealer</h2>
                                        <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                            This script is the same as previous one but for App Store telegram version
                                        </p>
                                        <p>!</p>
                                        <p>!</p>
                                        <p>!</p>
                                        <p>!</p>
                                        <ul className="grid grid-cols-2 gap-4 mt-4">
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">macOS</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                                            </li>
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{downloads['Tdata AppStore stealer'] !== undefined ? downloads['Tdata AppStore stealer'] : 'Loading...'}</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                            </li>
                                        </ul>
                                    </div>
                                </a></div>
                                <div className="flex w-full transform: translateY(0px); opacity: 1;"><a
                                    onClick={() => handleDownload('Tdata Windows stealer')}
                                    href="https://github.com/LuKresXD/rubberducky-payloads/blob/main/payloads/Tdata%20Windows%20Stealer.txt"
                                    target="_blank"
                                    className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2
                                    duration-500 ease-custom hover:border-blue-700"><img
                                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                                    src="https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp"
                                    alt=""/>
                                    <div className="p-4"><h2
                                        className="text-blue-100 font-bold text-center sm:text-2xl text-2xl font-poppins">Tdata
                                        Windows stealer</h2>
                                        <p className="text-blue-100 font-semibold text-center sm:text-base text-sm font-poppins mt-1">
                                            This script is the same as previous one but for telegram on Windows
                                        </p>
                                        <p>!</p>
                                        <p>!</p>
                                        <p>!</p>
                                        <p>!</p>
                                        <ul className="grid grid-cols-2 gap-4 mt-4">
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">Windows</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                                            </li>
                                            <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom">
                                                <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{downloads['Tdata Windows stealer'] !== undefined ? downloads['Tdata Windows stealer'] : 'Loading...'}</h3>
                                                <p
                                                    className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                                            </li>
                                        </ul>
                                    </div>
                                </a></div>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer/>
            </div>
        </>
    )
}
