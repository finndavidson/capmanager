import styles from './ItemList.module.css';
import { useGlobalContext } from "../../GlobalContext";

const TradeList = ({ data }) => {

    const {teams,teamsTri} = useGlobalContext();
    console.log(teamsTri[20]);
    return (
        <div className={styles.container}>
            <h1 className = {styles.header}>Trades</h1>
            {Array.from(data).map(([tradeId, trade]) => (
                <div className={styles.box} key={tradeId}>
                    {Array.from(trade).map(([team, assets], teamIndex) => (
                        <div key={`${tradeId}-${teamIndex}`}>
                            <img className={styles.teamimg} src={`./images/teams/${teamsTri[team]}.png`}/>
                            <h3>{teams[team]}</h3>
                            <div >
                                {assets.map((asset, assetIndex) => (
                                    <div 
                                        className={styles.defaultItem} 
                                        key={`${tradeId}-${team}-${assetIndex}`}
                                    >
                                        {asset[0]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TradeList;