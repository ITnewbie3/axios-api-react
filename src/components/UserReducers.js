import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

function Output({data}){
    return(
      <tr>
          <td>{data.userId}</td>
          <td>{data.id}</td>
          <td>{data.title}</td>
      </tr>
    )
  }
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

const UserReducers = () => {
    const [state, dispatch] = useReducer(reducer,initialState);
    const fetchUsers = async () => {
        dispatch({type:'LOADING'})
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            dispatch({type:'SUCCESS', data:response.data})
        }
        catch(e){
            dispatch({type:'ERROR', error:e.error})
        }
    }
    useEffect(() => {
        fetchUsers();
    },[])
    const{loading, data, error} = state;
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러발생 </div>
    if(!data) return null;
    return (
        <div>
            <table>
            <tr>
                 <th>userId</th>
                 <th>Id</th>
                  <th>title</th>
            </tr>
            {data.map(data => <Output data={data} key={data.id} />)}
            </table>
        </div>
    );
};



export default UserReducers;