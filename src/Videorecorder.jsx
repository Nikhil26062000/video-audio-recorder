import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const VideoRecorder = () => {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoSrc, setVideoSrc] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera

  const handleStartRecording = () => {
    setIsRecording(true);
    const stream = webcamRef.current.stream;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      setVideoSrc(URL.createObjectURL(blob));
      setRecordedChunks([]);
      setIsRecording(false);
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    const stream = webcamRef.current.stream;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
  };

  const handleToggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  return (
    <div>
      <Webcam 
        audio={true}
        ref={webcamRef}
        screenshotFormat="image/webm"
        videoConstraints={{ facingMode }}
      />

      <button onClick={handleToggleCamera}>
        Switch Camera
      </button>

      {isRecording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}

      {videoSrc && (
        <div className="popup">
          <video src={videoSrc} controls autoPlay />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
