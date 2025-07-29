import ArrayList from "../list/ArrayList";
import ItemList from "../list/ItemList";
import styles from "./PlayerContractCard.module.css";
import SumList from "../list/SumList";

const PlayerContractCard = (contract) => {
    let header = ["Base Salary","Guaranteed","Signing Bonus","Roster Bonus","Per Game Roster Bonus", "Workout Bonus", "Cap Hit"];
    return(
        <div className={styles.player_card}>
            <ItemList className={styles.header} data= {contract.contract} />
            <SumList list = {contract.contract}/> 
        </div>
    );
}

export default PlayerContractCard;