export default function DoctorTeam() {
  const doctors = [
    {
      name: 'พญ. สุภาพร ศรีสุข',
      specialty: 'อายุรกรรมทั่วไป',
      experience: '12 ปี',
      rating: 4.9,
      reviews: 328,
      avatar: '👩‍⚕️',
      color: 'from-blue-100 to-blue-50',
      available: true,
    },
    {
      name: 'นพ. ธนพล จิตแพทย์',
      specialty: 'จิตเวชศาสตร์',
      experience: '15 ปี',
      rating: 4.8,
      reviews: 256,
      avatar: '👨‍⚕️',
      color: 'from-purple-100 to-purple-50',
      available: true,
    },
    {
      name: 'พญ. นิตยา ผิวงาม',
      specialty: 'ตจวิทยา (ผิวหนัง)',
      experience: '8 ปี',
      rating: 4.9,
      reviews: 412,
      avatar: '👩‍⚕️',
      color: 'from-pink-100 to-pink-50',
      available: false,
    },
    {
      name: 'นพ. วิชัย กระดูกแข็ง',
      specialty: 'ศัลยกรรมกระดูก',
      experience: '20 ปี',
      rating: 4.7,
      reviews: 189,
      avatar: '👨‍⚕️',
      color: 'from-green-100 to-green-50',
      available: true,
    },
    {
      name: 'พญ. อรุณี รักเด็ก',
      specialty: 'กุมารเวชศาสตร์',
      experience: '10 ปี',
      rating: 5.0,
      reviews: 567,
      avatar: '👩‍⚕️',
      color: 'from-orange-100 to-orange-50',
      available: true,
    },
    {
      name: 'นพ. สมชาย หัวใจดี',
      specialty: 'อายุรกรรมหัวใจ',
      experience: '18 ปี',
      rating: 4.8,
      reviews: 298,
      avatar: '👨‍⚕️',
      color: 'from-red-100 to-red-50',
      available: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            👨‍⚕️ Our Doctors
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">ทีมแพทย์ผู้เชี่ยวชาญ</h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            แพทย์ทุกท่านผ่านการรับรองจากแพทยสภา พร้อมประสบการณ์ระดับมืออาชีพ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {doctors.map((doc, i) => (
            <div
              key={i}
              className="card-interactive bg-white rounded-3xl p-6 shadow-lg border border-slate-100 group relative overflow-hidden"
            >
              {/* Available badge */}
              {doc.available && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">ออนไลน์</span>
                </div>
              )}

              {/* Avatar */}
              <div
                className={`w-20 h-20 bg-gradient-to-br ${doc.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:rounded-xl`}
              >
                {doc.avatar}
              </div>

              {/* Info */}
              <div className="text-center">
                <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {doc.name}
                </h4>
                <p className="text-sm text-blue-600 font-medium mb-1">{doc.specialty}</p>
                <p className="text-xs text-slate-400 mb-3">ประสบการณ์ {doc.experience}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        className={`text-xs transition-all duration-300 ${
                          j < Math.round(doc.rating)
                            ? 'text-yellow-400 group-hover:scale-125'
                            : 'text-slate-200'
                        }`}
                        style={{ transitionDelay: `${j * 60}ms` }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{doc.rating}</span>
                  <span className="text-xs text-slate-400">({doc.reviews} รีวิว)</span>
                </div>

                {/* CTA */}
                <button className="w-full bg-blue-50 text-blue-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 btn-ripple active:scale-95 cursor-pointer">
                  นัดปรึกษา
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <button className="bg-white text-slate-700 px-8 py-3 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer group">
            ดูแพทย์ทั้งหมด 500+ ท่าน{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
