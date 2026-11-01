import Fuse, { IFuseOptions } from 'fuse.js';
import { Resource, GradeFilter, SubjectFilter, SeriesFilter, SortOption, FolderId } from '../types';

const fuseOptions: IFuseOptions<Resource> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'tags', weight: 0.2 },
    { name: 'series', weight: 0.15 },
    { name: 'subject', weight: 0.1 },
    { name: 'gradeDetail', weight: 0.05 },
    { name: 'description', weight: 0.05 },
    { name: 'edition', weight: 0.03 },
    { name: 'version', weight: 0.02 }
  ],
  threshold: 0.35,
  includeMatches: true,
  ignoreLocation: true,
  minMatchCharLength: 1
};

export function filterAndSearchResources(
  allResources: Resource[],
  query: string,
  grade: GradeFilter,
  subject: SubjectFilter,
  series: SeriesFilter,
  sort: SortOption,
  folderId: FolderId | null = null
): Resource[] {
  let list = allResources;

  // 1. Folder Directory Filter
  if (folderId) {
    list = list.filter((res) => {
      if (res.folderId === folderId || (res.folderIds && res.folderIds.includes(folderId))) return true;
      if (folderId === 'k12' && (res.folderId === 'primary' || res.folderId === 'junior' || res.folderId === 'senior')) return true;
      if (folderId === 'english' && res.folderId === 'cet') return true;
      if (folderId === 'university' && res.folderId === 'cert') return true;
      return false;
    });
  }

  // 2. Fuse.js Full-Text Fuzzy Search
  if (query.trim()) {
    const fuse = new Fuse(list, fuseOptions);
    const searchResults = fuse.search(query.trim());
    list = searchResults.map((result) => result.item);
  }

  // 3. Grade Filter
  if (grade !== '全部') {
    list = list.filter((res) => {
      if (grade === '小学') return res.grade === '小学' || res.grade === '全学段';
      if (grade === '初中') return res.grade === '初中' || res.grade === '全学段';
      if (grade === '高中') return res.grade === '高中' || res.grade === '全学段';
      if (grade === '大学/考研' || grade === '大学/考级') return res.grade === '大学/考研' || res.grade === '大学/考级' || res.folderId === 'university';
      if (grade === '职业/技能') return res.grade === '职业/技能' || res.folderId === 'programming' || res.folderId === 'skills';
      if (grade === '通用/综合') return res.grade === '通用/综合' || res.folderId === 'cognition' || res.folderId === 'classics';
      return res.grade === grade;
    });
  }

  // 4. Subject Filter
  if (subject !== '全部') {
    list = list.filter((res) => {
      if (subject === '语文') return res.subject === '语文' || res.subject === '全科' || res.subject === '国学/拓展';
      if (subject === '数学') return res.subject === '数学' || res.subject === '全科';
      if (subject === '英语') return res.subject === '英语' || res.subject === '全科';
      if (subject === '物理') return res.subject === '物理' || res.subject === '全科';
      if (subject === '化学') return res.subject === '化学' || res.subject === '全科';
      if (subject === '生物') return res.subject === '生物' || res.subject === '全科';
      if (subject === '历史') return res.subject === '历史' || res.subject === '全科';
      if (subject === '国学/拓展') return res.subject === '国学/拓展' || res.tags.includes('国学');
      if (subject === '考级/综合') return res.subject === '考级/综合' || res.tags.includes('考级');
      if (subject === '编程/AI') return res.subject === '编程/AI' || res.folderId === 'programming' || res.tags.includes('AI编程');
      if (subject === '技能/实用') return res.subject === '技能/实用' || res.folderId === 'skills' || res.tags.includes('实用技能');
      if (subject === '思维/认知') return res.subject === '思维/认知' || res.folderId === 'cognition' || res.tags.includes('思维认知');
      if (subject === '名著/通识') return res.subject === '名著/通识' || res.folderId === 'classics' || res.tags.includes('经典通识');
      if (subject === '全科') return res.subject === '全科';
      return res.subject === subject;
    });
  }

  // 5. Series Filter
  if (series !== '全部') {
    list = list.filter((res) => {
      if (series === '必刷题系列') return res.series === '必刷题系列';
      if (series === '53系列') return res.series === '53系列';
      if (series === '万唯中考') return res.series === '万唯中考';
      if (series === '名校课堂/题库') return res.series === '名校课堂' || res.series === '名校题库' || res.series === '名校学典';
      if (series === '学霸笔记') return res.series === '学霸笔记';
      if (series === '模拟/真题卷') return res.series === '模拟试卷';
      if (series === '国学/课外') return res.series === '国学经典' || res.subject === '国学/拓展';
      return true;
    });
  }

  // 6. Sort Option
  const sorted = [...list];
  if (sort === 'hot') {
    sorted.sort((a, b) => b.downloadCount - a.downloadCount);
  } else if (sort === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } else {
    // Default sorting: Featured first, then hot, then high download
    sorted.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.downloadCount - a.downloadCount;
    });
  }

  return sorted;
}

