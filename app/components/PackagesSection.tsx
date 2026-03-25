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
            💼
          </div>
          <h4 className="text-2xl font-bold mb-1">Daily Health</h4>
          <p className="text-sm text-slate-400 mb-1">สำหรับวัยทำงาน</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-blue-600">฿299</span>
            <span className="text-slate-400 text-sm mb-1">/เดือน</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            สู้หน้าจอแต่ไม่ทิ้งสุขภาพ ตอบโจทย์ชีวิต Office Syndrome และความเครียดสะสม
            ปรึกษาหมอได้ง่ายๆ ผ่านมือถือแม้ในเวลาพักเที่ยง
          </p>
          <ul className="text-sm text-slate-600 space-y-2.5 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> ปรึกษาแพทย์ทั่วไป 3 ครั้ง/เดือน
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> แชทสอบถามอาการ ไม่จำกัด
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> บทความสุขภาพ Premium
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <span className="mt-0.5">✗</span> วิดีโอคอลแพทย์เฉพาะทาง
            </li>
          </ul>
          <button className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
            เลือกแพ็กเกจนี้
          </button>
        </div>

        {/* Package 2: Family Shield (Popular) */}
        <div className="fade-in-up card-interactive bg-gradient-to-b from-orange-50 to-white p-8 rounded-3xl shadow-xl border-2 border-orange-400 relative group md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">
            🔥 ยอดฮิต
          </div>
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            🛡️
          </div>
          <h4 className="text-2xl font-bold mb-1">Family Shield</h4>
          <p className="text-sm text-slate-400 mb-1">สำหรับครอบครัว</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-orange-600">฿599</span>
            <span className="text-slate-400 text-sm mb-1">/เดือน</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            เพราะสุขภาพของคนในบ้านรอไม่ได้ ดูแลครบทั้งบ้านในบัญชีเดียว ปรึกษาหมอเด็กหรือผู้สูงอายุได้ทันใจ
            พร้อมส่วนลดพิเศษ
          </p>
          <ul className="text-sm text-slate-600 space-y-2.5 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> สมาชิกสูงสุด 5 คน/ครอบครัว
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> ปรึกษาแพทย์ 10 ครั้ง/เดือน
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> วิดีโอคอลแพทย์เฉพาะทาง
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> ส่วนลดค่ายา 15%
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
            สมัครแพ็กเกจนี้
          </button>
        </div>

        {/* Package 3: Elite Wellness */}
        <div className="fade-in-up card-interactive bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            ✨
          </div>
          <h4 className="text-2xl font-bold mb-1">Elite Wellness</h4>
          <p className="text-sm text-slate-400 mb-1">แพ็กเกจรายปี</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-purple-600">฿4,990</span>
            <span className="text-slate-400 text-sm mb-1">/ปี</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            ยกระดับการใช้ชีวิตด้วยสุขภาพที่ดีที่สุด ปรึกษาแพทย์ไม่จำกัดครั้ง พร้อมบริการเจาะเลือดถึงบ้าน
            เพราะการป้องกันย่อมดีกว่า
          </p>
          <ul className="text-sm text-slate-600 space-y-2.5 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> ปรึกษาแพทย์ ไม่จำกัดครั้ง
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> เจาะเลือดถึงบ้าน 2 ครั้ง/ปี
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> แพทย์เฉพาะทางทุกสาขา
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span> ส่วนลดค่ายา 25%
            </li>
          </ul>
          <button className="w-full bg-purple-50 text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
            เลือกแพ็กเกจนี้
          </button>
        </div>
      </div>
    </section>
  );
}
