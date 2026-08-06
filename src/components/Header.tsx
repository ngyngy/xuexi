import React from 'react';
import { Search, BookOpen, Star, Download, HelpCircle, MessageSquarePlus, Sparkles } from 'lucide-react';
import { HOT_SEARCH_TAGS } from '../data/resources';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenGuide: () => void;
  onOpenRequestModal: () => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  favoritesCount,
  onOpenFavorites,
  onOpenGuide,
  onOpenRequestModal,
  totalCount,
}) => {
  return (
    <header className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white border-b border-slate-700/60 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Navbar Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-blue-200">
                  中小学学习资料网
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  xuexi.ngy123.com
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>中小学全科提分资料</span>
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                <span>必刷题 · 53系列 · 万唯中考 · 学霸笔记</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href="https://x.com/nangongyuan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-400/30 transition-all shadow-sm"
              title="关注南宫远推特 @nangongyuan"
            >
              <svg className="w-3.5 h-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>南宫远推特 @nangongyuan</span>
            </a>

            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700/80 text-sky-300 border border-sky-500/30 transition-all shadow-sm"
              title="夸克网盘保存与下载教程"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>转存指南</span>
            </button>

            <button
              onClick={onOpenRequestModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700/80 text-indigo-300 border border-indigo-500/30 transition-all shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4 text-indigo-400" />
              <span>求资料/反馈</span>
            </button>

            <button
              onClick={onOpenFavorites}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all shadow-sm"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400/30" />
              <span>我的收藏</span>
              {favoritesCount > 0 && (
                <span className="ml-1 bg-amber-500 text-slate-950 font-black text-xs px-1.5 py-0.2 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Global Hero Search Bar */}
        <div className="mt-5">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="全文检索：支持搜书名、年级、学科、出版社（如: 2026名校课堂, 万唯, 53, 8年级数学, 古文观止）..."
                className="w-full pl-11 pr-24 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-white placeholder-slate-400 text-sm sm:text-base rounded-2xl border border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 px-3 py-1 text-xs text-slate-400 hover:text-white bg-slate-700 rounded-lg transition-colors"
                >
                  清空
                </button>
              ) : (
                <span className="absolute right-3 hidden sm:flex items-center gap-1 text-xs text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  全文检索
                </span>
              )}
            </div>

            {/* Hot Tags Quick Search Pills */}
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-xs text-slate-400">
              <span className="font-semibold text-slate-300 mr-1 shrink-0">🔥 热搜关键词:</span>
              {HOT_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearchChange(tag)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    searchQuery === tag
                      ? 'bg-sky-500 text-white font-medium'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
