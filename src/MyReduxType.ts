import { Dispatch } from "react"
import { State1 } from "./reducer1"
import { State2 } from "./reducer2"

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

export type AsyncActionCallType<T> = (dispatch: Dispatch<ActionType>) => Promise<T>

export type AsyncActionType<T> = (...args: any) => AsyncActionCallType<T>

export type Selector<T> = (state: RootState) => T

export type Reducer = (state: RootState, action: ActionType) => RootState