import {useEffect, useState} from "react";
import {CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip} from "recharts";

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
                console.log(groupByStatus);
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }

    useEffect(() => {
        getTasks();

    }, []);

    const data = Object.entries(tasks).map(([key,val]) => ({name: key, value: val.length}));
    const renderLabel = ({name,value}) => {
        const percent = ((value / totalNumberOfTasks) * 100).toFixed(1);
        return `${percent}%`;
    }
    return (
        <div>
            <h2> percent of done task: </h2>
            <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
                <Pie
                    data={data}
                    labelLine={false}
                    fill="#8884d8"
                    label={renderLabel}
                    dataKey="value"
                >
                    {data.map(item => (
                        <Cell key={`cell-${item.name}`}  fill={item.name === "false" ? "red" : "green"} />
                    ))}
                </Pie>
                <Legend dataKey="value" align="left"/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
            </PieChart>
        </div>
    );
}

export default TaskDoneDiagram;
