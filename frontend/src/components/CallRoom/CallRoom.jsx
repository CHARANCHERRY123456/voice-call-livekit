import { AgentOrb } from '../AgentOrb/AgentOrb';
import { Transcript } from '../Transcript/Transcript';
import { ParticipantList } from '../ParticipantList/ParticipantList';
import { ControlBar } from '../ControlBar/ControlBar';
import './CallRoom.css';

export function CallRoom({
  roomName,
  localIdentity,
  participants,
  messages,
  agentState,
  isMuted,
  onToggleMic,
  onLeave,
}) {
  return (
    <div className="call-room">
      <div className="call-room__stage">
        <ParticipantList participants={participants} localIdentity={localIdentity} />
        <AgentOrb agentState={agentState} />
        <div className="call-room__stage-spacer" />
      </div>

      <Transcript messages={messages} />

      <ControlBar
        roomName={roomName}
        isMuted={isMuted}
        onToggleMic={onToggleMic}
        onLeave={onLeave}
        isConnected
      />
    </div>
  );
}
