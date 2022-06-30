import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
//초기값, reducer함수 생성
// loading, data, error
const initialState = {
    loading: false,
    data : null,
    error : null
}
function reducer(state, action){
    switch(action.type){
        case 'LOADING': // 로딩중일시 값 변경
            return{
                loading:true,
                data:null,
                error:null
            };
        case 'SUCCESS': // 완료됐을시 action.data값을 넣어주도록 한다.
            return{
                loading:false,
                data:action.data,
                error:null
            };
        case 'ERROR':
            return{ // 에러발생시 실행하도록 한다.
                loading:false,
                data:null,
                error:action.error
            };
        default:
            return state;
    }
}
const UsersReducer = () => {
    const [ state,dispatch ] = useReducer(reducer,initialState);
    const fetchUsers = async () => { // async 문은 비동기적 처리로 바로밑에있는 LODING을 실행하면서 해당 함수의 다음내용을
                                    // 바로 진행한다. 그래서 다음함수인 if(loading) 이 거짓이 될때까지 계속 로딩중으로 표출되며,
                                    // try에서 SUCCESS가 나오면 모두 종료되고 값이 나오지만 catch에서 에러가 발생할 시 에러가 발생된채로 멈추게 된다.
        dispatch({type:'LOADING'}) // reducer의 TYPE문의 LODING이 실행됨. loading 가 true가 되서 로딩중이 표출
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')// 값을 받아온다.
            dispatch({ type : 'SUCCESS', data:response.data}) // 받아오는 값이 완료가 될 시 data에 받아온 값을 넣어준다.
        }
        catch(e){
            dispatch({
                type:'ERROR', error:e.error }) // 에러가 발생시 에러 표출
        }
    }
    useEffect(()=> { // 이 역시 화면이 로드될시 1번만 실행되도록 useEffect를 이용한다.
        fetchUsers();
    },[]);
    const { loading, data, error} = state;
    if(loading) return <div> 로딩중....</div>
    if(error) return <div>에러발생</div>
    if(!data) return null;
    return (
        <div>
             <ul>
                {data.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                    )
                    )}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default UsersReducer;