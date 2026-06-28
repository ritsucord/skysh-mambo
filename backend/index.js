import express from 'express';
import cors from 'cors';

const storage = {
    "analysis": {
        "symbols": {
            "KRW-BTC": {
                "Korea:": {},
                "Korea:dcinside": {
                    "period": "24h", // min period is 24h
                    "updatedAt": 1751093678999,
                    "historicalTrends": [
                        {
                            "timestamp": 1751022000000,
                            "sentimentIndex": 42.5,
                            "askBidRatio": -0.15,
                            "mentionCount": 450
                        },
                        {
                            "timestamp": 1751043600000,
                            "sentimentIndex": 58.2,
                            "askBidRatio": 0.32,
                            "mentionCount": 620
                        },
                        {
                            "timestamp": 1751065200000,
                            "sentimentIndex": 78.4, 
                            "askBidRatio": 0.85,
                            "mentionCount": 1150
                        }
                    ],
                    "futureExpectations": {
                        "marketOutlook": "STRONG_BULLISH",
                        "confidenceScore": 0.88214512,
                        "expectedTimeframe": "SHORT_TERM",
                        "predictedBoundaries": {
                            "estimatedSupportPrice": 96500000,
                            "estimatedResistancePrice": 104000000
                        },
                        "reliability": 0.45257712,
                        "llmConsensusSummary": "지난 12시간 동안 매수 성향 지표가 0.32에서 0.85로 급격히 수직 상승했습니다. 대중 커뮤니티 내 포모(FOMO) 심리가 확산되고 있으며, 단기적으로 104,000,000원 선의 저항대를 돌파하려는 시도가 나타날 것으로 예상됩니다."
                    },
                    lastPosts: {
                        "651267...8013897": {
                            "updatedAt": 1751065200000,
                            "parameters": {
                                "sentiment": {
                                    "happiness": 0.05981749,
                                    "madness": 0.57622345,
                                    "fomo": 0.48609888,
                                    "panic": 0.91612388
                                },
                                "ask_bid": -0.90721255,
                                "reliability": 0.95792745,
                                "fact_reliability": 0.25122546,
                            }
                        }
                    }
                }
            },
        },
        "users": {
            "d77faca67e...225e73155": {
                "transactions": {
                    "KRW-BTC": [
                        {
                            "ask_bid": "BID",
                            "trade_price": 98000000,
                            "trade_volume": 30,
                            "timestamp": 1751065587721
                        },
                        {
                            "ask_bid": "ASK",
                            "trade_price": 103000000,
                            "trade_volume": 402,
                            "timestamp": 1751068799336
                        },
                    ]
                },
                "tendencies": {
                    "KRW-BTC": {
                        "metrics": {
                            "persona": "Aggressive_Scalper", // 투자 성향
                            "consistencyScore": 0.94125212, // 일관성
                            "psychologyStatus": "FOMO_HIGH", // 감정 상태
                            "psychologyScore": 0.81711762, // 감정 점수
                            "reliability": 0.78512245, // 신뢰도
                            "certifications": 508 // 트랜섹션 인증 거래 수
                        },
                    }
                }
            },
        }
    },
};

function parsePost(url) {
    // TODO
}

function analyzePost({
    symbol, userHash, timestamp, rawTitle, rawContent, meta
}, {
    persona, consistencyScore, psychologyStatus, psychologyScore, reliability, certifications
}) {
    // TODO
    return {
        "parameters": {
            "sentiment": {
                "happiness": 0.05981749,
                "madness": 0.57622345,
                "fomo": 0.48609888,
                "panic": 0.91612388
            },
            "ask_bid": -0.90721255,
            "reliability": 0.95792745,
            "fact_reliability": 0.25122546,
        }
    };
}

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/v1/analysis/public', (req, res) => {
    const {
        symbol, country, platform
    } = req.query;
    if (
        typeof symbol != 'string' ||
        typeof country != 'undefined' &&
        typeof country != 'string' ||
        typeof platform != 'undefined' &&
        typeof platform != 'string'
    ) return res.status(400).json({ success: false, e: 'invalid sheme' });
    const key = `${country}:${platform}`;
    const result = structuredClone(storage.analysis.symbols?.[symbol]?.[key]);
    if (!result) return res.status(404).json({
        success: false,
        e: 'invalid symbol or country or platform'
    });
    const {
        lastPosts, ...others
    } = result;
    res.status(200).json({
        success: true,
        ...others
    });
});

app.post('/api/v1/analysis/public/post', (req, res) => {
    const {
        symbol, userHash, timestamp, rawTitle, rawContent, meta
    } = req.body;
    if (
        typeof symbol != 'string' ||
        typeof userHash != 'undefined' &&
        typeof userHash != 'string' ||
        typeof timestamp != 'number' ||
        typeof rawTitle != 'string' ||
        typeof rawContent != 'string' ||
        typeof meta != 'object' ||
        meta == null
    ) return res.status(400).json({ success: false, e: 'invalid sheme' });
    const {
        country, platform, url
    } = meta;
    if (
        typeof country != 'string' ||
        typeof platform != 'string' ||
        typeof url != 'string'
    )  return res.status(400).json({ success: false, e: 'invalid sheme' });
    const key = `${country}:${platform}`;
    const result = storage.analysis.symbols?.[symbol]?.[key]?.lastPosts;
    if (result == undefined) return res.status(404).json({
        success: false,
        e: 'invalid symbol or country or platform'
    });
    if (parsePost(url) in result) {
        const {
            updatedAt, ...others
        } = result;
        return res.status(202).json({
            success: true,
            ...others
        });
    }
    const userTen = storage.analysis.users?.[userHash]
        ?.tendencies?.[key]?.metrics;
    const analyzeRes = analyzePost(req.body, userTen);
    result[parsePost(url)] = {
        ...analyzeRes,
        updatedAt: timestamp
    };
    return res.status(200).json({
        success: true,
        ...analyzeRes
    });
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(400)
        .json({ success: false, e: 'invalid json' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});