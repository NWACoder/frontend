import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Common/Layout';
import { Item, Snippet } from '../../types';
import {
    createItem,
    deleteItem,
    deleteSnippet,
    fetchSnippet,
    updateItem,
    updateSnippet,
} from '../../api/user/editor';
import { CodeEditor } from '../../components/CodeEditor';
import { useRouter } from 'next/router';

export default function EditSnippet() {
    const [_snippet, setSnippet] = useState<Snippet | undefined>(undefined);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetch = async () => {
            if (!router.isReady) return;
            if (!id || Array.isArray(id)) {
                router.replace('/');
            } else {
                const data = await fetchSnippet(id);
                if (!data) router.replace('/');
                setSnippet(data);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (snippet: Snippet) => {
        if (_snippet === undefined) {
            router.push('/user/dashboard');
            return;
        }
        const { items: _items } = _snippet;
        const { items } = snippet;
        const deleteItemIDs: string[] = [];
        const newItems: Item[] = [];
        const existingItems: Item[] = [];
        try {
            _items.forEach((_item) => {
                if (!items.find((item) => item._id === _item._id)) {
                    deleteItemIDs.push(_item.id);
                }
            });
            items.forEach((item) => {
                item._id ? existingItems.push(item) : newItems.push(item);
            });

            const deleteItems = deleteItemIDs.map((id) => deleteItem(id));
            const updateItems = existingItems.map((item) => updateItem(item));
            const createItems = newItems.map((item) => createItem(item));
            await Promise.all(deleteItems);
            const savedItems = await Promise.all([
                ...createItems,
                ...updateItems,
            ]);
            await updateSnippet({ ...snippet, items: savedItems });
            router.push('/user/dashboard');
        } catch (error) {
            throw new Error('Unable to save snippet');
        }
    };

    const handleDelete = async () => {
        if (!_snippet) return;
        await deleteSnippet(_snippet._id);
        router.push('/user/dashboard');
    };

    return (
        <Layout protectedRoute={true}>
            <CodeEditor
                handleSubmit={handleSubmit}
                handleDelete={() => setDeleteModal(true)}
                snippet={_snippet}
            />
            {deleteModal && (
                <DeleteModal
                    title="Delete Snippet?"
                    closeHandler={() => setDeleteModal(false)}
                    handleDelete={() => handleDelete()}
                />
            )}
        </Layout>
    );
}

interface DeleteModal {
    title: string;
    closeHandler: React.MouseEventHandler;
    handleDelete: React.MouseEventHandler;
}

const DeleteModal = ({ handleDelete, closeHandler, title }: DeleteModal) => {
    return (
        <div className="absolute top-0 h-full w-full z-10">
            <div className="min-h-full w-full" onClick={closeHandler} />
            <div className="fixed top-1/4 w-full mx-auto">
                <div className="relative bg-gray-50 bg-opacity-90 rounded-md max-w-md mx-auto shadow-md overflow-hidden pb-4">
                    <div className="relative py-3 mx-6 grid grid-cols-3 grid-rows-1 h-20 justify-items-center">
                        <div className="text-center text-3xl col-start-2 whitespace-nowrap">
                            {title}
                        </div>
                        <div className="ml-auto">
                            <div
                                className="w-9 h-9 hover:bg-gray-400 hover:shadow-md active:shadow-inner-md p-2 rounded cursor-pointer"
                                onClick={closeHandler}
                            >
                                <svg
                                    viewBox="0 0 329.26933 329"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 flex flex-row justify-between">
                        <button
                            className="focus:outline-none bg-red-300 hover:bg-red-400 rounded-md py-2 px-3 w-48 font-semibold"
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="focus:outline-none bg-blue-300 hover:bg-blue-400 rounded-md py-2 px-3 w-48 font-semibold"
                            type="button"
                            onClick={closeHandler}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
