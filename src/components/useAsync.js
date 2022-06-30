import { useEffect, useReducer } from "react";

const initialState = {
    loading: false,
    data : null,
    error : null
}

function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return{
                loading:true,
                data:null,
                error:null
            };
        case 'SUCCESS':
            return{
                loading:false,
                data:action.data,
                error:null
            }
        case 'ERROR':
            return{
                loading:false,
                data:null,
                error:action.error
            };
        default:
            return state;
    }
}

function useASync(callback, deps=[], skip=false) {
    const[state, dispatch] = useReducer(reducer, initialState)
    const fetchDate = async () => {
        dispatch({ type:"LOADING"});
        try{
           const data = await callback();
           dispatch({
            type:"SUCCESS",
            data:data
        })
        }
        catch(e){
            dispatch({
                type:"ERROR",
                error : e
            })
        }
    }
    useEffect(() => {
        if(skip) return;
        fetchDate();
        // eslint 설정을 다음줄에서 비할성화
        // eslint-disable-next-line
    },deps);
    return [state,fetchDate];
}

export default useASync;