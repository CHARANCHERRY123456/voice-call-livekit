import { useCallback, useRef, useState } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { fetchConnectionDetails } from '../services/livekitApi';
import { attachAudioTrack, detachAudioTrack } from '../utils/audio';
import { CALL_STATUS } from '../config/constants';

/**
 * Owns the lifecycle of a single LiveKit Room connection: connecting,
 * tracking participants/messages/agent state, and tearing everything down.
 */
export function useLiveKitRoom() {
  const roomRef = useRef(null);

  const [status, setStatus] = useState(CALL_STATUS.IDLE);
  const [error, setError] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [agentState, setAgentState] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const syncParticipants = useCallback((room) => {
    setParticipants([
      room.localParticipant,
      ...Array.from(room.remoteParticipants.values()),
    ]);
  }, []);

  const resetState = useCallback(() => {
    setParticipants([]);
    setMessages([]);
    setAgentState(null);
    setIsMuted(false);
  }, []);

  const connect = useCallback(async (room, identity) => {
    setStatus(CALL_STATUS.CONNECTING);
    setError(null);

    try {
      const { url, token } = await fetchConnectionDetails(room, identity);
      const lkRoom = new Room();
      roomRef.current = lkRoom;

      lkRoom.on(RoomEvent.ParticipantConnected, () => syncParticipants(lkRoom));
      lkRoom.on(RoomEvent.ParticipantDisconnected, () => syncParticipants(lkRoom));

      lkRoom.on(RoomEvent.Disconnected, () => {
        roomRef.current = null;
        setStatus(CALL_STATUS.IDLE);
        resetState();
      });

      lkRoom.on(RoomEvent.DataReceived, (payload) => {
        let message;
        try {
          message = JSON.parse(new TextDecoder().decode(payload));
        } catch {
          return;
        }

        if (message.type === 'conversation_item_added') {
          setMessages((prev) => [...prev, message]);
        }
        if (message.type === 'agent_state_changed') {
          setAgentState(message.state);
        }
      });

      lkRoom.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === 'audio') attachAudioTrack(track);
      });

      lkRoom.on(RoomEvent.TrackUnsubscribed, (track) => {
        if (track.kind === 'audio') detachAudioTrack(track);
      });

      await lkRoom.connect(url, token);
      await lkRoom.localParticipant.setMicrophoneEnabled(true);

      syncParticipants(lkRoom);
      setRoomName(room);
      setStatus(CALL_STATUS.CONNECTED);
    } catch (err) {
      console.error('Failed to join room:', err);
      roomRef.current = null;
      setError(err.message || 'Failed to join the room. Please try again.');
      setStatus(CALL_STATUS.ERROR);
    }
  }, [syncParticipants, resetState]);

  const disconnect = useCallback(async () => {
    await roomRef.current?.disconnect();
    roomRef.current = null;
    setStatus(CALL_STATUS.IDLE);
    resetState();
  }, [resetState]);

  const toggleMic = useCallback(async () => {
    const room = roomRef.current;
    if (!room) return;
    const nextMuted = !isMuted;
    await room.localParticipant.setMicrophoneEnabled(!nextMuted);
    setIsMuted(nextMuted);
  }, [isMuted]);

  return {
    status,
    error,
    roomName,
    participants,
    messages,
    agentState,
    isMuted,
    connect,
    disconnect,
    toggleMic,
  };
}
