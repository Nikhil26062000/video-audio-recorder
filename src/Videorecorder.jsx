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
//     // Cleanup videoSrc URL on component unmount or when videoSrc changes
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
//     if (!webcamRef.current) return;

//     setIsRecording(true);
//     setRecordingTime(0);
//     const stream = webcamRef.current.stream;

//     const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

//     newMediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => prev.concat(event.data));
//       }
//     };

//     newMediaRecorder.onstop = () => {
//       console.log('Recording stopped.');
//       console.log('Recorded chunks:', recordedChunks);
//       if (recordedChunks.length > 0) {
//         const blob = new Blob(recordedChunks, { type: 'video/webm' });
//         const blobUrl = URL.createObjectURL(blob);
//         console.log('Blob URL:', blobUrl);
//         setVideoSrc(blobUrl);
//         setRecordedChunks([]); // Clear recorded chunks after setting videoSrc
//       }
//       setIsRecording(false);
//       clearInterval(timerInterval);
//     };

//     newMediaRecorder.start();
//     setMediaRecorder(newMediaRecorder);
//     startTimer();
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorder && isRecording) {
//       mediaRecorder.stop();
//       setMediaRecorder(null); // Set mediaRecorder to null after stopping
//     }
//   };

//   const handleToggleCamera = () => {
//     setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
//   };

//   const handleClosePopup = () => {
//     if (videoSrc) {
//       URL.revokeObjectURL(videoSrc); // Revoke blob URL to free up memory
//     }
//     setVideoSrc(null); // Close the popup
//     setIsCameraOpen(true); // Reopen the camera
//   };

//   const startTimer = () => {
//     const interval = setInterval(() => {
//       setRecordingTime((prevTime) => prevTime + 1);
//     }, 1000);
//     setTimerInterval(interval);
//   };

//   useEffect(() => {
//     return () => clearInterval(timerInterval); // Clean up the timer on component unmount
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
//             audio={false} // Ensure audio is disabled
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
//     if (!webcamRef.current || !webcamRef.current.stream) return;

//     setIsRecording(true);
//     setRecordingTime(0);
//     const stream = webcamRef.current.stream;
//     console.log('Stream:', stream);

//     const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    
//     newMediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         console.log('Data available:', event.data);
//         setRecordedChunks((prev) => prev.concat(event.data));
//       } else {
//         console.warn('No data available');
//       }
//     };

//     newMediaRecorder.onstop = () => {
//       console.log('Recording stopped.');
//       if (recordedChunks.length > 0) {
//         const blob = new Blob(recordedChunks, { type: 'video/webm' });
//         const blobUrl = URL.createObjectURL(blob);
//         console.log('Blob URL:', blobUrl);
//         setVideoSrc(blobUrl);
//         setRecordedChunks([]); // Clear recorded chunks after setting videoSrc
//       } else {
//         console.warn('No recorded chunks to process');
//       }
//       setIsRecording(false);
//       clearInterval(timerInterval);
//     };

//     newMediaRecorder.onerror = (event) => {
//       console.error('MediaRecorder error:', event.error);
//     };

//     newMediaRecorder.start();
//     setMediaRecorder(newMediaRecorder);
//     startTimer();
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
//             audio={false} // Ensure audio is disabled
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
//     if (!webcamRef.current || !webcamRef.current.stream) return;

//     setIsRecording(true);
//     setRecordingTime(0);
//     const stream = webcamRef.current.stream;
//     console.log('Stream:', stream);

//     const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

//     newMediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         console.log('Data available:', event.data);
//         setRecordedChunks((prev) => prev.concat(event.data));
//       } else {
//         console.warn('No data available');
//       }
//     };

//     newMediaRecorder.onstop = () => {
//       console.log('Recording stopped.');
//       if (recordedChunks.length > 0) {
//         const blob = new Blob(recordedChunks, { type: 'video/webm' });
//         const blobUrl = URL.createObjectURL(blob);
//         console.log('Blob URL:', blobUrl);
//         setVideoSrc(blobUrl);
//         setRecordedChunks([]); // Clear recorded chunks after setting videoSrc
//       } else {
//         console.warn('No recorded chunks to process');
//       }
//       setIsRecording(false);
//       clearInterval(timerInterval);
//     };

//     newMediaRecorder.onerror = (event) => {
//       console.error('MediaRecorder error:', event.error);
//     };

//     newMediaRecorder.start();
//     setMediaRecorder(newMediaRecorder);
//     startTimer();
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
//     if (!webcamRef.current || !webcamRef.current.stream) return;

//     setIsRecording(true);
//     setRecordingTime(0);
//     const stream = webcamRef.current.stream;

//     // Check if the browser supports video/webm and set the MIME type
//     const mimeType = 'video/webm';
//     const newMediaRecorder = new MediaRecorder(stream, { mimeType });

//     newMediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => prev.concat(event.data));
//       }
//     };

//     newMediaRecorder.onstop = () => {
//       if (recordedChunks.length > 0) {
//         const blob = new Blob(recordedChunks, { type: mimeType });
//         const blobUrl = URL.createObjectURL(blob);
//         setVideoSrc(blobUrl);
//         setRecordedChunks([]);
//       }
//       setIsRecording(false);
//       clearInterval(timerInterval);
//     };

//     newMediaRecorder.onerror = (event) => {
//       console.error('MediaRecorder error:', event.error);
//     };

//     newMediaRecorder.start();
//     setMediaRecorder(newMediaRecorder);
//     startTimer();
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

//     setIsRecording(true);
//     setRecordingTime(0);
//     const stream = webcamRef.current.stream;
//     const mimeType = 'video/webm'; // Ensure this MIME type is supported
//     console.log('Starting MediaRecorder with MIME type:', mimeType);

//     try {
//       const newMediaRecorder = new MediaRecorder(stream, { mimeType });

//       newMediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           console.log('Data available:', event.data);
//           setRecordedChunks((prev) => prev.concat(event.data));
//         } else {
//           console.warn('No data available from MediaRecorder.');
//         }
//       };

//       newMediaRecorder.onstop = () => {
//         console.log('MediaRecorder stopped.');
//         if (recordedChunks.length > 0) {
//           const blob = new Blob(recordedChunks, { type: mimeType });
//           const blobUrl = URL.createObjectURL(blob);
//           console.log('Blob URL:', blobUrl);
//           setVideoSrc(blobUrl);
//           setRecordedChunks([]); // Clear recorded chunks after setting videoSrc
//         } else {
//           console.warn('No recorded chunks to process.');
//         }
//         setIsRecording(false);
//         clearInterval(timerInterval);
//       };

//       newMediaRecorder.onerror = (event) => {
//         console.error('MediaRecorder error:', event.error);
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
//             audio={false} // No audio while previewing
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
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleStartRecording = () => {
    if (!webcamRef.current || !webcamRef.current.stream) {
      console.error('Webcam stream is not available.');
      return;
    }

    setIsRecording(true);
    setRecordingTime(0);
    const stream = webcamRef.current.stream;
    const mimeType = 'video/webm; codecs=vp8'; // Explicitly set MIME type and codec

    if (!MediaRecorder.isTypeSupported(mimeType)) {
      console.error(`MIME type ${mimeType} is not supported.`);
      return;
    }

    console.log('Starting MediaRecorder with MIME type:', mimeType);

    try {
      const newMediaRecorder = new MediaRecorder(stream, { mimeType });

      newMediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('Data available:', event.data);
          setRecordedChunks((prev) => prev.concat(event.data));
        } else {
          console.warn('No data available from MediaRecorder.');
        }
      };

      newMediaRecorder.onstop = () => {
        console.log('MediaRecorder stopped.');
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, { type: mimeType });
          const blobUrl = URL.createObjectURL(blob);
          console.log('Blob URL:', blobUrl);
          setVideoSrc(blobUrl);
          setRecordedChunks([]); // Clear recorded chunks after setting videoSrc
        } else {
          console.warn('No recorded chunks to process.');
        }
        setIsRecording(false);
        clearInterval(timerInterval);
      };

      newMediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
      };

      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      startTimer();
    } catch (error) {
      console.error('Failed to start MediaRecorder:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  const handleToggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const handleClosePopup = () => {
    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
    }
    setVideoSrc(null);
    setIsCameraOpen(true);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  useEffect(() => {
    return () => clearInterval(timerInterval);
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
            audio={false} // No audio while previewing
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
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;


// import React, { useState, useRef } from 'react';

// const VideoRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [stream, setStream] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [recordedVideoURL, setRecordedVideoURL] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cameraFacingMode, setCameraFacingMode] = useState('environment');
//   const videoRef = useRef(null);

//   const handleStartRecording = async () => {
//     try {
//       // Request the camera stream with audio
//       const videoStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: cameraFacingMode },
//         audio: true,
//       });

//       setStream(videoStream);

//       // Set the video source to the camera stream
//       if (videoRef.current) {
//         videoRef.current.srcObject = videoStream;
//         videoRef.current.play();
//       }

//       // Create a new MediaRecorder instance
//       const recorder = new MediaRecorder(videoStream);
//       setMediaRecorder(recorder);

//       // Start recording and handle data availability
//       recorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
//         }
//       };

//       // Handle stop event to create the video URL
//       recorder.onstop = () => {
//         const blob = new Blob(recordedChunks, { type: 'video/webm' });
//         const url = URL.createObjectURL(blob);
//         setRecordedVideoURL(url);
//         setIsModalOpen(true);
//       };

//       recorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Error accessing media devices.', error);
//     }
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     setIsRecording(false);
//   };

//   const handleSwitchCamera = () => {
//     setCameraFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setRecordedVideoURL(null);
//     setRecordedChunks([]);
//   };

//   return (
//     <div className="video-recorder">
//       {!isModalOpen && (
//         <>
//           <video ref={videoRef} className="video-player" autoPlay muted playsInline></video>
//           <div className="controls">
//             <button onClick={handleSwitchCamera}>Switch Camera</button>
//             {isRecording ? (
//               <button onClick={handleStopRecording}>Stop Recording</button>
//             ) : (
//               <button onClick={handleStartRecording}>Start Recording</button>
//             )}
//           </div>
//         </>
//       )}

//       {isModalOpen && (
//         <div className="modal">
//           <video src={recordedVideoURL} controls autoPlay />
//           <button onClick={handleCloseModal}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoRecorder;
