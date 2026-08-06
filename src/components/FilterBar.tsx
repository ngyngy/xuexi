import React from 'react';
import { GradeFilter, SubjectFilter, SeriesFilter, SortOption } from '../types';
import { Filter, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  grade: GradeFilter;
  setGrade: (grade: GradeFilter) => void;
  subject: SubjectFilter;
  setSubject: (subject: SubjectFilter) => void;
  series: SeriesFilter;
  setSeries: (series: SeriesFilter) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  resultCount: number;
  onReset: () => void;
  activeSearchQuery: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  grade,
  setGrade,
  subject,
  setSubject,
  series,
  setSeries,
  sort,
  setSort,
  resultCount,
  onReset,
  activeSearchQuery,
}) => {
  const gradeOptions: GradeFilter[] = ['全部', '小学', '初中', '高中'];
  const subjectOptions: SubjectFilter[] = ['全部', '语文', '数学', '英语', '生物', '全科', '国学/拓展'];
  const seriesOptions: SeriesFilter[] = [
    '全部',
    '必刷题系列',
    '53系列',
    '万唯中考',
    '名校课堂/题库',
    '学霸笔记',
    '模拟/真题卷',
    '国学/课外'
  ];

  const hasActiveFilters =
    grade !== '全部' || subject !== '全部' || series !== '全部' || activeSearchQuery !== '';

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 space-y-4">
      {/* Grade Level Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-xs font-bold text-slate-500 min-w-[70px] flex items-center gap-1.5 shrink-0">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>适用学段:</span>
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {gradeOptions.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                grade === g
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-500 min-w-[70px] flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
          <span>按学科:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {subjectOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                subject === s
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Series / Type Filter & Sort Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        {/* Series Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 shrink-0">资料系列:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {seriesOptions.map((ser) => (
              <button
                key={ser}
                onClick={() => setSeries(ser)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  series === ser
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {ser}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Status controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>排序:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1 border border-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="default">综合推荐</option>
              <option value="hot">🔥 下载最多</option>
              <option value="rating">⭐️ 评分最高</option>
              <option value="newest">🆕 最新更新</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              找到 <strong className="text-blue-600 font-bold">{resultCount}</strong> 份学习资料
            </span>

            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded-md bg-rose-50 hover:bg-rose-100 transition-colors"
                title="重置所有条件"
              >
                <RotateCcw className="w-3 h-3" />
                <span>重置</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
