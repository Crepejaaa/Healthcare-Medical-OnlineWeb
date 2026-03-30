'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import { useState } from 'react';
import { articlesData } from '../../data/articles';

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Find article
  const article = articlesData.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold mb-4">ไม่พบบทความ</h1>
        <Link href="/#articles" className="text-blue-600 hover:text-blue-800 underline">
          กลับไปหน้าหลัก
        </Link>
      </div>
    );
  }

  // Split content by newline to render paragraphs and basic markdown pseudo-support
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Basic bold formatting **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="text-slate-800 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ')) {
        return (
          <li key={i} className="ml-5 list-disc text-slate-600 leading-relaxed mb-2">
            {formattedLine.slice(1)}
          </li>
        );
      }
      
      if (line.match(/^\d+\./)) {
         return (
          <div key={i} className="ml-5 text-slate-600 leading-relaxed mb-3">
             <span className="font-bold text-teal-600 mr-2">{line.split('.')[0]}.</span>
             {formattedLine.slice(1)}
          </div>
         )
      }

      if (line.trim() === '') return <br key={i} />;

      return (
        <p key={i} className="text-slate-600 leading-relaxed mb-5 text-lg">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-grow bg-slate-50 py-12 md:py-20">
        <article className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-6 fade-in-up">
            <Link href="/#articles" className="text-blue-600 hover:underline flex items-center gap-1.5 font-medium">
              <span>←</span> กลับไปหน้าบทความ
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Header Image Area */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center relative">
              <span className="text-9xl transform hover:scale-110 transition-transform duration-500">{article.image}</span>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${article.categoryColor}`}>
                  {article.category}
                </span>
                <span className="text-sm text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">⏱ {article.readTime}</span>
                <span className="text-sm text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">📅 {article.date}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="border-l-4 border-teal-400 pl-4 py-2 mb-10 bg-teal-50/50 rounded-r-xl">
                <p className="text-lg text-teal-800 font-medium leading-relaxed italic">
                  "{article.excerpt}"
                </p>
              </div>

              <div className="article-body">
                {renderContent(article.content)}
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                 <p className="text-slate-400 text-sm mb-4">บทความนี้มีประโยชน์กับคุณหรือไม่?</p>
                 <div className="flex justify-center gap-4">
                    <button className="px-6 py-2 bg-slate-100 hover:bg-green-100 hover:text-green-700 rounded-full font-medium transition-colors">👍 มีประโยชน์</button>
                    <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 rounded-full font-medium transition-colors">👎 ธรรมดา</button>
                 </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
