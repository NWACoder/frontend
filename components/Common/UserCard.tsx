export const UserCard = () => {
    return (
        <div className="grid grid-cols-3 h-96 w-full border-2 border-blue-300 rounded-md">
            <div className="bg-gray-200 col-span-2">
                <p className="mt-8">
                    user description here in markdown or markdown compenent?
                </p>
            </div>
            <div className="grid grid-rows-3 w-full bg-blue-300 border-blue-300 rounded-tr-md">
                <div className="row-span-1 justify-self-center">
                    <img className="relative border-2 bg-red-500 rounded-full h-28 w-28 -bottom-12"></img>
                </div>
                <div className="border-t-2 border-red-200 row-span-2 rounded-br-2">
                    <div className="flex mt-32 justify-center">
                        <p className="mr-2">Followers</p>
                        <p className="mr-4">{0}</p>
                        <p className="mr-2">Following</p>
                        <p className="mr-4">{0}</p>
                        <p className="mr-2">Stars</p>
                        <p className="">{0}</p>
                    </div>
                    <button className="border-2 border-red-300 rounded-md bg-red-100 mt-6 pl-4 pr-4">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
};
