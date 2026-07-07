import './AgentOrb.css';

const STATE_LABELS = {
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
  initializing: 'Connecting',
  idle: 'Idle',
};

export function AgentOrb({ agentState }) {
  const normalized = (agentState || 'idle').toLowerCase();
  const label = STATE_LABELS[normalized] ?? 'Idle';

  return (
    <div className={`orb orb--${normalized}`}>
      <div className="orb__ring orb__ring--outer" />
      <div className="orb__ring orb__ring--mid" />
      <div className="orb__core">
        <div className="orb__bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <span className="orb__label">{label}</span>
    </div>
  );
}
