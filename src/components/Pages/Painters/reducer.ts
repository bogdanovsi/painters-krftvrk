import { Reducer } from "redux";

export enum Types {
    FLUSH_STATE = 'FLUSH_STATE',
    FETCH_PAINTERS = 'FETCH_PAINTERS'
}

export interface IFlushStateAction {
    type: Types.FLUSH_STATE;
}

export interface IFetchDataAction {
    type: Types.FETCH_PAINTERS;
    data: Array<any>;
}

export const flushState = (): IFlushStateAction => {
    return {
        type: Types.FLUSH_STATE
    };
};

type ActionTypes =
    | IFlushStateAction
    | IFetchDataAction

interface Painters { }

interface IPaintersState {
    data: Array<Painters>;
    errMessage: string | null;
    isLoading: boolean;
}

const initialState: IPaintersState = {
    data: [],
    errMessage: null,
    isLoading: true,
};

const reducer = (
    state: IPaintersState = initialState,
    action: ActionTypes
): IPaintersState => {
    switch (action.type) {
        case Types.FLUSH_STATE:
            return {
                ...initialState,
            };
        case Types.FETCH_PAINTERS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
};

export default reducer;