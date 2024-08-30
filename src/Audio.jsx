



import React, { useState, useRef, useEffect } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [status, setStatus] = useState('Ready to Record');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0); // Timer state to keep track of recording time
  const audioRecorderRef = useRef(null);
  const audioChunksRef = useRef([]); // Reference to store audio data chunks
  const timerRef = useRef(null); // Timer reference

  // Function to start the timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleStartRecording = () => {
    if (isRecording) return; // Prevent starting a new recording if already recording

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioRecorderRef.current = new MediaRecorder(stream);

        audioRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        audioRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
          audioChunksRef.current = [];
          setIsRecording(false);
          setIsPopupOpen(true);
          stopTimer(); // Stop the timer when recording stops
          // Stop all audio tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        audioRecorderRef.current.start();
        setStatus('Recording...');
        setIsRecording(true);
        setRecordingTime(0); // Reset the timer
        startTimer(); // Start the timer
      })
      .catch((error) => {
        console.error('Error accessing audio devices.', error);
        setStatus('Failed to access audio devices');
      });
  };

  const handleStopRecording = () => {
    if (audioRecorderRef.current && isRecording) {
      audioRecorderRef.current.stop();
    }
  };

  const handleClosePopup = () => {
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
    }
    setAudioBlobUrl(null);
    setIsPopupOpen(false);
    setStatus('Ready to Record');
  };

  // Format the timer to display minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {!isPopupOpen ? (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
          {isRecording ? (
            <div>
              <button
                onClick={handleStopRecording}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
              >
                Stop Recording
              </button>
              <div className="mt-4 text-xl font-bold text-gray-700">
                Recording Time: {formatTime(recordingTime)}
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartRecording}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
            >
              Open Audio Recorder
            </button>
          )}
        </div>
      ) : (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-content bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
            <audio src={audioBlobUrl} controls autoPlay className="w-full mt-4" />
            <button
              className="close-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4 shadow-md"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
