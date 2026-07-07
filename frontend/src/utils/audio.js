const OUTLET_ID = 'lk-audio-outlet';

/** Lazily creates a single hidden container to host remote <audio> elements. */
function getAudioOutlet() {
  let outlet = document.getElementById(OUTLET_ID);
  if (!outlet) {
    outlet = document.createElement('div');
    outlet.id = OUTLET_ID;
    outlet.style.display = 'none';
    document.body.appendChild(outlet);
  }
  return outlet;
}

export function attachAudioTrack(track) {
  const element = track.attach();
  getAudioOutlet().appendChild(element);
  return element;
}

export function detachAudioTrack(track) {
  track.detach().forEach((element) => element.remove());
}
