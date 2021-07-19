import React, {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useReducer,
} from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { init, initialState, reducer } from '../../lib/reducer/editor';
import { SnippetFiles } from './SnippetFiles';
import { ActionType, EditorMode, Snippet } from '../../types';
// @ts-ignore
const Select = dynamic(() => import('react-select'), {
    ssr: false,
});
import { Editor } from './Editor';

const options = [
    { value: 'js', label: 'JS' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'csharp', label: 'C#' },
];

interface CodeEditor {
    snippet?: Snippet;
    handleSubmit?: (snippet: Snippet) => Promise<void | { error: string }>;
    handleDelete?: React.MouseEventHandler;
}

export const CodeEditor = ({
    snippet: _snippet,
    handleSubmit: _handleSubmit,
    handleDelete,
}: CodeEditor) => {
    const [state, dispatch] = useReducer(reducer, initialState(), init);
    const router = useRouter();

    useEffect(() => {
        if (_snippet) {
            dispatch({ type: ActionType.INIT_SNIPPET, payload: _snippet });
        }
    }, [_snippet]);

    const handleUpdatePublicSnippet: ChangeEventHandler<HTMLInputElement> = ({
        target,
    }) => {
        const { checked } = target;
        dispatch({ type: ActionType.UPDATE_SNIPPET_PUBLIC, payload: checked });
    };

    const handleSelectItem: MouseEventHandler<HTMLButtonElement> = ({
        currentTarget,
    }) => {
        const id = currentTarget.getAttribute('data-id');
        dispatch({
            type: ActionType.SELECT_ITEM,
            payload: id,
        });
    };

    const handleChangeItemName: ChangeEventHandler<HTMLInputElement> = ({
        currentTarget,
    }) => {
        const { value } = currentTarget;
        const id = currentTarget.getAttribute('data-id');
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

    const handleItemInputBlur: React.FocusEventHandler<HTMLInputElement> = ({
        currentTarget,
    }) => {
        const id = currentTarget.getAttribute('data-id');
        if (currentTarget.value === '') {
            if (snippet.items.length === 1) {
                dispatch({
                    type: ActionType.UPDATE_ITEM_NAME,
                    payload: { value: 'untitled.js', id },
                });
            } else {
                dispatch({ type: ActionType.DELETE_ITEM, payload: id });
            }
        }
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!_handleSubmit) return;
        try {
            await _handleSubmit(state.snippet);
        } catch (error) {
            console.error(error);
            // TODO handle error
        }
    };

    const handleUpdateEditorMode: React.MouseEventHandler<HTMLButtonElement> =
        ({ currentTarget }) => {
            const mode = currentTarget.getAttribute('data-mode');
            if (!mode) return;
            dispatch({ type: ActionType.UPDATE_EDITOR_MODE, payload: mode });
        };

    const { snippet, selectedItemID, newItemID, isMarkDown, mode } = state;
    const selectedItem = snippet.items.find(
        (item) => item.id === selectedItemID
    );
    return (
        <form
            className="flex flex-col flex-grow items-center w-full text-center"
            onSubmit={handleSubmit}
        >
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
                        // @ts-ignore
                        options={options}
                        isMulti
                        name="langs"
                        className="multi-select"
                    />
                </div>
            </div>
            <div className="flex flex-row py-16 max-w-max mx-auto bg-gray-200 h-full px-8">
                <div>
                    <CodeEditorNav
                        preview={isMarkDown}
                        mode={mode}
                        onClick={handleUpdateEditorMode}
                    />
                    <Editor
                        item={selectedItem}
                        handleChangeItemContent={handleChangeItemContent}
                        mode={mode}
                    />
                    <PublicInputCheckbox
                        onChange={handleUpdatePublicSnippet}
                        checked={snippet.public}
                    />
                </div>
                <div className="flex flex-col ml-4">
                    <ItemListHeader title="Files" onClick={handleAddNewItem} />
                    <SnippetFiles
                        items={snippet.items}
                        selectedItemID={selectedItemID}
                        newItemID={newItemID}
                        onChange={handleChangeItemName}
                        onClickItem={handleSelectItem}
                        onClickDelete={handleDeleteItem}
                        onInputBlur={handleItemInputBlur}
                    />
                    <div className="flex flex-row justify-end">
                        {handleDelete ? (
                            <SnippetButton
                                title="Delete"
                                color="red"
                                onClick={handleDelete}
                            />
                        ) : (
                            <SnippetButton
                                title="Cancel"
                                color="red"
                                onClick={() => router.back()}
                            />
                        )}
                        <SnippetButton
                            title="Save"
                            type="submit"
                            color="blue"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

interface SnippetButton {
    title: string;
    type?: 'submit' | 'button' | 'reset';
    color: 'red' | 'blue' | 'green';
    onClick?: React.MouseEventHandler;
}

const SnippetButton = ({
    title,
    type = 'button',
    color,
    onClick,
}: SnippetButton) => {
    return (
        <div className="h-12 text-right pt-2 ml-4">
            <button
                className={`px-6 py-2 bg-${color}-300 hover:bg-${color}-400`}
                type={type}
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};

interface ItemListHeader {
    title: string;
    onClick: () => void;
}

const ItemListHeader = ({ title, onClick }: ItemListHeader) => {
    return (
        <div className="w-52 flex flex-row items-end h-12 place-self-end pb-1">
            <div className="mr-auto">{title}</div>
            <button
                className="px-2 py-1 bg-blue-300 rounded hover:bg-blue-400"
                onClick={onClick}
                type="button"
            >
                New File
            </button>
        </div>
    );
};

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
    checked: boolean;
}

const PublicInputCheckbox = ({ onChange, checked }: PublicInputCheckbox) => {
    return (
        <div className="form-group h-12 float-left pt-2">
            <label>
                <input
                    type="checkbox"
                    onChange={onChange}
                    checked={checked}
                ></input>
                <span className="ml-2">make this snippet public</span>
            </label>
        </div>
    );
};

interface CodeEditorNav {
    preview: boolean;
    mode: EditorMode;
    onClick: React.MouseEventHandler;
}

const CodeEditorNav = ({ preview, mode, onClick }: CodeEditorNav) => {
    return (
        <div className="flex flex-row mr-auto">
            <button
                className={`w-28 py-3 mr-4 hover:bg-gray-300 hover:text-black font-semibold ${
                    mode === 'editor'
                        ? 'bg-gray-300'
                        : 'bg-gray-200  border-2 border-b-0 border-gray-300 text-gray-600'
                }`}
                type="button"
                data-mode="editor"
                onClick={onClick}
            >
                Editor
            </button>
            {preview && (
                <button
                    className={`w-28 py-3 hover:bg-gray-300 hover:text-black font-semibold ${
                        mode === 'preview'
                            ? 'bg-gray-300'
                            : 'bg-gray-200  border-2 border-b-0 border-gray-300 text-gray-600'
                    }`}
                    type="button"
                    data-mode="preview"
                    onClick={onClick}
                >
                    Preview
                </button>
            )}
        </div>
    );
};
