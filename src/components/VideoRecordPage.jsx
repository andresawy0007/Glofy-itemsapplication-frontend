import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function getSupportedMimeType() {
  const possibleTypes = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4",
  ];

  for (const type of possibleTypes) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  console.warn("No supported MIME type found for MediaRecorder.");
  return "";
}

const VideoRecordPage = () => {
  const { id } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const recordingTimeoutRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: getSupportedMimeType(),
      });

      recordedChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        console.log(url);
        setVideoURL(url);

        // Detener la transmisión de la cámara
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Detener la grabación automáticamente después de 15 segundos
      recordingTimeoutRef.current = setTimeout(stopRecording, 15000);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearTimeout(recordingTimeoutRef.current);
      downloadVideo();
    }
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `video_user_${id}_${timestamp}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const redoVideo = () => {
    setVideoURL(null);
  };

  return (
    <div className="single-item">
      <h1>Video Recorder</h1>

      <div>
        {!videoURL ? (
          <>
            <video ref={videoRef} muted></video>
            <div>
              {!isRecording ? (
                <div className="card-actions">
                  <Link to={`/item/${id}`}>
                      <button className="btn">Go back to user detail</button>
                  </Link>
                  <button onClick={startRecording} className="btn primary-btn">
                    Start Recording
                  </button>
                </div>
              ) : (
                <button onClick={stopRecording} className="btn alert-btn">
                  Stop Recording
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <video src={videoURL} controls></video>
            </div>
            <div className="card-actions">
              <Link className="btn" to={`/item/${id}`}>
                  <button >Go back to user detail</button>
              </Link>
              <button onClick={redoVideo}>Redo</button>
              <button onClick={downloadVideo} className="btn primary-btn">
                Download Video
              </button>
            </div>
          </>
          
        )}
      </div>
    </div>
  );
};

export default VideoRecordPage;
