import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Common/Layout';
import { Item, Snippet } from '../../types';
import {
    createItem,
    deleteItem,
    fetchSnippet,
    updateItem,
    updateSnippet,
} from '../../api/user/editor';
import { CodeEditor } from '../../components/CodeEditor';
import { useRouter } from 'next/router';

export default function EditSnippet() {
    const [_snippet, setSnippet] = useState<Snippet | undefined>(undefined);
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

    return (
        <Layout protectedRoute={true}>
            <CodeEditor handleSubmit={handleSubmit} snippet={_snippet} />
        </Layout>
    );
}
