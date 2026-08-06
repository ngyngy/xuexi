import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquarePlus, CheckCircle2, History } from 'lucide-react';

interface RequestResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type: 'success' | 'info') => void;
}

interface SubmittedRequest {
  id: string;
  title: string;
  grade: string;
  subject: string;
  note: string;
  createdAt: string;
  status: '处理中' | '已补齐';
}

export const RequestResourceModal: React.FC<RequestResourceModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [grade, setGrade] = useState('初中');
  const [subject, setSubject] = useState('数学');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [myRequests, setMyRequests] = useState<SubmittedRequest[]>(() => {
    try {
      const saved = localStorage.getItem('xuehai_user_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onShowToast('请填写您所需要的资料名称或关键字！', 'info');
      return;
    }

    const newReq: SubmittedRequest = {
      id: 'req-' + Date.now(),
      title: title.trim(),
      grade,
      subject,
      note: note.trim(),
      createdAt: new Date().toLocaleDateString('zh-CN'),
      status: '处理中',
    };

    const updated = [newReq, ...myRequests];
    setMyRequests(updated);
    try {
      localStorage.setItem('xuehai_user_requests', JSON.stringify(updated));
    } catch {
      // ignore localstorage errors
    }

    setTitle('');
    setNote('');
    onShowToast('求资料需求已成功提交！站长将尽快搜集上传夸克网盘！', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-slate-200"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <MessageSquarePlus className="w-5 h-5 text-indigo-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                专属找料通道
              </span>
            </div>
            <h2 className="text-xl font-black">没找到想要的学习资料？</h2>
            <p className="text-xs text-indigo-100 mt-1">
              请在此提交你需要的资料版本、学科或试卷名称，站长收到后会优先补充夸克网盘资源！
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">学段</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-100 text-slate-800 text-xs font-medium rounded-xl p-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="小学">小学</option>
                  <option value="初中">初中</option>
                  <option value="高中">高中</option>
                  <option value="通用">通用/其他</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">学科</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-100 text-slate-800 text-xs font-medium rounded-xl p-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="语文">语文</option>
                  <option value="数学">数学</option>
                  <option value="英语">英语</option>
                  <option value="物理">物理</option>
                  <option value="化学">化学</option>
                  <option value="生物">生物</option>
                  <option value="政治/历史/地理">政史地</option>
                  <option value="全科/综合">全科/综合</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                资料名称 / 关键字 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：2026九上人教版化学名校课堂、黄冈密卷..."
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">补充说明（选填）</label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="如指定版本（北师大版/粤教版）、地区名校卷或指定格式..."
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>提交求资料申请</span>
            </button>
          </form>

          {/* History Requests */}
          {myRequests.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 max-h-48 overflow-y-auto">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                <History className="w-3.5 h-3.5 text-indigo-600" />
                <span>我已提交的求资料记录 ({myRequests.length})</span>
              </h4>
              <div className="space-y-2">
                {myRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{req.title}</span>
                      <span className="text-[10px] text-slate-500 ml-2">
                        ({req.grade}·{req.subject})
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
