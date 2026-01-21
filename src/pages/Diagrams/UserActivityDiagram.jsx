import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import styles from "../../styles/Diagrams.module.css"

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
        <div className={styles.pageContainer}>
            <h2 className={styles.h2}> amount of user post :</h2>
            <BarChart
                style={{ width: '90%', height : '50%' ,aspectRatio: 1.618 }}
                responsive
                data={data}
            >
                <Bar dataKey="value" fill="#1D546D" name="amount of user post" barSize={50}/>
                <XAxis dataKey="name" axisLine={{ stroke: "#061E29" }}  tickLine={{ stroke: "#061E29" }} tick={{ fill: "#061E29" }}/>
                <YAxis  axisLine={{ stroke: "#061E29" }}  tickLine={{ stroke: "#061E29" }} tick={{ fill: "#061E29" }}/>
                <Legend dataKey="value" align="left"/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" stroke="#1D546D" />
            </BarChart>
        </div>
    );
}

export default UserActivityDiagram;
