export default function HowItWorks() {
  const steps = [
    {
      icon: '📝',
      title: 'สร้างบัญชี',
      desc: 'เข้าสู่ระบบ หรือ สร้างบัญชีเพื่อบันทึกประวัติสุขภาพ',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: '📋',
      title: 'กรอกอาการหอบ',
      desc: 'บอกอาการเบื้องต้นผ่านฟอร์มคัดกรองโรคหอบหืด',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      icon: '👨‍⚕️',
      title: 'พบแพทย์ผู้เชี่ยวชาญ',
      desc: 'รอรับการติดต่อจากแพทย์ระบบทางเดินหายใจ',
      color: 'bg-sky-100 text-sky-600',
    },
    {
      icon: '💊',
      title: 'ปรับยา/ส่งยา',
      desc: 'รับคำแนะนำการรักษา และจัดส่งยาพ่นควบคุมถึงบ้าน',
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            🔄 How It Works
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">ปรึกษาแพทย์ 4 ขั้นตอนง่ายๆ</h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            เริ่มต้นดูแลสุขภาพออนไลน์ได้ทันที ไม่ยุ่งยาก
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`text-center relative group cursor-default reveal-up stagger-${i + 1}`}
            >
              {/* Step Number */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-800 text-white rounded-full text-xs font-bold flex items-center justify-center z-10 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                {i + 1}
              </div>

              {/* Icon */}
              <div
                className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:rounded-2xl`}
              >
                <span className="transition-transform duration-500 group-hover:scale-125">
                  {step.icon}
                </span>
              </div>

              {/* Content */}
              <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
