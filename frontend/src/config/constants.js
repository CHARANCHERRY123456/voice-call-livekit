export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const AGENT_STATES = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  INITIALIZING: 'initializing',
  LISTENING: 'listening',
  THINKING: 'thinking',
  SPEAKING: 'speaking',
  IDLE: 'idle',
};

export const CALL_STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error',
};
