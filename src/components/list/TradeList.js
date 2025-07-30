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
                        <div  key={`${tradeId}-${teamIndex}`}>
                            <div>
                                {assets.map((asset, assetIndex) => (
                                    <div 
                                        className={styles.trade_box} 
                                        key={`${tradeId}-${team}-${assetIndex}`}
                                    >
                                        <img className={styles.teamimg} src={`./images/teams/${teamsTri[team]}.png`}/>{asset[0]}
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