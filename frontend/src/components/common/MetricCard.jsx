import Card from './Card.jsx';

function MetricCard({ title, value, description, className = '' }) {
  return (
    <Card className={`metric-card ${className}`.trim()}>
      <p className="metric-card-title">{title}</p>
      <strong className="metric-card-value">{value}</strong>
      {description && <p className="metric-card-description">{description}</p>}
    </Card>
  );
}

export default MetricCard;
