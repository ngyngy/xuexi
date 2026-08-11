import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquarePlus, Copy, Mail, ExternalLink, CheckCircle2, History, Sparkles, FileText } from 'lucide-react';

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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const officialEmail = 'hi@ngy123.com';

  const [myRequests, setMyRequests] = useState<SubmittedRequest[]>(() => {
    try {
      const saved = localStorage.getItem('xuehai_user_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(officialEmail).then(() => {
        setCopiedEmail(true);
        onShowToast(`已复制站长邮箱：${officialEmail}`, 'success');
        setTimeout(() => setCopiedEmail(false), 2500);
      });
    } else {
      onShowToast(`站长邮箱：${officialEmail}`, 'info');
    }
  };

  const getFormattedEmailBody = () => {
    const resourceTitle = title.trim() || '（请在此填写具体资料或教辅名称）';
    return `收件人：${officialEmail}
邮件主题：【求资源】${grade}${subject} - ${resourceTitle}

求资源详细需求：
1. 学段与年级：${grade}
2. 学科类别：${subject}
3. 资料名称/关键词：${resourceTitle}
4. 补充说明/特定版本：${note.trim() || '无特殊说明，要求高清PDF可打印版'}

---
发送自【中小学学习资料网 xuexi.ngy123.com】用户求资源`;
  };

  const handleCopyTemplateAndEmail = () => {
    const fullText = getFormattedEmailBody();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopiedTemplate(true);
        onShowToast(`已复制【求资源邮件模板】与邮箱 (${officialEmail})！可以直接在邮箱粘贴发送`, 'success');
        setTimeout(() => setCopiedTemplate(false), 3000);
      });
    } else {
      onShowToast(`已整理求资源模板，发送邮件至 ${officialEmail}`, 'info');
    }
  };

  const mailtoUrl = `mailto:${officialEmail}?subject=${encodeURIComponent(
    `【求资源】${grade}${subject} - ${title.trim() || '中小学学习资料'}`
  )}&body=${encodeURIComponent(getFormattedEmailBody())}`;

  const handleSubmitWebForm = (e: React.FormEvent) => {
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
    onShowToast(`求资源需求已提交！站长已收到提示，您亦可发邮件至 ${officialEmail} 加速处理！`, 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl max-w-xl w-full flex flex-col overflow-hidden border border-slate-200 my-6"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black tracking-wide flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" />
                专属找料通道
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">没找到想要的学习资料？</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
              欢迎发送邮件至站长邮箱求资源，收到邮件后站长会优先全网搜索并整理上传至夸克网盘！
            </p>

            {/* Direct Email Card Banner */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 font-bold shadow">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-blue-200 font-medium">站长求资源官方邮箱</div>
                  <div className="text-base font-black font-mono tracking-wide text-white select-all">
                    {officialEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs flex items-center gap-1.5 transition-all shadow active:scale-95 shrink-0"
                >
                  {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-700" />}
                  <span>{copiedEmail ? '已复制邮箱' : '复制邮箱'}</span>
                </button>

                <a
                  href={`mailto:${officialEmail}?subject=【求资源】中小学学习资料&body=站长好，我想找以下学习资料：`}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 transition-all shadow active:scale-95 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>直接发邮件</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form & Helper Body */}
          <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
            
            {/* Step 1: Select details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>快捷填写你需要的资料（自动生成邮件）</span>
                </h3>
                <span className="text-[10px] text-slate-400">实时生成邮件内容</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">学段</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-white text-slate-800 text-xs font-medium rounded-xl p-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="小学">小学 (1-6年级)</option>
                    <option value="初中">初中 (7-9年级)</option>
                    <option value="高中">高中 (高一至高三)</option>
                    <option value="通用">通用/其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">学科</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white text-slate-800 text-xs font-medium rounded-xl p-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="语文">语文</option>
                    <option value="数学">数学</option>
                    <option value="英语">英语</option>
                    <option value="物理">物理</option>
                    <option value="化学">化学</option>
                    <option value="生物">生物</option>
                    <option value="政史地">政史地</option>
                    <option value="全科/综合">全科/综合</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  资料名称 / 关键词 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：2026九上人教版化学名校课堂、53中考物理、学霸笔记..."
                  className="w-full bg-white text-slate-900 text-xs rounded-xl p-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">补充要求（选填）</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="如：需要北师大版、地区名校试卷、带参考答案..."
                  className="w-full bg-white text-slate-900 text-xs rounded-xl p-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Live Preview Email Box */}
              <div className="p-3 bg-white rounded-xl border border-indigo-100 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-indigo-900 font-bold">
                  <span>✉️ 生成的邮件预览：</span>
                  <span className="font-mono text-indigo-600">To: {officialEmail}</span>
                </div>
                <div className="text-slate-600 font-mono text-[10px] bg-indigo-50/50 p-2 rounded-lg border border-indigo-100 whitespace-pre-wrap">
                  {getFormattedEmailBody()}
                </div>
              </div>

              {/* Email Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href={mailtoUrl}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/20 active:scale-98"
                >
                  <Mail className="w-4 h-4" />
                  <span>打开系统邮箱发送</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyTemplateAndEmail}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow active:scale-98"
                >
                  {copiedTemplate ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedTemplate ? '已复制邮件全文' : '复制模板与邮箱'}</span>
                </button>
              </div>
            </div>

            {/* Web Backup Form Option */}
            <form onSubmit={handleSubmitWebForm} className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MessageSquarePlus className="w-3.5 h-3.5 text-slate-500" />
                  或者：直接在网页提交求资源登记
                </span>
                <span className="text-[10px] text-slate-400">无需邮箱直接留痕</span>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200"
              >
                <Send className="w-3.5 h-3.5 text-slate-500" />
                <span>在网页端直接提交留痕需求</span>
              </button>
            </form>

            {/* History Requests */}
            {myRequests.length > 0 && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 max-h-40 overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                  <History className="w-3.5 h-3.5 text-indigo-600" />
                  <span>您在网页端提交的求资源记录 ({myRequests.length})</span>
                </h4>
                <div className="space-y-1.5">
                  {myRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between"
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

