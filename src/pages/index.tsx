import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "@/components/Navbar";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';



export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('google.com');
    const [result, setResult] = useState('Enter website');
    const [safetyScore, setSafetyScore] = useState(100);
    const [analysisId, setAnalysisId] = useState('');
    const [scannedUrl, setScannedUrl] = useState('');

    function handleInput(e: any) {
        setUrl(e.target.value);
    }

    async function handleCheck() {
        setIsLoading(true);
        const finalUrl = url;
        if (finalUrl) {
            await checkVirusTotal(finalUrl);
            setUrl('');
        }
        setIsLoading(false);
    }

    async function checkVirusTotal(checkUrl: string) {
    setIsLoading(true);
    const scanId = await sendUrlToVirusTotal(checkUrl);
    if (scanId) {
        const analysisResult = await waitForAnalysisCompletion(scanId);
        let score = Math.max(Number((100 - (analysisResult.data.attributes.stats.malicious * 5 + analysisResult.data.attributes.stats.suspicious * 3) / 92 * 100).toFixed(1)), 0.1);
        setSafetyScore(score);
        setScannedUrl(analysisResult.meta.url_info.url);
        const resultText = score < 50 ? 'Dangerous' : score < 80 ? 'Moderate' : 'Safe';
        setResult(resultText);

        await axios.post('/api/saveScan', {
            url: checkUrl,
            result: resultText,
            safetyScore: score
        });

        setUrl('');
    }
    setIsLoading(false);
}


    async function waitForAnalysisCompletion(scanId: string) {
        const analysisResult = await getUrlAnalysis(scanId);
        if (analysisResult.data.attributes.status !== "completed") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return await waitForAnalysisCompletion(scanId);
        }
        return analysisResult;
    }

    async function sendUrlToVirusTotal(urlToCheck: string) {
        try {
            const response = await axios.post('/api/proxy', { url: urlToCheck });
            return response.data.data.id;
        } catch (error) {
            console.error('Error sending URL to proxy:', error);
            return null;
        }
    }

    async function getUrlAnalysis(analysisId: string) {
        try {
            const response = await axios.get(`/api/proxy?id=${analysisId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting URL analysis from proxy:', error);
            return null;
        }
    }

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <>
            <Head>
                <title>Phishing Website Detector 🕵🏻‍♂️</title>
                <link rel="stylesheet" href="https://unpkg.com/pattern.css@1.0.0/dist/pattern.min.css"/>
                <meta name="description" content="Check if a website is safe or a phishing attempt"/>
                <meta property='theme-color' content='#17171a'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/detective.ico"/>
            </Head>
            <Navbar />
            <div className='flex flex-col h-screen justify-between'>
                <main className='flex flex-col justify-center grow pattern-grid-lg text-primary overflow-x-hidden'>
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
                        <h1 className='font-bold sm:text-6xl text-4xl font-poppins text-center text-text'>
                            <span className="text-blue-500">Phishing</span> <span className="text-blue-100">Website Detector 🕵🏻‍♂️</span>
                        </h1>
                        <p className='text-blue-100 text-lg text-center mt-4 font-poppins'>
                            {inView &&
                                <Typewriter
                                    options={{
                                        delay: 30,
                                        strings: ["Enter a URL below to check if the website is safe."],
                                        loop: false,
                                        autoStart: true,
                                        deleteSpeed: 604800000,
                                    }}
                                />}
                        </p>
                        <div className='w-full mx-auto pt-8 flex flex-col items-center'>
                            <div className="flex items-center w-full mb-4">
                                <input
                                    type="text"
                                    name="url"
                                    id="url"
                                    value={url}
                                    placeholder="Enter URL..."
                                    onChange={handleInput}
                                    className="outline-none bg-zinc-800 block w-full outline- rounded-md border-0 p-2 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-3 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 padding-left:1"
                                />
                                <button onClick={handleCheck}
                                        className="ml-2 p-2 font-poppins rounded-md md:text-xl text-lg font-semibold bg-zinc-925 border-2 border-zinc-900 hover:border-blue-700 duration-500 ease-custom text-blue-100">
                                    Check
                                </button>
                            </div>
                            <div className="relative w-full max-w-[35rem] mx-auto p-4 my-4">
                                <div
                                    className="absolute top-0 right-0 bottom-0 left-0 z-8 transform translate-x-8 translate-y-8 p-4">
                                    <div
                                        className="absolute flex min-[1390px]:w-[20rem] min-[1390px]:h-[20rem] min-[470px]:w-[18rem] min-[470px]:h-[18rem] xs:w-[16rem] xs:h-[16rem] w-[12rem] h-[12rem] bg-blue-500 rounded-full opacity-20 blur-2xl min-[1390px]:-translate-y-26 -translate-y-20 translate-x-16 group-hover:-translate-y-38 duration-500 ease-custom"></div>
                                    <div
                                        className="absolute flex min-[1390px]:w-[20rem] min-[1390px]:h-[20rem] min-[470px]:w-[18rem] min-[470px]:h-[18rem] xs:w-[16rem] xs:h-[16rem] w-[12rem] h-[12rem] bg-blue-700 rounded-full opacity-20 blur-2xl -translate-x-16 group-hover:-translate-x-24 duration-500 ease-custom"></div>
                                    <div
                                        className="absolute flex min-[1390px]:w-[20rem] min-[1390px]:h-[20rem] min-[470px]:w-[18rem] min-[470px]:h-[18rem] xs:w-[16rem] xs:h-[16rem] w-[12rem] h-[12rem] bg-blue-600 rounded-full opacity-20 blur-2xl translate-x-32 min-[1390px]:translate-y-8 translate-y-8 group-hover:translate-x-44 duration-500 ease-custom"></div>
                                </div>
                                <div
                                    className="relative flex justify-between font-poppins items-start bg-[#313338] p-4 rounded-md shadow-lg z-10 translate-y-16">
                                    <div className="flex flex-col">
                                        <p className="text-blue-100 text-l mx-2 py-0.5">Website is:</p>
                                        <p className="text-blue-500 font-bold text-3xl font-poppins mx-2 py-0.5">{result}</p>
                                        <p className="text-blue-500 font-bold text-3xl font-poppins mx-2 py-1.5">{"ㅤ"}</p>
                                        <div className="text-blue-100/50 text-l font-poppins mx-2 py-1">
                                            {scannedUrl.length > 25 ? `${scannedUrl.substring(0, 25)}...` : scannedUrl}
                                        </div>
                                    </div>
                                    <div style={{width: 150, height: 150}}>
                                        <div style={{
                                            boxShadow: `0 0 10px rgba(${255 - Math.round((255 * safetyScore) / 100)}, ${Math.round((255 * safetyScore) / 100)}, 0, 0.8)`,
                                            borderRadius: "50%",
                                            display: "inline-block"
                                        }}>
                                            <CircularProgressbar
                                                value={safetyScore}
                                                text={`${safetyScore}%`}
                                                styles={buildStyles({
                                                    textColor: 'white',
                                                    pathColor: `rgb(${255 - Math.round((255 * safetyScore) / 100)}, ${Math.round((255 * safetyScore) / 100)}, 0)`,
                                                    trailColor: 'black',
                                                    textSize: '16px'
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    )
}
