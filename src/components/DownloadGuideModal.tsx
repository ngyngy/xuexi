import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Smartphone, Monitor, CheckCircle2, CloudDownload, ShieldCheck, Zap } from 'lucide-react';

interface DownloadGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadGuideModal: React.FC<DownloadGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden border border-slate-200"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                夸克网盘极速转存教程
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">如何快速保存并下载资料？</h2>
            <p className="text-xs text-sky-100 mt-1">
              遵循以下 4 步，无需解压密码，秒存至个人网盘，手机电脑均可在线查看或极速下载！
            </p>
          </div>

          {/* Guide Steps */}
          <div className="p-6 overflow-y-auto space-y-4 text-slate-800 text-sm">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Copy className="w-4 h-4 text-blue-600" />
                  <span>复制资料链接或口令</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  在中小学学习资料网点击资料卡片上的【复制链接】或【直达夸克APP保存】，系统会自动复制完整的夸克分享链接及提取口令。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>打开「夸克 APP」自动弹窗</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  打开手机上的【夸克APP】，系统会自动识别剪贴板中的链接并弹出【识别到分享链接】弹窗，点击【查看】即可。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <CloudDownload className="w-4 h-4 text-purple-600" />
                  <span>一键保存至个人云盘</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  点击底部的【保存到网盘】或【一键保存全套】，资料即永久存储在你的夸克网盘云端空间中，再也不怕原作者失效。
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0">
                4
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-emerald-600" />
                  <span>免费极速打印 / 电脑离线下载</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  在电脑网页端或夸克桌面客户端登录同一个账号，可一键批量下载高清PDF文件或直接在线打印试卷！
                </p>
              </div>
            </div>

            {/* Tips Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5">💡 温馨提示（防失效指南）：</strong>
                夸克网盘新用户拥有免费海量存储空间。建议看到心仪资料后第一时间保存至自己的网盘中，即使原链接更新或调整，你保存的文件依然永久有效！
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20"
            >
              我知道了，开始选资料
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
