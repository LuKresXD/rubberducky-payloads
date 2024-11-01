import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from 'lucide-react';
import Navbar from "@/components/Navbar";
import { handleDownload } from '../utils/downloads';
import { GridPattern } from "@/components/GridPattern";
import PayloadCard from '@/components/PayloadCard';

type OSType = 'all' | 'Windows' | 'macOS';

const Windows = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3.449L9.75 2.1V11.551H0V3.449ZM10.949 1.949L24 0V11.4H10.949V1.949ZM0 12.6H9.75V22.051L0 20.699V12.6ZM10.949 12.6H24V24L11.1 22.199" fill="currentColor"/>
    </svg>
);

const Apple = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.539 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor"/>
    </svg>
);

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOS, setSelectedOS] = useState<OSType>('all');
    const [downloads, setDownloads] = useState<{ [key: string]: number }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const getItemLayoutId = (scriptName: string) => `payload-${scriptName}`;

    // Keep your existing payloads array
    const payloads = [
        {
            title: "WinRM Backdoor",
            description: "Windows Remote Management backdoor with Discord webhook integration and UAC bypass capabilities.",
            imageSrc: "https://i.postimg.cc/1RwCYVJq/usb-rubber-ducky-remote-access-4a7f7f57-e8af-4ac3-9175-13a6ee78fe49-700x.webp",
            scriptName: "WinRM",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/WinRM",
            category: "Remote Access"
        },
        {
            title: "IP Grabber",
            description: "System information collection tool with Discord webhook reporting for Windows environments.",
            imageSrc: "https://i.postimg.cc/wTzfKxGb/usb-rubber-ducky-recon-1deb3d2f-c34f-4e16-b26c-699f132ca018-700x.webp",
            scriptName: "IP grabber",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/IP%20grabber",
            category: "Reconnaissance"
        },
        {
            title: "SSH Key Grabber",
            description: "Advanced extraction tool for SSH private keys with multi-method scanning, pattern matching, and secure data transmission via Discord webhook.",
            imageSrc: "https://i.postimg.cc/yYTf74q6/usb-rubber-ducky-credentials-fa30d15f-aa2f-46e7-b840-43c6252cd791-700x.webp",
            scriptName: "SSH Key Grabber",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/SSH%20Key%20Grabber",
            category: "Exfiltration"
        },
        {
            title: "Password Stealer",
            description: "Advanced credential extraction tool with remote access and secure data exfiltration capabilities.",
            imageSrc: "https://i.postimg.cc/yYTf74q6/usb-rubber-ducky-credentials-fa30d15f-aa2f-46e7-b840-43c6252cd791-700x.webp",
            scriptName: "Password Stealer",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Password%20Stealer",
            category: "Exfiltration"
        },
        {
            title: "Windows Key Grabber",
            description: "Windows product key extraction tool with Discord webhook integration and stealth capabilities.",
            imageSrc: "https://i.postimg.cc/yYTf74q6/usb-rubber-ducky-credentials-fa30d15f-aa2f-46e7-b840-43c6252cd791-700x.webp",
            scriptName: "Windows Key Grabber",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Windows%20Key%20Grabber",
            category: "Exfiltration"
        },
        {
            title: "Windows Defender Disabler",
            description: "Advanced Windows security configuration tool for disabling and managing Windows Defender settings with multi-language support and stealth capabilities.",
            imageSrc: "https://r2.e-z.host/b79914eb-39d2-4ea1-a88d-58a44aa23f91/ck7s2glw.png",
            scriptName: "Windows Defender Disabler",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Windows%20Defender%20Disabler",
            category: "Security"
        },
        {
            title: "Firefox Cookie Stealer",
            description: "Advanced Firefox cookie database exfiltration tool with stealth capabilities and secure data transfer using Discord webhook integration.",
            imageSrc: "https://i.postimg.cc/yYTf74q6/usb-rubber-ducky-credentials-fa30d15f-aa2f-46e7-b840-43c6252cd791-700x.webp",
            scriptName: "Firefox Cookie Stealer",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Firefox%20Cookie%20Stealer",
            category: "Exfiltration"
        },
        {
            title: "VSCode Light Mode",
            description: "Harmless prank that switches VSCode to light theme. A perfect way to troll fellow developers.",
            imageSrc: "https://r2.e-z.host/b79914eb-39d2-4ea1-a88d-58a44aa23f91/n4tfe2a5.webp",
            scriptName: "VSCode Light Mode",
            os: "macOS",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/VSCode%20Light%20Mode",
            category: "Prank"
        },
        {
            title: "Tdata MacOS",
            description: "Specialized Telegram data extraction tool for macOS with secure webhook upload functionality.",
            imageSrc: "https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp",
            scriptName: "Tdata MacOS stealer",
            os: "macOS",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Tdata%20MacOS%20Stealer",
            category: "Exfiltration"
        },
        {
            title: "Tdata AppStore",
            description: "Specialized extraction tool for App Store version of Telegram with enhanced capabilities.",
            imageSrc: "https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp",
            scriptName: "Tdata AppStore stealer",
            os: "macOS",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Tdata%20AppStore%20Stealer",
            category: "Exfiltration"
        },
        {
            title: "Tdata Windows",
            description: "Windows-specific Telegram data extraction tool with automated processing capabilities.",
            imageSrc: "https://i.postimg.cc/T1ZwySWQ/usb-rubber-ducky-exfiltration-ae8aa9f5-fc74-43d0-932a-4144247de1f0-700x.webp",
            scriptName: "Tdata Windows stealer",
            os: "Windows",
            downloadUrl: "https://github.com/LuKresXD/rubberducky-payloads/tree/main/payloads/Tdata%20Windows%20Stealer",
            category: "Exfiltration"
        }
    ];
    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const res = await fetch('/api/getDownloads');
                const data = await res.json();
                const downloadMap: { [key: string]: number } = {};
                data.forEach((item: { scriptName: string, count: number }) => {
                    downloadMap[item.scriptName] = item.count;
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
            setDownloads(prev => ({
                ...prev,
                [scriptName]: (prev[scriptName] || 0) + 1
            }));

            await handleDownload(scriptName);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${scriptName}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error handling download:', error);
            setDownloads(prev => ({
                ...prev,
                [scriptName]: prev[scriptName] - 1
            }));
        }
    }, []);

    const filteredPayloads = payloads.filter(payload => {
        const matchesOS = selectedOS === 'all' || payload.os === selectedOS;
        const matchesSearch = payload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payload.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payload.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesOS && matchesSearch;
    });

    return (
        <>
            <Head>
                <title>RubberDucky Payloads ⌨️</title>
                <meta name="description" content="Advanced RubberDucky payloads collection by LuKres"/>
                <meta property='theme-color' content='#0a0a0a'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/keyboard.ico"/>
            </Head>

            <Navbar />

            <main className="relative min-h-screen bg-[#0a0a0a]">
                <GridPattern
                    width={50}
                    height={50}
                    x={-1}
                    y={-1}
                    className="z-[-5] opacity-50"
                />

                <div className="max-w-7xl mx-auto px-6 pt-20">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1 className="text-6xl font-bold mb-4 text-white">
                            RubberDucky Payloads ⌨️
                        </h1>
                        <p className="text-xl text-gray-400">
                            Advanced collection of penetration testing and security assessment tools
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <input
                            type="text"
                            placeholder="Search payloads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-6 py-3 bg-[#111111] text-white placeholder-gray-500 border border-accent/20 rounded-lg focus:outline-none focus:border-accent/50 transition-colors"
                        />

                        <div className="flex gap-2">
                            <motion.button
                                onClick={() => setSelectedOS('all')}
                                className={`p-3 rounded-lg border border-accent/20 transition-colors text-white ${
                                    selectedOS === 'all' ? 'bg-accent/20' : 'hover:bg-accent/10'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Filter className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={() => setSelectedOS('Windows')}
                                className={`p-3 rounded-lg border border-accent/20 transition-colors text-white ${
                                    selectedOS === 'Windows' ? 'bg-accent/20' : 'hover:bg-accent/10'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Windows />
                            </motion.button>
                            <motion.button
                                onClick={() => setSelectedOS('macOS')}
                                className={`p-3 rounded-lg border border-accent/20 transition-colors text-white ${
                                    selectedOS === 'macOS' ? 'bg-accent/20' : 'hover:bg-accent/10'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Apple />
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredPayloads.map((payload, index) => (
                                <motion.div
                                    key={payload.scriptName}
                                    layoutId={getItemLayoutId(payload.scriptName)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                        layout: { duration: 0.3 },
                                        opacity: { duration: 0.2 },
                                        y: { duration: 0.3 },
                                    }}
                                >
                                    <PayloadCard
                                        {...payload}
                                        downloads={downloads}
                                        onDownload={onDownload}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPayloads.length === 0 && (
                        <motion.div
                            className="text-center py-32"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-xl text-gray-500">No payloads found matching your criteria</p>
                        </motion.div>
                    )}
                </div>

                {isLoading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="w-16 h-16 border-4 border-t-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </main>
        </>
    );
}