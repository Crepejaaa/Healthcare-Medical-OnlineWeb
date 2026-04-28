'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { useState } from 'react';
import { doctorsData } from '../data/doctors';

export default function DoctorsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={() => setAuthModalOpen(true)} />

      <main className="flex-grow bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 fade-in-up">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              👨‍⚕️ Medical Roster
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">รายชื่อแพทย์ผู้เชี่ยวชาญ</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              แพทย์ผู้เชี่ยวชาญด้านโรคระบบทางเดินหายใจและภูมิแพ้ที่พร้อมให้คำปรึกษาดูแลคุณตลอด
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {doctorsData.map((doc, i) => (
              <div
                key={doc.id}
                className="card-interactive bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-slate-100 group relative overflow-hidden fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Available badge */}
                {doc.available && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600 font-bold">ออนไลน์</span>
                  </div>
                )}
                {!doc.available && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                    <span className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
                    <span className="text-xs text-slate-400 font-medium">ออฟไลน์</span>
                  </div>
                )}

                <div
                  className={`w-24 h-24 bg-gradient-to-br ${doc.color} rounded-full flex items-center justify-center text-5xl mx-auto mb-5 transition-transform duration-500 group-hover:scale-110 shadow-sm`}
                >
                  {doc.avatar}
                </div>

                <div className="text-center">
                  <h4 className="font-bold text-xl mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {doc.name}
                  </h4>
                  <p className="text-sm border border-blue-100 bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full inline-block mb-3">
                    {doc.specialty}
                  </p>

                  <div className="text-sm text-slate-500 mb-4 space-y-1">
                    <p>🏥 {doc.hospital}</p>
                    <p>🎓 ประสบการณ์ {doc.experience}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span
                          key={j}
                          className={`text-sm transition-all duration-300 ${j < Math.round(doc.rating)
                              ? 'text-yellow-400 group-hover:scale-125'
                              : 'text-slate-200'
                            }`}
                          style={{ transitionDelay: `${j * 60}ms` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-700 ml-1">{doc.rating}</span>
                    <span className="text-xs text-slate-400">({doc.reviews} รีวิว)</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
                    นัดปรึกษาแพทย์
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/" className="text-slate-500 hover:text-blue-600 font-medium transition-colors border-b border-transparent hover:border-blue-600 pb-1">
              ← กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
