function toNumber(value) {
  return Math.max(0, Number(value) || 0);
}

function SentimentRatioBar({ positive = 0, negative = 0, neutral = 0, showLabels = true }) {
  const values = {
    positive: toNumber(positive),
    neutral: toNumber(neutral),
    negative: toNumber(negative),
  };
  const total = values.positive + values.neutral + values.negative || 1;

  const widths = {
    positive: (values.positive / total) * 100,
    neutral: (values.neutral / total) * 100,
    negative: (values.negative / total) * 100,
  };

  return (
    <div className="sentiment-ratio">
      <div className="sentiment-ratio-track" aria-label="감정 비율">
        <span
          className="sentiment-ratio-segment sentiment-ratio-positive"
          style={{ width: `${widths.positive}%` }}
        />
        <span
          className="sentiment-ratio-segment sentiment-ratio-neutral"
          style={{ width: `${widths.neutral}%` }}
        />
        <span
          className="sentiment-ratio-segment sentiment-ratio-negative"
          style={{ width: `${widths.negative}%` }}
        />
      </div>
      {showLabels && (
        <div className="sentiment-ratio-labels">
          <span>긍정 {values.positive}%</span>
          <span>중립 {values.neutral}%</span>
          <span>부정 {values.negative}%</span>
        </div>
      )}
    </div>
  );
}

export default SentimentRatioBar;
