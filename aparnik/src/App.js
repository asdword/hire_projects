import './App.css';
import VideoPlayer from './VideoPlayer';

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'https://test.api.learnwise.io/media/20e22325-2bf5-40c7-87bd-c3de37f95644/daily.mp4',
    type: 'video/mp4'
  }]
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <VideoPlayer { ...videoJsOptions }/>
      </header>
    </div>
  );
}

export default App;
