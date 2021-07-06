export const SnippetCard = () => {
    return (
        <div className="border-2 rounded-md border-red max-w-sm h-1">
            <div className=" bg-blue-300 text-black-200 rounded-t-md grid grid-cols-2">
                <h3 className="justify-self-start ml-2">BS</h3>
                <div className="justify-self-end">
                    <p className="inline-block mr-2">File</p>
                    <p className="inline-block mr-2">Fork</p>
                    <p className="inline-block mr-2">Stars</p>
                </div>
            </div>
            <div>
                <p className="bg-white rounded-b-md w-full">Some text</p>
            </div>
        </div>
    );
};