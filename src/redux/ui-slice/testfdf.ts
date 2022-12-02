import {
    createEntityAdapter,
    createSlice,
    configureStore,
    PayloadAction,
} from "@reduxjs/toolkit";

type Book = { bookId: string; title: string };

const booksAdapter = createEntityAdapter<Book>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
    name: "books",
    initialState: booksAdapter.getInitialState(),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
        bookAdded: booksAdapter.addOne,
        booksReceived(state, action) {
            // Or, call them as "mutating" helpers in a case reducer
            booksAdapter.setAll(state, action.payload.books);
        },
    },
});

const store = configureStore({
    reducer: {
        books: booksSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

console.log(store.getState().books);
// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
const booksSelectors = booksAdapter.getSelectors<RootState>(
    (state) => state.books
);

// And then use the selectors to retrieve values
const allBooks = booksSelectors.selectAll(store.getState());

export type EntityId = number | string;

export type Comparer<T> = (a: T, b: T) => number;

export type IdSelector<T> = (model: T) => EntityId;

export interface DictionaryNum<T> {
    [id: number]: T | undefined;
}

export interface Dictionary<T> extends DictionaryNum<T> {
    [id: string]: T | undefined;
}

export type Update<T> = { id: EntityId; changes: Partial<T> };

export interface EntityState<T> {
    ids: EntityId[];
    entities: Dictionary<T>;
}

export interface EntityDefinition<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
}

export interface EntityStateAdapter<T> {
    addOne<S extends EntityState<T>>(state: S, entity: T): S;
    addOne<S extends EntityState<T>>(state: S, action: PayloadAction<T>): S;

    addMany<S extends EntityState<T>>(state: S, entities: T[]): S;
    addMany<S extends EntityState<T>>(
        state: S,
        entities: PayloadAction<T[]>
    ): S;

    setAll<S extends EntityState<T>>(state: S, entities: T[]): S;
    setAll<S extends EntityState<T>>(state: S, entities: PayloadAction<T[]>): S;

    removeOne<S extends EntityState<T>>(state: S, key: EntityId): S;
    removeOne<S extends EntityState<T>>(
        state: S,
        key: PayloadAction<EntityId>
    ): S;

    removeMany<S extends EntityState<T>>(state: S, keys: EntityId[]): S;
    removeMany<S extends EntityState<T>>(
        state: S,
        keys: PayloadAction<EntityId[]>
    ): S;

    removeAll<S extends EntityState<T>>(state: S): S;

    updateOne<S extends EntityState<T>>(state: S, update: Update<T>): S;
    updateOne<S extends EntityState<T>>(
        state: S,
        update: PayloadAction<Update<T>>
    ): S;

    updateMany<S extends EntityState<T>>(state: S, updates: Update<T>[]): S;
    updateMany<S extends EntityState<T>>(
        state: S,
        updates: PayloadAction<Update<T>[]>
    ): S;

    upsertOne<S extends EntityState<T>>(state: S, entity: T): S;
    upsertOne<S extends EntityState<T>>(state: S, entity: PayloadAction<T>): S;

    upsertMany<S extends EntityState<T>>(state: S, entities: T[]): S;
    upsertMany<S extends EntityState<T>>(
        state: S,
        entities: PayloadAction<T[]>
    ): S;
}

export interface EntitySelectors<T, V> {
    selectIds: (state: V) => EntityId[];
    selectEntities: (state: V) => Dictionary<T>;
    selectAll: (state: V) => T[];
    selectTotal: (state: V) => number;
    selectById: (state: V, id: EntityId) => T | undefined;
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
    getInitialState(): EntityState<T>;
    getInitialState<S extends object>(state: S): EntityState<T> & S;
    getSelectors(): EntitySelectors<T, EntityState<T>>;
    getSelectors<V>(
        selectState: (state: V) => EntityState<T>
    ): EntitySelectors<T, V>;
}
