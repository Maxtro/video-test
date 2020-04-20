import React from 'react';
import './App.css';
import VideoContainer from './Components/VideoComponent/VideoContainer';
import AnalyticsContainer from './Components/VideoAnalytics/AnalyticsContainer';

const App = () => {
  return (
    <div className="App">
      <div>
      <VideoContainer />
      </div>
      <div className='block'>
      <AnalyticsContainer />
      </div>
    </div>
  );
}

export default App;
