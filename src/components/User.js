import axios from 'axios';
import React from 'react';
import useASync from './useAsync';

async function getUser(id) {
    const response =  await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.data;
}
const User = ({id}) => {
    const [state] = useASync(()=>getUser(id),[id]);
    const { loading, data, error } = state;
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러발생 </div>
    if(!data) return null
    
    return (
        <div>
            <h2>{data.title}</h2>
            <p>
                body : {data.body}
            </p>
        </div>
    );
};

export default User;