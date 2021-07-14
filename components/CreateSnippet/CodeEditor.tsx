import React from 'react';
import Editor from '@monaco-editor/react';
import { Item } from '../../types';

const defaultItem: Item = {
    id: '0',
    name: 'untitled',
    content: '',
};

interface CodeEditor {
    item?: Item;
    handleChangeItemContent: ({
        value,
        id,
    }: {
        value: string | undefined;
        id: string;
    }) => void;
}

export const CodeEditor = ({
    item = defaultItem,
    handleChangeItemContent,
}: CodeEditor) => {
    const { content, name, id } = item;

    return (
        <div
            className="h-96 py-2 bg-white border-8 border-gray-300"
            style={{ width: '800px' }}
        >
            <Editor
                value={content}
                path={name}
                options={{ minimap: { enabled: false } }}
                onChange={(value) => handleChangeItemContent({ value, id })}
            />
        </div>
    );
};

export default CodeEditor;
