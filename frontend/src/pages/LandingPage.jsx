import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import KeywordChips from '../components/common/KeywordChips.jsx';
import FearGreedScore from '../components/sentiment/FearGreedScore.jsx';
import SentimentRatioBar from '../components/sentiment/SentimentRatioBar.jsx';
import { mockSignals } from '../data/mockSignals.js';

const problemItems = [
  '개인 투자자는 커뮤니티 여론에 쉽게 흔들림',
  '공포, 탐욕, 스팸, 선동을 구분하기 어려움',
  '감정 변화가 시장 변동성과 연결될 수 있음',
];

const solutionItems = [
  {
    title: 'AI 감정 분석',
    description: '흩어진 커뮤니티 반응을 종목별 감정 점수와 요약으로 정리합니다.',
  },
  {
    title: '스팸 필터링',
    description: '반복 홍보, 과장된 선동, 의심 계정을 분리해 신호의 노이즈를 낮춥니다.',
  },
  {
    title: '검증 투자자 커뮤니티',
    description: '인증 여부를 표시해 의견의 맥락과 신뢰도를 함께 볼 수 있게 합니다.',
  },
  {
    title: '크롬 익스텐션 연동',
    description: '현재 보고 있는 투자 페이지의 종목을 웹앱 분석 화면과 연결할 수 있습니다.',
  },
];

function LandingPage() {
  const btcSignal = mockSignals.find((signal) => signal.symbol === 'BTC');

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <Badge type="sentiment" value="탐욕">
            AI Community Signal
          </Badge>
          <h1>커뮤니티의 공포와 탐욕을 AI로 읽다</h1>
          <p>
            흩어진 투자 커뮤니티 반응을 분석해 종목별 감정, 과열도, 위험 신호를
            제공하는 투자 보조 서비스
          </p>
          <div className="landing-actions">
            <Button as={Link} to="/dashboard">
              대시보드 보기
            </Button>
            <Button as={Link} to="/community" variant="secondary">
              커뮤니티 보기
            </Button>
          </div>
        </div>

        {btcSignal && (
          <Card className="landing-hero-card">
            <div className="demo-card-header">
              <div>
                <p className="section-eyebrow">Demo Signal</p>
                <h2>{btcSignal.name}</h2>
              </div>
              <Badge type="risk" value={btcSignal.riskLevel}>
                위험도 {btcSignal.riskLevel}
              </Badge>
            </div>
            <FearGreedScore score={btcSignal.fearGreedScore} />
            <SentimentRatioBar
              positive={btcSignal.positive}
              neutral={btcSignal.neutral}
              negative={btcSignal.negative}
            />
          </Card>
        )}
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <p className="section-eyebrow">Problem</p>
          <h2>커뮤니티 신호는 빠르지만, 그대로 믿기에는 위험합니다</h2>
        </div>
        <div className="landing-grid landing-grid-3">
          {problemItems.map((item) => (
            <Card key={item} className="landing-info-card">
              <p>{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <p className="section-eyebrow">Solution</p>
          <h2>Sentivest는 감정과 노이즈를 분리해 보여줍니다</h2>
        </div>
        <div className="landing-grid landing-grid-4">
          {solutionItems.map((item) => (
            <Card key={item.title} className="landing-solution-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {btcSignal && (
        <section className="landing-section">
          <div className="section-heading">
            <p className="section-eyebrow">Analysis Preview</p>
            <h2>BTC 커뮤니티 감정 분석 예시</h2>
          </div>
          <Card className="demo-analysis-card">
            <div className="demo-analysis-main">
              <div>
                <div className="demo-card-title-row">
                  <h3>
                    {btcSignal.name} <span>{btcSignal.symbol}</span>
                  </h3>
                  <Badge type="sentiment" value={btcSignal.sentimentLabel}>
                    {btcSignal.sentimentLabel}
                  </Badge>
                </div>
                <p className="demo-summary">{btcSignal.summary}</p>
                <KeywordChips keywords={btcSignal.keywords} />
              </div>
              <FearGreedScore score={btcSignal.fearGreedScore} />
            </div>
            <div className="demo-ratio-block">
              <p className="section-eyebrow">Sentiment Ratio</p>
              <SentimentRatioBar
                positive={btcSignal.positive}
                neutral={btcSignal.neutral}
                negative={btcSignal.negative}
              />
            </div>
          </Card>
        </section>
      )}

      <section className="landing-disclaimer">
        <p>이 서비스는 투자 조언이 아닌 커뮤니티 감정 분석 기반 참고 자료입니다.</p>
      </section>
    </div>
  );
}

export default LandingPage;
