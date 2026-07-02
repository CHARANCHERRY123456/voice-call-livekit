import { useState } from 'react'
import {Room , RoomEvent} from 'livekit-client'
import './App.css'

function App() {
    const [room , setRoom] = useState('');
    const [identity , setIdentity] = useState('');
    const [lkroom , setLkroom] = useState(null);
    const [participants , setParticipants] = useState([]);
    const [messages , setMessages] = useState([]);
    
    async function handleSubmit(e) {
      e.preventDefault();
      if(!room || !identity) return;
      
      const response = await fetch(`http://localhost:8000/token?room=${room}&identity=${identity}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log(data);
      const lkroom = new Room();
      await lkroom.connect(data.url , data.token);
      setLkroom(lkroom);

      await lkroom.localParticipant.setMicrophoneEnabled(true);

      lkroom.on(RoomEvent.ParticipantConnected, (participant) => {
        setParticipants(prev => [...prev, participant]);
      });

      lkroom.on(RoomEvent.ParticipantDisconnected, (participant) => {
        setParticipants(prev => prev.filter(p => p !== participant));
      });

      lkroom.on(RoomEvent.DataReceived, (payload, participant) => {
        const message = JSON.parse(new TextDecoder().decode(payload));
        console.log('Data received:', message);
        setMessages(prev => [...prev, message]);
      });


      lkroom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        console.log('Track subscribed:', track, publication, participant);
        if(track.kind === 'audio') {
          const audioElement = track.attach();
          document.body.appendChild(audioElement);
        }
      });

      setParticipants([
        lkroom.localParticipant,
        ...Array.from(lkroom.remoteParticipants.values())
      ]);
    }


    return <div>
      <input type="text" onChange={(e)=>setRoom(e.target.value)} value={room} />
      <input type="text" onChange={(e)=>setIdentity(e.target.value)} value={identity} />
      <button onClick={handleSubmit} >
        Join Room
      </button>

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.text}
          </div>
        ))}
      </div>

      <div>
        {participants.map((participant) => (
          <div key={participant.sid}>
            {participant.identity}
          </div>
        ))}
      </div>
    </div>
}

export default App
