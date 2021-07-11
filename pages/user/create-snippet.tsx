import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Layout } from '../../components/Common/Layout';
const Select = dynamic(() => import('react-select'), {
    ssr: false,
});
// import { CodeEditor } from '../../components/CreateSnippet/CodeEditor';
const CodeEditor = dynamic(
    () => import('../../components/CreateSnippet/CodeEditor'),
    {
        ssr: false,
    }
);

const props = {
    author: 'Jessica',
    files: 3,
    forks: 0,
    stars: 0,
};

const options = [
    { value: 'js', label: 'JS' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'csharp', label: 'C#' },
];

export default function CreateSnippet() {
    useEffect(() => {
        // TODO fetch user snippets
    }, []);

    const { author, files, forks, stars } = props;
    return (
        <Layout protectedRoute={true}>
            <main className="flex flex-col flex-grow items-center w-full text-center">
                <div className="flex flex-row my-4 items-center md:w-full md:max-w-4xl flex-wrap-reverse justify-center">
                    <div className="md:mr-auto">
                        <div className="form-group relative mt-4 md:mt-0">
                            <input
                                id="snippetName"
                                name="snippetName"
                                type="text"
                                className="border-dashed border-2 border-gray-400 text-xl focus:outline-none focus:ring-0"
                                required
                            />
                            <label
                                className="text-lg font-semibold text-left ml-1 opacity-50 floating-label"
                                aria-labelledby="snippetName"
                            >
                                Snippet Name
                            </label>
                            <div className="text-red-700 font-semibold">
                                {/* {errors.email?.message} */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row mb-4">
                            <DetailRectangle value={files} />
                            <DetailRectangle value={forks} />
                            <DetailRectangle value={stars} />
                        </div>
                        <Select
                            options={options}
                            isMulti
                            name="langs"
                            className="multi-select"
                        />
                    </div>
                </div>
                <div className="bg-gray-200 h-full w-full">
                    <CodeEditor
                        text='const test = "test"'
                        language="javascript"
                    />
                </div>
            </main>
        </Layout>
    );
}

const DetailRectangle = ({ value }: { value: number }) => {
    return (
        <div className="bg-gray-200 rounded px-8 py-2 mx-2 whitespace-nowrap">
            {value === 1 ? `${value} file` : `${value} files`}
        </div>
    );
};
