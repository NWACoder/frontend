import { Action, EditorState, Item, Snippet } from '../../types';

const initialState: EditorState = {
    snippet: {
        _id: '0',
        title: '',
        items: [{ id: '0', name: 'untitled.js', content: '' }],
        tags: [],
        public: false,
    },
    selectedItemID: '0',
    newItemID: null,
    isMarkDown: false,
    mode: 'editor',
};

function reducer(state: EditorState, action: Action) {
    const { type, payload } = action;
    const { snippet } = state;
    switch (type) {
        case 'INIT_SNIPPET': {
            const newState = { ...state, snippet: payload as Snippet };
            const selectedItem =
                payload.items.length === 0 ? null : payload.items[0];
            if (!selectedItem) return newState;
            newState.selectedItemID = selectedItem.id;
            const extIndex = selectedItem.name.lastIndexOf('.');
            newState.isMarkDown = selectedItem.name.slice(extIndex) === '.md';
            return newState;
        }
        case 'UPDATE_TITLE': {
            return { ...state, snippet: { ...snippet, title: payload } };
        }
        case 'SELECT_ITEM': {
            const item = snippet.items.find((item) => item.id === payload);
            if (!item) return state;
            const extIndex = item.name.lastIndexOf('.');
            const isMarkDown = item.name.slice(extIndex) === '.md';
            return { ...state, selectedItemID: payload, isMarkDown };
        }
        case 'UPDATE_ITEM_NAME': {
            const { value, id } = payload;
            let isMarkDown = false;
            const items = snippet.items.map((item) => {
                if (item.id === id) {
                    item.name = value;
                    const extIndex = item.name.lastIndexOf('.');
                    isMarkDown = item.name.slice(extIndex) === '.md';
                }
                return item;
            });
            return { ...state, snippet: { ...snippet, items }, isMarkDown };
        }
        case 'UPDATE_ITEM_CONTENT': {
            const { value, id } = payload;
            const items = snippet.items.map((snippet) => {
                if (snippet.id === id) {
                    snippet.content = value;
                }
                return snippet;
            });
            return { ...state, snippet: { ...snippet, items } };
        }
        case 'ADD_ITEM': {
            const id = String(Math.floor(Math.random() * 10000000));
            const newItem: Item = { id, name: 'untitled.js', content: '' };
            const items = [...snippet.items, newItem];
            return {
                ...state,
                snippet: { ...snippet, items },
                selectedItemID: id,
                newItemID: id,
            };
        }
        case 'DELETE_ITEM': {
            const id = payload;
            if (snippet.items.length === 1) return state;
            const items = snippet.items.filter((item) => item.id !== id);
            const newSelectedID =
                items.length === 0 ? null : items[items.length - 1].id;
            const newState = {
                ...state,
                snippet: { ...snippet, items },
                selectedItemID: newSelectedID,
            };
            const item = snippet.items.find(
                (item) => item.id === newSelectedID
            );
            if (!item) return newState;
            const extIndex = item.name.lastIndexOf('.');
            newState.isMarkDown = item.name.slice(extIndex) === '.md';
            return newState;
        }
        case 'UPDATE_SNIPPET_PUBLIC': {
            return { ...state, snippet: { ...snippet, public: payload } };
        }
        case 'UPDATE_EDITOR_MODE': {
            return { ...state, mode: payload };
        }
        default:
            throw new Error();
    }
}

export { initialState, reducer };
