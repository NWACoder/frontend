import React from 'react';

interface SnippetCard {
    files: number;
    forks: number;
    stars: number;
    title: string;
    author: string;
}

export const SnippetCard = ({
    files,
    forks,
    stars,
    title,
    author,
}: SnippetCard) => {
    return (
        <div
            className="w-full snippet-card border border-gray-800 rounded  hover:shadow-lg hover:border-blue-900 cursor-pointer"
          
        >
            <div className="snippet-card-header flex flex-row items-center bg-gray-800 text-white py-1 px-4">
                <div className="mr-auto text-lg">JS</div>
                <div className="flex flex-row text-center items-center text-sm h-full">
                    <div className="px-2">
                        {files === 1 ? `${files} file` : `${files} files`}
                    </div>
                    <div className="px-2">
                        {forks === 1 ? `${forks} fork` : `${forks} forks`}
                    </div>
                    <div className="pl-2">
                        {stars === 1 ? `${stars} star` : `${stars} stars`}
                    </div>
                </div>
            </div>
            <div className="flex flex-row py-4 px-4 items-center">
                <div className="text-lg mr-auto">{title}</div>
                <div>by: {author}</div>
            </div>
        </div>
    );
};
