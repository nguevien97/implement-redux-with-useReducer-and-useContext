import React from 'react'
import { AsyncActionType } from './MyReduxType'
import { useDispatch, useSelector, useAsyncDispatch } from './react-redux';
import { ACTIONS } from './redux';

const asyncActionTest: AsyncActionType<string> =  (delay, a, lo) => async dispatch => {
    const promise = new Promise<string>(function(resolve, reject) {
        setTimeout(() => resolve("done"), delay * 2000);
    });

    promise.then(a => {
        console.log(a)
        dispatch({type: ACTIONS.INCREMENT})
    })

    return promise
}


const Count = () => {
    const count = useSelector<number>(state => state.state1.count1 + 10)
    const dispatch = useDispatch()
    const asyncDispatch = useAsyncDispatch<string>()

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch({type: ACTIONS.INCREMENT})}>increment</button>
            <button onClick={() => dispatch({type: ACTIONS.DECREMENT})}>decrement</button>
            <button onClick={() => asyncDispatch(asyncActionTest(1)) }>async action</button>
        </div>
    )
}

export default Count

