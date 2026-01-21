import {useEffect, useState} from "react";
import styles from "../../styles/Metrics.module.css";

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
        <div className={styles.pageContainer}>
            <h2 className={styles.h2}>
                Task completion breakdown:
            </h2>
            <div>
                {Object.entries(tasks).map(([key,value]) => {
                    return(<div className={styles[`percent${key}`]}>
                        {Math.floor((value.length / totalNumberOfTasks) * 100)} %
                        <div className={styles.subtitles}> {key === 'true' ? "done" : "not done"} </div>
                    </div>)
                })}
            </div>
        </div>
    );
}

export default TaskDoneMetrics;
