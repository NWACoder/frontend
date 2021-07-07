export const SnippetCard = () => {
    return (
        <div className="grid grid-cols-2 space-x-1.5 container">
            <div className="border-2 rounded-md border-blue-400 w-auto h-auto transition duration-500 ease-in-out bg-blue-400 hover:bg-blue-500 transform hover:-translate-z-1 hover:scale-95">
                <div className=" bg-red-300 text-black rounded-t-md flex-auto">
                    <h3 className="justify-self-start">BS</h3>
                    <span className="justify-center">
                        <p className="inline-block mr-2">{0} File</p>
                        <p className="inline-block mr-2">{0} Fork</p>
                        <p className="inline-block mr-2">{0} Stars</p>
                    </span>
                </div>
                <div>
                    <p className="bg-white rounded-b-md w-full text-gray-900">lorem Ipsum</p>
                </div>
            </div>
            <div className="border-2 rounded-md border-blue-400 w-auto h-auto transition duration-500 ease-in-out bg-blue-400 hover:bg-blue-500 transform hover:-translate-z-1 hover:scale-95">
                <div className=" bg-red-300 text-black rounded-t-md flex-auto">
                    <h3 className="justify-self-start">BS</h3>
                    <span className="justify-center">
                        <p className="inline-block mr-2">{0} File</p>
                        <p className="inline-block mr-2">{0} Fork</p>
                        <p className="inline-block mr-2">{0} Stars</p>
                    </span>
                </div>
                <div>
                    <p className="bg-white rounded-b-md w-full text-gray-900">lorem Ipsum</p>
                </div>
            </div>
        </div>
    );
};
