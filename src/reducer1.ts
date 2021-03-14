import { ActionType, RootState } from "./MyReduxType";
import { ACTIONS } from "./redux";

export interface State1 {
    count1: number
}

export const initState1: State1 = {
    count1: 1
}

const reducer = (state: RootState, action: ActionType) => {
    console.log('reducer1', action, state)
    switch (action.type) {
        case ACTIONS.INCREMENT:
          return {...state, state1: {...state.state1, count1: state.state1.count1 + 1}};
        case ACTIONS.DECREMENT:
          return {...state, state1: {...state.state1, count1: state.state1.count1 - 1}};
        default:
          return {...state}
      }
}

export default reducer