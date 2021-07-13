import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({
    text,
    language,
}: {
    text: string;
    language: string;
}) => {
    return (
        <div className="py-16 max-w-max mx-auto">
            <div className="flex flex-row">
                <div className="flex flex-row mr-auto">
                    <button className="bg-gray-300 w-28 py-3 mr-4">
                        Editor
                    </button>
                    <button className="bg-gray-300 w-28 py-3">Preview</button>
                </div>
                <div className="text-left self-end mb-1">
                    <div className="w-52 ml-4 flex flex-row items-center">
                        <div className="mr-auto">Files</div>
                        <button className="px-2 hover:bg-gray-300 text-xl">
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div
                    className="h-96 py-2 bg-white border-8 border-gray-300"
                    style={{ width: '800px' }}
                >
                    <Editor
                        defaultLanguage="javascript"
                        options={{ minimap: { enabled: false } }}
                        value={text}
                        language={language}
                    />
                </div>
                <div className="border-2 border-gray-300 w-52 ml-4 bg-white p-2">
                    <button className="px-2 py-1 hover:bg-gray-300 w-full text-left">
                        index.html
                    </button>
                    <button className="px-2 py-1 hover:bg-gray-300 w-full text-left">
                        app.js
                    </button>
                    <button className="px-2 py-1 hover:bg-gray-300 w-full text-left">
                        app.css
                    </button>
                </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
                <div className="form-group mr-auto">
                    <label>
                        <input type="checkbox"></input>
                        <span className="ml-2">make this snippet public</span>
                    </label>
                </div>
                <div>
                    <button className="px-6 py-2 bg-red-300 hover:bg-red-400">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
