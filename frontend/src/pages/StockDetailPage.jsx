import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import KeywordChips from '../components/common/KeywordChips.jsx';
import MetricCard from '../components/common/MetricCard.jsx';
import FearGreedScore from '../components/sentiment/FearGreedScore.jsx';
import SentimentRatioBar from '../components/sentiment/SentimentRatioBar.jsx';
import { getSignalData } from '../services/signalService.js';

function formatUpdatedAt(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function StockDetailPage() {
  const { symbol } = useParams();
  const [signal, setSignal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    getSignalData(symbol).then((data) => {
      if (isMounted) {
        setSignal(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [symbol]);

  const maxTrendScore = useMemo(() => {
    if (!signal?.sentimentTrend?.length) {
      return 100;
    }

    return Math.max(...signal.sentimentTrend.map((item) => item.score), 100);
  }, [signal]);

  if (isLoading) {
    return (
      <section className="page-shell">
        <p className="section-eyebrow">Loading</p>
        <h1>종목 상세 분석을 불러오는 중입니다</h1>
      </section>
    );
  }

  if (!signal) {
    return (
      <section className="empty-state-card">
        <p className="section-eyebrow">Not Found</p>
        <h1>종목을 찾을 수 없습니다</h1>
        <p>요청한 심볼 `{symbol}`에 해당하는 mock 데이터가 없습니다.</p>
      </section>
    );
  }

  return (
    <div className="stock-detail-page">
      <section className="stock-detail-header">
        <div>
          <p className="section-eyebrow">{signal.market}</p>
          <h1>
            {signal.name} <span>{signal.symbol}</span>
          </h1>
          <p>업데이트 {formatUpdatedAt(signal.updatedAt)}</p>
        </div>
        <div className="stock-detail-badges">
          <Badge type="sentiment" value={signal.sentimentLabel}>
            {signal.sentimentLabel}
          </Badge>
          <Badge type="risk" value={signal.riskLevel}>
            위험도 {signal.riskLevel}
          </Badge>
        </div>
      </section>

      <section className="stock-core-grid" aria-label="핵심 분석 지표">
        <FearGreedScore score={signal.fearGreedScore} />
        <MetricCard title="신뢰도" value={`${signal.confidence}%`} description="분석 모델 confidence" />
        <MetricCard
          title="분석 글 수"
          value={`${signal.sourceCount.toLocaleString()}개`}
          description="커뮤니티 반응 수집량"
        />
        <MetricCard title="스팸 의심 비율" value={`${signal.spamRate}%`} description="필터링 대상 비율" />
      </section>

      <Card className="stock-ratio-card">
        <div>
          <p className="section-eyebrow">Sentiment Ratio</p>
          <h2>긍정 / 중립 / 부정 비율</h2>
        </div>
        <SentimentRatioBar
          positive={signal.positive}
          neutral={signal.neutral}
          negative={signal.negative}
        />
      </Card>

      <section className="stock-detail-grid">
        <Card className="ai-summary-card">
          <p className="section-eyebrow">AI Summary</p>
          <h2>AI 요약</h2>
          <p>{signal.summary}</p>
          <div className="investment-notice">투자 조언 아님. 커뮤니티 감정 분석 기반 참고 자료입니다.</div>
        </Card>

        <Card className="keyword-section-card">
          <p className="section-eyebrow">Keywords</p>
          <h2>주요 키워드</h2>
          <KeywordChips keywords={signal.keywords} />
        </Card>
      </section>

      <Card className="trend-card">
        <div className="section-heading">
          <p className="section-eyebrow">Trend</p>
          <h2>감정 추세</h2>
        </div>
        <div className="trend-bars" aria-label="최근 공포 탐욕 점수 추세">
          {signal.sentimentTrend.map((item) => (
            <div key={item.date} className="trend-bar-item">
              <div className="trend-bar-track">
                <span
                  className="trend-bar-fill"
                  style={{ height: `${(item.score / maxTrendScore) * 100}%` }}
                />
              </div>
              <strong>{item.score}</strong>
              <span>{item.date.slice(5).replace('-', '/')}</span>
            </div>
          ))}
        </div>
      </Card>

      <section className="community-reaction-section">
        <div className="section-heading">
          <p className="section-eyebrow">Community</p>
          <h2>최근 커뮤니티 반응</h2>
        </div>
        <div className="community-reaction-grid">
          {signal.recentCommunityPosts.map((post) => (
            <Card key={`${post.author}-${post.title}`} className="community-reaction-card">
              <div className="community-post-header">
                <div>
                  <h3>{post.title}</h3>
                  <p>@{post.author}</p>
                </div>
                <div className="community-post-badges">
                  <Badge type="verified" value={post.isVerified}>
                    {post.isVerified ? '인증' : '미인증'}
                  </Badge>
                  <Badge type="sentiment" value={post.sentimentLabel}>
                    {post.sentimentLabel}
                  </Badge>
                  <Badge tone={post.isSpamSuspected ? 'negative' : 'neutral'}>
                    {post.isSpamSuspected ? '스팸 의심' : '정상'}
                  </Badge>
                </div>
              </div>
              <p>{post.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="extension-cta-card">
        <div>
          <p className="section-eyebrow">Extension</p>
          <h2>웹에서는 깊게 분석하고, 크롬 익스텐션에서는 투자 사이트 위에서 바로 확인하세요.</h2>
        </div>
        <Button variant="primary">익스텐션 데모 보기</Button>
      </Card>
    </div>
  );
}

export default StockDetailPage;
