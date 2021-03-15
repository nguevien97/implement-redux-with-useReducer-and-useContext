import { ACTIONS } from "..";
import { ActionType } from "../types";


export interface State2 {
    count2: number
}

export const initState2: State2 = {
    count2: 70
}

const reducer: (state: State2, action: ActionType) => State2 = (state, action) => {
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