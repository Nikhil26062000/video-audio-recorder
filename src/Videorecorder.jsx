



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







import React, { useState, useRef } from 'react';

const RecordView = () => {
  const [status, setStatus] = useState('Ready to Record');
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);

  const handleStartRecording = () => {
    if (isRecording) return; // Prevent starting a new recording if already recording

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

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
          setIsRecording(false);
          setIsPopupOpen(true);
          // Stop all video tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setStatus('Recording...');
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
        setStatus('Failed to access media devices');
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleClosePopup = () => {
    if (mediaBlobUrl) {
      URL.revokeObjectURL(mediaBlobUrl);
    }
    setMediaBlobUrl(null);
    setIsPopupOpen(false);
    setStatus('Ready to Record');
  };

  return (
    <div>
      {!isPopupOpen ? (
        <div>
          {isRecording ? (
            <button onClick={handleStopRecording}>Stop Recording</button>
          ) : (
            <button onClick={handleStartRecording}>Click to Start Recording testing</button>
          )}
          <div>
            <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
          </div>
        </div>
      ) : (
        <div className="popup">
          <div className="popup-content">
            <video src={mediaBlobUrl} controls autoPlay />
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .close-button {
          margin-top: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        .close-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default RecordView;
