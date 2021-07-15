import React, { ChangeEvent, useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { Item } from '../../types';

interface SnippetFiles {
    items: Item[];
    newItemID: string | null;
    selectedItemID: string | null;
    onChange: React.ChangeEventHandler;
    onClickItem: React.MouseEventHandler;
    onClickDelete: React.MouseEventHandler;
    onInputBlur: React.FocusEventHandler;
}

export const SnippetFiles = ({
    items = [],
    newItemID,
    selectedItemID,
    onChange,
    onClickItem,
    onClickDelete,
    onInputBlur,
}: SnippetFiles) => {
    return (
        <div className="border-2 border-gray-300 w-52 bg-white p-2 flex-1">
            {items.map((item) => (
                <EditableItem
                    item={item}
                    key={item.id}
                    newItemID={newItemID}
                    selected={item.id === selectedItemID}
                    onClick={onClickItem}
                    onChange={onChange}
                    onClickDelete={onClickDelete}
                    onInputBlur={onInputBlur}
                />
            ))}
        </div>
    );
};

interface EditableItem {
    item: Item;
    selected: boolean;
    newItemID: string | null;
    onClick: React.MouseEventHandler;
    onChange: React.EventHandler<ChangeEvent>;
    onClickDelete: React.MouseEventHandler;
    onInputBlur: React.FocusEventHandler;
}

const EditableItem = ({
    item,
    newItemID,
    selected,
    onClick,
    onChange,
    onClickDelete,
    onInputBlur,
}: EditableItem) => {
    const isNew = newItemID === item.id;
    const [isEditable, setIsEditable] = useState(isNew);
    const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        setIsEditable(false);
        onInputBlur(e);
    };
    const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
        e
    ) => {
        const { key } = e;
        if (key === 'Enter') {
            e.preventDefault();
            setIsEditable(false);
        }
    };

    return (
        <div onDoubleClick={() => setIsEditable(true)}>
            {isEditable ? (
                <ItemInput
                    item={item}
                    isNew={isNew}
                    onBlur={handleOnBlur}
                    onChange={onChange}
                    onKeyDown={handleOnKeyDown}
                />
            ) : (
                <ItemButton
                    item={item}
                    onClick={onClick}
                    selected={selected}
                    onClickDelete={onClickDelete}
                />
            )}
        </div>
    );
};

interface ItemButton {
    item: Item;
    selected: boolean;
    onClick: React.MouseEventHandler;
    onClickDelete: React.MouseEventHandler;
}

const ItemButton = ({ item, selected, onClick, onClickDelete }: ItemButton) => {
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
                type="button"
                onClick={onClick}
                data-id={id}
            >
                <span className="flex-1">{name}</span>
            </button>
            {isHovered && (
                <button
                    className="h-full hover:text-red-600 p-1"
                    data-id={id}
                    onClick={onClickDelete}
                    type="button"
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
    onBlur: React.FocusEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    onChange: React.EventHandler<ChangeEvent>;
}

const ItemInput = ({ item, isNew, onBlur, onChange, onKeyDown }: ItemInput) => {
    const { name, id } = item;

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isNew) e.currentTarget.select();
    };

    return (
        <input
            autoFocus
            value={name}
            onBlur={onBlur}
            onFocus={handleOnFocus}
            onKeyDown={onKeyDown}
            onChange={onChange}
            data-id={id}
        />
    );
};
