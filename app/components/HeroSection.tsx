export default function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-28">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 hover:bg-blue-200 transition-colors cursor-default">
          🏥 บริการเปิดให้ใช้งาน 24 ชั่วโมง ทุกวัน
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          ไม่ต้องรอคิวโรงพยาบาล ไม่ต้องเดินทางให้เหนื่อย <br />
          <span className="gradient-text">ปรึกษาคุณหมอออนไลน์ได้ทันที</span>
        </h2>

        <p className="text-base md:text-lg text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
          สุขภาพดีเริ่มต้นที่ความใส่ใจ เลือกแพ็กเกจที่ใช่ เพื่อตัวคุณและคนที่คุณรัก
        </p>
        <p className="text-sm md:text-base text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          เคยไหม? ป่วยตอนดึกแต่ไม่กล้าไปห้องฉุกเฉิน, กังวลกับผลตรวจสุขภาพแต่ไม่มีเวลาไปฟังผล,
          หรืออยากปรึกษาเรื่องลูกแต่ไม่รู้จะถามใคร...
          ให้เราดูแลคุณด้วยทีมแพทย์ผู้เชี่ยวชาญระดับมืออาชีพ
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#packages"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-orange-200 transition-all duration-300 hover:-translate-y-1 btn-ripple active:scale-95"
          >
            🎉 สมัครสมาชิกวันนี้ รับสิทธิ์ปรึกษาฟรีครั้งแรก
          </a>
          <a
            href="#screening"
            className="inline-block bg-white text-slate-700 text-lg px-8 py-4 rounded-2xl font-semibold border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1 active:scale-95 group"
          >
            คัดกรองอาการ{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="stat-hover cursor-default group">
            <div className="stat-number text-3xl font-bold text-blue-600 transition-colors group-hover:text-blue-700">
              500+
            </div>
            <div className="text-sm text-slate-500">แพทย์ผู้เชี่ยวชาญ</div>
          </div>
          <div className="stat-hover cursor-default group">
            <div className="stat-number text-3xl font-bold text-blue-600 transition-colors group-hover:text-blue-700">
              24/7
            </div>
            <div className="text-sm text-slate-500">พร้อมให้บริการ</div>
          </div>
          <div className="stat-hover cursor-default group">
            <div className="stat-number text-3xl font-bold text-blue-600 transition-colors group-hover:text-blue-700">
              50K+
            </div>
            <div className="text-sm text-slate-500">การปรึกษาต่อเดือน</div>
          </div>
          <div className="stat-hover cursor-default group">
            <div className="stat-number text-3xl font-bold text-blue-600 transition-colors group-hover:text-blue-700">
              4.9⭐
            </div>
            <div className="text-sm text-slate-500">คะแนนความพึงพอใจ</div>
          </div>
        </div>
      </div>
    </header>
  );
}
