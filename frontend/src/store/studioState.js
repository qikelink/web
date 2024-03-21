import { create } from "zustand";

export const useStudioState = create((set) => ({
  name: "",
  setName: (name) => set({ name }),
  isChatOpen: false,
  setIsChatOpen: (isChatOpen) => {
    set({ isChatOpen });
    set({ isMediaOpen: false });
    set({ isParticipantsOpen: false });
  },
  isQnAOpen: false,
  setIsQnAOpen: (isQnAOpen) => {
    set({ isQnAOpen }), set({ isChatOpen: false });
    set({ isMediaOpen: false });
    set({ isParticipantsOpen: false });
    set({ isPollsOpen: false });
  },
  isPollsOpen: false,
  setIsPollsOpen: (isPollsOpen) => {
    set({ isPollsOpen });
    set({ isChatOpen: false });
    set({ isMediaOpen: false });
    set({ isQnAOpen: false });
    set({ isParticipantsOpen: false });
  },
  isMediaOpen: false,
  setIsMediaOpen: (isMediaOpen) => {
    set({ isMediaOpen });
    set({ isChatOpen: false });
    set({ isParticipantsOpen: false });
    set({ isQnAOpen: false });
    set({ isPollsOpen: false });
  },
  isParticipantsOpen: false,
  setIsParticipantsOpen: (isParticipantsOpen) => {
    set({ isParticipantsOpen });
    set({ isChatOpen: false });
    set({ isMediaOpen: false });
    set({ isQnAOpen: false });
    set({ isPollsOpen: false });
  },
  audioInputDevice: {},
  setAudioInputDevice: (audioInputDevice) => set({ audioInputDevice }),
  videoDevice: {},
  setVideoDevice: (videoDevice) => set({ videoDevice }),
  audioOutputDevice: {},
  setAudioOutputDevice: (audioOutputDevice) => set({ audioOutputDevice }),
  showAcceptRequest: false,
  setShowAcceptRequest: (val) => set({ showAcceptRequest: val }),
  requestedPeers: [],
  addRequestedPeers: (val) => {
    set((state) => ({
      requestedPeers: [...state.requestedPeers, val],
    }));
  },
  removeRequestedPeers: (val) => {
    set((state) => ({
      requestedPeers: state.requestedPeers.filter((peer) => peer !== val),
    }));
  },
  chatMessages: [],
  addChatMessage: (val) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, val],
    }));
  },
  activeBg: "bg-black",
  setActiveBg: (val) => set({ activeBg: val }),
  boxPosition: { x: 0, y: 0, width: "200", height: "200" },
  setBoxPosition: (val) => set({ boxPosition: val }),
  isRecording: false,
  setIsRecording: (val) => set({ isRecording: val }),
  isLiveStreaming: false,
  setIsLiveStreaming: (val) => set({ isLiveStreaming: val }),
  isUploading: false,
  setIsUploading: (val) => set({ isUploading: val }),
  isRecordAudio: false,
  setIsRecordAudio: (val) => set({ isRecordAudio: val }),
  isRecordVideo: false,
  setIsRecordVideo: (val) => set({ isRecordVideo: val }),
  layout: 1,
  setLayout: (val) => set({ layout: val }),
  isScreenShared: false,
  setIsScreenShared: (val) => set({ isScreenShared: val }),
}));
