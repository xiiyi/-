
import { GoogleGenAI } from "@google/genai";

// Educator service using Gemini to provide context-aware encouragement
// 使用 Vite 的环境变量格式
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// 预设的老师评语列表，当 AI 不可用时随机返回
const FALLBACK_FEEDBACKS = [
  "学习得真棒！你已经深刻理解了劳动人民的辛勤与孩子们的纯真情趣。继续保持对传统文化的热爱！",
  "你已领悟田园诗的真谛：勤劳是美德，童心是珍宝。愿你永葆这份纯真！",
  "从耘田到种瓜，你已融入了这首诗的意境。劳动光荣，童趣永存！",
  "恭喜完成学习！昔日田园风光，今朝化作心中一片绿洲。勤学如耕田，收获满满！",
  "妙哉！你不仅读懂了诗句，更体会了其中的童真与勤劳。继续前行，必有所成！"
];

export const getTeacherFeedback = async (studentProgress: string): Promise<string> => {
  // 如果没有配置 API Key，直接返回预设评语
  if (!ai) {
    const randomIndex = Math.floor(Math.random() * FALLBACK_FEEDBACKS.length);
    return FALLBACK_FEEDBACKS[randomIndex];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `学生刚刚完成了《四时田园杂兴》（其三十一）的互动游戏学习。请作为一位资深的古诗教师，用亲切的语气给学生写一段30字左右的总结性鼓励，并强调"勤劳"和"童心"这两个主题。进度详情：${studentProgress}`,
    });
    return response.text || FALLBACK_FEEDBACKS[0];
  } catch (error) {
    console.error("Gemini service error:", error);
    const randomIndex = Math.floor(Math.random() * FALLBACK_FEEDBACKS.length);
    return FALLBACK_FEEDBACKS[randomIndex];
  }
};
