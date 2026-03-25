'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'HealthConnect คืออะไร?',
    answer:
      'HealthConnect เป็นแพลตฟอร์มปรึกษาแพทย์ออนไลน์ ที่ให้คุณปรึกษาแพทย์ผู้เชี่ยวชาญได้ตลอด 24 ชั่วโมง ผ่านวิดีโอคอล แชท หรือโทรศัพท์ โดยไม่ต้องเดินทางไปโรงพยาบาล เหมาะสำหรับอาการทั่วไปที่ไม่ใช่เหตุฉุกเฉิน',
  },
  {
    question: 'แพทย์ของ HealthConnect มีใบอนุญาตหรือไม่?',
    answer:
      'แพทย์ทุกท่านของ HealthConnect ได้รับใบอนุญาตประกอบวิชาชีพเวชกรรมจากแพทยสภา และมีประสบการณ์อย่างน้อย 5 ปีขึ้นไป ทุกท่านผ่านการตรวจสอบคุณสมบัติอย่างเข้มงวดก่อนเข้าร่วมทีม',
  },
  {
    question: 'สามารถสั่งยาผ่านออนไลน์ได้หรือไม่?',
    answer:
      'ได้ค่ะ หลังจากปรึกษาแพทย์ แพทย์สามารถสั่งยาให้คุณได้ตามความเหมาะสม และเราจะจัดส่งยาถึงบ้านคุณภายใน 2-4 ชั่วโมงในกรุงเทพฯ และ 1-2 วันสำหรับต่างจังหวัด พร้อมส่วนลดค่ายาตามแพ็กเกจ',
  },
  {
    question: 'ยกเลิกแพ็กเกจได้ไหม?',
    answer:
      'ได้ค่ะ คุณสามารถยกเลิกแพ็กเกจได้ตลอดเวลาผ่านหน้าตั้งค่าบัญชี โดยแพ็กเกจจะยังใช้งานได้จนครบรอบบิลปัจจุบัน หากยกเลิกก่อนหมดรอบ สามารถขอคืนเงินส่วนที่เหลือได้ภายใน 14 วัน',
  },
  {
    question: 'ข้อมูลสุขภาพของฉันปลอดภัยหรือไม่?',
    answer:
      'ปลอดภัยค่ะ HealthConnect ใช้การเข้ารหัสข้อมูลระดับ AES-256 และปฏิบัติตาม PDPA (พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล) อย่างเคร่งครัด ข้อมูลทุกอย่างถูกจัดเก็บบนเซิร์ฟเวอร์ที่ได้มาตรฐาน ISO 27001 และเข้าถึงได้เฉพาะแพทย์ที่ดูแลคุณเท่านั้น',
  },
  {
    question: 'กรณีฉุกเฉินควรทำอย่างไร?',
    answer:
      'สำหรับกรณีฉุกเฉิน เช่น เจ็บแน่นหน้าอก หายใจลำบาก ชัก หมดสติ กรุณาโทร 1669 ทันที หรือเดินทางไปห้องฉุกเฉิน (ER) ของโรงพยาบาลใกล้บ้าน HealthConnect ไม่ใช่บริการฉุกเฉิน ระบบคัดกรองจะแจ้งเตือนอัตโนมัติหากพบสัญญาณอันตราย',
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
