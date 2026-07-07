import './TextInput.css';

export function TextInput({ label, id, ...rest }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      <input id={id} className="field__input" autoComplete="off" {...rest} />
    </label>
  );
}
