import {useEffect, useRef, useState} from "react";

function AverageCommentsMetrics() {
    const [totalNumberOfComments,setTotalNumberOfComments] = useState(0);
    const [totalNumberOfPosts,setTotalNumberOfPosts] = useState(0);
    async function getComments(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/comments" , {method: "GET"});
            if(!response.ok){
                console.log("HTTP error : "  + response.status);
            }
            else{
                console.log(response);
                let json = await response.json();
                setTotalNumberOfComments(json.length);

                let grupByPost = Object.groupBy(json,item => item.postId)
                setTotalNumberOfPosts(Object.values(grupByPost).reduce((total, item) => total + 1, 0));
            }
        }catch(err){
            console.log("error with fetching data: ", err);
        }
    }
    useEffect(() => {
        getComments();
    }, []);


    return (
        <div>
            <h2> Average amount  of  comments</h2>

            avg : {totalNumberOfComments / totalNumberOfPosts}

        </div>
    );
}

export default AverageCommentsMetrics;
