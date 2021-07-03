import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/solid';

export default function Home() {
    return (
        <div className="min-h-screen max-w-4xl py-2 mx-auto">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="flex flex-row font-thin flex-wrap">
                <div className="mr-8">
                    <div className="text-4xl font-thin">Code</div>
                    <div className="text-lg -mt-3 ml-5 font-thin">snippets</div>
                </div>
                <div className="flex flex-row items-center sm:flex-grow whitespace-nowrap mx-auto">
                    <Link href="/">
                        <button className="px-6 py-2 hover:bg-gray-200 rounded font-thin text-lg">
                            Browser
                        </button>
                    </Link>
                    <Link href="/">
                        <button className="px-6 py-2 font-thin text-lg hover:bg-gray-200 rounded">
                            Search
                        </button>
                    </Link>
                    <Link href="/">
                        <button className="px-6 py-2 font-thin text-lg hover:bg-gray-200 rounded">
                            Q & A
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row items-center text-lg mx-auto my-2">
					<button className="px-4 py-1 bg-gray-700 hover:bg-gray-900 rounded mx-4 text-white">
						Login
					</button>
                    {/* <div className="mr-8">Jessica A.</div>
                    <div className="w-6">
                        <svg
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="50" />
                        </svg>
                    </div> */}
                </div>
            </header>
            <main className="flex flex-col items-center justify-center w-full mt-36 text-center">
                <div className="flex flex-row items-center justify-around w-full flex-wrap-reverse">
                    <div className="w-64 text-left mx-6 my-16">
                        <div className="text-2xl font-semibold">
                            Browse and create code snippets
                        </div>
                        <div className="mt-4 mb-8">
                            Snippets are small pieces of code you don't need to
                            remember.
                        </div>
                        <button className="flex flex-row items-center bg-red-300 py-1 px-3 rounded text-black hover:bg-red-400">
                            Checkout our example
                            <ChevronRightIcon className="w-8 -mr-2" />
                        </button>
                    </div>
                    <div className="relative w-72 h-48 mx-6 my-4">
                        <div className="bg-blue-300 w-72 h-48 absolute top-0 transform rotate-6 opacity-50"></div>
                        <div className="bg-red-300 w-72 h-48 absolute top-0 transform -rotate-6 opacity-50"></div>
                        <div className="bg-black w-72 h-48 absolute"></div>
                    </div>
                </div>
                <div className="mt-28">
                    <div className="text-2xl font-thin sm:my-8">
                        Community Stats
                    </div>
                    <div className="sm:flex sm:flex-row sm:flex-wrap">
                        <div className="sm:border-r sm:border-b-0 sm:px-16 sm:py-0 py-8 border-b max-w-max mx-auto">
                            <div className="text-2xl font-semibold">56800</div>
                            <div className="font-thin mt-2">Users</div>
                        </div>
                        <div className="sm:border-r sm:border-b-0 sm:px-16 sm:py-0 py-8 border-b max-w-max mx-auto">
                            <div className="text-2xl font-semibold">86671</div>
                            <div className="font-thin mt-2">Snippets</div>
                        </div>
                        <div className="sm:px-16 sm:py-0 py-8 max-w-max mx-auto">
                            <div className="text-2xl font-semibold">89222</div>
                            <div className="font-thin mt-2">Q&A</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* <footer className="flex items-center justify-center w-full h-24 border-t"></footer> */}
        </div>
    );
}
