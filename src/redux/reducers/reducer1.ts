import { ACTIONS } from "..";
import { ActionType, Reducer } from "../types";


export interface State1 {
    count1: number
}

export type Payload1 = {
  count: number
}

export const initState1: State1 = {
    count1: 1
}

const reducer: Reducer<State1, ActionType<Payload1>> = (state, action) => {
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