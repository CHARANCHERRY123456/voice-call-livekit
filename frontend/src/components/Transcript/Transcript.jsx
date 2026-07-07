import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import './Transcript.css';

export function Transcript({ messages }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="transcript">
      <div className="transcript__header">Transcript</div>
      <div className="transcript__list" ref={listRef}>
        {messages.length === 0 ? (
          <div className="transcript__empty">
            Say something — your conversation will appear here.
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))
        )}
      </div>
    </div>
  );
}
