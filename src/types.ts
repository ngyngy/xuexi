export type FolderId = 'primary' | 'junior' | 'senior' | 'cet' | 'cert';

export interface FolderInfo {
  id: FolderId;
  code: string; // e.g. "01"
  name: string; // e.g. "小学"
  title: string; // e.g. "01 小学"
  subtitle: string; // e.g. "1-6年级全科 / 课件教案 / 名校试卷 / 启蒙拓展"
  description: string;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  folderId?: FolderId | 'all'; // Assigned folder directory
  grade: '小学' | '初中' | '高中' | '全学段' | '大学/考级';
  gradeDetail: string; // e.g. "1-6年级", "8年级上册", "7-9年级", "0-5级全套"
  subject: '语文' | '数学' | '英语' | '生物' | '全科' | '国学/拓展' | '考级/综合';
  series: '必刷题系列' | '53系列' | '万唯中考' | '名校课堂' | '名校题库' | '名校学典' | '学霸笔记' | '模拟试卷' | '模拟/真题卷' | '国学经典' | '国学/课外' | '综合资源';
  version: string; // e.g. "2026版", "2025版", "2023-2025版"
  edition?: string; // e.g. "人教版", "北师大版", "成都人教版"
  format: '网盘合集' | 'PDF电子书' | 'Word/试卷' | '全套课件/教案';
  quarkUrl: string;
  shareCode?: string;
  extractCode?: string; // e.g. "e58i" for Baidu pan or other cloud drives
  panType?: 'quark' | 'baidu' | 'other';
  panName?: string; // e.g. "百度网盘", "夸克网盘"
  description: string;
  highlights: string[];
  contents: string[];
  recommendedFor: string;
  rating: number; // e.g. 4.9
  downloadCount: number; // e.g. 15400
  updatedAt: string; // e.g. "2026-08"
  isHot?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export type GradeFilter = '全部' | '小学' | '初中' | '高中' | '大学/考级';
export type SubjectFilter = '全部' | '语文' | '数学' | '英语' | '生物' | '全科' | '国学/拓展' | '考级/综合';
export type SeriesFilter = '全部' | '必刷题系列' | '53系列' | '万唯中考' | '名校课堂/题库' | '学霸笔记' | '模拟/真题卷' | '国学/课外';
export type SortOption = 'default' | 'hot' | 'rating' | 'newest';

