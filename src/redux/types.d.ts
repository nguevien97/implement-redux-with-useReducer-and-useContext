import { Dispatch } from "react"

export type PureAction<TPayload = {}> = {
    type: string,
    payload?: TPayload
}

export type Reducer<S, Action> = (state: S, action: Action) => S

export type ThunkAction<T> = (dispatch: Dispatch<PureAction<any>>) => Promise<T> | T

export type AsyncAction<T> = (...args: any) => ThunkAction<T>

export type AsyncDispatch = <T>(thunkAction: ThunkAction<T>) => Promise<T> | T

export type Selector<T> = (state: RootState) => T

