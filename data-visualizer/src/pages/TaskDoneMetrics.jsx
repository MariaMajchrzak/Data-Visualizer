import {useEffect, useState} from "react";

function TaskDoneMetrics() {
    const [data,setData] = useState([]);

    async function getData(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/todos" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                let groupByStatus = Object.groupBy(json, item => item.completed)
                setData(groupByStatus);
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }

    useEffect(() => {
        getData();

    }, []);

    const totalNumberOfTasks = Object.values(data).reduce((total, item) => total + item.length, 0);
    return (
        <div>
            <h2>
                total number of task {totalNumberOfTasks}
            </h2>
            <ol>
                {Object.entries(data).map(([key,value]) => {
                    return(<li>
                        {key} : {value.length} = {Math.floor((value.length / totalNumberOfTasks) * 100)} %
                    </li>)
                })}
            </ol>
        </div>
    );
}

export default TaskDoneMetrics;
