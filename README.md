# 四时田园杂兴 - 沉浸式古诗学习

<div align="center">

一个基于 React + TypeScript 的沉浸式古诗词学习应用，通过游戏化的方式让用户体验《四时田园杂兴》的田园意境。

</div>

## ✨ 功能特色

- 🎮 **沉浸式游戏体验**：通过"耘田"、"绩麻"、"种瓜"三个互动场景，深入理解古诗内容
- 📚 **知识卡片**：在游戏过程中展示生字词的读音和释义
- 🎨 **古风界面**：采用宣纸纹理、毛笔字体等中国传统元素
- 🤖 **AI 智能评语**：可选配置 Gemini API，获得个性化的学习反馈
- 📱 **多设备支持**：同时支持鼠标和触摸屏操作

## 🎯 游戏场景

| 场景 | 诗句 | 玩法 |
|------|------|------|
| 昼出耘田 | "昼出耘田夜绩麻" | 点击清除杂草 |
| 夜绩麻 | "村庄儿女各当家" | 按住鼠标左右滑动，模拟搓麻绳 |
| 学种瓜 | "童孙未解供耕织，也傍桑阴学种瓜" | 依次完成挖坑、撒籽、掩土 |
| 诗卷回顾 | 完整诗句展示 | 朗诵互动和老师评语 |

## 🚀 快速开始

### 前置要求

- Node.js 16+

### 安装运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 配置 AI 功能（可选）

如果想启用 AI 生成的个性化老师评语，请：

1. 复制 `.env.example` 为 `.env.local`
2. 填入你的 Gemini API Key：

```
VITE_GEMINI_API_KEY=your_api_key_here
```

> 💡 不配置 API Key 也可以正常使用，系统会显示预设的评语

## 📁 项目结构

```
├── App.tsx                 # 主应用组件
├── components/
│   ├── Intro.tsx           # 首页/诗词展示
│   ├── DayWeeding.tsx      # 昼出耘田（除草游戏）
│   ├── NightHemp.tsx       # 夜绩麻（搓麻绳游戏）
│   ├── ChildPlanting.tsx   # 学种瓜（种瓜游戏）
│   └── Finale.tsx          # 诗卷回顾与朗诵
├── services/
│   └── geminiService.ts    # Gemini AI 服务
├── types.ts                # 类型定义与知识库
├── index.css               # 自定义动画样式
└── public/
    └── favicon.svg         # 应用图标
```

## 🛠️ 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS + 自定义 CSS 动画
- **AI 服务**：Google Gemini API（可选）
- **字体**：芝麻黑（Zhi Mang Xing）书法字体

## 📝 古诗原文

**四时田园杂兴（其三十一）**  
*南宋·范成大*

> 昼出耘田夜绩麻，  
> 村庄儿女各当家。  
> 童孙未解供耕织，  
> 也傍桑阴学种瓜。

---

<div align="center">

Made with ❤️ 传承中华传统文化

</div>
