function getBadgeTone(type, value) {
  const normalizedValue = String(value || '').toLowerCase();

  if (type === 'sentiment') {
    if (['positive', '긍정', '긍정적', '탐욕', 'greed'].includes(normalizedValue)) {
      return normalizedValue === '탐욕' || normalizedValue === 'greed' ? 'greed' : 'positive';
    }

    if (['negative', '부정', '부정적', '공포', 'fear'].includes(normalizedValue)) {
      return normalizedValue === '공포' || normalizedValue === 'fear' ? 'fear' : 'negative';
    }

    return 'neutral';
  }

  if (type === 'risk') {
    if (['high', '높음'].includes(normalizedValue)) {
      return 'risk-high';
    }

    if (['medium', '중간'].includes(normalizedValue)) {
      return 'risk-medium';
    }

    if (['low', '낮음'].includes(normalizedValue)) {
      return 'risk-low';
    }
  }

  if (type === 'verified') {
    return value ? 'verified' : 'unverified';
  }

  return 'neutral';
}

function Badge({ children, type = 'default', value, tone, className = '' }) {
  const displayValue = children ?? value;
  const resolvedTone = tone || getBadgeTone(type, value ?? children);

  return (
    <span className={`badge badge-${type} badge-${resolvedTone} ${className}`.trim()}>
      {displayValue}
    </span>
  );
}

export default Badge;
