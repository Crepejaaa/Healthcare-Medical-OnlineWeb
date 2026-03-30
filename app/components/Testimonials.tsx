'use client';

import { useState, useEffect, useCallback } from 'react';

interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  color: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'คุณวิภา, อายุ 34 ปี',
    role: 'คุณแม่ลูกสอง',
    avatar: '👩',
    rating: 5,
    text: 'ลูกสาวหอบกำเริบตอนดึก โชคดีที่ได้วิดีโอคอลกับคุณหมอกุมารแพทย์ภูมิแพ้ทันที คุณหมอสอนวิธีพ่นยาผ่านกระบอก Spacer ได้ชัดเจนมาก ตอนนี้คุมอาการได้ดีขึ้นเยอะเลยค่ะ ไม่ต้องไปแออัดที่ห้องฉุกเฉินแล้ว',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    id: 2,
    name: 'คุณสมศักดิ์, อายุ 45 ปี',
    role: 'พนักงานบริษัท',
    avatar: '👨',
    rating: 5,
    text: 'ช่วง PM2.5 หนักๆ มีอาการแน่นหน้าอกตลอดเวลา ได้ปรึกษาคุณหมออายุรแพทย์ระบบหายใจผ่าน HealthConnect คุณหมอสั่งยาพ่นควบคุมอาการและส่งตรงถึงคอนโดภายในวันนั้น สะดวกมากครับ สำหรับคนไม่มีเวลาไปโรงพยาบาล',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    id: 3,
    name: 'คุณณัฐริกา, อายุ 28 ปี',
    role: 'ฟรีแลนซ์',
    avatar: '👩',
    rating: 5,
    text: 'แต่ก่อนใช้ยาพ่นฉุกเฉินผิดวิธีมาตลอดจนใจสั่น คุณหมอให้คำแนะนำดีมาก และช่วยปรับยาให้เหมาะสม ตอนนี้ไม่ต้องพ่นยาทุกวันแล้ว รู้สึกปอดแข็งแรงขึ้น สามารถกลับไปวิ่งมาราธอนได้อีกครั้งค่ะ 😊',
    color: 'bg-teal-100 text-teal-600',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % reviews.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + reviews.length) % reviews.length);
  }, [current, goTo]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const review = reviews[current];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ⭐ Reviews
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">ผู้ใช้จริงพูดถึงเรา</h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            ผู้ป่วยโรคหอบหืดและภูมิแพ้มากกว่า 50,000 คนไว้วางใจใช้บริการ AsthmaCare
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Review Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Quote decoration */}
            <div className="absolute top-4 right-6 text-8xl text-blue-100 font-serif select-none leading-none">
              &ldquo;
            </div>

            <div
              className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {/* Avatar & Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <p className="text-sm text-slate-400">{review.role}</p>
                  {/* Stars */}
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm transition-all duration-300 ${i < review.rating ? 'text-yellow-400 hover:scale-125' : 'text-slate-200'
                          }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-slate-600 leading-relaxed text-base relative z-10">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
              aria-label="ก่อนหน้า"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === current
                      ? 'w-8 bg-blue-600'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  aria-label={`รีวิวที่ ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
              aria-label="ถัดไป"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
