function clampScore(score) {
  return Math.min(100, Math.max(0, Number(score) || 0));
}

function getScoreState(score) {
  if (score < 40) {
    return { label: '공포', className: 'fear' };
  }

  if (score >= 60) {
    return { label: '탐욕', className: 'greed' };
  }

  return { label: '중립', className: 'neutral' };
}

function FearGreedScore({ score = 0 }) {
  const normalizedScore = clampScore(score);
  const state = getScoreState(normalizedScore);

  return (
    <div className={`fear-greed-score fear-greed-${state.className}`}>
      <div className="fear-greed-header">
        <span className="fear-greed-label">공포/탐욕 지수</span>
        <strong>{normalizedScore}</strong>
      </div>
      <div className="fear-greed-track" aria-label={`공포 탐욕 점수 ${normalizedScore}`}>
        <span className="fear-greed-fill" style={{ width: `${normalizedScore}%` }} />
      </div>
      <p className="fear-greed-description">{state.label}</p>
    </div>
  );
}

export default FearGreedScore;
