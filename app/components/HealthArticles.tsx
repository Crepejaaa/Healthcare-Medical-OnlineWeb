import Link from 'next/link';
import { articlesData } from '../data/articles';

export default function HealthArticles() {
  const articles = articlesData;

  return (
    <section id="articles" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            📚 Health Articles
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">บทความสุขภาพน่ารู้</h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            อัปเดตความรู้สุขภาพ เขียนโดยทีมแพทย์ผู้เชี่ยวชาญ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {articles.map((article, i) => (
            <article
              key={i}
              className="card-interactive bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer border border-slate-100"
            >
              {/* Image Area */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
                <span className="text-7xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6">
                  {article.image}
                </span>
                {/* Read time badge */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-600 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  ⏱ {article.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-block ${article.categoryColor} px-3 py-1 rounded-full text-xs font-medium transition-transform duration-300 group-hover:scale-105`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400">{article.date}</span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h4>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/articles/${article.id}`}
                  className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <span>อ่านเพิ่มเติม</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="bg-white text-slate-700 px-8 py-3 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer group">
            ดูบทความทั้งหมด{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
