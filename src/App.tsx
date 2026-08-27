import React, { useState, useEffect, useMemo } from 'react';
import { RESOURCES_DATA } from './data/resources';
import { FOLDERS_DATA } from './data/folders';
import { Resource, GradeFilter, SubjectFilter, SeriesFilter, SortOption, FolderId } from './types';
import { filterAndSearchResources } from './utils/search';

import { Header } from './components/Header';
import { FolderDirectory } from './components/FolderDirectory';
import { SpecialCollections } from './components/SpecialCollections';
import { FilterBar } from './components/FilterBar';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { DownloadGuideModal } from './components/DownloadGuideModal';
import { RequestResourceModal } from './components/RequestResourceModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';

import { BookOpen, SearchX, Sparkles, Flame, CheckCircle2, Mail, FolderOpen, ArrowLeft } from 'lucide-react';

export default function App() {
  // Folder Directory State
  const [selectedFolderId, setSelectedFolderId] = useState<FolderId | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [grade, setGrade] = useState<GradeFilter>('全部');
  const [subject, setSubject] = useState<SubjectFilter>('全部');
  const [series, setSeries] = useState<SeriesFilter>('全部');
  const [sort, setSort] = useState<SortOption>('default');

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('xuehai_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers State
  const [activeModalResource, setActiveModalResource] = useState<Resource | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);

  // Toast Messages
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('xuehai_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }

      const res = RESOURCES_DATA.find((r) => r.id === id);
      if (res) {
        if (!exists) {
          addToast(`已添加「${res.title}」至我的收藏`, 'success');
        } else {
          addToast(`已将「${res.title}」移出收藏`, 'info');
        }
      }
      return next;
    });
  };

  // Copy Quark Link
  const handleCopyLink = (target: Resource | string, titleName?: string) => {
    const title = typeof target === 'string' ? (titleName || '学习资料') : target.title;
    const url = typeof target === 'string' ? target : target.quarkUrl;
    const shareCode = typeof target === 'string' ? '' : (target.shareCode || '');
    const koulingLine = shareCode ? `${shareCode}\n` : '';
    const formattedText = `【wangpan8.com 夸克网盘分享】：「${title}」\n${koulingLine}链接：${url}\n点击链接或复制整段内容，打开「夸克APP」即可获取与转存。`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedText).then(() => {
        addToast(`已复制「${title}」夸克网盘口令与链接！`, 'success');
      }).catch(() => {
        addToast(`网盘链接：${url}`, 'info');
      });
    } else {
      addToast(`网盘链接：${url}`, 'info');
    }
  };

  // Switch Folder
  const handleSelectFolder = (folderId: FolderId | null) => {
    setSelectedFolderId(folderId);
    if (folderId) {
      const folder = FOLDERS_DATA.find((f) => f.id === folderId);
      if (folder) {
        addToast(`已进入「${folder.title}」文件夹`, 'info');
      }
    } else {
      addToast('已返回全部文件夹根目录', 'info');
    }
  };

  // Filtered and Searched Resources
  const filteredResources = useMemo(() => {
    return filterAndSearchResources(RESOURCES_DATA, searchQuery, grade, subject, series, sort, selectedFolderId);
  }, [searchQuery, grade, subject, series, sort, selectedFolderId]);

  // Favorites List
  const favoriteResources = useMemo(() => {
    return RESOURCES_DATA.filter((r) => favoriteIds.includes(r.id));
  }, [favoriteIds]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setGrade('全部');
    setSubject('全部');
    setSeries('全部');
    setSort('default');
    setSelectedFolderId(null);
    addToast('已重置所有过滤与搜索条件', 'info');
  };

  // Handle Special Collections Selection
  const handleSelectCollection = (query: string) => {
    setSearchQuery(query);
    setGrade('全部');
    setSubject('全部');
    setSeries('全部');
    setSelectedFolderId(null);
  };

  const currentFolder = FOLDERS_DATA.find((f) => f.id === selectedFolderId);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased flex flex-col">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Top Header & Global Search */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenRequestModal={() => setIsRequestModalOpen(true)}
        totalCount={RESOURCES_DATA.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        {/* Curated Theme Cards */}
        <SpecialCollections
          onSelectCollection={handleSelectCollection}
          activeQuery={searchQuery}
        />

        {/* Wangpan8 Folder Directory Tree Navigator (In-Place Expandable Matching Reference Image) */}
        <FolderDirectory
          folders={FOLDERS_DATA}
          resources={RESOURCES_DATA}
          onOpenDetail={(res) => setActiveModalResource(res)}
          onCopyLink={handleCopyLink}
          onRequestResource={() => setIsRequestModalOpen(true)}
          searchQuery={searchQuery}
        />

        {/* Filter and Sort Bar */}
        <FilterBar
          grade={grade}
          setGrade={setGrade}
          subject={subject}
          setSubject={setSubject}
          series={series}
          setSeries={setSeries}
          sort={sort}
          setSort={setSort}
          resultCount={filteredResources.length}
          onReset={handleResetFilters}
          activeSearchQuery={searchQuery}
        />

        {/* Request Resource Prompt Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 text-white border border-indigo-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">没找到想要的资料？欢迎发邮件求资源</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                  官方邮箱
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                发送邮件至 <code className="font-mono text-amber-300 font-bold bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">hi@ngy123.com</code>，站长收到后会优先全网搜索并上传夸克网盘！
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="w-full md:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-slate-900" />
            <span>立即发邮件求资源</span>
          </button>
        </div>

        {/* Resource Grid / List or Empty Folder State */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isFavorite={favoriteIds.includes(resource.id)}
                onToggleFavorite={handleToggleFavorite}
                onOpenDetail={(res) => setActiveModalResource(res)}
                onCopyLink={handleCopyLink}
              />
            ))}
          </div>
        ) : selectedFolderId && currentFolder ? (
          /* Empty Folder UI (e.g. 05 考研考证) - Strict adherence to user intent: no fake materials, clear folder status */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 text-center shadow-sm max-w-2xl mx-auto my-6 space-y-4">
            <div className="relative w-20 h-16 mx-auto">
              <div className="w-20 h-16 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <FolderOpen className="w-9 h-9 text-white drop-shadow" />
              </div>
              <div className="absolute -top-2 left-2 w-8 h-3 bg-amber-400 rounded-t-md" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <span>📁 {currentFolder.title} 文件夹已建立</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                当前文件夹暂无资料（等待站长上传）
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                本站坚持【真网盘、真资料】原则，绝不瞎找或编造虚假资源。此分类文件夹已就绪，站长正在整理并准备上传真实有效的精选网盘资源。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setSelectedFolderId(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>返回全部文件夹</span>
              </button>

              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>向站长提供或求取本分类资料</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty Search Results Feedback */
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-sm max-w-xl mx-auto my-8 space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">未检索到匹配的学习资料</h3>
              <p className="text-xs text-slate-500 mt-1">
                可以尝试缩短关键词、或清空【学段/学科/文件夹】过滤条件重试。
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                重置搜索条件
              </button>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20"
              >
                提交【求资料】给站长
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ResourceDetailModal
        resource={activeModalResource}
        onClose={() => setActiveModalResource(null)}
        onCopyLink={handleCopyLink}
        allResources={RESOURCES_DATA}
        onSelectRelated={(rel) => setActiveModalResource(rel)}
        isFavorite={activeModalResource ? favoriteIds.includes(activeModalResource.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <DownloadGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <RequestResourceModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onShowToast={addToast}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favoriteResources}
        onRemoveFavorite={handleToggleFavorite}
        onCopyLink={handleCopyLink}
        onOpenDetail={(res) => setActiveModalResource(res)}
        onShowToast={addToast}
      />
    </div>
  );
}

