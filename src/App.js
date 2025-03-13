import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TeamPage from './pages/TeamPage';
import PlayerPage from './pages/PlayerPage';
import ToolsPage from './pages/ToolsPage';
import MockPage from './pages/MockPage';
import FAQPage from './pages/FAQPage';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';
import { Component } from 'react';

class App extends Component {
  state = {}
  render(){
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <NavBar/>
        <Routes>
            <Route path = '/' element = {<MainPage />} />
            <Route path = '/team/:teamID' element = {<TeamPage />} />
            <Route path = '/player/:playerId' element = {<PlayerPage />} />
            <Route path = '/tools' element = {<ToolsPage />} />
            <Route path = '/faq' element = {<FAQPage />} />
            <Route path = '/mock' element = {<MockPage />} />
            <Route path = "*" element = {<NotFoundPage />} />
        </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
