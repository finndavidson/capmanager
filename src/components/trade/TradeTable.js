import axios from "axios";
import { useState, useEffect } from "react";
import MapList from "../list/TradeList";
import styles from "./TradeTable.module.css";

const TradeTable = () => {

    const [tradeInfo, setTradeInfo] = useState([]);

    useEffect(() => {
        const loadPlayerInfo = async () => {
            const response = await axios.get(`http://localhost:8000/api/trade/recent?limiter=3`);
            const tradeData = new Map();

            response.data.forEach(item => {

                const tradeId = item.trade_id;

                // Initialize trade if it doesn't exist
                if (!tradeData.has(tradeId)) {
                    tradeData.set(tradeId, new Map());
                }

                // Get the current trade's team map
                const currentTrade = tradeData.get(tradeId);

                if (item.item_type === "player") {
                    const team = item.team_sent;
                    const playerData = [`${item.first_name} ${item.last_name}`, item.player_id];

                    // Initialize team array if it doesn't exist
                    if (!currentTrade.has(team)) {
                        currentTrade.set(team, []);
                    }
                    currentTrade.get(team).push(playerData);

                } else {
                    const team = item.team_giving;
                    const pickData = [`${item.round_id} round pick`];

                    // Initialize team array if it doesn't exist
                    if (!currentTrade.has(team)) {
                        currentTrade.set(team, []);
                    }
                    currentTrade.get(team).push(pickData);
                }
            });
            setTradeInfo(tradeData);
        }
        loadPlayerInfo();
    }, []);
    return (
        <div className={styles.box}>
            {tradeInfo && <MapList data={tradeInfo} />}
        </div>
    )
}

export default TradeTable;