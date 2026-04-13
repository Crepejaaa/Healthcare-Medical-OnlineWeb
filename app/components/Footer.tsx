'use client';

import { useState } from 'react';
import Link from 'next/link';

type FooterModalContent = {
  title: string;
  icon: string;
  content: React.ReactNode;
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  // ─── Modal Contents ───
  const modalContents: Record<string, FooterModalContent> = {
    'consult': {
      title: 'ปรึกษาอาการหอบกำเริบ',
      icon: '🫁',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5">
            <h4 className="font-bold text-blue-800 mb-2 text-base">💨 บริการปรึกษาอาการหอบกำเริบออนไลน์</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              เมื่ออาการหอบหืดกำเริบ ท่านสามารถปรึกษาแพทย์เฉพาะทางได้ทันที ผ่านระบบวิดีโอคอลตลอด 24 ชั่วโมง
              โดยไม่จำเป็นต้องเดินทางไปโรงพยาบาล
            </p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">🩺 อาการที่ควรปรึกษาแพทย์</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                'หายใจลำบาก หอบเหนื่อย',
                'แน่นหน้าอก หายใจมีเสียงหวีด',
                'ไอเรื้อรังโดยเฉพาะตอนกลางคืน',
                'ใช้ยาพ่นฉุกเฉินบ่อยขึ้น',
                'ค่า Peak Flow ลดลงต่ำกว่าปกติ',
                'อาการแย่ลงเมื่อออกกำลังกาย',
              ].map((symptom, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  {symptom}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">📋 ขั้นตอนการปรึกษา</h4>
            <div className="space-y-3">
              {[
                { step: '1', title: 'เข้าสู่ระบบ', desc: 'ลงทะเบียนหรือเข้าสู่ระบบบัญชี AsthmaCare' },
                { step: '2', title: 'เลือกแพทย์', desc: 'เลือกแพทย์เฉพาะทางระบบทางเดินหายใจ' },
                { step: '3', title: 'กรอกอาการ', desc: 'อธิบายอาการผ่านแบบฟอร์มคัดกรองเบื้องต้น' },
                { step: '4', title: 'วิดีโอคอล', desc: 'พูดคุยกับแพทย์ผ่านวิดีโอคอลแบบเรียลไทม์' },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs text-red-700 font-medium">
              🚨 <strong>กรณีฉุกเฉิน:</strong> หากมีอาการหอบรุนแรง หายใจไม่ออก ริมฝีปากเขียว กรุณาโทร 1669 หรือไปห้องฉุกเฉินทันที
            </p>
          </div>
        </div>
      ),
    },

    'respiratory': {
      title: 'แพทย์ระบบทางเดินหายใจและภูมิแพ้',
      icon: '👨‍⚕️',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-5">
            <h4 className="font-bold text-green-800 mb-2 text-base">🏥 ทีมแพทย์เฉพาะทาง</h4>
            <p className="text-sm text-green-700 leading-relaxed">
              ทีมแพทย์ของเราประกอบด้วยผู้เชี่ยวชาญด้านระบบทางเดินหายใจและภูมิแพ้
              ที่ผ่านการรับรองจากราชวิทยาลัยอายุรแพทย์แห่งประเทศไทย
            </p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">🎓 ความเชี่ยวชาญของทีมแพทย์</h4>
            <div className="space-y-2">
              {[
                { title: 'โรคหอบหืด (Asthma)', desc: 'วินิจฉัยและรักษาโรคหอบหืดทุกระดับความรุนแรง' },
                { title: 'โรคปอดอุดกั้นเรื้อรัง (COPD)', desc: 'จัดการอาการและป้องกันการกำเริบ' },
                { title: 'โรคภูมิแพ้', desc: 'ทดสอบภูมิแพ้และวางแผนการรักษา' },
                { title: 'โรคทางเดินหายใจติดเชื้อ', desc: 'ปอดบวม หลอดลมอักเสบ ไซนัสอักเสบ' },
                { title: 'การตรวจสมรรถภาพปอด', desc: 'Spirometry และ Peak Flow Monitoring' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-3.5 hover:shadow-sm transition-shadow">
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">📊 สถิติทีมแพทย์</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: '50+', label: 'แพทย์เฉพาะทาง' },
                { num: '15+', label: 'ปีประสบการณ์เฉลี่ย' },
                { num: '98%', label: 'ความพึงพอใจ' },
              ].map((stat, i) => (
                <div key={i} className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">{stat.num}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ),
    },

    'peakflow': {
      title: 'ติดตามค่า Peak Flow ออนไลน์',
      icon: '📊',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-2xl p-5">
            <h4 className="font-bold text-purple-800 mb-2 text-base">📈 ระบบติดตาม Peak Flow</h4>
            <p className="text-sm text-purple-700 leading-relaxed">
              บันทึกค่า Peak Expiratory Flow Rate (PEFR) ของคุณทุกวัน เพื่อติดตามสมรรถภาพปอดและแนวโน้มอาการหอบหืด
              แพทย์สามารถเข้าถึงข้อมูลแบบเรียลไทม์เพื่อปรับแผนการรักษา
            </p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">🎯 ฟีเจอร์หลัก</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📝', title: 'บันทึกรายวัน', desc: 'บันทึกค่า Peak Flow เช้า-เย็น' },
                { icon: '📉', title: 'กราฟแนวโน้ม', desc: 'ดูกราฟค่า Peak Flow ย้อนหลัง' },
                { icon: '🚦', title: 'ระบบสีสัญญาณ', desc: 'เขียว เหลือง แดง ตามค่าที่วัดได้' },
                { icon: '🔔', title: 'แจ้งเตือนอัตโนมัติ', desc: 'แจ้งเตือนเมื่อค่าลดต่ำผิดปกติ' },
                { icon: '👨‍⚕️', title: 'แชร์กับแพทย์', desc: 'แพทย์ดูข้อมูลแบบเรียลไทม์' },
                { icon: '📋', title: 'รายงาน', desc: 'สรุปรายงานรายสัปดาห์/เดือน' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">🚦 โซนสัญญาณ Peak Flow</h4>
            <div className="space-y-2">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-green-800">โซนเขียว (80-100%)</p>
                  <p className="text-[11px] text-green-700">ปอดทำงานดี ควบคุมอาการได้</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-yellow-800">โซนเหลือง (50-80%)</p>
                  <p className="text-[11px] text-yellow-700">ระวัง! ทางเดินหายใจเริ่มตีบ</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-red-800">โซนแดง (ต่ำกว่า 50%)</p>
                  <p className="text-[11px] text-red-700">อันตราย! ต้องพบแพทย์ทันที</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ),
    },

    'delivery': {
      title: 'บริการส่งยาพ่นถึงบ้าน',
      icon: '🚚',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5">
            <h4 className="font-bold text-orange-800 mb-2 text-base">💊 บริการจัดส่งยาพ่นถึงบ้าน</h4>
            <p className="text-sm text-orange-700 leading-relaxed">
              ไม่ต้องเดินทางไปรับยาที่โรงพยาบาล หลังปรึกษาแพทย์แล้ว ยาพ่นจะถูกจัดส่งถึงบ้านของคุณ
              พร้อมคำแนะนำการใช้ยาอย่างละเอียด
            </p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">📦 ยาที่จัดส่งได้</h4>
            <div className="space-y-2">
              {[
                { name: 'ยาพ่นสูดควบคุม (Controller)', desc: 'ICS, ICS/LABA สำหรับใช้ประจำ', color: 'bg-blue-50 border-blue-100' },
                { name: 'ยาพ่นสูดฉุกเฉิน (Reliever)', desc: 'SABA สำหรับบรรเทาอาการเฉียบพลัน', color: 'bg-red-50 border-red-100' },
                { name: 'ยาพ่นจมูก', desc: 'สเปรย์พ่นจมูกสำหรับโรคภูมิแพ้', color: 'bg-green-50 border-green-100' },
                { name: 'อุปกรณ์เสริม', desc: 'Spacer, Peak Flow Meter, Nebulizer Mask', color: 'bg-purple-50 border-purple-100' },
              ].map((item, i) => (
                <div key={i} className={`${item.color} border rounded-xl p-3`}>
                  <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">🕐 ระยะเวลาจัดส่ง</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-600">2-4 ชม.</p>
                <p className="text-xs text-slate-500">กรุงเทพฯ-ปริมณฑล</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-600">1-2 วัน</p>
                <p className="text-xs text-slate-500">ต่างจังหวัด</p>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-700">
              💡 <strong>หมายเหตุ:</strong> ยาทุกรายการต้องผ่านการสั่งจ่ายโดยแพทย์เท่านั้น ไม่สามารถสั่งซื้อยาเองได้
            </p>
          </div>
        </div>
      ),
    },

    'about': {
      title: 'เกี่ยวกับ AsthmaCare',
      icon: '🏢',
      content: (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
            <h4 className="font-bold text-blue-800 mb-2 text-base">🩺 AsthmaCare — ดูแลคุณ เหมือนเป็นเพื่อนสนิทข้างกาย</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              AsthmaCare เป็นแพลตฟอร์มการแพทย์ทางไกลที่เชี่ยวชาญเรื่องโรคหอบหืดและระบบทางเดินหายใจ
              ก่อตั้งขึ้นเพื่อให้ผู้ป่วยทุกคนเข้าถึงการรักษาที่มีคุณภาพได้อย่างสะดวกและทันเวลา
            </p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">🎯 พันธกิจของเรา</h4>
            <div className="space-y-2">
              {[
                'ลดอัตราการเข้าห้องฉุกเฉินจากอาการหอบหืดกำเริบ',
                'ให้ผู้ป่วยเข้าถึงแพทย์เฉพาะทางได้ทุกที่ทุกเวลา',
                'ส่งเสริมการดูแลตนเองสำหรับผู้ป่วยโรคหอบหืด',
                'พัฒนาเทคโนโลยีเพื่อการติดตามอาการอย่างต่อเนื่อง',
              ].map((mission, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-lg p-3">
                  <span className="text-blue-500 font-bold mt-0.5">✓</span>
                  <p className="text-sm text-slate-700">{mission}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-3">📊 ตัวเลขที่เราภาคภูมิใจ</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: '500+', label: 'แพทย์ผู้เชี่ยวชาญ', icon: '👨‍⚕️' },
                { num: '50K+', label: 'การปรึกษาต่อเดือน', icon: '💬' },
                { num: '24/7', label: 'พร้อมให้บริการ', icon: '🕐' },
                { num: '4.9⭐', label: 'คะแนนความพึงพอใจ', icon: '❤️' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:shadow-sm transition-shadow">
                  <span className="text-xl block mb-1">{stat.icon}</span>
                  <p className="text-lg font-bold text-blue-600">{stat.num}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ),
    },

    'privacy': {
      title: 'นโยบายความเป็นส่วนตัว',
      icon: '🔒',
      content: (
        <div className="space-y-5">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-green-700 font-semibold text-xs">ปรับปรุงล่าสุด: 1 มกราคม 2569</p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">1. ข้อมูลที่เราเก็บรวบรวม</h4>
            <p className="text-sm text-slate-600 mb-2">เราเก็บรวบรวมข้อมูลส่วนบุคคลเพื่อให้บริการที่ดีที่สุดแก่ท่าน:</p>
            <div className="space-y-2">
              <div className="bg-white border border-slate-100 rounded-lg p-3">
                <p className="font-semibold text-slate-700 text-xs mb-1">📌 ข้อมูลระบุตัวตน</p>
                <p className="text-xs text-slate-500">ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ วันเกิด</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3">
                <p className="font-semibold text-slate-700 text-xs mb-1">🏥 ข้อมูลสุขภาพ</p>
                <p className="text-xs text-slate-500">ประวัติอาการ ผลการคัดกรอง ข้อมูลการปรึกษาแพทย์</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3">
                <p className="font-semibold text-slate-700 text-xs mb-1">💻 ข้อมูลทางเทคนิค</p>
                <p className="text-xs text-slate-500">IP Address ประเภทเบราว์เซอร์ ข้อมูลอุปกรณ์ คุกกี้</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">2. วัตถุประสงค์ในการใช้ข้อมูล</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>ให้บริการทางการแพทย์ทางไกลอย่างมีประสิทธิภาพ</li>
              <li>ยืนยันตัวตนและรักษาความปลอดภัยของบัญชี</li>
              <li>ปรับปรุงและพัฒนาคุณภาพบริการ</li>
              <li>ส่งข้อมูลข่าวสารด้านสุขภาพที่เป็นประโยชน์</li>
              <li>ปฏิบัติตามข้อกำหนดทางกฎหมาย</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">3. การแบ่งปันข้อมูล</h4>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-2">
              <p className="text-blue-800 text-xs">🛡️ เราจะไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอกเป็นอันขาด</p>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">4. การรักษาความปลอดภัย</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>เข้ารหัสข้อมูลด้วยมาตรฐาน SSL/TLS 256-bit</li>
              <li>จัดเก็บข้อมูลในเซิร์ฟเวอร์ที่ผ่านมาตรฐาน ISO 27001</li>
              <li>ตรวจสอบระบบรักษาความปลอดภัยอย่างสม่ำเสมอ</li>
              <li>จำกัดการเข้าถึงข้อมูลเฉพาะบุคลากรที่ได้รับอนุญาต</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">5. สิทธิ์ของท่าน (PDPA)</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>เข้าถึงและขอสำเนาข้อมูลส่วนบุคคล</li>
              <li>แก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน</li>
              <li>ขอลบข้อมูลส่วนบุคคล</li>
              <li>คัดค้านการประมวลผลข้อมูล</li>
              <li>ถอนความยินยอมได้ตลอดเวลา</li>
            </ul>
          </section>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500 text-center">📧 ติดต่อ DPO: privacy@Asthmacare.co.th</p>
          </div>
        </div>
      ),
    },

    'terms': {
      title: 'ข้อกำหนดการใช้งาน',
      icon: '📋',
      content: (
        <div className="space-y-5">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-blue-700 font-semibold text-xs">มีผลบังคับใช้ตั้งแต่: 1 มกราคม 2569</p>
          </div>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">1. ข้อตกลงทั่วไป</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              เมื่อท่านใช้บริการ AsthmaCare ท่านตกลงที่จะปฏิบัติตามข้อกำหนดการใช้งานฉบับนี้
              หากท่านไม่เห็นด้วยกับข้อกำหนดใดๆ กรุณาหยุดใช้บริการทันที
            </p>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">2. คุณสมบัติของผู้ใช้บริการ</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>ผู้ใช้บริการต้องมีอายุไม่ต่ำกว่า 18 ปี หรือได้รับความยินยอมจากผู้ปกครอง</li>
              <li>ข้อมูลที่ลงทะเบียนต้องเป็นข้อมูลจริงและถูกต้อง</li>
              <li>ผู้ใช้ต้องรักษาความลับของรหัสผ่านและบัญชีของตน</li>
              <li>ห้ามใช้บัญชีของผู้อื่นโดยไม่ได้รับอนุญาต</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">3. ขอบเขตการให้บริการ</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>การปรึกษาแพทย์ทางไกล (Telemedicine) ผ่านระบบวิดีโอคอล</li>
              <li>การคัดกรองอาการเบื้องต้นด้วยแบบสอบถาม</li>
              <li>การติดตามค่า Peak Flow ออนไลน์</li>
              <li>บริการจัดส่งยาพ่นถึงบ้าน</li>
              <li>บทความสุขภาพและข้อมูลทางการแพทย์</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">4. ข้อจำกัดของบริการ</h4>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-800 text-xs">
                ⚠️ บริการนี้ไม่ใช่บริการฉุกเฉิน หากท่านมีอาการฉุกเฉินทางการแพทย์ กรุณาโทร 1669
                หรือไปยังห้องฉุกเฉินของโรงพยาบาลที่ใกล้ที่สุดทันที
              </p>
            </div>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">5. ค่าบริการ</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>ค่าบริการจะระบุไว้อย่างชัดเจนก่อนการใช้บริการ</li>
              <li>การชำระเงินสามารถทำผ่านช่องทางที่กำหนดไว้ในแพลตฟอร์ม</li>
              <li>นโยบายการคืนเงินเป็นไปตามเงื่อนไขที่กำหนด</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-slate-800 mb-2">6. ทรัพย์สินทางปัญญา</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              เนื้อหา ซอฟต์แวร์ และสื่อทั้งหมดบนแพลตฟอร์มเป็นทรัพย์สินของ AsthmaCare
              ห้ามทำซ้ำ ดัดแปลง หรือเผยแพร่โดยไม่ได้รับอนุญาต
            </p>
          </section>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-500 text-xs text-center">© 2569 AsthmaCare — สงวนลิขสิทธิ์ทั้งหมด</p>
          </div>
        </div>
      ),
    },
  };

  const currentModal = activeModal ? modalContents[activeModal] : null;

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4 group">
                <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
                  🩺
                </span>
                <span className="text-xl font-bold text-white">AsthmaCare</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                ดูแลผู้ป่วยโรคหอบหืดอย่างใกล้ชิด บริการปรึกษาแพทย์เฉพาะทางออนไลน์ตลอด 24 ชั่วโมง
              </p>
            </div>

            {/* Services */}
            <div>
              <h5 className="font-semibold text-white mb-4">บริการ</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setActiveModal('consult')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    ปรึกษาอาการหอบกำเริบ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('respiratory')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    แพทย์ระบบทางเดินหายใจและภูมิแพ้
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('peakflow')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    ติดตามค่า Peak Flow ออนไลน์
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('delivery')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    บริการส่งยาพ่นถึงบ้าน
                  </button>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h5 className="font-semibold text-white mb-4">เกี่ยวกับเรา</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setActiveModal('about')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    เกี่ยวกับ AsthmaCare
                  </button>
                </li>
                <li>
                  <Link
                    href="/doctors"
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    ทีมแพทย์ของเรา
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    นโยบายความเป็นส่วนตัว
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block cursor-pointer text-left"
                  >
                    ข้อกำหนดการใช้งาน
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-semibold text-white mb-4">ติดต่อเรา</h5>
              <ul className="space-y-2 text-sm">
                <li>📞 02-xxx-xxxx</li>
                <li>📱 Line: @AsthmaCare</li>
                <li>✉️ support@AsthmaCare.co.th</li>
              </ul>
              <div className="mt-4">
                <p className="text-red-400 text-sm font-medium pulse-alert">🚨 เหตุฉุกเฉิน โทร 1669</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
            <p>
              © 2026 AsthmaCare. สงวนลิขสิทธิ์ทุกประการ | คลินิกเฉพาะทางโรคหอบหืดออนไลน์
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Detail Modal ─── */}
      {currentModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transition-all duration-300 scale-100 opacity-100 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all z-20 hover:rotate-90 duration-300 cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentModal.icon}</span>
                <h3 className="text-lg font-bold text-slate-800">{currentModal.title}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[65vh] overflow-y-auto">
              {currentModal.content}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
