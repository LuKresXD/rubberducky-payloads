import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const handleClickScroll = () => {
        const element = document.getElementById('RubberDucky Payloads');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ 
                top: elementPosition - 50,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <AnimatePresence>
                <motion.header
                    className={`flex justify-center items-center w-full fixed px-4 top-0 z-10 pt-4 transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md' : ''}`}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                <nav style={{ boxShadow: '0 0 30px 2.5px #0a0a0a' }} className="flex h-14 max-w-[46rem] w-screen bg-gradient-to-br from-primary/90 to to-secondary/90 backdrop-blur-md rounded-lg border-1 border-accent px-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row gap-2 items-center">
                            <img draggable={false} className="h-10 w-10" src="/me.png" />
                            <button onClick={handleClickScroll}
                                    className="p-2 duration-300 text-text text-lg font-medium hover:bg-secondary font-leaguespartan rounded-md">
                                Home
                            </button>
                        </div>
                        <div className="min-[330px]:flex hidden flex-row gap-2 items-center">
                            <a draggable={false} href="https://github.com/LuKresXD/rubberducky-payloads" target="_blank"
                               className="p-2 duration-300 text-text text-lg font-medium hover:bg-secondary font-leaguespartan rounded-md">
                                Source
                            </a>
                        </div>
                    </div>
                </nav>
                </motion.header>
            </AnimatePresence>
        </>
    );
}