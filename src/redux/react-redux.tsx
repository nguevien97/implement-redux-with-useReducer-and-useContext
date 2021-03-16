import React, { Dispatch, FC, useContext, useEffect, useReducer, useRef } from "react";
import { initRootState, rootReducer, RootState } from "../redux";
import { PureAction, AsyncDispatch, Reducer, Selector } from "../redux/types";

const StateContext = React.createContext(initRootState);

const DispatchContext = React.createContext<Dispatch<PureAction<any>>>(() => {})

const AsyncDispatchContext = React.createContext<AsyncDispatch>(() => new Promise(() => {}))

/**
 * 
 * @param selector - A function that accept an argument and return custom value from the argument. 
 * @returns The return value of selector function with argument is root state.
 */
export const useSelector : <T>(selector: Selector<T>) => T = selector => selector(useContext(StateContext))

/**
 * 
 * @returns A function that used to dispatch a pure action.
 */
export const useDispatch = () => useContext(DispatchContext)

/**
 * 
 * @returns A function that is used to dispatch a async action.
 */
export const useAsyncDispatch: () => AsyncDispatch = () => useContext(AsyncDispatchContext)

/**
 * 
 * @param dispatch - A function that is used to dispatch a pure action.
 * @returns A function that is used to dispatch a async action.
 */
const wrapAsync: (dispatch: Dispatch<PureAction<any>>) => AsyncDispatch = dispatch => thunkAction => thunkAction(dispatch)

const wrapLogger: (dispatch: Dispatch<PureAction<any>>, stateRef: React.MutableRefObject<RootState>) => (action: PureAction<any>) => void = (dispatch, stateRef) => action => {
    console.log('')
    console.log('%c prev state: ', 'background: #222; color: grey', stateRef.current)
    console.log('%c action: ', 'background: #222; color: #0EBFE9' , action)
    dispatch(action)
}

interface Props {
    useLogger?: boolean
}

/**
 * 
 * Make context of redux available in children.
 * Children can access context of redux with useSelector, useDispatch, useAsyncDispatch
 */
export const Provider : FC<Props> = ({children, useLogger}) => {
    const [state, dispatch] = useReducer<Reducer<RootState, PureAction<any>>>(rootReducer, initRootState)
    
    const stateRef = useRef<RootState>(state)

    useEffect(() => {
        useLogger && console.log('%c next state:', 'background: #222; color: #32CD32', state)
        stateRef.current = state
    }, [state, useLogger])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={useLogger ? wrapLogger(dispatch, stateRef) : dispatch}>
                <AsyncDispatchContext.Provider value={wrapAsync(useLogger ? wrapLogger(dispatch, stateRef) : dispatch)}>
                    {children}
                </AsyncDispatchContext.Provider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
