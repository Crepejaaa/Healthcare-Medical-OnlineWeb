export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4 group">
              <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
                🩺
              </span>
              <span className="text-xl font-bold text-white">HealthConnect</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ดูแลคุณ เหมือนมีคุณหมอเป็นเพื่อนสนิทข้างกาย บริการปรึกษาแพทย์ออนไลน์ตลอด 24 ชั่วโมง
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold text-white mb-4">บริการ</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  ปรึกษาแพทย์ทั่วไป
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  แพทย์เฉพาะทาง
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  ตรวจสุขภาพถึงบ้าน
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  ส่งยาถึงบ้าน
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="font-semibold text-white mb-4">เกี่ยวกับเรา</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  เกี่ยวกับ HealthConnect
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  ทีมแพทย์ของเรา
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  นโยบายความเป็นส่วนตัว
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">
                  ข้อกำหนดการใช้งาน
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-white mb-4">ติดต่อเรา</h5>
            <ul className="space-y-2 text-sm">
              <li>📞 02-xxx-xxxx</li>
              <li>📱 Line: @healthconnect</li>
              <li>✉️ support@healthconnect.co.th</li>
            </ul>
            <div className="mt-4">
              <p className="text-red-400 text-sm font-medium pulse-alert">🚨 เหตุฉุกเฉิน โทร 1669</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          <p>
            © 2026 HealthConnect. สงวนลิขสิทธิ์ทุกประการ | ใบอนุญาตสถานพยาบาลเลขที่ XXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}
