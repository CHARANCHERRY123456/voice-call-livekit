import { useId, useState } from 'react';
import { Button } from '../ui/Button';
import { TextInput } from '../ui/TextInput';
import './JoinScreen.css';

export function JoinScreen({ onJoin, isConnecting, error }) {
  const [room, setRoom] = useState('demo-room');
  const [identity, setIdentity] = useState('');
  const roomId = useId();
  const identityId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    if (!room.trim() || !identity.trim() || isConnecting) return;
    onJoin(room.trim(), identity.trim());
  }

  return (
    <div className="join-screen">
      <div className="join-card">
        <div className="join-card__badge">
          <span className="join-card__badge-dot" />
          Voice agent · live
        </div>

        <h1 className="join-card__title">Talk to your agent</h1>
        <p className="join-card__subtitle">
          Enter a room and a name to start a real-time voice conversation
          powered by LiveKit.
        </p>

        <form className="join-card__form" onSubmit={handleSubmit}>
          <TextInput
            id={roomId}
            label="Room"
            placeholder="e.g. demo-room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <TextInput
            id={identityId}
            label="Your name"
            placeholder="e.g. charan"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />

          {error && <p className="join-card__error">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            loading={isConnecting}
            disabled={!room.trim() || !identity.trim()}
            className="join-card__submit"
          >
            {isConnecting ? 'Connecting…' : 'Join call'}
          </Button>
        </form>
      </div>
    </div>
  );
}
