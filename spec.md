1. 대중 커뮤니티 분석
2. 신뢰 공동체 구성
3. 게시글 신뢰도 검증

# 위대한 PM님
yuu_**PM**u
 <-- ???ㅇㅇ






# LLM

## 대중 반응 분석
- /api/v1/analysis/public

- # 단일 게시물 분석
- **URL** /api/v1/analysis/public/post
- **Method** POST
- **Request Body**
    ```json
    {
        "symbol": "KRW-BTC",
        "userHash": "d77faca67e...225e73155",
        "timestamp": "2026-06-28T11:15:00Z",
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

## 특정 유저 반응 분석
- /api/v1/analysis/user

- #

## ZK 신뢰 공동체 분석
- /api/v1/analysis/group

- # 거래내역 증빙
- **URL** /api/v1/analysis/group/transaction
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
        
    }
    ```

# 