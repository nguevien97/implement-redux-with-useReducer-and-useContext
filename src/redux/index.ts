import { ActionType, Reducer, RootState } from "../MyReduxType"

export const ACTIONS = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    INCREMENT2: 'INCREMENT2',
    DECREMENT2: 'DECREMENT2'
}

interface CombineReducersObject {
    [name: string]: Reducer
}

export const combineReducers = (combineReducersObject: CombineReducersObject) => (state: RootState, action: ActionType) => {
    let newState: RootState = state
    for (let property in combineReducersObject) {
        const newStatePart = combineReducersObject[property](newState, action)
        newState = newStatePart
    }
    return newState
}