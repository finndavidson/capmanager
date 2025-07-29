import styles from './PlayerCard.module.css';

const PlayerCard = (player) => {
    return (
        <div className={styles.player_card}>
            <div className={styles.grid_top}>
                <div className={styles.player_image}>
                    <img src={`/images/players/${player.player[0].img_link}.png`} alt={`Image Of Player`} />
                </div>
                <div className={styles.header}>
                    <h1>{player.player[0].first_name} {player.player[0].last_name}</h1>
                    <p className={styles.position}>{player.player[0].position} <span className={styles.number}>{player.player[0].number}</span></p>
                    <p className={styles.team}>{player.player[1].team}</p>
                </div>
            </div>
            <div className={styles.grid_bottom}>
                <div className={styles.left}>
                    <p><span>Age:</span> {player.player[0].age}</p>
                    <p><span>Height:</span> {player.player[0].height}</p>
                    <p><span>Weight:</span> {player.player[0].weight}</p>
                </div>
                <div className={styles.right}>
                    <p><span>Drafted:</span> Round {player.player[0].round_picked}, Pick {player.player[0].picked}</p>
                    <p><span>School:</span> {player.player[0].school}</p>
                    <p><span>Cap Hit:</span> {player.player[1].cap_hit}</p>
                </div>
            </div>
        </div>

    );
}

export default PlayerCard;