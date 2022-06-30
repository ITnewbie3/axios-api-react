import axios from 'axios';
import React, { useState } from 'react';
import useASync from './useAsync';
import User from './User';


async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
}

const UserCustomHook = () => {
    const [userId, setUserId] = useState(null);
    const [state, refetch] = useASync(getUsers,[],true);
    const { loading, data, error } = state;
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러발생 </div>
    if(!data) return <button onClick={refetch}>불러오기</button>
    return (
        <div>
                        <ul>
                {data.map(user => (
                    <li key={user.id} onClick={() => 
                            setUserId(user.id)}>
                        {user.userId} ({user.title})
                    </li> // 받아온 값들을 넣어준다.
                    )
                    )}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <User id={userId}/> }
        </div>
            );
};

export default UserCustomHook;