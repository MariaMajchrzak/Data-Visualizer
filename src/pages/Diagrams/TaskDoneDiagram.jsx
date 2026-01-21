import {useEffect, useState} from "react";
import {CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import styles from "../../styles/Diagrams.module.css"

function TaskDoneDiagram() {
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

    const data = Object.entries(tasks).map(([key,val]) => ({name: key === "false" ? "not done" : "done", value: val.length}));
    const renderLabel = ({name,value}) => {
        const percent = ((value / totalNumberOfTasks) * 100).toFixed(1);
        return `${percent}%`;
    }
    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.h2}>Task completion breakdown: </h2>
            <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
                <Pie
                    data={data}
                    labelLine={false}
                    fill="#8884d8"
                    label={renderLabel}
                    dataKey="value"
                >
                    {data.map(item => (
                        <Cell key={`cell-${item.name}`}  fill={item.name === "not done" ? "#061E29" : "#1D546D"} />
                    ))}
                </Pie>
                <Legend dataKey="value" align="left"/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" stroke="#061E29" />
            </PieChart>
        </div>
    );
}

export default TaskDoneDiagram;
