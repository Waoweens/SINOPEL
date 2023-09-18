import type { CollectionReference, DocumentReference, Query } from "firebase/firestore";

export interface CollectionStore<T> {
    subscribe: (cb: (value: T | []) => void) => void | (() => void);
    ref: CollectionReference<T> | Query<T> | null;
}

export interface DocStore<T> {
    subscribe: (cb: (value: T | null) => void) => void | (() => void);
    ref: DocumentReference<T> | null;
    id: string;
}