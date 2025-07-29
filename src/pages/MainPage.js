import styles from "./MainPage.module.css"
import TeamsData from "../components/team/TeamsData";
import PlayerActivity from "../components/player/PlayerActivity";
import PlayerContract from "../components/player/PlayerContract";
import TradeTable from "../components/trade/TradeTable";

const MainPage =  () =>{
    return(
        <div className={styles.outer_border}>
            <div className={styles.left_container}>
                <TeamsData />
            </div>
            <div className={styles.right_container}>
                <PlayerActivity />
                <PlayerContract />
                <TradeTable />
            </div>
        </div>
    );
}

export default MainPage;