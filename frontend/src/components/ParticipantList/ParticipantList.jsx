import { getInitials } from '../../utils/format';
import './ParticipantList.css';

export function ParticipantList({ participants, localIdentity }) {
  return (
    <div className="participants">
      {participants.map((participant) => {
        const isLocal = participant.identity === localIdentity;
        return (
          <div className="participant-chip" key={participant.sid}>
            <span className="participant-chip__avatar">
              {getInitials(participant.identity)}
            </span>
            <span className="participant-chip__name">
              {isLocal ? 'You' : participant.identity}
            </span>
            <span className="participant-chip__dot" />
          </div>
        );
      })}
    </div>
  );
}
