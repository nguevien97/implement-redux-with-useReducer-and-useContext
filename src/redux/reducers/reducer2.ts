import { ACTIONS } from "..";
import { ActionType, RootState } from "../type";


export interface State2 {
    count2: number
}

export const initState2: State2 = {
    count2: 70
}

const reducer = (state: RootState, action: ActionType) => {
    console.log('reducer2', action, state)
    switch (action.type) {
        case ACTIONS.INCREMENT2:
          return {...state, state2: {...state.state2, count2: state.state2.count2 + 1}};
        case ACTIONS.DECREMENT2:
          return {...state, state2: {...state.state2, count2: state.state2.count2 - 1}};
        default:
          return {...state}
    }
}

export default reducer