import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Output({user}){
  return(
    <tr>
        <td>{user.userId}</td>
        <td>{user.id}</td>
        <td>{user.title}</td>
    </tr>
  )
}

const Userss = () => {
    // 결과,에러,로딩 3가지변수필요
    const [users, setUsers] = useState(null);
    const [loading, setLoading ] = useState(false);
    const [ error, setError] = useState(null);
    const fetchUsers = async () => {
        try{
            setLoading(true);
            setError(null);
            setUsers(null); // 아직 값을 안받앗음..
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setUsers(response.data);
        }
        catch(e){
            setError(e);
        }
        setLoading(false);
    }
    useEffect(() =>{
        fetchUsers();
    },[])
    if(loading) return <div>로딩중....</div>
    if(error) return <div> 에러 발생 </div>
    if(!users) return null;
    return (
        <div>
              <table>
                    <tr>
                        <th>userId</th>
                        <th>Id</th>
                        <th>title</th>
                    </tr>
                  
                    {users.map(user => <Output user={user} key={user.userId} />)}
                    
                </table>  
        </div>
    );
};

export default Userss;