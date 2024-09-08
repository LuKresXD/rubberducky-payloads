import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import { handleDownload } from '../utils/downloads';
import PayloadCard from '@/components/PayloadCard';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(false);
    const [downloads, setDownloads] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const res = await fetch('/api/getDownloads');
                const data = await res.json();
                const downloadMap: { [key: string]: number } = {};

                data.forEach((data: { scriptName: string, count: number }) => {
                    downloadMap[data.scriptName] = data.count;
                });
                setDownloads(downloadMap);
            } catch (error) {
                console.error('Error fetching download counts:', error);
            }
        };
        fetchDownloads();
    }, []);

    const onDownload = useCallback(async (scriptName: string, url: string) => {
        try {
            const newCount = await handleDownload(scriptName);

            setDownloads((prev) => ({
                ...prev,
                [scriptName]: newCount
            }));

            const link = document.createElement('a');
            link.href = url;
            link.download = `${scriptName}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error handling download:', error);
        }
    }, []);

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
                <title>Payloads ⌨️</title>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                                <PayloadCard
                                    title="WinRM"
                                    description="This script sets up a backdoor on Windows by reporting the device's IP to a Discord webhook, creating a hidden admin user, enabling WinRM, modifying firewall rules, and disabling UAC remote restrictions."
                                    imageSrc="https://i.postimg.cc/1RwCYVJq/usb-rubber-ducky-remote-access-4a7f7f57-e8af-4ac3-9175-13a6ee78fe49-700x.webp"
                                    scriptName="WinRM"
                                    os="Windows"
                                    downloadUrl="https://github.com/LuKresXD/rubberducky-payloads/raw/main/payloads/WinRM.txt"
                                    downloads={downloads}
                                    onDownload={onDownload}
                                />
                                <PayloadCard
                                    title="IP grabber"
                                    description="This script reports the IP address, hostname, and username of a Windows system to a Discord webhook for potential monitoring or unauthorized access purposes using PowerShell commands."
                                    imageSrc="https://i.postimg.cc/wTzfKxGb/usb-rubber-ducky-recon-1deb3d2f-c34f-4e16-b26c-699f132ca018-700x.webp"
                                    scriptName="IP grabber"
                                    os="Windows"
                                    downloadUrl="https://github.com/LuKresXD/rubberducky-payloads/raw/main/payloads/IP%20grabber.txt"
                                    downloads={downloads}
                                    onDownload={onDownload}
                                />
                                <PayloadCard
                                    title="Password Stealer"
                                    description="This script gains unauthorized remote access to a Windows system by disabling security measures. It then downloads and runs a tool to extract data and uploads the collected information to a Discord webhook."
                                    imageSrc="https://i.postimg.cc/yYTf74q6/usb-rubber-ducky-credentials-fa30d15f-aa2f-46e7-b840-43c6252cd791-700x.webp"
                                    scriptName="Password Stealer"
                                    os="Windows"
                                    downloadUrl="https://github.com/LuKresXD/rubberducky-payloads/raw/main/payloads/Password%20Stealer.txt"
                                    downloads={downloads}
                                    onDownload={onDownload}
                                />
                                <PayloadCard
                                    title="Tdata MacOS stealer"
                                    description="This script is designed to steal Telegram user data from a macOS system by compressing it into a zip file and uploading it to a specified webhook URL."
                                    imageSrc="https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp"
                                    scriptName="Tdata MacOS stealer"
                                    os="macOS"
                                    downloadUrl="https://github.com/LuKresXD/rubberducky-payloads/raw/main/payloads/Tdata%20MacOS%20Stealer.txt"
                                    downloads={downloads}
                                    onDownload={onDownload}
                                />
                                <PayloadCard
                                    title="Tdata AppStore stealer"
                                    description="This script is the same as previous one but for App Store telegram version"
                                    imageSrc="https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp"
                                    scriptName="Tdata AppStore stealer"
                                    os="macOS"
                                    downloadUrl="https://github.com/LuKresXD/rubberducky-payloads/raw/main/payloads/Tdata%20AppStore%20Stealer.txt"
                                    downloads={downloads}
                                    onDownload={onDownload}
                                />
                                <PayloadCard
                                    title="Tdata Windows stealer"
                                    description="This script is the same as previous one but for telegram on Windows"
                                    imageSrc="https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp"
                                    scriptName="Tdata Windows stealer"
                                    os="Windows"
                                    downloadUrl="https://github.com/LuKresXD/rubberducky-payloads/raw/main/payloads/Tdata%20Windows%20Stealer.txt"
                                    downloads={downloads}
                                    onDownload={onDownload}
                                />
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer/>
            </div>
        </>
    );
}