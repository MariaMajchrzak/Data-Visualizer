import {useEffect, useState} from "react";

function UserActivityMetrics() {
    const [posts,setPosts] = useState([]);
    const [users,setUsers] = useState([]);
    
    async function getPosts(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/posts" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                let grupByUserId = Object.groupBy(json,item => item.userId);
                setPosts(grupByUserId);
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }
    async function getUsers(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/users" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                setUsers(json);
                console.log(json);
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }
    
    useEffect(() => {
        getPosts();
        getUsers();

    }, []);


    return (
        <div>
            <h2> Users number of posts</h2>
            <ol>
                {Object.entries(posts).map(([key,value]) => {
                    return(
                        <li key={key}> {(users.find(user => user.id === Number(key)))?.name} : {value.length} </li>
                    )
                })}
            </ol>
        </div>
    );
}

export default UserActivityMetrics;
