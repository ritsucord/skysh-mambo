1. 대중 커뮤니티 분석
2. 신뢰 공동체 구성
3. 게시글 신뢰도 검증

## 대중 반응 분석
- # 여론 분석
- **URL** /api/v1/analysis/public
- **Method** GET
- **Query**
    `symbol` **String**
    `country` **Optional[String]**
    `platform` **Optional[String]**
- **Request Body**
    ```json
    {
        "success": true,
        "period": "24h",
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
        }
    }
    ```

- # 단일 게시물 분석
- **URL** /api/v1/analysis/public/post
- **Method** POST
- **Request Body**
    ```json
    {
        "symbol": "KRW-BTC",
        "userHash": "d77faca67e...225e73155", // 익명의 경우 해당 필드를 적지 않음
        "timestamp": 1751068818273,
        "rawTitle": "방금 103층에서 풀매도하고 우리 뽀삐 개밥샀다. ㅁㅌㅊ",
        "rawContent": "...",
        "meta": {
            "country": "Korea",
            "platform": "dcinside",
            "url": "https://..."
        }
    }
    ```
- **Response Body**
    ```json
    {
        "success": true,
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
    ```

- # 수요보장 분석
- **URL** /api/v1/analysis/public/trends
- **Method** GET
- **Query**
    `symbol` **String**
    `targetPrice` **Number**
    `country` **Optional[String]**
    `platform` **Optional[String]**
- **Response Body**
    ```json
    {
        "success": true,
        "isBroken": true, // 임계치 돌파 여부
        "reliability": 0.79727666, // 신뢰도
        "expectedUsers": 8028, // 예상 투자자수
        "expectedQuantity": 98810, // 예상 물량
    }
    ```

## 특정 유저 반응 분석
- # 유저 분석
- **URL** /api/v1/analysis/user
- **Method** GET
- **Query**
    `symbol` **String**
    `userHash` **String**
- **Response Body**
    ```json
    {
        "success": true,
        "metrics": {
            "persona": "Aggressive_Scalper", // 투자 성향
            "consistencyScore": 0.94125212, // 일관성
            "psychologyStatus": "FOMO_HIGH", // 감정 상태
            "psychologyScore": 0.81711762, // 감정 점수
            "reliability": 0.78512245, // 신뢰도
            "certifications": 508 // 트랜섹션 인증 거래 수
        },
        "llmAssessment": "해당 식별자는 과거 대규모 거래 인증 비율이 높으며, 주로 단기 돌파 매매 성향을 보입니다. 현재 심리 상태는 강한 추격 매수 욕구를 나타내고 있어 시장 과열의 선행 지표로 활용 가능합니다."
    }
    ```

- # 거래내역 조회
- **URL** /api/v1/analysis/user/transaction
- **Method** GET
- **Query**
    `symbol` **String**
    `apiKey` **String** // 일정 기간 내에 증빙하지 않은
                        // 유저의 경우 조회를 차단하여 증빙 유도
    `userHash` **String**
    `startTime` **Number**
    `endTime` **Number**
- **Response Body**
    ```json
    {
        "success": true,
        "statement": [
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
    }
    ```


- # 거래내역 증빙
- **URL** /api/v1/analysis/user/transaction
- **Method** POST
- **Request Body**
    ```json
    {
        "symbol": "KRW-BTC",
        "userHash": "d77faca67e...225e73155",
        "startTime": 1751065587721,
        "endTime": 1751068799336,
        "zkProofData": {
            "proof": {
                "pi_a": ["243729...", "109384...", "1"],
                "pi_b": [
                    ["128392...", "948392..."],
                    ["482910...", "293849..."],
                    ["1", "0"]
                ],
                "pi_c": ["902843...", "384920...", "1"],
                "protocol": "groth16"
            },
            "publicSignals": [
                "8a3f9b2c...", // UserName
                "1", // Valid
                "5e97a...60635fe32c" // Hash
            ],
            "statement": [
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
    }
    ```
- **Response Body**
    ```json
    {
        "success": true,
        "derivedData": {
            "totalVolume": 432,
            "avgTradePrice": 102652777
        },
        "timestamp": 1751068800000
    }
    ```
