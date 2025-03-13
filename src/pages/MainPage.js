import styles from "./MainPage.module.css"
import TeamsData from "../components/TeamsData";
import PlayerActivity from "../components/PlayerActivity";
import PlayerContract from "../components/PlayerContract";

const MainPage =  () =>{
    return(
        <div className={styles.outer_border}>
            <TeamsData />
            <div className={styles.right}>
                <PlayerActivity />
                <PlayerContract />
                <PlayerActivity />
            </div>
        </div>
    );
}

export default MainPage;