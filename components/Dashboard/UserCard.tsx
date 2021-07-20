import React from 'react';
import MarkdownPreview from '../../components/CodeEditor/MarkdownPreview';

interface UserCard {
    following: number;
    followers: number;
    stars: number;
    username: string;
    about: string;
}

export const UserCard = ({
    following,
    followers,
    stars,
    username,
    about,
}: UserCard) => {
    return (
        <div className="mt-8 mb-8 grid grid-cols-3 h-auto w-full border-2 border-blue-300">
            <div className="bg-gray-200 col-span-2">
                <MarkdownPreview content={about} />
            </div>
            <div className="grid grid-rows-3 w-full">
                <div className="row-span-1 justify-self-center bg-gray-600 w-full">
                    <div className="w-full ">
                        <p className=" text-right mr-8 text-6xl">{username}</p>
                    </div>
                    <div className="text-center relative border-2 bg-blue-500 rounded-full left-1/4 h-20 w-20 -bottom-12">
                        <p className="text-gray-200 bold uppercase justify-self-center text-6xl mt-2">
                            {username[0]}
                        </p>
                    </div>
                </div>
                <div className="row-span-2 justify-center">
                    <div className="mt-28 grid md:grid-cols-3 justify-items-center">
                        <div className="text-center">
                            <p className="">{followers}</p>
                            <p className="">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="">{following}</p>
                            <p className="">Following</p>
                        </div>
                        <div className="text-center">
                            <p className="">{stars}</p>
                            <p className="">Stars</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
