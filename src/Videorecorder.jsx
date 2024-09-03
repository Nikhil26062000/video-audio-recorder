// import React, { useState, useRef } from 'react';

// const RecordView = () => {
//   const [status, setStatus] = useState('Idle');
//   const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const videoRef = useRef(null);
//   const chunksRef = useRef([]);

//   const handleStartRecording = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         const options = { mimeType: 'video/webm; codecs=vp8' };

//         mediaRecorderRef.current = new MediaRecorder(stream, options);

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             chunksRef.current.push(event.data);
//           }
//         };

//         mediaRecorderRef.current.onstop = () => {
//           const blob = new Blob(chunksRef.current, { type: 'video/webm' });
//           const url = URL.createObjectURL(blob);
//           setMediaBlobUrl(url);
//           chunksRef.current = [];
//           stream.getTracks().forEach((track) => track.stop());
//         };

//         mediaRecorderRef.current.start();
//         setStatus('Recording...');
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices.', error);
//         setStatus('Failed to access media devices');
//       });
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setStatus('Stopped');
//     }
//   };

//   return (
//     <div>
//       <p>{status}</p>
//       <button onClick={handleStartRecording}>Start Recording</button>
//       <button onClick={handleStopRecording}>Stop Recording</button>
//       <div>
//         <video ref={videoRef} autoPlay muted />
//         {mediaBlobUrl && (
//           <video src={mediaBlobUrl} controls autoPlay loop />
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecordView;

// import React, { useState, useRef } from 'react';

// const RecordView = () => {
//   const [status, setStatus] = useState('Ready to Record');
//   const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const videoRef = useRef(null);
//   const chunksRef = useRef([]);

//   const handleStartRecording = () => {
//     if (isRecording) return; // Prevent starting a new recording if already recording

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();

//         const options = { mimeType: 'video/webm; codecs=vp8' };
//         mediaRecorderRef.current = new MediaRecorder(stream, options);

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             chunksRef.current.push(event.data);
//           }
//         };

//         mediaRecorderRef.current.onstop = () => {
//           const blob = new Blob(chunksRef.current, { type: 'video/webm' });
//           const url = URL.createObjectURL(blob);
//           setMediaBlobUrl(url);
//           chunksRef.current = [];
//           setIsRecording(false);
//           setIsPopupOpen(true);
//           // Stop all video tracks
//           stream.getTracks().forEach((track) => track.stop());
//         };

//         mediaRecorderRef.current.start();
//         setStatus('Recording...');
//         setIsRecording(true);
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices.', error);
//         setStatus('Failed to access media devices');
//       });
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//     }
//   };

//   const handleClosePopup = () => {
//     if (mediaBlobUrl) {
//       URL.revokeObjectURL(mediaBlobUrl);
//     }
//     setMediaBlobUrl(null);
//     setIsPopupOpen(false);
//     setStatus('Ready to Record');
//   };

//   return (
//     <div>
//       {!isPopupOpen ? (
//         <div>
//           {isRecording ? (
//             <button onClick={handleStopRecording}>Stop Recording</button>
//           ) : (
//             <button onClick={handleStartRecording}>Click to Start Recording testing</button>
//           )}
//           <div>
//             <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
//           </div>
//         </div>
//       ) : (
//         <div className="popup">
//           <div className="popup-content">
//             <video src={mediaBlobUrl} controls autoPlay />
//             <button className="close-button" onClick={handleClosePopup}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       <style jsx>{`
//         .popup {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .popup-content {
//           background: white;
//           padding: 20px;
//           border-radius: 8px;
//           text-align: center;
//         }
//         .close-button {
//           margin-top: 10px;
//           background-color: #007bff;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .close-button:hover {
//           background-color: #0056b3;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RecordView;



















// import React, { useState, useRef, useEffect } from "react";
// import { CameraAlt, Stop, SwitchCamera } from "@mui/icons-material"; // Import icons from Material UI

// const RecordView = () => {
//   const [status, setStatus] = useState("Ready to Record");
//   const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [facingMode, setFacingMode] = useState("user"); // 'user' for front, 'environment' for back
//   const [isCameraOpen, setIsCameraOpen] = useState(false); // State to manage camera preview
//   const mediaRecorderRef = useRef(null);
//   const videoRef = useRef(null);
//   const chunksRef = useRef([]);
//   const streamRef = useRef(null); // To hold the stream for switching cameras

