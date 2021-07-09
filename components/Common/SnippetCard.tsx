export const SnippetCard = () => {
    return (
        <div className="border-2 rounded-md bg-white border-blue-400 shadow-lg w-auto h-auto transition duration-500 ease-in-out hover:bg-gray-100 transform hover:-translate-z-1 hover:scale-95">
            <div className="bg-blue-200 text-black rounded-t-md flex justify-between h-auto shadow-inner">
                <h3 className="justify-self-start ml-4">{'JS'}</h3>
                <span className="justify-center">
                    <p className="inline-block mr-2">{0} File</p>
                    <p className="inline-block mr-2">{0} Fork</p>
                    <p className="inline-block mr-2">{0} Stars</p>
                </span>
            </div>
            <p className="rounded-b-md w-full text-gray-900">lorem Ipsum</p>
        </div>
    );
};
