import React from 'react'
import { useDispatch, useSelector, useAsyncDispatch } from './react-redux';
import { ACTIONS } from './redux/action';
import { AsyncAction } from './redux/types';

const asyncActionTest: AsyncAction<string> =  (delay, ...args) => async dispatch => {
    const promise = new Promise<string>(function(resolve, reject) {
        setTimeout(() => resolve("It's done OK"), delay * 2000);
    });

    const result = await promise;
    dispatch({type: ACTIONS.INCREMENT, payload: {count: result.length}})
    return 'Today was a good day'
}


const Count = () => {
    const count = useSelector<number>(state => state.state1.count1 + 10)
    const dispatch = useDispatch()
    const asyncDispatch = useAsyncDispatch()

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch({type: ACTIONS.INCREMENT})}>increment</button>
            <button onClick={() => dispatch({type: ACTIONS.DECREMENT})}>decrement</button>
            <button onClick={async () => {
                const result = await asyncDispatch<string>(asyncActionTest(1))
                console.log(result)
            }}>async action</button>
        </div>
    )
}

export default Count

