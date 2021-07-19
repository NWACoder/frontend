import React from 'react';

interface UserCard {
    following: number;
    followers: number;
    stars: number;
}

export const UserCard = ({ following, followers, stars }: UserCard) => {
    return (
        <div className="mt-8 mb-8 grid grid-cols-3 h-96 w-full border-2 border-blue-300">
            <div className="bg-gray-200 col-span-2">
                <p className="mt-8">Markdown here</p>
            </div>
            <div className="grid grid-rows-3 w-full">
                <div className="row-span-1 justify-self-center bg-gray-600 w-full">
                    <img className="justify-center relative border-2 bg-red-500 rounded-full left-24 h-28 w-28 -bottom-12"></img>
                </div>
                <div className="row-span-2">
                    <div className="mt-10 grid md:grid-cols-3">
                        <div className="">
                            <p className="">{(followers = 0)}</p>
                            <p className="">Followers</p>
                        </div>
                        <div className="">
                            <p className="">{(following = 0)}</p>
                            <p className="">Following</p>
                        </div>
                        <div className="place-items-center">
                            <p className="">{(stars = 0)}</p>
                            <p className="">Stars</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
