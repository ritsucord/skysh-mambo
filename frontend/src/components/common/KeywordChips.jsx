function KeywordChips({ keywords = [], className = '' }) {
  if (!keywords.length) {
    return null;
  }

  return (
    <div className={`keyword-chips ${className}`.trim()}>
      {keywords.map((keyword) => (
        <span key={keyword} className="keyword-chip">
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default KeywordChips;
