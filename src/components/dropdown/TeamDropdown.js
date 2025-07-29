import styles from "./TeamDropdown.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const getTeamInfo = async () => {
    let teamData = [];
    const response = await axios.get(`http://localhost:8000/api/team/`);
    teamData = response.data;
    return teamData;
}

const TeamDropdown = () => {
    const [teamInfo, setTeamInfo] = useState([]);
    const navigate = useNavigate();
    const divisionName = ["East", "North", "South", "West"]
    const conferenceName = ["AFC", "NFC"];

    const getTeamInfo = async () => {
        let teamData = [];
        const response = await axios.get(`http://localhost:8000/api/team/`);
        teamData = response.data;
        return teamData;
    }

    useEffect(() => {
        getTeamInfo().then((team) => {
            let AFCEast = [team[3], team[19], team[21], team[24]];
            let AFCWest = [team[9], team[15], team[16], team[18]];
            let AFCNorth = [team[2], team[6], team[7], team[26]];
            let AFCSouth = [team[12], team[13], team[14], team[30]];
            let NFCEast = [team[8], team[23], team[25], team[31]];
            let NFCWest = [team[0], team[17], team[27], team[28]];
            let NFCNorth = [team[5], team[10], team[11], team[20]];
            let NFCSouth = [team[1], team[4], team[22], team[29]];

            const divisions = [AFCEast, AFCNorth, AFCSouth, AFCWest, NFCEast, NFCNorth, NFCSouth, NFCWest];
            setTeamInfo(divisions);

        })
    }, [])
    return (
        <div className={styles.dropdown}>
            <div id={styles.item} to='/team'>Team</div>
            <ul className={styles.dropdown_content}>
                {
                    teamInfo.map((division, index) => (
                        <li className={styles.division_group}>
                            <div className={styles.division_name}>{divisionName[index % 4]}</div>
                            <ul className={styles.team_list}>
                                {
                                    division.map((team) => team && (
                                        <div>
                                            <li onClick={() => navigate(`/team/${team.team_id}`)}>
                                                <img
                                                    src={`./images/teams/${team.tri_code.toLowerCase()}.png`}
                                                    alt={team.name}
                                                />
                                                {team.name}
                                            </li>
                                        </div>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TeamDropdown;