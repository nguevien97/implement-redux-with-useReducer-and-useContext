import { Dispatch } from "react"
import { State1 } from "./reducers/reducer1"
import { State2 } from "./reducers/reducer2"


export type RootState = {
    state1: State1,
    state2: State2
}

export type ActionType<TPayload = {}> = {
    type: string,
    payload?: TPayload
}

export type Reducer<S, Action> = (state: S, action: Action) => S

export type CombineReducersObject = {
    [K in keyof RootState]: Reducer<RootState[K], ActionType<any>>
}

export type ThunkAction<T> = (dispatch: Dispatch<ActionType>) => Promise<T> | T

export type AsyncAction<T> = (...args: any) => ThunkAction<T>

export type AsyncDispatch = <T>(thunkAction: ThunkAction<T>) => Promise<T> | T

export type Selector<T> = (state: RootState) => T

