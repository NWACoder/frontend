import React, { ChangeEvent, useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { Item } from '../../types';

interface SnippetFiles {
    items: Item[];
    newItemID: string | null;
    selectedItemID: string | null;
    handleChangeItemName: React.EventHandler<ChangeEvent>;
    handleSelectItem: (id: string) => void;
    handleAddNewItem: () => void;
    handleDeleteItem: React.MouseEventHandler;
}

export const SnippetFiles = ({
    items = [],
    newItemID,
    selectedItemID,
    handleChangeItemName,
    handleSelectItem,
    handleAddNewItem,
    handleDeleteItem,
}: SnippetFiles) => {
    return (
        <div className="flex flex-col ml-4">
            <div className="w-52 flex flex-row items-end h-12 place-self-end pb-1">
                <div className="mr-auto">Files</div>
                <button
                    className="px-2 py-1 bg-blue-300 rounded hover:bg-blue-400"
                    onClick={handleAddNewItem}
                >
                    New File
                </button>
            </div>

            <div className="border-2 border-gray-300 w-52 bg-white p-2 flex-1">
                {items.map((item) => (
                    <EditableItem
                        item={item}
                        key={item.id}
                        newItemID={newItemID}
                        selected={item.id === selectedItemID}
                        onClick={() => handleSelectItem(item.id)}
                        onChange={handleChangeItemName}
                        handleDeleteItem={handleDeleteItem}
                    />
                ))}
            </div>
            <div className="h-12 text-right pt-2">
                <button className="px-6 py-2 bg-red-300 hover:bg-red-400">
                    Create
                </button>
            </div>
        </div>
    );
};

interface EditableItem {
    item: Item;
    selected: boolean;
    newItemID: string | null;
    onClick: () => void;
    onChange: React.EventHandler<ChangeEvent>;
    handleDeleteItem: React.MouseEventHandler;
}

const EditableItem = ({
    item,
    newItemID,
    selected,
    onClick,
    onChange,
    handleDeleteItem,
}: EditableItem) => {
    const isNew = newItemID === item.id;
    const [isEditable, setIsEditable] = useState(isNew);
    return (
        <div onDoubleClick={() => setIsEditable(true)}>
            {isEditable ? (
                <ItemInput
                    item={item}
                    isNew={isNew}
                    onBlur={() => setIsEditable(false)}
                    onChange={onChange}
                />
            ) : (
                <ItemButton
                    item={item}
                    onClick={onClick}
                    selected={selected}
                    handleDeleteItem={handleDeleteItem}
                />
            )}
        </div>
    );
};

interface ItemButton {
    item: Item;
    selected: boolean;
    onClick: () => void;
    handleDeleteItem: React.MouseEventHandler;
}

const ItemButton = ({
    item,
    selected,
    onClick,
    handleDeleteItem,
}: ItemButton) => {
    const [isHovered, setIsHovered] = useState(false);
    const { name, id } = item;
    return (
        <div
            className="flex flex-row h-8 items-center hover:bg-gray-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className={`px-2 py-1 w-full text-left ${
                    selected && 'bg-gray-200'
                }`}
                onClick={onClick}
            >
                <span className="flex-1">{name}</span>
            </button>
            {isHovered && (
                <button
                    className="h-full hover:text-red-600"
                    data-id={id}
                    onClick={handleDeleteItem}
                >
                    <TrashIcon className="h-full" />
                </button>
            )}
        </div>
    );
};

interface ItemInput {
    item: Item;
    isNew: boolean;
    onBlur: () => void;
    onChange: React.EventHandler<ChangeEvent>;
}

const ItemInput = ({ item, isNew, onBlur, onChange }: ItemInput) => {
    const { name, id } = item;
    const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = ({
        key,
    }) => {
        if (key === 'Enter') {
            onBlur();
        }
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isNew) e.currentTarget.select();
    };

    return (
        <input
            autoFocus
            value={name}
            onBlur={onBlur}
            onFocus={handleOnFocus}
            onKeyUp={handleEnterKey}
            onChange={onChange}
            data-id={id}
        />
    );
};
