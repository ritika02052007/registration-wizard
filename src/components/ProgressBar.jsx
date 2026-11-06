export default function ProgressBar({ step, total }) {
  const percent = Math.round((step / total) * 100);
  return (
    <div className="progress">
      <p className="progress-label">
        Step {step} of {total}
      </p>
      <div
        className="track"
        role="progressbar"
        aria-label="Registration progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-valuetext={`Step ${step} of ${total}`}
      >
        <div className="fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
