import {useEffect, useState} from "react";

function TaskDoneMetrics() {
    const [tasks,setTasks] = useState([]);

    async function getTasks(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/todos" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                let groupByStatus = Object.groupBy(json, item => item.completed)
                setTasks(groupByStatus);
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }

    useEffect(() => {
        getTasks();

    }, []);

    const totalNumberOfTasks = Object.values(tasks).reduce((total, item) => total + item.length, 0);
    return (
        <div>
            <h2>
                total number of task {totalNumberOfTasks}
            </h2>
            <ol>
                {Object.entries(tasks).map(([key,value]) => {
                    return(<li key={key}>
                        {key} : {value.length} = {Math.floor((value.length / totalNumberOfTasks) * 100)} %
                    </li>)
                })}
            </ol>
        </div>
    );
}

export default TaskDoneMetrics;
