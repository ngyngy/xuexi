import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Resource } from '../types';
import { X, Star, Copy, ExternalLink, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Resource[];
  onRemoveFavorite: (id: string) => void;
  onCopyLink: (resource: Resource) => void;
  onOpenDetail: (resource: Resource) => void;
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onCopyLink,
  onOpenDetail,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleCopyAllLinks = () => {
    if (favorites.length === 0) return;
    const text = favorites
      .map(
        (f, idx) =>
          `${idx + 1}. 【${f.grade}·${f.subject}】${f.title}\n链接：${f.quarkUrl}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    onShowToast(`已一次性复制 ${favorites.length} 份收藏资料的夸克网盘链接！`, 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white max-w-md w-full h-full shadow-2xl flex flex-col border-l border-slate-200"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-white text-white" />
              <div>
                <h2 className="text-base font-black">我的收藏资料</h2>
                <p className="text-xs text-amber-100">已保存 {favorites.length} 份精选资源</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favorites.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">暂无收藏资料</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  浏览列表时点击资料卡片右上角的星号，即可加入个人常用资料库，方便批量复制与复习！
                </p>
              </div>
            ) : (
              favorites.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-amber-300 bg-slate-50/50 flex flex-col gap-2 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {res.grade} · {res.subject}
                    </span>
                    <button
                      onClick={() => onRemoveFavorite(res.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="移除收藏"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4
                    onClick={() => {
                      onOpenDetail(res);
                      onClose();
                    }}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600 line-clamp-2 cursor-pointer"
                  >
                    {res.title}
                  </h4>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <button
                      onClick={() => onCopyLink(res)}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>复制链接</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenDetail(res);
                        onClose();
                      }}
                      className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-0.5"
                    >
                      <span>详情</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {favorites.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
              <button
                onClick={handleCopyAllLinks}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <Copy className="w-4 h-4" />
                <span>批量复制全部 ({favorites.length}) 链接</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
