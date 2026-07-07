import { useLiveKitRoom } from './hooks/useLiveKitRoom';
import { JoinScreen } from './components/JoinScreen/JoinScreen';
import { CallRoom } from './components/CallRoom/CallRoom';
import { CALL_STATUS } from './config/constants';
import './App.css';

function App() {
  const {
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
  } = useLiveKitRoom();

  const isConnected = status === CALL_STATUS.CONNECTED;
  const localIdentity = participants[0]?.identity;

  return (
    <div className="app-shell">
      <div className="app-shell__noise" />
      {isConnected ? (
        <CallRoom
          roomName={roomName}
          localIdentity={localIdentity}
          participants={participants}
          messages={messages}
          agentState={agentState}
          isMuted={isMuted}
          onToggleMic={toggleMic}
          onLeave={disconnect}
        />
      ) : (
        <JoinScreen
          onJoin={connect}
          isConnecting={status === CALL_STATUS.CONNECTING}
          error={error}
        />
      )}
    </div>
  );
}

export default App;
