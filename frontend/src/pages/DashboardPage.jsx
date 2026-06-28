import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import KeywordChips from '../components/common/KeywordChips.jsx';
import MetricCard from '../components/common/MetricCard.jsx';
import SentimentRatioBar from '../components/sentiment/SentimentRatioBar.jsx';
import { getAllSignals } from '../services/signalService.js';

const filterOptions = [
  { value: 'all', label: '전체' },
  { value: 'crypto', label: '코인' },
  { value: 'us', label: '미국주식' },
  { value: 'kr', label: '한국주식' },
  { value: 'highRisk', label: '위험도 높음' },
];

const sortOptions = [
  { value: 'default', label: '기본순' },
  { value: 'fearLow', label: '공포/탐욕 점수 낮은 순' },
  { value: 'riskHigh', label: '위험도 높은 순' },
  { value: 'sourceHigh', label: '분석 글 수 많은 순' },
];

const riskRank = {
  높음: 3,
  중간: 2,
  낮음: 1,
};

function formatUpdatedAt(value) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getAverage(items, field) {
  if (!items.length) {
    return 0;
  }

  return Math.round(items.reduce((sum, item) => sum + item[field], 0) / items.length);
}

function DashboardPage() {
  const [signals, setSignals] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('default');

  useEffect(() => {
    let isMounted = true;

    getAllSignals().then((data) => {
      if (isMounted) {
        setSignals(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const summary = useMemo(
    () => ({
      totalCount: signals.length,
      averageFearGreed: getAverage(signals, 'fearGreedScore'),
      highRiskCount: signals.filter((signal) => signal.riskLevel === '높음').length,
      averageSpamRate: getAverage(signals, 'spamRate'),
    }),
    [signals]
  );

  const visibleSignals = useMemo(() => {
    const filtered = signals.filter((signal) => {
      if (activeFilter === 'crypto') {
        return signal.market === 'Crypto';
      }

      if (activeFilter === 'us') {
        return signal.market === 'NASDAQ';
      }

      if (activeFilter === 'kr') {
        return signal.market === 'KOSPI';
      }

      if (activeFilter === 'highRisk') {
        return signal.riskLevel === '높음';
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (activeSort === 'fearLow') {
        return a.fearGreedScore - b.fearGreedScore;
      }

      if (activeSort === 'riskHigh') {
        return riskRank[b.riskLevel] - riskRank[a.riskLevel];
      }

      if (activeSort === 'sourceHigh') {
        return b.sourceCount - a.sourceCount;
      }

      return signals.indexOf(a) - signals.indexOf(b);
    });
  }, [activeFilter, activeSort, signals]);

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="section-eyebrow">Sentiment Dashboard</p>
          <h1>종목별 커뮤니티 감정 분석 대시보드</h1>
          <p>
            mock 데이터를 기반으로 종목별 공포/탐욕, 위험도, 스팸 의심 비율과
            커뮤니티 분석량을 한눈에 확인합니다.
          </p>
        </div>
      </section>

      <section className="dashboard-summary-grid" aria-label="대시보드 요약">
        <MetricCard title="분석 중인 종목 수" value={`${summary.totalCount}개`} description="mock signal universe" />
        <MetricCard
          title="평균 공포/탐욕 점수"
          value={summary.averageFearGreed}
          description="0은 공포, 100은 탐욕"
        />
        <MetricCard
          title="위험도 높은 종목 수"
          value={`${summary.highRiskCount}개`}
          description="riskLevel이 높음인 종목"
        />
        <MetricCard
          title="평균 스팸 의심 비율"
          value={`${summary.averageSpamRate}%`}
          description="커뮤니티 글 기준"
        />
      </section>

      <section className="dashboard-toolbar" aria-label="필터 및 정렬">
        <div className="segmented-control" aria-label="종목 필터">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`segment-button${activeFilter === option.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="sort-control">
          <span>정렬</span>
          <select value={activeSort} onChange={(event) => setActiveSort(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="signal-card-grid" aria-label="종목 감정 분석 목록">
        {visibleSignals.map((signal) => (
          <Card key={signal.symbol} className="signal-card">
            <div className="signal-card-header">
              <div>
                <p className="signal-market">{signal.market}</p>
                <h2>
                  {signal.name} <span>{signal.symbol}</span>
                </h2>
              </div>
              <div className="signal-badges">
                <Badge type="sentiment" value={signal.sentimentLabel}>
                  {signal.sentimentLabel}
                </Badge>
                <Badge type="risk" value={signal.riskLevel}>
                  위험도 {signal.riskLevel}
                </Badge>
              </div>
            </div>

            <div className="signal-score-row">
              <div>
                <span className="signal-score-label">공포/탐욕 점수</span>
                <strong>{signal.fearGreedScore}</strong>
              </div>
              <div>
                <span className="signal-score-label">분석 글</span>
                <strong>{signal.sourceCount.toLocaleString()}개</strong>
              </div>
            </div>

            <SentimentRatioBar
              positive={signal.positive}
              negative={signal.negative}
              neutral={signal.neutral}
            />

            <KeywordChips keywords={signal.keywords.slice(0, 4)} />

            <div className="signal-card-footer">
              <span>업데이트 {formatUpdatedAt(signal.updatedAt)}</span>
              <Button as={Link} to={`/stocks/${signal.symbol}`} variant="secondary">
                상세 보기
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default DashboardPage;
