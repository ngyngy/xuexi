import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Resource } from '../types';
import {
  X,
  Star,
  Download,
  Copy,
  ExternalLink,
  CheckCircle2,
  FileText,
  BookOpen,
  Users,
  ShieldCheck,
  Share2,
  Sparkles
} from 'lucide-react';

interface ResourceDetailModalProps {
  resource: Resource | null;
  onClose: () => void;
  onCopyLink: (resource: Resource) => void;
  allResources: Resource[];
  onSelectRelated: (resource: Resource) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onCopyLink,
  allResources,
  onSelectRelated,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!resource) return null;

  // Find related resources (same grade or subject)
  const relatedResources = allResources
    .filter(
      (r) => r.id !== resource.id && (r.subject === resource.subject || r.grade === resource.grade)
    )
    .slice(0, 3);

  const handleOpenQuarkDirectly = () => {
    window.open(resource.quarkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
        >
          {/* Modal Header Bar */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="关闭窗口"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30">
                {resource.grade} · {resource.gradeDetail}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                {resource.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {resource.version}
              </span>
              {resource.edition && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {resource.edition}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug pr-8 mt-1">
              {resource.title}
            </h2>

            <div className="mt-3 flex items-center gap-4 text-xs text-slate-300 flex-wrap">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{resource.rating.toFixed(1)} 评分</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4 text-sky-400" />
                <span>{resource.downloadCount.toLocaleString()} 次转存</span>
              </div>
              <div>更新日期：{resource.updatedAt}</div>
              <div>文件格式：{resource.format}</div>
            </div>
          </div>

          {/* Modal Body Scroll Area */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
            {/* Quick Link Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-amber-50/50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>夸克网盘独家分享 (资源实时有效)</span>
                </div>
                <p className="text-xs text-slate-600 break-all font-mono">
                  {resource.quarkUrl}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => {
                    onCopyLink(resource);
                    handleOpenQuarkDirectly();
                  }}
                  className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-slate-950 p-[2px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-orange-500/25 cursor-pointer"
                  title="自动复制口令并直达夸克网盘"
                >
                  <div className="py-2.5 px-4 rounded-[10px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 tracking-wide group-hover:brightness-110 transition-all">
                    <Download className="w-4 h-4 stroke-[2.5] text-white shrink-0" />
                    <span>获取资源 (夸克网盘)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>资料简介</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {resource.description}
              </p>
            </div>

            {/* Highlights Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>核心亮点与特色</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {resource.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-950"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contents Breakdown */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>资料目录及包含章节</span>
              </h3>
              <ul className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                {resource.contents.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended For */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>推荐使用人群</span>
              </h3>
              <p className="text-xs text-slate-600 bg-purple-50/60 p-3.5 rounded-xl border border-purple-100 leading-relaxed">
                {resource.recommendedFor}
              </p>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-2">
              <span className="text-xs text-slate-400 font-semibold mr-1">相关标签:</span>
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  📚 同学科 / 同学段推荐资料
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedResources.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {rel.grade} · {rel.subject}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 mt-1.5">
                        {rel.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onToggleFavorite(resource.id)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                isFavorite
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isFavorite ? '已收藏' : '收藏资料'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onCopyLink(resource)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>仅复制口令</span>
              </button>

              <button
                onClick={() => {
                  onCopyLink(resource);
                  handleOpenQuarkDirectly();
                }}
                className="flex-1 sm:flex-none relative group overflow-hidden rounded-xl bg-slate-950 p-[2px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-orange-500/25 cursor-pointer"
              >
                <div className="py-2.5 px-4 rounded-[10px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 tracking-wide group-hover:brightness-110 transition-all">
                  <Download className="w-4 h-4 stroke-[2.5] text-white shrink-0" />
                  <span>获取资源 (夸克网盘)</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
