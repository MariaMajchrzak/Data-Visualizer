import {useEffect, useState} from "react";

function Statistics() {
    const [data,setData] = useState([]);

    async function getData(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/users" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                setData(json);
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <ol>
            {data.map( user => {
                return <li key={user.id}>{user.name}</li>
            })}
            </ol>
        </div>
    );
}

export default Statistics;
