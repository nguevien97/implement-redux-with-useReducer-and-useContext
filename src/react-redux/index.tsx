import React, { Dispatch, FC, useContext, useMemo, useReducer } from "react";
import { combineReducers, initRootState } from "../redux";
import reducer1 from "../redux/reducers/reducer1";
import reducer2 from "../redux/reducers/reducer2";
import { ActionType, AsyncDispatch, Reducer, RootState, Selector } from "../redux/types";

const StateContext = React.createContext(initRootState);

const DispatchContext = React.createContext<Dispatch<ActionType>>(() => {})

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

interface Props {

}

/**
 * 
 * @param dispatch - A function that is used to dispatch a pure action.
 * @returns A function that is used to dispatch a async action.
 */
const wrapAsync: (dispatch: Dispatch<ActionType>) => AsyncDispatch = dispatch => thunkAction => thunkAction(dispatch)

/**
 * 
 * Make context of redux available in children.
 * Children can access context of redux with useSelector, useDispatch, useAsyncDispatch
 */
export const Provider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer<Reducer<RootState, ActionType<any>>>(combineReducers({state1: reducer1, state2: reducer2}), initRootState)
    
    const asyncDispatch: AsyncDispatch = useMemo(() => wrapAsync(dispatch), [dispatch])

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
