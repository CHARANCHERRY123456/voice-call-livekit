import { BACKEND_URL } from '../config/constants';

/**
 * Requests a LiveKit connection token + server url for a given room/identity
 * from the backend token service.
 */
export async function fetchConnectionDetails(room, identity) {
  const params = new URLSearchParams({ room, identity });
  const response = await fetch(`${BACKEND_URL}/token?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Could not reach the call server. Is the backend running?');
  }

  const data = await response.json();

  if (!data.token || !data.url) {
    throw new Error('The call server returned an invalid response.');
  }

  return data;
}
