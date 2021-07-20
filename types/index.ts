export interface IndexState {
    Users: number;
    Snippets: number;
    Challenges: number;
}

export enum ActionType {
    UPDATE_TITLE = 'UPDATE_TITLE',
    SELECT_ITEM = 'SELECT_ITEM',
    UPDATE_ITEM_NAME = 'UPDATE_ITEM_NAME',
    ADD_ITEM = 'ADD_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    UPDATE_ITEM_CONTENT = 'UPDATE_ITEM_CONTENT',
    UPDATE_SNIPPET_PUBLIC = 'UPDATE_SNIPPET_PUBLIC',
    INIT_SNIPPET = 'INIT_SNIPPET',
    UPDATE_EDITOR_MODE = 'UPDATE_EDITOR_MODE',
}

export type EditorMode = 'preview' | 'editor';
export interface EditorState {
    snippet: Snippet;
    selectedItemID: string | null;
    newItemID: string | null;
    isMarkDown: boolean;
    mode: EditorMode;
}

export interface Snippet {
    _id: string;
    title: string;
    items: Item[];
    tags: Tag[];
    public: boolean;
    user_id?: { _id: string; username: string };
}


export interface Challenge {
    _id: string;
    name: string;
	content: string
	solutions?: Snippet[]
}



export interface Tag {
    _id: string;
    id: string;
    name: string;
}
export interface Item {
	_id?: string;
    id: string;
    name: string;
    content: string;
}
export interface Action {
    type: ActionType;
    payload?: any;
}
