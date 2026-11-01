export type FolderId = 
  | 'k12' 
  | 'english' 
  | 'university' 
  | 'programming' 
  | 'skills' 
  | 'cognition' 
  | 'classics'
  | 'primary' 
  | 'junior' 
  | 'senior' 
  | 'cet' 
  | 'cert';

export interface FolderInfo {
  id: FolderId;
  code: string; // e.g. "01"
  name: string; // e.g. "中小学同步教辅与中高考培优"
  title: string; // e.g. "01 中小学同步教辅与中高考培优"
  subtitle: string; // e.g. "K12全科 / 语数英物化生 / 名师课件 / 状元笔记"
  description: string;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  folderId?: FolderId | 'all'; // Assigned folder directory
  folderIds?: FolderId[]; // Optional multiple folders
  grade: '小学' | '初中' | '高中' | '全学段' | '大学/考级' | '大学/考研' | '职业/技能' | '通用/综合';
  gradeDetail: string; // e.g. "1-6年级", "8年级上册", "7-9年级", "0-5级全套"
  subject: '语文' | '数学' | '英语' | '物理' | '化学' | '生物' | '历史' | '全科' | '国学/拓展' | '考级/综合' | '编程/AI' | '技能/实用' | '思维/认知' | '名著/通识';
  series: '必刷题系列' | '53系列' | '万唯中考' | '名校课堂' | '名校题库' | '名校学典' | '学霸笔记' | '模拟试卷' | '模拟/真题卷' | '国学经典' | '国学/课外' | '综合资源' | string;
  version: string; // e.g. "2026版", "2025版", "2023-2025版"
  edition?: string; // e.g. "人教版", "北师大版", "成都人教版"
  format: '网盘合集' | 'PDF电子书' | 'Word/试卷' | '全套课件/教案' | '视频课程' | '电子书/讲义';
  quarkUrl: string;
  shareCode?: string;
  extractCode?: string; // e.g. "e58i" for Baidu pan or other cloud drives
  panType?: 'quark' | 'baidu' | 'wangpan8' | 'other';
  panName?: string; // e.g. "百度网盘", "夸克网盘", "防封直达"
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

export type GradeFilter = '全部' | '小学' | '初中' | '高中' | '大学/考级' | '大学/考研' | '职业/技能' | '通用/综合';
export type SubjectFilter = '全部' | '语文' | '数学' | '英语' | '物理' | '化学' | '生物' | '历史' | '全科' | '国学/拓展' | '考级/综合' | '编程/AI' | '技能/实用' | '思维/认知' | '名著/通识';
export type SeriesFilter = '全部' | '必刷题系列' | '53系列' | '万唯中考' | '名校课堂/题库' | '学霸笔记' | '模拟/真题卷' | '国学/课外' | '综合资源';
export type SortOption = 'default' | 'hot' | 'rating' | 'newest';


