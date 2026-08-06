import React, { useState, useEffect, useMemo } from 'react';
import { RESOURCES_DATA } from './data/resources';
import { Resource, GradeFilter, SubjectFilter, SeriesFilter, SortOption } from './types';
import { filterAndSearchResources } from './utils/search';

import { Header } from './components/Header';
import { SpecialCollections } from './components/SpecialCollections';
import { FilterBar } from './components/FilterBar';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { DownloadGuideModal } from './components/DownloadGuideModal';
import { RequestResourceModal } from './components/RequestResourceModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';

import { BookOpen, SearchX, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export default function App() {
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
  const handleCopyLink = (resource: Resource) => {
    const formattedText = `【中小学学习资料网推荐 (xuexi.ngy123.com)】夸克网盘分享：「${resource.title}」\n链接：${resource.quarkUrl}\n点击链接或复制整段内容，打开「夸克APP」即可获取与转存。`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedText).then(() => {
        addToast(`已复制「${resource.title}」夸克网盘链接！`, 'success');
      }).catch(() => {
        addToast(`网盘链接：${resource.quarkUrl}`, 'info');
      });
    } else {
      addToast(`网盘链接：${resource.quarkUrl}`, 'info');
    }
  };

  // Filtered and Searched Resources
  const filteredResources = useMemo(() => {
    return filterAndSearchResources(RESOURCES_DATA, searchQuery, grade, subject, series, sort);
  }, [searchQuery, grade, subject, series, sort]);

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
    addToast('已重置所有过滤与搜索条件', 'info');
  };

  // Handle Special Collections Selection
  const handleSelectCollection = (query: string) => {
    setSearchQuery(query);
    setGrade('全部');
    setSubject('全部');
    setSeries('全部');
  };

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

        {/* Resource Grid / List */}
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
        ) : (
          /* Empty Search Results Feedback */
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-sm max-w-xl mx-auto my-8 space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">未检索到匹配的学习资料</h3>
              <p className="text-xs text-slate-500 mt-1">
                可以尝试缩短关键词、或清空【学段/学科】过滤条件重试。
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
