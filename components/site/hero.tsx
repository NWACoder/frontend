import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface Hero {
    title: string;
    subtitle: string;
    buttonText: string;
}

export const Hero = ({ title, subtitle, buttonText}: Hero) => {
	
	return (
		<div className="flex flex-row items-center justify-center xl:justify-between w-full flex-wrap-reverse mt-16">
            <div className="max-w-max text-left mx-6 my-16">
                <div className="text-2xl md:text-4xl font-bold">
                    {title}
                </div>
                <div className="mt-4 mb-8 md:text-lg">
                    
                    {subtitle}
                </div>
                <Link href="/">
                    <button className="flex flex-row items-center bg-red-300 py-1 px-3 rounded text-black hover:bg-red-400">
                        {buttonText}
                        <ChevronRightIcon className="w-8 -mr-2" />
                    </button>
                </Link>
            </div>
            <div
                className="relative mx-6 my-4"
                style={{ width: '500px', height: '280px' }}
            >
                <div className="bg-blue-300 w-full h-full absolute top-0 transform rotate-6 opacity-50"></div>
                <div className="bg-red-300 w-full h-full absolute top-0 transform -rotate-6 opacity-50"></div>
                <div className="bg-black w-full h-full absolute"></div>
            </div>
        </div>
	)
}

