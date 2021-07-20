import Link from 'next/link';
import React from 'react';
import { Item, Snippet } from '../../types';

interface SnippetCard {
    snippet: Snippet;
}

export const SnippetCard = ({ snippet }: SnippetCard) => {
    const { items, title, user_id } = snippet;
    const author = user_id ? user_id.username : 'unknown';
    const fileTypes = parseFileTypes(items);
    return (
        <Link href={`/user/edit-snippet?id=${snippet._id}`}>
            <div
                className="snippet-card w-full border border-gray-800 rounded my-4 hover:shadow-lg hover:border-blue-900 cursor-pointer">
                <div className="snippet-card-header flex flex-row items-center bg-gray-800 text-white py-1 px-4">
                    <div className="flex flew-row -ml-2 mr-auto">
                        {fileTypes.map((type) => (
                            <FileType type={type} key={type} />
                        ))}
                    </div>
                    <div className="flex flex-row text-center items-center text-sm h-full">
                        <div className="px-2">
                            {items.length === 1
                                ? `${items.length} file`
                                : `${items.length} files`}
                        </div>
                        <div className="px-2">
                            0 forks
                            {/* {forks === 1 ? `${forks} fork` : `${forks} forks`} */}
                        </div>
                        <div className="pl-2">
                            0 stars
                            {/* {stars === 1 ? `${stars} star` : `${stars} stars`} */}
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

const parseFileTypes = (items: Item[]) => {
    const itemsSet = new Set<string>();
    items.forEach(({ name }) => {
        const extIndex = name.lastIndexOf('.');
        if (extIndex === -1 || extIndex === name.length - 1) return '';
        const ext = name.slice(extIndex + 1);
        itemsSet.add(ext.toUpperCase());
    });
    return Array.from(itemsSet);
};

const FileType = ({ type }: { type: string }) => {
    return <div className="px-2 py-1 mr-2 rounded bg-gray-500">{type}</div>;
};