//   useEffect(() => {
//     return () => {
//       // Clean up the stream when the component unmounts
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleStartCamera = () => {
//     if (isCameraOpen) return; // Prevent starting the camera again if already open
//     setIsCameraOpen(true);

//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode }, audio: false })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//           setIsCameraOpen(true);
//           streamRef.current = stream; // Save the stream for later use
//         }
//       })
//       .catch((error) => {
//         console.error("Error accessing media devices.", error);
//         setStatus("Failed to access media devices");
//       });
//   };

//   const handleStartRecording = () => {
//     if (isRecording) return; // Prevent starting a new recording if already recording

//     if (!isCameraOpen) {
//       handleStartCamera(); // Ensure the camera is open before starting recording
//     }

//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode }, audio: true })
//       .then((stream) => {
//         if (!videoRef.current) {
//           throw new Error("Video element not found");
//         }

//         const options = { mimeType: "video/webm; codecs=vp8" };
//         mediaRecorderRef.current = new MediaRecorder(stream, options);

//         mediaRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             chunksRef.current.push(event.data);
//           }
//         };

//         mediaRecorderRef.current.onstop = () => {
//           const blob = new Blob(chunksRef.current, { type: "video/webm" });
//           const url = URL.createObjectURL(blob);
//           setMediaBlobUrl(url);
//           chunksRef.current = [];
//           setIsRecording(false);
//           setIsPopupOpen(true);
//           // Stop all video tracks
//           stream.getTracks().forEach((track) => track.stop());
//         };

//         mediaRecorderRef.current.start();
//         setStatus("Recording...");
//         setIsRecording(true);
//       })
//       .catch((error) => {
//         console.error("Error accessing media devices.", error);
//         setStatus("Failed to access media devices");
//       });
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//     }
//   };

//   const handleSwitchCamera = () => {
//     setFacingMode((prevFacingMode) =>
//       prevFacingMode === "user" ? "environment" : "user"
//     );
//     if (isRecording) {
//       // Restart recording with the new camera facing mode
//       handleStopRecording();
//       handleStartRecording();
//     } else {
//       // Restart the camera preview with the new facing mode
//       handleStartCamera();
//     }
//   };

//   const handleClosePopup = () => {
//     if (mediaBlobUrl) {
//       URL.revokeObjectURL(mediaBlobUrl);
//     }
//     setMediaBlobUrl(null);
//     setIsPopupOpen(false);
//     setStatus("Ready to Record");
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null; // Clear the reference
//     }
//     setIsCameraOpen(false); // Close the camera when the popup is closed
//   };

//   useEffect(() => {
//     if (isCameraOpen) {
//       // Restart the video stream with the new facing mode
//       navigator.mediaDevices
//         .getUserMedia({ video: { facingMode }, audio: false })
//         .then((stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             streamRef.current.getTracks().forEach((track) => track.stop());
//             streamRef.current = stream;
//           }
//         });
//     }
//   }, [facingMode]);

//   return (
//     <div style={{ textAlign: "center" }}>
//       {!isPopupOpen ? (
//         <div>
//           {isCameraOpen ? (
//             <div className="relative">
//               <div>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   muted
//                   style={{ width: "100%", height: "100vh", objectFit: "cover" }}
//                 />
//               </div>
//               <div className="w-full absolute bottom-[20%] flex justify-center">
//                 {isRecording ? (
//                   <div className="flex w-full justify-center gap-10">
//                     {/* Use icon for stopping the recording */}
//                     <button
//                       onClick={handleStopRecording}
//                       className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
//                     >
//                       <Stop fontSize="medium" />
//                     </button>
//                     {/* Use icon for switching the camera */}
//                     <button
//                       onClick={handleSwitchCamera}
//                       className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
//                     >
//                       <SwitchCamera fontSize="medium" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col gap-2">
//                     <div className="flex z-[1000] ">
//                       <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">
//                         VIDEO
//                       </button>
//                       <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">
//                         PHOTO
//                       </button>
//                       <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">
//                         AUDIO
//                       </button>
//                     </div>
//                     <div className="flex w-full justify-center gap-5">
//                       <button
//                         onClick={handleSwitchCamera}
//                         className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
//                       >
//                         <SwitchCamera fontSize="medium" />
//                       </button>
//                       {/* Use icon for starting the recording */}
//                       <button
//                         onClick={handleStartRecording}
//                         className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
//                       >
//                         <CameraAlt fontSize="medium" />
//                       </button>
//                       {/* Use icon for switching the camera */}
//                       <button
//                         onClick={handleSwitchCamera}
//                         className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
//                       >
//                         <SwitchCamera fontSize="medium" />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={handleStartCamera}
//               className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
//             >
//               <CameraAlt fontSize="medium" />
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="popup">
//           <div className="popup-content">
//             <video
//               src={mediaBlobUrl}
//               controls
//               autoPlay
//               className="recorded-video"
//             />
//             <button className="close-button" onClick={handleClosePopup}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecordView;


















import React, { useState, useRef, useEffect } from "react";
import { CameraAlt, Stop, SwitchCamera } from "@mui/icons-material"; // Import icons from Material UI

const RecordView = () => {
  const [status, setStatus] = useState("Ready to Record");
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front, 'environment' for back
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to manage camera preview
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null); // To hold the stream for switching cameras

  useEffect(() => {
    // Automatically open the camera when the component mounts
    handleStartCamera();

    return () => {
      // Clean up the stream when the component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOpen]);

  const handleStartCamera = () => {
    if (isCameraOpen) return; // Prevent starting the camera again if already open
    setIsCameraOpen(true);

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode }, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraOpen(true);
          streamRef.current = stream; // Save the stream for later use
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        setStatus("Failed to access media devices");
      });
  };

  const handleStartRecording = () => {
    if (isRecording) return; // Prevent starting a new recording if already recording

    if (!isCameraOpen) {
      handleStartCamera(); // Ensure the camera is open before starting recording
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode }, audio: true })
      .then((stream) => {
        if (!videoRef.current) {
          throw new Error("Video element not found");
        }

        const options = { mimeType: "video/webm; codecs=vp8" };
        mediaRecorderRef.current = new MediaRecorder(stream, options);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setMediaBlobUrl(url);
          chunksRef.current = [];
          setIsRecording(false);
          setIsPopupOpen(true);
          // Stop all video tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setStatus("Recording...");
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        setStatus("Failed to access media devices");
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSwitchCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
    if (isRecording) {
      // Restart recording with the new camera facing mode
      handleStopRecording();
      handleStartRecording();
    } else {
      // Restart the camera preview with the new facing mode
      handleStartCamera();
    }
  };

  const handleClosePopup = () => {
    if (mediaBlobUrl) {
      URL.revokeObjectURL(mediaBlobUrl);
    }
    setMediaBlobUrl(null);
    setIsPopupOpen(false);
    setStatus("Ready to Record");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null; // Clear the reference
    }
    setIsCameraOpen(false); // Close the camera when the popup is closed
  };

  useEffect(() => {
    if (isCameraOpen) {
      // Restart the video stream with the new facing mode
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode }, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = stream;
          }
        });
    }
  }, [facingMode]);

  return (
    <div style={{ textAlign: "center" }}>
      {!isPopupOpen ? (
        <div>
          {isCameraOpen ? (
            <div className="relative">
              <div>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  style={{ width: "100%", height: "100vh", objectFit: "cover" }}
                />
              </div>
              <div className="w-full absolute bottom-[20%] flex justify-center">
                {isRecording ? (
                  <div className="flex w-full justify-center gap-10">
                    {/* Use icon for stopping the recording */}
                    <button
                      onClick={handleStopRecording}
                      className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
                    >
                      <Stop fontSize="medium" />
                    </button>
                    {/* Use icon for switching the camera */}
                    <button
                      onClick={handleSwitchCamera}
                      className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
                    >
                      <SwitchCamera fontSize="medium" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 ">
                    <div className="flex z-[1000] ">
                     
                      <button className="text-white !bg-transparent font-inter font-[500] text-[16px] leading-[19.36px]">
                        PHOTO
                      </button>
                      <button className="text-white underline !bg-transparent font-inter font-[500] text-[16px] leading-[19.36px]">
                        VIDEO
                      </button>
                      <button className="text-white !bg-transparent font-inter font-[500] text-[16px] leading-[19.36px]">
                        AUDIO
                      </button>
                    </div>
                    <div className="flex w-full justify-center gap-5">
                      <button
                        onClick={handleSwitchCamera}
                        className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
                      >
                        <SwitchCamera fontSize="medium" />
                      </button>
                      {/* Use icon for starting the recording */}
                      <button
                        onClick={handleStartRecording}
                        className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
                      >
                        <CameraAlt fontSize="medium" />
                      </button>
                      {/* Use icon for switching the camera */}
                      <button
                        onClick={handleSwitchCamera}
                        className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
                      >
                        <SwitchCamera fontSize="medium" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartCamera}
              className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
            >
              <CameraAlt fontSize="medium" />
            </button>
          )}
        </div>
      ) : (
        <div className="popup">
          <div className="popup-content">
            <video
              src={mediaBlobUrl}
              controls
              autoPlay
              className="recorded-video"
            />
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordView;
