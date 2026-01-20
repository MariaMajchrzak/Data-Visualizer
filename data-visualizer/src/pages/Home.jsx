import styles from  "../styles/Home.module.css"
import {Link} from "react-router-dom";
function Home() {
    return (
       <div className={styles.HomeContainer}>
           <h1 className={styles.h1}>Data Visualizer</h1>
           <main className={styles.main}>
               <section className={styles.section}>
                   <h2 className={styles.h2}>metrics</h2>
                   <Link to={"/TaskDoneMetric"}> <button className={styles.button}>Task Done</button> </Link>
                   <Link to={"/UserActivityMetrics"}> <button className={styles.button}>User Activity</button> </Link>
               </section>
               <section className={styles.section}>
                   <h2 className={styles.h2}>diagrams</h2>
                   <Link to={"/"}> <button className={styles.button}>users activity</button> </Link>
                   <Link to={"/"}> <button className={styles.button}>tasks done</button> </Link>
               </section>
           </main>
       </div>
    );
}

export default Home;
