'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'AsthmaCare คืออะไร?',
    answer:
      'AsthmaCare เป็นคลินิกเฉพาะทางโรคหอบหืดออนไลน์ ที่ให้คุณปรึกษาอายุรแพทย์โรคระบบการหายใจและภูมิแพ้ได้ตลอด 24 ชั่วโมง โดยไม่ต้องเดินทางไปโรงพยาบาล พร้อมมีระบบติดตามอาการแบบ real-time',
  },
  {
    question: 'แพทย์ของ AsthmaCare เชี่ยวชาญด้านใด?',
    answer:
      'แพทย์ทุกท่านของเราเป็นอายุรแพทย์โรคระบบการหายใจ หรือกุมารแพทย์โรคภูมิแพ้และภูมิคุ้มกัน ที่มีประสบการณ์ดูแลผู้ป่วยหอบหืดโดยเฉพาะ',
  },
  {
    question: 'สามารถสั่งยาพ่นผ่านออนไลน์ได้หรือไม่?',
    answer:
      'ได้ค่ะ หลังจากปรึกษาแพทย์และประเมินอาการ แพทย์สามารถสั่งยาพ่นฉุกเฉิน หรือยาพ่นควบคุมอาการได้ และเราจะจัดส่งยาพ่นถึงบ้านคุณภายใน 2-4 ชั่วโมงในกรุงเทพฯ และปริมณฑล',
  },
  {
    question: 'ยกเลิกแพ็กเกจได้ไหม?',
    answer:
      'คุณสามารถยกเลิกแพ็กเกจติดตามรายเดือนได้ตลอดเวลาผ่านทางแชทแอดมิน โดยสิทธิ์การติดตามผลจะอยู่จนครบรอบบิลปัจจุบัน',
  },
  {
    question: 'ข้อมูลสุขภาพของฉันปลอดภัยหรือไม่?',
    answer:
      'ปลอดภัย 100% ค่ะ AsthmaCare ใช้การเข้ารหัสข้อมูลระดับสูงสุด ข้อมูลประวัติการหอบและค่า Peak Flow ของคุณจะถูกเข้าถึงได้เฉพาะแพทย์ผู้ทำการรักษาเท่านั้น',
  },
  {
    question: 'หอบกำเริบรุนแรง (Severe attack) ควรปรึกษาไหม?',
    answer:
      'หากมีอาการหอบรุนแรง พูดเป็นประโยคไม่ได้ ปากเขียว หรือพ่นยาฉุกเฉินแล้วไม่ดีขึ้นภายใน 15 นาที ให้รีบไปห้องฉุกเฉินโรงพยาบาลที่ใกล้ที่สุด หรือโทร 1669 ห้ามรอปรึกษาผ่านระบบออนไลน์เด็ดขาด',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ❓ FAQ
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">คำถามที่พบบ่อย</h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            คำตอบสำหรับข้อสงสัยยอดฮิต
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-blue-200 bg-blue-50/50 shadow-md'
                    : 'border-slate-100 bg-white hover:border-blue-100 hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
                >
                  <span
                    className={`font-semibold text-base transition-colors duration-300 ${
                      isOpen ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-600'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 shrink-0 ml-4 ${
                      isOpen
                        ? 'bg-blue-600 text-white rotate-45 scale-110'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-400 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
