import { useAsyncDispatch, useDispatch, useSelector } from './react-redux';
import { ACTIONS } from './redux';
import { AsyncAction } from './redux/types';

const asyncActionTest: AsyncAction<string> =  (delay, a, lo) => async dispatch => {
    const promise = new Promise<string>(function(resolve, reject) {
        setTimeout(() => resolve("done"), delay * 2000);
    });

    promise.then(a => {
        console.log(a)
        dispatch({type: ACTIONS.INCREMENT2})
    })

    return promise
}


const Count2 = () => {
    const count2 = useSelector<number>(state => state.state2.count2 + 10)
    const dispatch = useDispatch()
    const asyncDispatch = useAsyncDispatch()

    return (
        <div>
            <span>{count2}</span>
            <button onClick={() => dispatch({type: ACTIONS.INCREMENT2})}>increment</button>
            <button onClick={() => dispatch({type: ACTIONS.DECREMENT2})}>decrement</button>
            <button onClick={() => asyncDispatch(asyncActionTest(1)) }>async action</button>
        </div>
    )
}

export default Count2