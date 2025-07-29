import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const salaryCap = useState(279200000);
    const [currentYear, setCurrentYear] = useState(2025);
    const [teams, setTeams] = useState([
        "null","Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills", "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns", "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
        "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs", "Los Angelos Chargers", "Los Angelos Rams", "Las Vegas Raiders", "Miami Dolphins", "Minnisota Vikings", "New England Patriots", "New Orleans Saints",
        "New York Giants", "New York Jets", "Philadelphia Eagels", "Pittsburgh Steelers", "Seattle Seahawks", "San Francisco 49ers", "Tampa Bay Buccanners", "Tennesse Titans", "Washington Commanders"
    ]);
    const [teamsTri, setTeamsTri] = useState(["null","ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAC", "KC", "LAC", "LAR", "LV", "MIA", "MIN", "NE", "NO", "NYG", "NYJ", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WSH"]);
    return (
        <GlobalContext.Provider value={{
            currentYear,
            teams,
            teamsTri
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;