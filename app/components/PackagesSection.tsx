export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 container mx-auto px-4">
      <div className="text-center mb-14">
        <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          💎 Membership Packages
        </span>
        <h3 className="text-3xl md:text-4xl font-bold">เลือกแพ็กเกจที่เหมาะกับคุณ</h3>
        <p className="text-slate-500 mt-3 max-w-xl mx-auto">
          ดูแลสุขภาพในราคาที่คุ้มค่า เริ่มต้นเพียงวันละไม่กี่บาท
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Package 1: Daily Health */}
        <div className="fade-in-up card-interactive bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            🫁
          </div>
          <h4 className="text-2xl font-bold mb-1">Asthma Basic</h4>
          <p className="text-sm text-slate-400 mb-1">ติดตามหอบหืดเบื้องต้น</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-blue-600">฿299</span>
            <span className="text-slate-400 text-sm mb-1">/เดือน</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            ตอบโจทย์ผู้ป่วยที่คุมอาการได้ดี ต้องการปรึกษาเฉพาะกิจเมื่อเริ่มมีอาการไอหรือแน่นหน้าอก
            ปรึกษาหมอได้ง่ายๆ ผ่านเว็บแอปพลิเคชัน
          </p>
          <ul className="text-sm text-slate-600 space-y-2.5 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> ปรึกษาเฉพาะทางระบบหายใจ 2 ครั้ง/เดือน
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> แชทสอบถามการเป่า Peak Flow ได้
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> สิทธิซื้อยาพ่นราคาพิเศษ
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <span className="mt-0.5">✗</span> เครื่องเป่าปอดดิจิทัลฟรี
            </li>
          </ul>
          <button className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
            เลือกแพ็กเกจนี้
          </button>
        </div>

        {/* Package 2: Family Shield (Popular) */}
        <div className="fade-in-up card-interactive bg-gradient-to-b from-cyan-50 to-white p-8 rounded-3xl shadow-xl border-2 border-cyan-400 relative group md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">
            🔥 ยอดฮิต
          </div>
          <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            👨‍👩‍👧‍👦
          </div>
          <h4 className="text-2xl font-bold mb-1">Family Asthma Care</h4>
          <p className="text-sm text-slate-400 mb-1">คุ้มครองทั้งครอบครัว</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-cyan-600">฿599</span>
            <span className="text-slate-400 text-sm mb-1">/เดือน</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            หอบหืดในเด็กและผู้สูงอายุต้องดูแลใกล้ชิด ปรึกษากุมารแพทย์และแพทย์เฉพาะทางได้ทันใจ
            ลดการพาครอบครัวไปแออัดในโรงพยาบาล
          </p>
          <ul className="text-sm text-slate-600 space-y-2.5 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 mt-0.5">✓</span> สมาชิกเพื่อรับคำปรึกษาสูงสุด 4 คน
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 mt-0.5">✓</span> ปรึกษาแพทย์ 8 ครั้ง/เดือน (แชร์ได้)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 mt-0.5">✓</span> แพทย์สอนใช้ยาพ่นแบบวิดีโอคอล
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 mt-0.5">✓</span> จัดส่งยาพ่นด่วนฟรี (ใน กทม.)
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-200 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
            สมัครแพ็กเกจนี้
          </button>
        </div>

        {/* Package 3: Elite Wellness */}
        <div className="fade-in-up card-interactive bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group">
          <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            🥇
          </div>
          <h4 className="text-2xl font-bold mb-1">Asthma Control Premium</h4>
          <p className="text-sm text-slate-400 mb-1">แพ็กเกจจัดการระยะยาวรายปี</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-teal-600">฿4,990</span>
            <span className="text-slate-400 text-sm mb-1">/ปี</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            ยกระดับการจัดการหอบหืดรุนแรง ปรึกษาแพทย์ไม่จำกัดครั้ง พร้อมแถมฟรีเครื่องเป่าปอดดิจิทัลเพื่อซิงค์ผลกับแอป
          </p>
          <ul className="text-sm text-slate-600 space-y-2.5 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">✓</span> ปรึกษาแพทย์เฉพาะทาง ไม่จำกัด
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">✓</span> ฟรี! เครื่องวัด Peak Flow ดิจิทัล
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">✓</span> เจาะเลือดตรวจภูมิแพ้ถึงบ้าน 1 ครั้ง
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">✓</span> ส่วนลดค่ายาพ่น 25%
            </li>
          </ul>
          <button className="w-full bg-teal-50 text-teal-700 py-3 rounded-xl font-semibold hover:bg-teal-100 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
            เลือกแพ็กเกจนี้
          </button>
        </div>
      </div>
    </section>
  );
}
