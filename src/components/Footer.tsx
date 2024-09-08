export default function Footer() {
    return (
        <>
            <footer className=" w-full flex flex-col mx-auto pt-4 pb-2">
                <div className="h-0.5 w-full rounded-lg bg-gradient-to-r from-secondary via-accent to-secondary"/>
                <h2 className="font-leaguespartan text-center font-semibold text-base text-text pt-2">
                    payloads.lukres.dev - Made with NextJS, TailwindCSS, and ❤ by Luka
                </h2>
            </footer>
        </>
    );
}
