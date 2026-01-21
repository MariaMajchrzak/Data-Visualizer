import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

function UserActivityDiagram() {
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
                let groupByUserId = Object.groupBy(json,item => item.userId);
                setPosts(groupByUserId);
                console.log(groupByUserId);
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
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }

    useEffect(() => {
        getPosts();
        getUsers();

    }, []);

    const data = Object.entries(posts).map(([key,val]) =>{ return {name:(users.find(user => user.id === Number(key)))?.username , value:val.length}});

    return (
        <div>
            <h2> amount of user post :</h2>
            <BarChart
                style={{ width: '100%', aspectRatio: 1.618 }}
                responsive
                data={data}
            >
                <Bar dataKey="value" fill="#8884d8" name="amount of user post" barSize={100}/>
                <XAxis dataKey="name" />
                <YAxis/>
                <Legend dataKey="value" align="left"/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
            </BarChart>
        </div>
    );
}

export default UserActivityDiagram;
