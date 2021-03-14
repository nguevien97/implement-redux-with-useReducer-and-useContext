import { Dispatch } from "react"
import { State1 } from "./reducers/reducer1"
import { State2 } from "./reducers/reducer2"


export type RootState = {
    state1: State1,
    state2: State2
}

export type ActionType = {
    type: string,
    payload?: {
        count: number
    }
}

export type CombineReducersObject = {
    [name: string]: Reducer
}

export type ThunkAction<T> = (dispatch: Dispatch<ActionType>) => Promise<T> | T

export type AsyncAction<T> = (...args: any) => ThunkAction<T>

export type AsyncDispatch = <T>(thunkAction: ThunkAction<T>) => Promise<T> | T

export type Selector<T> = (state: RootState) => T

export type Reducer = (state: RootState, action: ActionType) => RootState
