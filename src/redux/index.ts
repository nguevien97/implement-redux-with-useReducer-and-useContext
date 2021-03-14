import { ActionType, CombineReducersObject, RootState } from "./type"


export const ACTIONS = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    INCREMENT2: 'INCREMENT2',
    DECREMENT2: 'DECREMENT2'
}

/**
 * Turns an object whose values are different reducer functions, into a single reducer function. It will call every child reducer, and gather their results into a single state object, whose keys correspond to the keys of the passed reducer functions.
 * @param reducers - An object whose values correspond to different reducer functions that need to be combined into one. One handy way to obtain it is to use ES6 import * as reducers syntax. The reducers may never return undefined for any action. Instead, they should return their initial state if the state passed to them was undefined, and the current state for any unrecognized action.
 * @returns A reducer function that invokes every reducer inside the passed object, and builds a state object with the same shape.
 */
export const combineReducers = (combineReducersObject: CombineReducersObject) => (state: RootState, action: ActionType) => {
    let newState: RootState = state
    for (let property in combineReducersObject) {
        const newStatePart = combineReducersObject[property](newState, action)
        newState = newStatePart
    }
    return newState
}