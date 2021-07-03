import Link from 'next/link';
import React from 'react';

export const Header = () => {
    return (
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
    );
};
