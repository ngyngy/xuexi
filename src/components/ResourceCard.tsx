import React from 'react';
import { Resource } from '../types';
import { Star, Download, Copy, ExternalLink, CheckCircle2, Flame, Layers, Sparkles } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (resource: Resource) => void;
  onCopyLink: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onCopyLink,
}) => {
  // Grade color badges
  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case '小学':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '初中':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case '高中':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-250 flex flex-col justify-between group overflow-hidden relative">
      {/* Top Banner Accent */}
      {resource.isHot && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-3 py-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>爆款热门资料</span>
          </span>
          <span className="opacity-90">{resource.version}</span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Badges & Favorite Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getGradeBadgeClass(
                resource.grade
              )}`}
            >
              {resource.grade} ({resource.gradeDetail})
            </span>

            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {resource.subject}
            </span>

            {resource.series && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {resource.series}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleFavorite(resource.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
            }`}
            title={isFavorite ? '取消收藏' : '加入收藏'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(resource)}
          className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
        >
          {resource.title}
        </h3>

        {/* Format & Version pill */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="bg-sky-50 text-sky-700 font-semibold px-2 py-0.5 rounded border border-sky-100 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {resource.format}
          </span>
          {resource.edition && (
            <span className="truncate max-w-[150px] text-slate-600">
              {resource.edition}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {resource.description}
        </p>

        {/* Highlights List */}
        <div className="mt-auto bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-1.5 mb-4">
          {resource.highlights.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        {/* Rating and Downloads Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 mb-4">
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{resource.rating.toFixed(1)} 分</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>{(resource.downloadCount / 1000).toFixed(1)}k 人已转存</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopyLink(resource);
            window.open(resource.quarkUrl, '_blank', 'noopener,noreferrer');
          }}
          className="w-full relative group overflow-hidden rounded-xl bg-slate-950 p-[2px] transition-all hover:scale-[1.01] active:scale-[0.98] shadow-md hover:shadow-orange-500/25 cursor-pointer"
          title="点击自动复制网盘口令并直达夸克网盘保存"
        >
          <div className="w-full py-2.5 px-3 rounded-[10px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 tracking-wide group-hover:brightness-110 transition-all">
            <Download className="w-4 h-4 stroke-[2.5] text-white shrink-0" />
            <span>获取资源 (夸克网盘)</span>
          </div>
        </button>

        <div className="flex items-center justify-between text-xs px-1 text-slate-500 pt-0.5">
          <button
            onClick={() => onCopyLink(resource)}
            className="text-slate-600 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
            title="一键复制夸克网盘链接与口令"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>仅复制口令</span>
          </button>

          <button
            onClick={() => onOpenDetail(resource)}
            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>查看完整目录及详情</span>
          </button>
        </div>
      </div>
    </div>
  );
};
