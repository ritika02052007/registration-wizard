export default function SuccessScreen({ firstName, onReset }) {
  return (
    <div className="card success" role="status">
      <h1>You're registered{firstName ? `, ${firstName}` : ''}</h1>
      <p className="hint">Your details were captured. Check the browser console to see the payload.</p>
      <div className="actions">
        <button type="button" className="btn primary" onClick={onReset}>
          Start over
        </button>
      </div>
    </div>
  );
}
