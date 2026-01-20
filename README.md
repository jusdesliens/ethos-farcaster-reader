# 🛡️ Ethos Farcaster Channel Reader

A Farcaster Mini App that enhances channel feeds with reputation scoring powered by Ethos Score.

## 🎯 Features

- **Trust Rank Sorting**: Casts ranked by Ethos Score + social engagement
- **Smart Filtering**: Filter by trust levels (High/Mid/Low)
- **Content Quarantine**: Low trust content collapsed by default
- **Real-time Scoring**: Cached Ethos scores with 10-minute TTL
- **Multi-channel Support**: Read any Farcaster channel

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Neynar SDK for Farcaster data
- **Reputation**: Ethos Score API

## 🚀 Deployment

Deployed on Vercel with automatic GitHub integration.

## 📊 Trust Rank Formula
```
TrustRank = 0.75 × EthosScore + 0.25 × (log(1 + likes + recasts) × 20)
```

## 🎨 Trust Levels

| Level | Score Range | Badge Color |
|-------|-------------|-------------|
| High Trust | ≥70 | 🟢 Green |
| Mid Trust | 40-69 | 🟡 Yellow |
| Low Trust | <40 | 🔴 Red |

## 🎯 Hackathon Category

**Reputation-driven improvement**: Enhancing Farcaster channels with trust signals from Ethos Score.

## 📝 License

MIT
