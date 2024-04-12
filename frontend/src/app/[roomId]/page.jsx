"use client";

import Header from "@/components/Header";
// import ChatBox from "@/components/ChatBox/ChatBox";
import RemotePeer from "@/components/RemotePeer";
import { useAuth } from "@/contexts/auth-context";
import { Video } from "@huddle01/react/components";
import {
  useLocalAudio,
  useLocalPeer,
  useLocalScreenShare,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BasicIcons } from "@/utils/BasicIcons";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Home({ params }) {
  const { setProgress } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const [displayName, setDisplayName] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { joinRoom, state } = useRoom({
    onJoin: (room) => {
      console.log("onJoin", room);
      updateMetadata({ displayName });
    },
    onPeerJoin: (peer) => {
      console.log("onPeerJoin", peer);
    },
  });
  const { enableVideo, isVideoOn, stream, disableVideo } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();
  const { startScreenShare, stopScreenShare, shareStream } =
    useLocalScreenShare();
  const { updateMetadata } = useLocalPeer();
  const { peerIds } = usePeerIds();

  const getToken = async () => {
    const tokenResponse = await fetch(`token?roomId=${params.roomId}`);
    const token = await tokenResponse.text();
    return token;
  };

  useEffect(() => {
    const initializeVideo = async () => {
      setProgress(0);
      setDisplayName(user.email);
      await enableVideo();
    };

    initializeVideo();
  }, []);

  console.log({ user });

  return (
    <main
      className={`flex min-h-screen flex-col space-y-2 items-center lg:mx-4  `}
    >
      <Header />

      <div className="w-full mt-8  flex gap-4 justify-between items-stretch">
        <div className="flex-1 justify-between items-center flex flex-col">
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
            <div className="relative flex flex-row flex-wrap md:flex-nowrap gap-2">
              {stream ? (
                <div className="w-full lg:w-1/2 mx-auto rounded-xl">
                  <span>Name: {user ? user.name : "XL"}</span>
                  <Video stream={stream} className="aspect-video rounded-xl" />
                </div>
              ) : (
                <div className="w-full lg:w-1/2 mx-auto rounded-xl border-blue-400">
                  <span>Name: {user ? user.name : "XL"}</span>
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
              {shareStream ? (
                <div className="w-full lg:w-1/2 mx-auto border-2 rounded-xl border-blue-400">
                  <Video
                    stream={shareStream}
                    className="aspect-video rounded-xl"
                  />
                </div>
              ) : null}
              {peerIds.map(
                (peerId) =>
                  peerId && (
                    <div className="w-full lg:w-1/2 mx-auto  rounded-xl ">
                      <span>Name: {user ? user.name : "XL"}</span>
                      <RemotePeer key={peerId} peerId={peerId} />
                    </div>
                  )
              )}
            </div>
          </div>

          {/* <div className="mt-8 mb-32 grid gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            {peerIds.map((peerId) =>
              peerId ? <RemotePeer key={peerId} peerId={peerId} /> : null
            )}
          </div> */}
          {state === "connected" ? null : (
            <div className="text-xl">Lobby Space</div>
          )}
        </div>
        {/* {state === "connected" && <ChatBox />} */}
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex">
        <Badge
          className={
            "hover:bg-secondary bg-primary p-2 mx-2 rounded-lg text-white"
          }
        >
          {state}
        </Badge>
        <div className="flex">
          {state === "idle" && (
            <>
              <input
                disabled={state !== "idle"}
                placeholder="Display Name"
                type="text"
                className="border-2 border-blue-400 rounded-lg p-2 lg:mx-1 bg-secondary text-black"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
              <Button
                disabled={!displayName}
                className=" bg-primary p-2 mx-2 rounded-lg text-white"
                onClick={async () => {
                  const token = await getToken();
                  await joinRoom({
                    roomId: params.roomId,
                    token,
                  });
                }}
              >
                Join Room
              </Button>

              <Button
                className="hover:bg-secondary bg-primary p-2 mx-2 rounded-lg "
                onClick={async () => {
                  isVideoOn ? await disableVideo() : await enableVideo();
                }}
              >
                {!isVideoOn ? BasicIcons.off.cam : BasicIcons.on.cam}
              </Button>
              <Button
                className="hover:bg-secondary p-2 mx-2 rounded-lg"
                onClick={async () => {
                  isAudioOn ? await disableAudio() : await enableAudio();
                }}
              >
                {!isAudioOn ? BasicIcons.off.mic : BasicIcons.on.mic}
              </Button>
              <Button
                className="hidden md:block bg-primary text-white p-2 mx-2 rounded-lg"
                onClick={async () => {
                  shareStream
                    ? await stopScreenShare()
                    : await startScreenShare();
                }}
              >
                {shareStream ? "Disable Screen" : "Enable Screen"}
              </Button>
            </>
          )}

          {state === "connected" && (
            <>
              <Button
                className="hover:bg-secondary p-2 mx-2 rounded-lg"
                onClick={async () => {
                  isVideoOn ? await disableVideo() : await enableVideo();
                }}
              >
                {!isVideoOn ? BasicIcons.off.cam : BasicIcons.on.cam}
              </Button>
              <Button
                className="hover:bg-secondary p-2 mx-2 rounded-lg"
                onClick={async () => {
                  isAudioOn ? await disableAudio() : await enableAudio();
                }}
              >
                {!isAudioOn ? BasicIcons.off.mic : BasicIcons.on.mic}
              </Button>
              <Button
                className="hover:bg-secondary p-2 mx-2 rounded-lg"
                onClick={async () => {
                  shareStream
                    ? await stopScreenShare()
                    : await startScreenShare();
                }}
              >
                {shareStream ? "Disable Screen" : "Enable Screen"}
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
