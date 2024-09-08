import Image from 'next/image';

interface PayloadCardProps {
    title: string;
    description: string;
    imageSrc: string;
    scriptName: string;
    os: string;
    downloadUrl: string;
    downloads: { [key: string]: number };
    onDownload: (scriptName: string, downloadUrl: string) => void;
}

export default function PayloadCard({
                                        title,
                                        description,
                                        imageSrc,
                                        scriptName,
                                        os,
                                        downloadUrl,
                                        downloads,
                                        onDownload
                                    }: PayloadCardProps) {
    return (
        <div className="flex w-full">
            <a
                href={downloadUrl}
                onClick={(e) => {
                    e.preventDefault();
                    onDownload(scriptName, downloadUrl);
                }}
                className="group rounded-md border-2 bg-zinc-900 border-zinc-800 hover:-translate-y-2 duration-500 ease-custom hover:border-blue-700 w-full text-left no-underline flex flex-col"
                aria-label={`Download ${title} script`}
            >
                <Image
                    className="rounded-t-md w-full rounded-x-md border-b-2 border-zinc-800 group-hover:border-blue-700 duration-500 ease-custom"
                    src={imageSrc}
                    alt={title}
                    width={700}
                    height={400}
                    loading="lazy"
                />
                <div className="p-4 flex-grow flex flex-col">
                    <h2 className="text-blue-100 font-bold text-center sm:text-3xl text-2xl font-poppins">{title}</h2>
                    <p className="text-blue-100 font-normal text-center sm:text-base text-sm font-poppins mt-1 mb-4 flex-grow">
                        {description}
                    </p>
                    <ul className="grid grid-cols-2 gap-4 mt-auto">
                        <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom flex flex-col justify-between h-full">
                            <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">{os}</h3>
                            <p className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">OS</p>
                        </li>
                        <li className="rounded-md w-full p-2 border-2 bg-zinc-925 border-zinc-800 hover:border-blue-700 duration-500 ease-custom flex flex-col justify-between h-full">
                            <h3 className="text-blue-100 font-bold text-center sm:text-xl xs:text-lg text-base font-poppins">
                                {downloads[scriptName] !== undefined ? downloads[scriptName] : 'Loading...'}
                            </h3>
                            <p className="text-blue-100 font-medium text-center sm:text-lg xs:text-base text-sm font-poppins">Downloads</p>
                        </li>
                    </ul>
                </div>
            </a>
        </div>
    );
}
