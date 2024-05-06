import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalScans, setTotalScans] = useState(0);

    useEffect(() => {
        fetchHistory({page: currentPage});
    }, [currentPage]);

    async function fetchHistory({page}: { page: any }) {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/api/history?page=${page}&limit=5`);
            setHistory(data.scans);
            setTotalPages(data.totalPages);
            setTotalScans(data.totalScans);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch history:', error);
            setIsLoading(false);
        }
    }

    function handlePrevious() {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }

    function handleNext() {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    }

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <>
            <Head>
                <title>History 🕵🏻‍♂️</title>
                <link rel="stylesheet" href="https://unpkg.com/pattern.css@1.0.0/dist/pattern.min.css"/>
                <meta name="description" content="View the history of scanned websites"/>
                <meta property='theme-color' content='#17171a'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/detective.ico"/>
            </Head>
            <Navbar/>
            <div className='flex flex-col h-screen justify-between'>
                <main className='flex h-screen flex-col justify-center pattern-grid-lg text-primary overflow-x-hidden'>
                    <motion.div
                        className={`container mx-auto px-4 sm:px-6 lg:px-8 brightness-100 transition-all ${isLoading ? 'brightness-50' : ''}`}
                        initial={{transform: 'translateY(30px)', opacity: 0}}
                        whileInView={{transform: 'translateY(0px)', opacity: 100}}
                        transition={{duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96],}}
                        viewport={{amount: 0.1, once: true}}
                        ref={ref}
                    >
                        <div className='max-w-5xl w-full mx-auto'>
                            <h1 className='text-white font-bold sm:text-6xl text-4xl font-leaguespartan text-center'>
                                History 📜
                            </h1>
                            <table className="min-w-full divide-y divide-zinc-800 mt-8">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="font-poppins py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-blue-100 sm:pl-0">URL
                                    </th>
                                    <th scope="col"
                                        className="font-poppins px-3 py-3.5 text-left text-sm font-semibold text-blue-100">Date
                                    </th>
                                    <th scope="col"
                                        className="font-poppins px-3 py-3.5 text-left text-sm font-semibold text-blue-100">Result
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-700">
                                {isLoading ? (
                                    [...Array(5)].map((_, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-blue-700 font-poppins sm:pl-0 animate-pulse">???</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-100 font-poppins animate-pulse">???</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-100 font-poppins animate-pulse">???</td>
                                        </tr>
                                    ))
                                ) : (
                                    history.map(({date, result, url}, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-blue-700 font-poppins sm:pl-0">{(url as string).length > 25 ? `${(url as string).substring(0, 25)}...` : url}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-100 font-poppins">{new Date(date).toLocaleDateString()}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-100 font-poppins">{result}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>

                            </table>
                            <nav
                                className="flex items-center justify-between border-t border-zinc-700 bg-transparent pt-3 px-2">
                                <div className="flex flex-1 items-center gap-3">
                                    <button onClick={handlePrevious}
                                            className="relative inline-flex items-center font-poppins rounded-md bg-zinc-800 border-[1px] border-zinc-700 hover:bg-zinc-700 hover:border-blue-700 duration-300 active:translate-y-1 px-3 py-2 text-sm font-semibold text-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-white h-6 w-6 mx-auto"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"></path>
                                        </svg>
                                    </button>
                                    <button onClick={handleNext}
                                            className="relative inline-flex items-center font-poppins rounded-md bg-zinc-800 border-[1px] border-zinc-700 hover:bg-zinc-700 hover:border-blue-700 duration-300 active:translate-y-1 px-3 py-2 text-sm font-semibold text-blue-100">
                                        {<svg xmlns="http://www.w3.org/2000/svg" className="fill-white h-6 w-6 mx-auto"
                                              viewBox="0 0 16 16">
                                            <path
                                                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                                        </svg>}
                                    </button>
                                    <p className="text-sm text-blue-100 font-poppins">
                                        Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, totalScans)} of {totalScans} scans
                                    </p>
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                </main>
                <footer>
                    <div className="h-0.5 w-full rounded-lg bg-gradient-to-r from-secondary via-accent to-secondary"/>
                    <h2 className="font-leaguespartan text-center font-semibold text-base text-text pt-2">
                        phishing.lukres.dev - Made with NextJS, TailwindCSS, and ❤ by Luka
                    </h2>
                </footer>
            </div>
        </>
    );
}
