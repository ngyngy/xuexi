import React, { useState } from 'react';
import { FolderId, FolderInfo, Resource } from '../types';
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Eye, 
  Sparkles, 
  Mail, 
  Check, 
  FolderOpen,
  DownloadCloud,
  Layers,
  Search
} from 'lucide-react';

interface FolderDirectoryProps {
  folders: FolderInfo[];
  resources: Resource[];
  onOpenDetail: (resource: Resource) => void;
  onCopyLink: (resource: Resource) => void;
  onRequestResource: () => void;
  searchQuery?: string;
}

export const FolderDirectory: React.FC<FolderDirectoryProps> = ({
  folders,
  resources,
  onOpenDetail,
  onCopyLink,
  onRequestResource,
  searchQuery = '',
}) => {
  // Store expanded state for each folder. By default, open primary, junior, senior, cet, cert
  const [expandedFolderIds, setExpandedFolderIds] = useState<Record<string, boolean>>({
    primary: true,
    junior: true,
    senior: true,
    cet: true,
    cert: true,
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolderIds((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const expandAll = () => {
    const allExpanded = folders.reduce((acc, f) => {
      acc[f.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedFolderIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedFolderIds({});
  };

  const handleCopy = (res: Resource, e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyLink(res);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to get resources inside folder
  const getFolderResources = (folderId: FolderId) => {
    let list = resources.filter((r) => r.folderId === folderId);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm mb-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          {/* Main Gold Folder Header Icon */}
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <FolderOpen className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                网盘资源目录索引
              </h2>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                wangpan8.com
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              点击文件夹展开/折叠，在当前页面直接查看、转存或复制各分类精选资源
            </p>
          </div>
        </div>

        {/* Global Expand / Collapse Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            全部展开
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            全部收起
          </button>
        </div>
      </div>

      {/* Folders List with In-Place Vertical Tree Expansion (Faithful to Screenshot) */}
      <div className="space-y-6">
        {folders.map((folder) => {
          const folderResources = getFolderResources(folder.id);
          const isExpanded = !!expandedFolderIds[folder.id];
          const totalInFolder = resources.filter((r) => r.folderId === folder.id).length;

          return (
            <div key={folder.id} className="relative">
              {/* --- Top-Level Folder Row --- */}
              <div
                onClick={() => toggleFolder(folder.id)}
                className="group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-amber-50/40 hover:bg-amber-50/90 border border-amber-200/70 hover:border-amber-300 transition-all cursor-pointer select-none"
              >
                {/* Folder Icon + Bold Green Code/Title + Parentheses Subtitle */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Big Yellow Folder SVG Icon */}
                  <div className="relative shrink-0">
                    <div className="w-9 h-7 sm:w-10 sm:h-8 rounded-md bg-gradient-to-b from-amber-400 to-amber-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      {/* Top folder tab */}
                      <div className="absolute -top-1.5 left-1 w-4 h-1.5 bg-amber-400 rounded-t-sm" />
                      <svg
                        className="w-5 h-5 text-amber-950/20 fill-amber-100"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title text */}
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-base sm:text-lg font-black text-emerald-800 tracking-tight group-hover:text-emerald-950 transition-colors">
                      {folder.code} {folder.name}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate max-w-full">
                      （{folder.subtitle}）
                    </span>
                  </div>
                </div>

                {/* Right controls: count badge + expand arrow */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-amber-900 border border-amber-200/80 shadow-2xs">
                    {totalInFolder > 0 ? `${totalInFolder} 份资料` : '待上传'}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center text-slate-600 group-hover:text-emerald-800 transition-transform">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-emerald-800" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* --- In-Place Expanded Sub-Items List (With Left Vertical Tree Line) --- */}
              {isExpanded && (
                <div className="relative ml-4 sm:ml-5 pl-5 sm:pl-7 pt-3 pb-2 border-l-2 border-slate-200 space-y-2.5">
                  {folderResources.length > 0 ? (
                    folderResources.map((res, index) => {
                      const itemNumber = String(index + 1).padStart(2, '0');
                      const isJustCopied = copiedId === res.id;

                      return (
                        <div
                          key={res.id}
                          onClick={() => onOpenDetail(res)}
                          className="group/item relative flex flex-col md:flex-row md:items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-amber-300/80 hover:shadow-xs transition-all duration-150 cursor-pointer"
                        >
                          {/* Folder Icon + Green Number + Title + Subtitle */}
                          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                            {/* Small Yellow Folder Icon */}
                            <div className="relative shrink-0 mt-0.5 sm:mt-0">
                              <div className="w-7 h-5.5 rounded-sm bg-gradient-to-b from-amber-400 to-amber-500 flex items-center justify-center shadow-xs">
                                <div className="absolute -top-1 left-0.5 w-2.5 h-1 bg-amber-400 rounded-t-xs" />
                                <svg
                                  className="w-3.5 h-3.5 text-amber-950/20 fill-amber-100"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                              </div>
                            </div>

                            {/* Item Text: Green Number + Title - Description */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-baseline gap-1.5">
                                <span className="text-sm font-black text-emerald-800">
                                  {itemNumber}.
                                </span>
                                <span className="text-sm font-bold text-slate-900 group-hover/item:text-emerald-900 transition-colors">
                                  {res.title}
                                </span>
                                <span className="text-xs text-slate-500 font-normal line-clamp-1">
                                  - {res.description.replace(/（本资源由wangpan8\.com提供）/, '')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-1 md:pt-0">
                            {/* Format Tag */}
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hidden lg:inline">
                              {res.format}
                            </span>

                            {/* Copy Link Button */}
                            <button
                              onClick={(e) => handleCopy(res, e)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                              title="复制夸克网盘链接"
                            >
                              {isJustCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">已复制</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                                  <span>复制</span>
                                </>
                              )}
                            </button>

                            {/* Direct Save to Quark Pan Button */}
                            <a
                              href={res.quarkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-all shadow-xs hover:shadow flex items-center gap-1 active:scale-95 shrink-0"
                            >
                              <DownloadCloud className="w-3.5 h-3.5 text-slate-950" />
                              <span>保存到网盘</span>
                              <ExternalLink className="w-3 h-3 text-slate-800" />
                            </a>

                            {/* Details trigger */}
                            <button
                              onClick={() => onOpenDetail(res)}
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                              title="查看详细大纲"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : totalInFolder === 0 ? (
                    /* Empty Folder State (e.g. 05 考研考证) - Faithful notice matching user intent */
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50/80 border border-dashed border-slate-200 text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-5.5 rounded-sm bg-gradient-to-b from-amber-400/60 to-amber-500/60 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-700">
                            01. 考研与职业考证资料
                          </span>
                          <span className="text-xs text-slate-400 ml-2">
                            - 真实网盘资料整理中，等待站长上传更新
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={onRequestResource}
                        className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>提供或求本类资料</span>
                      </button>
                    </div>
                  ) : (
                    /* Search filter resulted in 0 within this folder */
                    <div className="p-3 text-xs text-slate-400 bg-slate-50 rounded-lg">
                      该文件夹下未找到与 "{searchQuery}" 匹配的资料
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
