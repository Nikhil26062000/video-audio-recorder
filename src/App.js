import VideoRecorder from "./Videorecorder";
import Audio from "./Audio";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/video-audio-recorder" element={<VideoRecorder />} />
          <Route path="/audio" element={<Audio/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
