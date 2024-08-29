
// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const VideoRecorder = () => {
//   const webcamRef = useRef(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [facingMode, setFacingMode] = useState('user');
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);

//   useEffect(() => {
//     return () => {
//       if (videoSrc) {
//         URL.revokeObjectURL(videoSrc);
//       }
//     };
//   }, [videoSrc]);

//   const handleOpenCamera = () => {
//     setIsCameraOpen(true);
//   };

//   const handleStartRecording = () => {
//     if (!webcamRef.current || !webcamRef.current.stream) {
//       console.error('Webcam stream is not available.');
//       return;
//     }

//     // Reset the state before starting a new recording
//     setIsRecording(true);
//     setRecordingTime(0);
//     setRecordedChunks([]);
//     const stream = webcamRef.current.stream;
//     const mimeType = 'video/webm; codecs=vp8';

//     if (!MediaRecorder.isTypeSupported(mimeType)) {
//       console.error(`MIME type ${mimeType} is not supported.`);
//       return;
//     }

//     try {
//       const newMediaRecorder = new MediaRecorder(stream, { mimeType });

//       newMediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setRecordedChunks((prev) => [...prev, event.data]); // Accumulate chunks
//         }
//       };

//       newMediaRecorder.onstop = () => {
//         console.log('MediaRecorder stopped.');
//         if (recordedChunks.length > 0) {
//           const blob = new Blob(recordedChunks, { type: mimeType });
//           const blobUrl = URL.createObjectURL(blob);
//           setVideoSrc(blobUrl); // Set the video source to the new recording
//           setRecordedChunks([]); // Clear the chunks after setting the video
//         }
//         setIsRecording(false);
//         clearInterval(timerInterval);
//       };

//       newMediaRecorder.start();
//       setMediaRecorder(newMediaRecorder);
//       startTimer();
//     } catch (error) {
//       console.error('Failed to start MediaRecorder:', error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorder && isRecording) {
//       mediaRecorder.stop();
//       setMediaRecorder(null);
//     }
//   };

//   const handleToggleCamera = () => {
//     setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
//   };

//   const handleClosePopup = () => {
//     if (videoSrc) {
//       URL.revokeObjectURL(videoSrc);
//     }
//     setVideoSrc(null);
//     setIsCameraOpen(true);
//   };

//   const startTimer = () => {
//     const interval = setInterval(() => {
//       setRecordingTime((prevTime) => prevTime + 1);
//     }, 1000);
//     setTimerInterval(interval);
//   };

//   useEffect(() => {
//     return () => clearInterval(timerInterval);
//   }, [timerInterval]);

//   return (
//     <div className="video-recorder-container">
//       {!isCameraOpen ? (
//         <button className="start-button" onClick={handleOpenCamera}>
//           Click to Record Video
//         </button>
//       ) : (
//         <div className="camera-container">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/webm"
//             videoConstraints={{ facingMode }}
//             className="webcam-view"
//           />
//           <div className="controls">
//             <button className="switch-button" onClick={handleToggleCamera}>
//               Switch Camera
//             </button>
//             {!isRecording ? (
//               <button className="record-button" onClick={handleStartRecording}>
//                 Start Recording
//               </button>
//             ) : (
//               <button className="stop-button" onClick={handleStopRecording}>
//                 Stop Recording
//               </button>
//             )}
//           </div>
//           {isRecording && <div className="timer">Recording: {recordingTime}s</div>}
//         </div>
//       )}
//       {videoSrc && (
//         <div className="popup">
//           <div className="popup-content">
//             <video src={videoSrc} controls autoPlay />
//             <button className="close-button" onClick={handleClosePopup}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoRecorder;



import React, { useState, useRef } from 'react';

const RecordView = () => {
  const [status, setStatus] = useState('Idle');
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        const options = { mimeType: 'video/webm; codecs=vp8' };

        mediaRecorderRef.current = new MediaRecorder(stream, options);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setMediaBlobUrl(url);
          chunksRef.current = [];
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setStatus('Recording...');
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
        setStatus('Failed to access media devices');
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setStatus('Stopped');
    }
  };

  return (
    <div>
      <p>{status}</p>
      <button onClick={handleStartRecording}>Start Recording</button>
      <button onClick={handleStopRecording}>Stop Recording</button>
      <div>
        <video ref={videoRef} autoPlay muted />
        {mediaBlobUrl && (
          <video src={mediaBlobUrl} controls autoPlay loop />
        )}
      </div>
    </div>
  );
};

export default RecordView;
