import { ACTIONS } from "../action";
import { ActionType, Reducer } from "../types";


export interface State2 {
    count2: number
}

export const initState2: State2 = {
    count2: 70
}

const reducer: Reducer<State2, ActionType> = (state, action) => {
    console.log('reducer2', action, state)
    switch (action.type) {
        case ACTIONS.INCREMENT2:
          return {...state, count2: state.count2 + 1};
        case ACTIONS.DECREMENT2:
          return {...state, count2: state.count2 - 1};
        default:
          return {...state}
    }
}

export default reducer