import styles from './App.module.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TeamPage from './pages/TeamPage';
import PlayerPage from './pages/PlayerPage';
import PlayersPage from './pages/PlayersPage';
import ToolsPage from './pages/ToolsPage';
import MockPage from './pages/MockPage';
import FAQPage from './pages/FAQPage';
import NavBar from './components/navigation/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import { Component } from 'react';
import GlobalContext from './GlobalContext';


function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/team/:teamID' element={<TeamPage key={location.pathname} />} />
      <Route path='/player/:playerId' element={<PlayerPage key={location.pathname} />} />
      <Route path='/players' element={<PlayersPage />} />
      <Route path='/tools' element={<ToolsPage />} />
      <Route path='/faq' element={<FAQPage />} />
      <Route path='/mock' element={<MockPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
class App extends Component {
  render() {
    return (
      <GlobalContext>
        <BrowserRouter>
          <div className={styles.App}>
            <NavBar />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </GlobalContext>
    );
  }
}

export default App;
