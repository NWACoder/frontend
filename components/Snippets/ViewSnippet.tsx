import Link from 'next/link';
import React from 'react';
import { Snippet } from '../../types';

interface SnippetCard {
    snippet: Snippet;
}

export const ViewSnippet = ({ snippet }: SnippetCard) => {
    const { items, title, user_id } = snippet;
    const author = user_id ? user_id.username : 'unknown';
    return (
        <Link href={`/snippets/${snippet._id}`}>
            <div
                className="w-full border border-gray-800 rounded hover:shadow-lg hover:border-blue-900 cursor-pointer"
            >
                <div className="snippet-card-header flex flex-row items-center bg-gray-800 text-white py-1 px-4">
                  
                    <div className="flex flex-row text-center items-center text-sm h-full">
                        <div className="px-2">
                            {items.length === 1
                                ? `${items.length} file`
                                : `${items.length} files`}
                        </div>
                        <div className="px-2">
                            0 forks
                        </div>
                        <div className="pl-2">
                            0 stars
                        </div>
                    </div>
                </div>
                <div className="flex flex-row py-4 px-4 items-center">
                    <div className="text-lg mr-auto">{title}</div>
                    <div>by: {author || 'unknown'}</div>
                </div>
            </div>
        </Link>
    );
};


