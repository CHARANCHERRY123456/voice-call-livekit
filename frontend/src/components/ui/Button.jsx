import './Button.css';

const VARIANT_CLASS = {
  primary: 'btn btn--primary',
  ghost: 'btn btn--ghost',
  danger: 'btn btn--danger',
  icon: 'btn btn--icon',
};

function Spinner() {
  return <span className="btn__spinner" aria-hidden="true" />;
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  active = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary, className];
  if (active) classes.push('is-active');
  if (loading) classes.push('is-loading');

  return (
    <button
      type={type}
      className={classes.join(' ').trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner />}
      <span className="btn__label">{children}</span>
    </button>
  );
}
