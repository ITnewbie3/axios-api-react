import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Users = () => {
    //상태관리
    //1. 요청의 결과
    //2. 로딩 상태
    //3. 에러
    const [ users, setUsers] = useState(null); // 값을 받아올 변수
    const [ loading, setLoading] = useState(false); // 로딩중과 로딩중이 아닐때 사용
    const [ error, setError] = useState(null); // 에러가날 시 에러 확인용 변수
    const fetchUsers = async () => {
        // 비동기전송시 에러체크 try는 전송한경우 catch는 에러가 발생한경우
        try { // 요청이 시작될때 error와 users를 초기화 및 로딩상태 true 변경
            setError(null);
            setUsers(null);
            setLoading(true);
            // 요청한 데이터는 reponse.data 안에 들어간다.
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUsers(response.data); // state에 값 넣기
        }
        catch(e){
            setError(e); // 에러가 난 경우에 에러만 변경
        }
        setLoading(false); // 모든 작업이 종료된 후 로딩 종료
    }
    useEffect(() => {  // 해당 내용은 1번만 출력될거기에 useEffect로 화면을 받아올때 1번만 돌리도록 한다.
        fetchUsers();
    },[])// ,[] 입력하지 않을시 계속 반복됨
    if(loading) return <div>로딩중.....</div> // true일시 로딩중을 표출
    if(error) return <div>에러가 발생했습니다.</div> // 에러가 null값이 아닐시 리턴
    if(!users) return null; // 값이 없는경우에 null을 넣어준다.
    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li> // 받아온 값들을 넣어준다.
                    )
                    )}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default Users;