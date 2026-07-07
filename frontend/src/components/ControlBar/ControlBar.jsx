import { Button } from '../ui/Button';
import { useCallTimer } from '../../hooks/useCallTimer';
import { formatDuration } from '../../utils/format';
import './ControlBar.css';

const MicOnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M19 11a7 7 0 0 1-14 0M12 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const MicOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M15 9.5V6a3 3 0 0 0-5.98-.36M9 9v3a3 3 0 0 0 4.24 2.73" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M19 11a7 7 0 0 1-8.6 6.82M5.6 8.1A7 7 0 0 0 5 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M12 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const LeaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4.5 15.5c1-1.5 3-2.6 5-3.1M19.5 15.5c-1-1.5-3-2.6-5-3.1M9.5 12.4V8a2.5 2.5 0 0 1 5 0v4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M3 17.5 2 20l3.5-1M21 17.5l1 2.5-3.5-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ControlBar({ roomName, isMuted, onToggleMic, onLeave, isConnected }) {
  const seconds = useCallTimer(isConnected);

  return (
    <div className="control-bar">
      <div className="control-bar__info">
        <span className="control-bar__room">{roomName}</span>
        <span className="control-bar__timer">{formatDuration(seconds)}</span>
      </div>

      <div className="control-bar__actions">
        <Button
          variant="icon"
          active={isMuted}
          onClick={onToggleMic}
          aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOffIcon /> : <MicOnIcon />}
        </Button>

        <Button variant="danger" onClick={onLeave} className="control-bar__leave">
          <LeaveIcon />
          Leave
        </Button>
      </div>
    </div>
  );
}
