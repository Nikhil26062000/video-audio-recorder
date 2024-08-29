import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';


const VideoRecorder = () => {
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoSrc, setVideoSrc] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0); // Reset timer

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
      clearInterval(timerInterval); // Stop timer
    };

    mediaRecorder.start();
    startTimer(); // Start timer
  };

  const handleStopRecording = () => {
    const stream = webcamRef.current.stream;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    setIsRecording(false);
  };

  const handleToggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  useEffect(() => {
    return () => clearInterval(timerInterval); // Clean up the timer on component unmount
  }, [timerInterval]);

  return (
    <div className="video-recorder-container">
      {!isCameraOpen ? (
        <button className="start-button" onClick={handleOpenCamera}>
          Click to Record Video
        </button>
      ) : (
        <div className="camera-container">
          <Webcam
            audio={true}
            ref={webcamRef}
            screenshotFormat="image/webm"
            videoConstraints={{ facingMode }}
            className="webcam-view"
          />

          <div className="controls">
            <button className="switch-button" onClick={handleToggleCamera}>
              Switch Camera
            </button>

            {!isRecording ? (
              <button className="record-button" onClick={handleStartRecording}>
                Start Recording
              </button>
            ) : (
              <button className="stop-button" onClick={handleStopRecording}>
                Stop Recording
              </button>
            )}
          </div>

          {isRecording && <div className="timer">Recording: {recordingTime}s</div>}
        </div>
      )}

      {videoSrc && (
        <div className="popup">
          <div className="popup-content">
            <video src={videoSrc} controls autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
