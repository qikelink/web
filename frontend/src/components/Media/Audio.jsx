import React, { useEffect, useRef } from "react";
import { useStudioState } from "@/store/studioState";

const Audio = ({ stream, name }) => {
  const audioRef = useRef < HTMLAudioElement > null;
  const { isRecordAudio, audioOutputDevice } = useStudioState();

  useEffect(() => {
    const audioObj = audioRef.current;

    if (audioObj && stream) {
      audioObj.srcObject = stream;
      audioObj.onloadedmetadata = async () => {
        try {
          await audioObj.play();
        } catch (error) {
          console.error(error);
        }
      };
      audioObj.onerror = () => {
        console.error("audioCard() | Error is hapenning...");
      };
    }
  }, []);

  useEffect(() => {
    const audioObj = audioRef.current;
    if (audioObj && audioOutputDevice) {
      audioObj.setSinkId(audioOutputDevice.deviceId);
    }
  }, [audioOutputDevice]);

  return (
    <>
      <audio ref={audioRef}>Audio</audio>
    </>
  );
};

export default Audio;
