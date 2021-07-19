import React from 'react';
import CodeEditor from '@monaco-editor/react';
import { EditorMode, Item } from '../../types';
import { languageDetect } from '../../lib/utils/languageDetect';
import { MarkdownPreview } from './MarkdownPreview';

const defaultItem: Item = {
    _id: '0',
    id: '0',
    name: 'untitled',
    content: '',
};

interface CodeEditor {
    item?: Item;
    mode: EditorMode;
    handleChangeItemContent: ({
        value,
        id,
    }: {
        value: string | undefined;
        id: string;
    }) => void;
}

export const Editor = ({
    item = defaultItem,
    mode,
    handleChangeItemContent,
}: CodeEditor) => {
    const { content, name, id } = item;
    const language = languageDetect(name);
    return (
        <div
            className="h-96 py-2 bg-white border-8 border-gray-300"
            style={{ width: '800px' }}
        >
            <div className={`h-full ${mode === 'editor' ? '' : 'hidden'}`}>
                <CodeEditor
                    value={content}
                    language={language}
                    options={{ minimap: { enabled: false } }}
                    onChange={(value) => handleChangeItemContent({ value, id })}
                    saveViewState={false}
                />
            </div>
            {mode === 'preview' && <MarkdownPreview content={content} />}
        </div>
    );
};
