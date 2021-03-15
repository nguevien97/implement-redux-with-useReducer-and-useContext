import { ACTIONS } from "..";
import { ActionType } from "../types";


export interface State1 {
    count1: number
}

export const initState1: State1 = {
    count1: 1
}

const reducer: (state: State1, action: ActionType) => State1 = (state, action) => {
    console.log('reducer1', action, state)
    switch (action.type) {
        case ACTIONS.INCREMENT:
          return {...state, count1: action.payload?.count ? state.count1 + action.payload.count : state.count1 + 1}
        case ACTIONS.DECREMENT:
          return {...state, count1: state.count1 - 1};
        default:
          return {...state}
      }
}

export default reducer