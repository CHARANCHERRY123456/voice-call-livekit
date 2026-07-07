export function MessageBubble({ message }) {
  const isAgent = message.role === 'assistant' || message.role === 'agent';
  const text = message.text ?? message.transcript ?? '';

  if (!text) return null;

  return (
    <div className={`bubble-row ${isAgent ? 'bubble-row--agent' : 'bubble-row--user'}`}>
      <div className="bubble">
        <span className="bubble__role">{isAgent ? 'Agent' : 'You'}</span>
        <p className="bubble__text">{text}</p>
      </div>
    </div>
  );
}
