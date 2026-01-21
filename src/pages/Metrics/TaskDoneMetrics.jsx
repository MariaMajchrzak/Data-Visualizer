import {useEffect, useState} from "react";

function TaskDoneMetrics() {
    const [tasks,setTasks] = useState([]);
    const [totalNumberOfTasks,setTotalNumberOfTasks] = useState(0);

    async function getTasks(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/todos" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                setTotalNumberOfTasks(json.length);
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
