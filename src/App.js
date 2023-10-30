import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate  } from 'react-router-dom';
import tabs from './tabs.json';
import LazyComponent from './components/LazyComponent';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const sortedTabs = tabs.slice().sort((a, b) => a.order - b.order);

  const getActiveTab = () => {
    // debugger;
    // const pathSegments = location.pathname.split('/');
    // if (pathSegments.length === 2) {
      // const targetTabId = pathSegments[2];
      return sortedTabs.find((tab) => location.pathname.includes(tab.id)) || null;
    // }
    // return null;
  };


  useEffect(() => {
  
    const activeTab = getActiveTab();

    if (!activeTab) {
      navigate(`/${sortedTabs[0].id}`);
    }
  }, []);

  return (
    <div className="App">
      <nav>
        <ul className='links'>
          {sortedTabs.map((tab) => (
            <li key={tab.id}>
              <Link
                to={`/${tab.id}`}
                className={location.pathname === `/${tab.id}` ? 'active-tab' : ''}
              >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        {/* {sortedTabs.map((tab) => ( */}
        <Route path="/" element={<LazyComponent path="tabs/dummyList" />} >
          <Route index element={<LazyComponent path="tabs/dummyList" />} />
          <Route path="dummyList" element={<LazyComponent path="tabs/dummyList" />} />
          <Route path="dummyChart" element={<LazyComponent path="tabs/dummyChart" />} />
          <Route path="*" element={<Navigate to="/dummyList" replace />} />
</Route>
        {/* ))} */}
      </Routes>
    </div>
  );
}

export default App;