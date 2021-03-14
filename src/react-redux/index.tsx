import React, { Dispatch, FC, useContext, useMemo, useReducer } from "react";
import { ActionType, AsyncActionCallType, Reducer, RootState, Selector } from "../MyReduxType";
import reducer1, { initState1 } from "../reducer1";
import reducer2, { initState2 } from "../reducer2";
import { combineReducers } from "../redux";

const initRootState: RootState = {
    state1: initState1,
    state2: initState2
}

const StateContext = React.createContext(initRootState);

const DispatchContext = React.createContext<Dispatch<ActionType>>(() => {})

const AsyncDispatchContext = React.createContext<(<T>(actionCall: AsyncActionCallType<T>) => Promise<T>)>(() => new Promise(() => {}))

export const useSelector : <T>(selector: Selector<T>) => T = selector => selector(useContext(StateContext))

export const useDispatch = () => useContext(DispatchContext)

export const useAsyncDispatch: <T>() => (actionCall: AsyncActionCallType<T>) => Promise<T> = () => useContext(AsyncDispatchContext)

interface Props {

}

const wrapAsync: <T>(dispatch: Dispatch<ActionType>) => (actionCall: AsyncActionCallType<T>) => Promise<T> = dispatch => actionCall => actionCall(dispatch)


export const Provider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer<Reducer>(combineReducers({state1: reducer1, state2: reducer2}), initRootState)

    const asyncDispatch: <T>(actionCall: AsyncActionCallType<T>) => Promise<T> = useMemo(() => wrapAsync(dispatch), [dispatch])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <AsyncDispatchContext.Provider value={asyncDispatch}>
                    {children}
                </AsyncDispatchContext.Provider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
