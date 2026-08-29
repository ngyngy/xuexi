import React from 'react';
import { Search, BookOpen, Star, Download, HelpCircle, MessageSquarePlus, Sparkles, Mail } from 'lucide-react';
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
                  学习资料网
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  xuexi.ngy123.com
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>小学 · 初中 · 高中 · 四六级 · 考研考证</span>
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                <span>必刷题 · 名校真题 · 网盘精选</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Wangpan8 Main Portal Button */}
            <a
              href="https://www.wangpan8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md shadow-amber-500/20 border border-amber-300 transition-all transform hover:scale-[1.02] active:scale-95"
              title="访问网盘总站：www.wangpan8.com"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              <span>总站入口 (wangpan8.com)</span>
            </a>

            {/* Weibo Link */}
            <a
              href="https://weibo.com/u/6184008812"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-400/30 transition-all shadow-sm"
              title="关注南宫远微博：https://weibo.com/u/6184008812"
            >
              <svg className="w-3.5 h-3.5 fill-current text-rose-400" viewBox="0 0 24 24">
                <path d="M10.093 20.916c-4.52 0-8.193-2.668-8.193-5.952 0-3.32 3.73-5.999 8.272-5.999 4.544 0 8.217 2.679 8.217 6 0 3.283-3.714 5.951-8.296 5.951zm-.498-3.414c1.84 0 3.33-1.077 3.33-2.404 0-1.328-1.49-2.405-3.33-2.405-1.84 0-3.33 1.077-3.33 2.405 0 1.327 1.49 2.404 3.33 2.404zm7.65-8.237c1.378.435 2.44 1.498 2.875 2.875.14.44-.105.908-.546 1.047-.44.14-.908-.105-1.047-.546-.3-1-.95-1.74-1.95-2.04-.44-.14-.686-.607-.546-1.047.14-.44.607-.686 1.047-.546zm3.32-3.32c2.977.94 5.27 3.234 6.21 6.21.14.44-.105.908-.546 1.047-.44.14-.908-.105-1.047-.546-.778-2.463-2.686-4.37-5.15-5.15-.44-.14-.686-.607-.546-1.047.14-.44.607-.686 1.047-.546z" />
              </svg>
              <span>南宫远微博</span>
            </a>

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
              <span>南宫远推特</span>
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-900/60 hover:bg-indigo-800/80 text-indigo-200 border border-indigo-400/40 transition-all shadow-sm group"
              title="没找到资料？发邮件至 hi@ngy123.com 求资源"
            >
              <Mail className="w-4 h-4 text-indigo-300 group-hover:scale-110 transition-transform" />
              <span>求资源 (hi@ngy123.com)</span>
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
