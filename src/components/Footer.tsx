import React from 'react';
import { BookOpen, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const friendLinks = [
    {
      url: 'https://www.wangpan8.com',
      domain: 'wangpan8.com',
      title: 'wangpan8 网盘总站',
      desc: '网盘资源总站导航，汇聚全网优质网盘合集。',
    },
    {
      url: 'http://btc.ngy123.com/',
      domain: 'btc.ngy123.com',
      title: '比特币导航站',
      desc: '在百度搜“比特币导航、比特币资源”，这个网站都排第一。',
    },
    {
      url: 'http://fabi.ngy123.com/',
      domain: 'fabi.ngy123.com',
      title: '全球法币排行榜',
      desc: '在百度搜“法币排行”排第四。',
    },
    {
      url: 'http://eth.ngy123.com/',
      domain: 'eth.ngy123.com',
      title: '以太坊资源导航',
      desc: '精选以太坊生态与学习资源导航。',
    },
    {
      url: 'http://gxs.ngy123.com/',
      domain: 'gxs.ngy123.com',
      title: '高晓松资源下载',
      desc: '高晓松相关作品与音频资源下载。',
    },
    {
      url: 'http://btczy.ngy123.com/',
      domain: 'btczy.ngy123.com',
      title: '比特币资源下载站',
      desc: '区块链与比特币优质资源下载。',
    },
    {
      url: 'http://binance.ngy123.com/',
      domain: 'binance.ngy123.com',
      title: '币安 Binance',
      desc: '全球领先数字资产交易平台导航。',
    },
    {
      url: 'http://okx.ngy123.com/',
      domain: 'okx.ngy123.com',
      title: '欧易 OKX',
      desc: '欧易 OKX Web3 与交易导航。',
    },
    {
      url: 'http://tianya.ngy123.com/',
      domain: 'tianya.ngy123.com',
      title: '天涯神贴分享站',
      desc: '天涯论坛经典神帖与珍贵文档合集。',
    },
    {
      url: 'http://xuexi.ngy123.com/',
      domain: 'xuexi.ngy123.com',
      title: '学习资料网',
      desc: '小学初中高中全科必刷题、四六级与考研考证网盘资源。',
    },
    {
      url: 'http://dy.ngy123.com/',
      domain: 'dy.ngy123.com',
      title: '电影资源站',
      desc: '高清电影影音资源与观影指南。',
    },
    {
      url: 'http://ai.ngy123.com/',
      domain: 'ai.ngy123.com',
      title: 'AI导航',
      desc: '人工智能大模型、AI工具与应用导航。',
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Branding & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200 text-sm">学习资料网</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                  xuexi.ngy123.com
                </span>
              </div>
              <span className="text-[11px] text-slate-500">全科提分与考研考级资料库</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 flex-wrap">
            <a
              href="https://weibo.com/u/6184008812"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
              title="关注南宫远微博：https://weibo.com/u/6184008812"
            >
              <svg className="w-3.5 h-3.5 fill-current text-rose-400" viewBox="0 0 24 24">
                <path d="M10.093 20.916c-4.52 0-8.193-2.668-8.193-5.952 0-3.32 3.73-5.999 8.272-5.999 4.544 0 8.217 2.679 8.217 6 0 3.283-3.714 5.951-8.296 5.951zm-.498-3.414c1.84 0 3.33-1.077 3.33-2.404 0-1.328-1.49-2.405-3.33-2.405-1.84 0-3.33 1.077-3.33 2.405 0 1.327 1.49 2.404 3.33 2.404zm7.65-8.237c1.378.435 2.44 1.498 2.875 2.875.14.44-.105.908-.546 1.047-.44.14-.908-.105-1.047-.546-.3-1-.95-1.74-1.95-2.04-.44-.14-.686-.607-.546-1.047.14-.44.607-.686 1.047-.546zm3.32-3.32c2.977.94 5.27 3.234 6.21 6.21.14.44-.105.908-.546 1.047-.44.14-.908-.105-1.047-.546-.778-2.463-2.686-4.37-5.15-5.15-.44-.14-.686-.607-.546-1.047.14-.44.607-.686 1.047-.546z" />
              </svg>
              <span>南宫远微博</span>
            </a>
            <a
              href="https://x.com/nangongyuan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 hover:bg-sky-500/20 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>南宫远推特 @nangongyuan</span>
            </a>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>夸克网盘官方云端备份</span>
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>每日更新名校资料</span>
            </span>
          </div>
        </div>

        {/* 友情链接 Friendly Links Section */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-bold text-slate-200 tracking-wide">🔗 友情链接</h3>
            <span className="text-slate-500 text-[11px]">优质推荐与导航资源</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {friendLinks.map((link) => (
              <a
                key={link.domain}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors text-xs flex items-center gap-1">
                      {link.title}
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-sky-400" />
                    </span>
                    <span className="text-[10px] text-sky-400/80 font-mono bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/40">
                      {link.domain}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                    {link.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SEO & GEO (Generative Engine Optimization) Search Keywords Navigation */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-300 tracking-wide">🔍 热门搜索与核心资料索引 (SEO/GEO)</h3>
            <span className="text-[10px] text-slate-500">百度 / 谷歌 / 必应 / AI引擎极速收录</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-sky-300 border border-slate-700">小学学习资料网</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-sky-300 border border-slate-700">初中学习资料网</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-sky-300 border border-slate-700">高中学习资料网</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-amber-300 border border-slate-700">小学必刷题(1-6年级)</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-amber-300 border border-slate-700">初中必刷题(7-9年级)</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-amber-300 border border-slate-700">高中必刷题(高考一轮二轮)</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-emerald-300 border border-slate-700">万唯中考专题突破</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-emerald-300 border border-slate-700">53五年中考三年模拟</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-purple-300 border border-slate-700">名校课堂与期末试卷</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-purple-300 border border-slate-700">学霸手写笔记高清PDF</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-sky-300 border border-slate-700">夸克网盘极速转存</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700">站长南宫远 (@nangongyuan)</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center md:text-left space-y-2 text-slate-500 leading-relaxed max-w-4xl pt-2 border-t border-slate-800/80">
          <p>
            <strong>免责声明：</strong>
            本站（学习资料网 xuexi.ngy123.com）所有学习资料（包括小学、初中、高中、大学英语、考研考证等）均收集自网络公开分享资源，版权归原出版机构或原作者所有。本站仅作分类索引与教学交流学习之用，不收取任何下载费用。如认为侵权，请联系我们及时下架。
          </p>
          <p>
            建议广大师生及家长通过夸克网盘客户端转存至个人空间后学习参考。请支持正版纸质图书！
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
          <div>© {new Date().getFullYear()} 学习资料网 (xuexi.ngy123.com) · 站长：南宫远 (@nangongyuan)</div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>用</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>用心助力每一位学习者的提升之路</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

