
export enum GameStage {
  INTRO = 'INTRO',
  DAY_WEEDING = 'DAY_WEEDING',
  NIGHT_HEMP = 'NIGHT_HEMP',
  CHILD_PLANTING = 'CHILD_PLANTING',
  FINALE = 'FINALE'
}

export interface KnowledgePoint {
  word: string;
  pinyin: string;
  meaning: string;
}

export const KNOWLEDGE_BASE: Record<string, KnowledgePoint> = {
  yun: { word: '耘田', pinyin: 'yún tián', meaning: '在田间除草。' },
  ji: { word: '绩麻', pinyin: 'jì má', meaning: '把麻搓成线。' },
  tongsun: { word: '童孙', pinyin: 'tóng sūn', meaning: '指小孩子。' },
  gong: { word: '供', pinyin: 'gòng', meaning: '从事。' },
  bang: { word: '傍', pinyin: 'bàng', meaning: '靠近。' },
};
