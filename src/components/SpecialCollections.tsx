import React from 'react';
import { Flame, Award, Zap, BookOpenCheck, ArrowRight } from 'lucide-react';

interface SpecialCollectionsProps {
  onSelectCollection: (query: string, seriesFilter?: string) => void;
  activeQuery: string;
}

export const SpecialCollections: React.FC<SpecialCollectionsProps> = ({
  onSelectCollection,
  activeQuery,
}) => {
  const collections = [
    {
      id: 'zhongkao-2026',
      title: '2026/2025 中考冲刺王牌宝库',
      subtitle: '万唯中考11期 · 5星学霸重难点 · 一模二模试卷',
      icon: Award,
      badge: '必看提分',
      bgGradient: 'from-amber-500/10 via-orange-500/5 to-rose-500/10 border-amber-500/30 text-amber-200',
      iconColor: 'text-amber-400 bg-amber-500/20',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      query: '万唯中考'
    },
    {
      id: 'bishuati-all',
      title: '小初高【必刷题】全学段合集',
      subtitle: '001小学必刷题 · 002初中必刷题 · 003高中必刷题',
      icon: Flame,
      badge: '全网火爆',
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-sky-500/10 border-blue-500/30 text-blue-200',
      iconColor: 'text-blue-400 bg-blue-500/20',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      query: '必刷题'
    },
    {
      id: '53-series',
      title: '53系列 试卷与同步全套',
      subtitle: '《5年中考3年模拟》试卷版+同步版（2023-2025跨年合集）',
      icon: Zap,
      badge: '经典权威',
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-500/30 text-emerald-200',
      iconColor: 'text-emerald-400 bg-emerald-500/20',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      query: '53'
    },
    {
      id: 'xueba-notes',
      title: '名校课堂 & 学霸提分笔记',
      subtitle: '初中学霸手写干货 · 2026名校课堂教案PPT · 计算高手',
      icon: BookOpenCheck,
      badge: '干货满满',
      bgGradient: 'from-purple-500/10 via-violet-500/5 to-fuchsia-500/10 border-purple-500/30 text-purple-200',
      iconColor: 'text-purple-400 bg-purple-500/20',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      query: '名校'
    }
  ];

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-5 rounded-full bg-blue-600 inline-block" />
          <span>🔥 精选特色专区</span>
        </h2>
        <span className="text-xs text-slate-500">点击卡片直达专属精品资料</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {collections.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeQuery === item.query;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCollection(item.query)}
              className={`group text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden bg-white hover:shadow-md ${
                isActive
                  ? 'ring-2 ring-blue-600 border-transparent shadow-lg bg-blue-50/40'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`p-2 rounded-xl ${item.iconColor}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {item.subtitle}
              </p>

              <div className="mt-3 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>进入专区</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
