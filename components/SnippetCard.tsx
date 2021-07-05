export default function SnippetCard() {
    return (
        <div className="border-2 border-black max-w-sm">
            <div className=" bg-gray-700 text-gray-200 rounded-sm grid grid-cols-2">
                <h3 className="ml-2">JS</h3>
                <div className="justify-self-end">
                    <p className="inline-block mr-2">File</p>
                    <p className="inline-block mr-2">Fork</p>
                    <p className="inline-block mr-2">Stars</p>
                </div>
            </div>
            <div>
                <p className="bg-white w-full">Some text</p>
            </div>
        </div>
    );
}
