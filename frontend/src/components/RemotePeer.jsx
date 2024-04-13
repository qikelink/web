"use client";

import { Audio, Video } from "@huddle01/react/components";
import {
  useRemoteAudio,
  useRemoteScreenShare,
  useRemoteVideo,
} from "@huddle01/react/hooks";
import React, { useEffect, useRef } from "react";

const RemotePeer = ({ peerId }) => {
  const { stream } = useRemoteVideo({ peerId });
  const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
  const { videoStream: screenVideo, audioStream: screenAudio } =
    useRemoteScreenShare({ peerId });

  return (
    <div className="flex flex-col gap-2">
      {stream ? (
        <Video
          stream={stream}
          className="border-2 rounded-xl border-white-400 aspect-video"
        />
      ) : (
        <div>
          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1661726959315-04d61ada6fd2?q=80&w=1653&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            height={800}
            width={800}
            className="aspect-video rounded-xl"
          />
        </div>
      )}
      {screenVideo && (
        <Video
          stream={screenVideo}
          className="border-2 rounded-xl border-white-400 aspect-video"
        />
      )}
      {audioStream && <Audio stream={audioStream} />}
      {screenAudio && <Audio stream={screenAudio} />}
    </div>
  );
};

export default React.memo(RemotePeer);
