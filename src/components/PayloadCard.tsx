import { motion } from 'framer-motion';
import Image from 'next/image';

interface PayloadCardProps {
    title: string;
    description: string;
    imageSrc: string;
    scriptName: string;
    os: string;
    downloadUrl: string;
    category: string;
    downloads: { [key: string]: number };
    onDownload: (scriptName: string, url: string) => void;
}

export default function PayloadCard({
                                        title,
                                        description,
                                        imageSrc,
                                        scriptName,
                                        os,
                                        downloadUrl,
                                        category,
                                        downloads,
                                        onDownload
                                    }: PayloadCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-primary to-secondary rounded-lg border border-accent overflow-hidden shadow-xl"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                    {os}
                </div>
                <div className="absolute bottom-4 left-4 bg-accent/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                    {category}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-sm text-white/80 mb-4">{description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                        Downloads: {downloads[scriptName] || 0}
                    </span>
                    <button
                        onClick={() => onDownload(scriptName, downloadUrl)}
                        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-300"
                    >
                        Download
                    </button>
                </div>
            </div>
        </motion.div>
    );
}