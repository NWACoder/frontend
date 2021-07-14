import React, { ChangeEventHandler, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '../../components/Common/Layout';
import { initialState, reducer } from '../../lib/reducer/editor';
import { SnippetFiles } from '../../components/CreateSnippet/SnippetFiles';
import { ActionType } from '../../types';
const Select = dynamic(() => import('react-select'), {
    ssr: false,
});
import CodeEditor from '../../components/CreateSnippet/CodeEditor';

const options = [
    { value: 'js', label: 'JS' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'csharp', label: 'C#' },
];

export default function CreateSnippet() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {}, []);

    const handleUpdatePublicSnippet: ChangeEventHandler<HTMLInputElement> = ({
        target,
    }) => {
        const { checked } = target;
        dispatch({ type: ActionType.UPDATE_SNIPPET_PUBLIC, payload: checked });
    };

    const handleSelectItem = (id: string) => {
        dispatch({
            type: ActionType.SELECT_ITEM,
            payload: id,
        });
    };

    const handleChangeItemName = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        const id = target.getAttribute('data-id');
        dispatch({
            type: ActionType.UPDATE_ITEM_NAME,
            payload: { value, id },
        });
    };

    const handleChangeItemContent = ({
        value = '',
        id,
    }: {
        value: string | undefined;
        id: string;
    }) => {
        dispatch({
            type: ActionType.UPDATE_ITEM_CONTENT,
            payload: { value, id },
        });
    };

    const handleAddNewItem = () => {
        dispatch({ type: ActionType.ADD_ITEM });
    };

    const handleDeleteItem = ({
        currentTarget,
    }: React.MouseEvent<HTMLButtonElement>) => {
        const id = currentTarget.getAttribute('data-id');
        dispatch({ type: ActionType.DELETE_ITEM, payload: id });
    };

    const { snippet, selectedItemID, newItemID, isMarkDown } = state;
    const selectedItem = snippet.items.find(
        (item) => item.id === selectedItemID
    );
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
                                value={snippet.title}
                                required
                                onChange={({ target }) =>
                                    dispatch({
                                        type: ActionType.UPDATE_TITLE,
                                        payload: target.value,
                                    })
                                }
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
                            <DetailRectangle
                                value={snippet.items.length}
                                name="file"
                            />
                            <DetailRectangle value={0} name="fork" />
                            <DetailRectangle value={0} name="star" />
                        </div>
                        <Select
                            options={options}
                            isMulti
                            name="langs"
                            className="multi-select"
                        />
                    </div>
                </div>
                <div className="flex flex-row py-16 max-w-max mx-auto bg-gray-200 h-full px-8">
                    <div>
                        <CodeEditorNav preview={isMarkDown} activeTab={0} />
                        <CodeEditor
                            item={selectedItem}
                            handleChangeItemContent={handleChangeItemContent}
                        />
                        <PublicInputCheckbox
                            onChange={handleUpdatePublicSnippet}
                        />
                    </div>
                    <SnippetFiles
                        items={snippet.items}
                        selectedItemID={selectedItemID}
                        newItemID={newItemID}
                        handleChangeItemName={handleChangeItemName}
                        handleSelectItem={handleSelectItem}
                        handleAddNewItem={handleAddNewItem}
                        handleDeleteItem={handleDeleteItem}
                    />
                </div>
            </main>
        </Layout>
    );
}

interface DetailRectangle {
    value: number;
    name: string;
}

const DetailRectangle = ({ value, name }: DetailRectangle) => {
    return (
        <div className="bg-gray-200 rounded py-2 mx-2 w-24 whitespace-nowrap">
            {value === 1 ? `${value} ${name}` : `${value} ${name}s`}
        </div>
    );
};

interface PublicInputCheckbox {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const PublicInputCheckbox = ({ onChange }: PublicInputCheckbox) => {
    return (
        <div className="form-group h-12 float-left pt-2">
            <label>
                <input type="checkbox" onChange={onChange}></input>
                <span className="ml-2">make this snippet public</span>
            </label>
        </div>
    );
};

interface CodeEditorNav {
    preview: boolean;
    activeTab: number;
}

const CodeEditorNav = ({ preview, activeTab }: CodeEditorNav) => {
    return (
        <div className="flex flex-row mr-auto">
            <button className="bg-gray-300 w-28 py-3 mr-4">Editor</button>
            {preview && (
                <button className="bg-gray-300 w-28 py-3">Preview</button>
            )}
        </div>
    );
};
