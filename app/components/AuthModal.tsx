'use client';

import { useState, useEffect, useCallback } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'auth' | 'forgot-password' | 'terms' | 'privacy' | 'google-picker';
type ForgotStep = 'email' | 'otp' | 'reset';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [shakeForm, setShakeForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Current view
  const [currentView, setCurrentView] = useState<ModalView>('auth');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regAccept, setRegAccept] = useState(false);

  // Forgot password
  const [forgotStep, setForgotStep] = useState<ForgotStep>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Google sign-in
  const [googleLoading, setGoogleLoading] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<number | null>(null);

  // Demo Google accounts
  const googleAccounts = [
    { name: 'สมชาย ใจดี', email: 'somchai.j@gmail.com', avatar: '👨‍⚕️', color: 'bg-blue-500' },
    { name: 'สมหญิง รักสุขภาพ', email: 'somying.r@gmail.com', avatar: '👩‍⚕️', color: 'bg-pink-500' },
    { name: 'วิชัย สุขสันต์', email: 'wichai.s@gmail.com', avatar: '🧑‍💼', color: 'bg-green-500' },
  ];

  // Password strength
  const getPasswordStrength = useCallback((pw: string): { level: number; label: string; color: string } => {
    if (!pw) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { level: 1, label: 'อ่อน', color: 'bg-red-500' };
    if (score <= 2) return { level: 2, label: 'ปานกลาง', color: 'bg-yellow-500' };
    if (score <= 3) return { level: 3, label: 'ดี', color: 'bg-blue-500' };
    return { level: 4, label: 'แข็งแรง', color: 'bg-green-500' };
  }, []);

  // OTP countdown timer
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (currentView !== 'auth') {
          setCurrentView('auth');
        } else {
          onClose();
        }
      }
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, currentView]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('auth');
      setForgotStep('email');
      setForgotEmail('');
      setForgotOtp('');
      setForgotNewPassword('');
      setForgotConfirmPassword('');
      setGoogleLoading(false);
    }
  }, [isOpen]);

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 500);
  };

  const showSuccessOverlay = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage('');
      onClose();
    }, 2000);
  };

  // ─── Login ───
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      triggerShake();
      return;
    }

    try {
      const res = await fetch('/api/users');
      const users = await res.json();
      const user = users.find((u: any) => u.email === loginEmail);

      if (!user) throw new Error('ไม่พบข้อมูลผู้ใช้');

      localStorage.setItem('userId', user.id);
      showSuccessOverlay('เข้าสู่ระบบสำเร็จ');
      setLoginEmail('');
      setLoginPassword('');
    } catch {
      triggerShake();
    }
  };

  // ─── Register ───
  const handleRegister = async () => {
    if (!regName || !regEmail || !regPhone || !regPassword || !regConfirm || !regAccept) {
      triggerShake();
      return;
    }
    if (regPassword !== regConfirm) {
      triggerShake();
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail }),
      });

      if (!res.ok) throw new Error('Failed');

      const data = await res.json();
      localStorage.setItem('userId', data.id);

      showSuccessOverlay('สมัครสมาชิกสำเร็จ');
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
      setRegConfirm('');
      setRegAccept(false);
    } catch {
      triggerShake();
    }
  };

  // ─── Google Sign-In ───
  const handleGoogleSignIn = () => {
    setCurrentView('google-picker');
    setSelectedGoogleAccount(null);
  };

  const handleSelectGoogleAccount = async (index: number) => {
    setSelectedGoogleAccount(index);
    setGoogleLoading(true);

    // Simulate Google authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const account = googleAccounts[index];

    try {
      // Try to find or create the user
      const res = await fetch('/api/users');
      const users = await res.json();
      let user = users.find((u: any) => u.email === account.email);

      if (!user) {
        // Auto-register with Google account
        const createRes = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: account.email }),
        });
        if (createRes.ok) {
          user = await createRes.json();
        }
      }

      if (user) {
        localStorage.setItem('userId', user.id);
      }

      setGoogleLoading(false);
      setCurrentView('auth');
      showSuccessOverlay(`เข้าสู่ระบบด้วย ${account.email} สำเร็จ`);
    } catch {
      setGoogleLoading(false);
      setCurrentView('auth');
      triggerShake();
    }
  };

  // ─── Forgot Password ───
  const handleSendOtp = async () => {
    if (!forgotEmail) {
      triggerShake();
      return;
    }

    setOtpSending(true);
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSending(false);
    setOtpCountdown(60);
    setForgotStep('otp');
  };

  const handleVerifyOtp = () => {
    if (!forgotOtp || forgotOtp.length < 6) {
      triggerShake();
      return;
    }
    // Simulate OTP verification
    setForgotStep('reset');
  };

  const handleResetPassword = () => {
    if (!forgotNewPassword || !forgotConfirmPassword) {
      triggerShake();
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      triggerShake();
      return;
    }
    if (forgotNewPassword.length < 6) {
      triggerShake();
      return;
    }

    showSuccessOverlay('ตั้งรหัสผ่านใหม่สำเร็จ');
    setForgotStep('email');
    setForgotEmail('');
    setForgotOtp('');
    setForgotNewPassword('');
    setForgotConfirmPassword('');
  };

  const strength = getPasswordStrength(regPassword);
  const resetStrength = getPasswordStrength(forgotNewPassword);

  if (!isOpen) return null;

  // ─── Terms of Service Content ───
  const renderTermsContent = () => (
    <div className="animate-[fadeInUp_0.3s_ease]">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('auth')}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer"
        >
          ←
        </button>
        <h3 className="text-lg font-bold text-slate-800">📋 เงื่อนไขการใช้บริการ</h3>
      </div>

      <div className="space-y-4 text-sm text-slate-600 leading-relaxed pr-2">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-700 font-semibold text-xs">มีผลบังคับใช้ตั้งแต่: 1 มกราคม 2569</p>
        </div>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">1. ข้อตกลงทั่วไป</h4>
          <p>เมื่อท่านใช้บริการ AsthmaCare ท่านตกลงที่จะปฏิบัติตามเงื่อนไขการใช้บริการฉบับนี้ หากท่านไม่เห็นด้วยกับเงื่อนไขใดๆ กรุณาหยุดใช้บริการทันที การใช้บริการอย่างต่อเนื่องถือว่าท่านยอมรับเงื่อนไขทั้งหมด</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">2. คุณสมบัติของผู้ใช้บริการ</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>ผู้ใช้บริการต้องมีอายุไม่ต่ำกว่า 18 ปี หรือได้รับความยินยอมจากผู้ปกครอง</li>
            <li>ข้อมูลที่ลงทะเบียนต้องเป็นข้อมูลจริงและถูกต้อง</li>
            <li>ผู้ใช้ต้องรักษาความลับของรหัสผ่านและบัญชีของตน</li>
            <li>ห้ามใช้บัญชีของผู้อื่นโดยไม่ได้รับอนุญาต</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">3. ขอบเขตการให้บริการ</h4>
          <p>AsthmaCare เป็นแพลตฟอร์มที่ให้บริการ:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>การปรึกษาแพทย์ทางไกล (Telemedicine) ผ่านระบบวิดีโอคอล</li>
            <li>การคัดกรองอาการเบื้องต้นด้วยแบบสอบถาม</li>
            <li>การจัดการข้อมูลสุขภาพส่วนบุคคล</li>
            <li>การนัดหมายแพทย์ผู้เชี่ยวชาญ</li>
            <li>บทความสุขภาพและข้อมูลทางการแพทย์</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">4. ข้อจำกัดของบริการ</h4>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-xs">
              ⚠️ บริการนี้ไม่ใช่บริการฉุกเฉิน หากท่านมีอาการฉุกเฉินทางการแพทย์ กรุณาโทร 1669 หรือไปยังห้องฉุกเฉินของโรงพยาบาลที่ใกล้ที่สุดทันที
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>ผลการคัดกรองเป็นเพียงข้อมูลเบื้องต้น ไม่ใช่การวินิจฉัยทางการแพทย์</li>
            <li>การตัดสินใจรักษาขั้นสุดท้ายขึ้นอยู่กับดุลยพินิจของแพทย์</li>
            <li>บริการอาจมีข้อจำกัดตามพื้นที่ให้บริการ</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">5. ค่าบริการและการชำระเงิน</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>ค่าบริการจะระบุไว้อย่างชัดเจนก่อนการใช้บริการ</li>
            <li>การชำระเงินสามารถทำผ่านช่องทางที่กำหนด</li>
            <li>นโยบายการคืนเงินเป็นไปตามเงื่อนไขที่กำหนด</li>
            <li>บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงค่าบริการโดยจะแจ้งให้ทราบล่วงหน้า</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">6. ทรัพย์สินทางปัญญา</h4>
          <p>เนื้อหา ซอฟต์แวร์ และสื่อทั้งหมดบนแพลตฟอร์มเป็นทรัพย์สินของ AsthmaCare หรือผู้ให้อนุญาต ห้ามทำซ้ำ ดัดแปลง หรือเผยแพร่โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">7. การยกเลิกบัญชี</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>ท่านสามารถยกเลิกบัญชีได้ตลอดเวลาผ่านการตั้งค่าบัญชี</li>
            <li>บริษัทขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีที่ละเมิดเงื่อนไข</li>
            <li>ข้อมูลจะถูกจัดเก็บตามระยะเวลาที่กฎหมายกำหนด</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">8. การเปลี่ยนแปลงเงื่อนไข</h4>
          <p>บริษัทขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขการใช้บริการได้ตลอดเวลา โดยจะแจ้งให้ผู้ใช้ทราบผ่านทางอีเมลหรือการแจ้งเตือนบนแพลตฟอร์ม การใช้บริการต่อหลังจากมีการเปลี่ยนแปลงถือว่าท่านยอมรับเงื่อนไขใหม่</p>
        </section>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
          <p className="text-slate-500 text-xs text-center">
            © 2569 AsthmaCare — สงวนลิขสิทธิ์ทั้งหมด
          </p>
        </div>
      </div>

      <button
        onClick={() => setCurrentView('auth')}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95 cursor-pointer"
      >
        ฉันเข้าใจแล้ว
      </button>
    </div>
  );

  // ─── Privacy Policy Content ───
  const renderPrivacyContent = () => (
    <div className="animate-[fadeInUp_0.3s_ease]">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentView('auth')}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer"
        >
          ←
        </button>
        <h3 className="text-lg font-bold text-slate-800">🔒 นโยบายความเป็นส่วนตัว</h3>
      </div>

      <div className="space-y-4 text-sm text-slate-600 leading-relaxed pr-2">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-green-700 font-semibold text-xs">ปรับปรุงล่าสุด: 1 มกราคม 2569</p>
        </div>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">1. ข้อมูลที่เราเก็บรวบรวม</h4>
          <p>เราเก็บรวบรวมข้อมูลส่วนบุคคลเพื่อให้บริการที่ดีที่สุดแก่ท่าน:</p>
          <div className="mt-2 space-y-2">
            <div className="bg-white border border-slate-100 rounded-lg p-3">
              <p className="font-semibold text-slate-700 text-xs mb-1">📌 ข้อมูลระบุตัวตน</p>
              <p className="text-xs">ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ วันเกิด</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-lg p-3">
              <p className="font-semibold text-slate-700 text-xs mb-1">🏥 ข้อมูลสุขภาพ</p>
              <p className="text-xs">ประวัติอาการ ผลการคัดกรอง ข้อมูลการปรึกษาแพทย์</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-lg p-3">
              <p className="font-semibold text-slate-700 text-xs mb-1">💻 ข้อมูลทางเทคนิค</p>
              <p className="text-xs">IP Address ประเภทเบราว์เซอร์ ข้อมูลอุปกรณ์ คุกกี้</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">2. วัตถุประสงค์ในการใช้ข้อมูล</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>ให้บริการทางการแพทย์ทางไกลอย่างมีประสิทธิภาพ</li>
            <li>ยืนยันตัวตนและรักษาความปลอดภัยของบัญชี</li>
            <li>ปรับปรุงและพัฒนาคุณภาพบริการ</li>
            <li>ส่งข้อมูลข่าวสารด้านสุขภาพที่เป็นประโยชน์ (เมื่อได้รับความยินยอม)</li>
            <li>ปฏิบัติตามข้อกำหนดทางกฎหมาย</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">3. การแบ่งปันข้อมูล</h4>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-blue-800 text-xs">
              🛡️ เราจะไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอกเป็นอันขาด
            </p>
          </div>
          <p className="mt-2">เราอาจแบ่งปันข้อมูลกับ:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>แพทย์ผู้ให้การรักษาตามความจำเป็น</li>
            <li>หน่วยงานรัฐตามที่กฎหมายกำหนด</li>
            <li>ผู้ให้บริการเทคโนโลยีที่ได้รับการคัดสรร (ภายใต้สัญญารักษาความลับ)</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">4. การรักษาความปลอดภัยของข้อมูล</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>เข้ารหัสข้อมูลด้วยมาตรฐาน SSL/TLS 256-bit</li>
            <li>จัดเก็บข้อมูลในเซิร์ฟเวอร์ที่ผ่านมาตรฐาน ISO 27001</li>
            <li>ตรวจสอบระบบรักษาความปลอดภัยอย่างสม่ำเสมอ</li>
            <li>จำกัดการเข้าถึงข้อมูลเฉพาะบุคลากรที่ได้รับอนุญาต</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">5. สิทธิ์ของท่าน</h4>
          <p>ภายใต้ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) ท่านมีสิทธิ์:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>เข้าถึงและขอสำเนาข้อมูลส่วนบุคคลของท่าน</li>
            <li>แก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน</li>
            <li>ขอลบข้อมูลส่วนบุคคล (ภายใต้เงื่อนไขที่กฎหมายกำหนด)</li>
            <li>คัดค้านการประมวลผลข้อมูล</li>
            <li>ถอนความยินยอมได้ตลอดเวลา</li>
            <li>ร้องเรียนต่อหน่วยงานที่เกี่ยวข้อง</li>
          </ul>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">6. คุกกี้ (Cookies)</h4>
          <p>เราใช้คุกกี้เพื่อ:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>จดจำการตั้งค่าและการเข้าสู่ระบบ</li>
            <li>วิเคราะห์การใช้งานเพื่อปรับปรุงบริการ</li>
            <li>แสดงเนื้อหาที่เหมาะสมกับท่าน</li>
          </ul>
          <p className="mt-1">ท่านสามารถจัดการการตั้งค่าคุกกี้ผ่านเบราว์เซอร์ได้</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">7. ระยะเวลาจัดเก็บข้อมูล</h4>
          <p>เราจัดเก็บข้อมูลส่วนบุคคลตามระยะเวลาที่จำเป็น หรือตามที่กฎหมายกำหนด โดยข้อมูลทางการแพทย์จะถูกจัดเก็บไม่น้อยกว่า 10 ปีตามข้อกำหนดของกฎหมาย</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-800 mb-2">8. ติดต่อเรา</h4>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
            <p className="text-xs">📧 อีเมล: privacy@asthmacare.co.th</p>
            <p className="text-xs">📞 โทร: 02-xxx-xxxx (จันทร์-ศุกร์ 9:00-17:00 น.)</p>
            <p className="text-xs">📍 เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</p>
          </div>
        </section>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
          <p className="text-slate-500 text-xs text-center">
            © 2569 AsthmaCare — สงวนลิขสิทธิ์ทั้งหมด
          </p>
        </div>
      </div>

      <button
        onClick={() => setCurrentView('auth')}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95 cursor-pointer"
      >
        ฉันเข้าใจแล้ว
      </button>
    </div>
  );

  // ─── Forgot Password View ───
  const renderForgotPassword = () => (
    <div className="animate-[fadeInUp_0.3s_ease]">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            setCurrentView('auth');
            setForgotStep('email');
          }}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer"
        >
          ←
        </button>
        <h3 className="text-lg font-bold text-slate-800">🔑 ตั้งรหัสผ่านใหม่</h3>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-6 px-4">
        {(['email', 'otp', 'reset'] as ForgotStep[]).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                forgotStep === step
                  ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-200'
                  : index < ['email', 'otp', 'reset'].indexOf(forgotStep)
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {index < ['email', 'otp', 'reset'].indexOf(forgotStep) ? '✓' : index + 1}
            </div>
            {index < 2 && (
              <div
                className={`flex-1 h-1 mx-1 rounded-full transition-all duration-500 ${
                  index < ['email', 'otp', 'reset'].indexOf(forgotStep)
                    ? 'bg-green-400'
                    : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {/* Step 1: Enter Email */}
        {forgotStep === 'email' && (
          <div className="space-y-4 animate-[fadeInUp_0.3s_ease]">
            <div className="text-center mb-4">
              <span className="text-5xl block mb-3">📧</span>
              <p className="text-sm text-slate-500">
                กรุณากรอกอีเมลที่ใช้ลงทะเบียน<br />
                เราจะส่งรหัส OTP ไปยังอีเมลของคุณ
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">อีเมล</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={otpSending}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {otpSending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  กำลังส่งรหัส...
                </>
              ) : (
                'ส่งรหัส OTP'
              )}
            </button>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {forgotStep === 'otp' && (
          <div className="space-y-4 animate-[fadeInUp_0.3s_ease]">
            <div className="text-center mb-4">
              <span className="text-5xl block mb-3">🔢</span>
              <p className="text-sm text-slate-500">
                รหัส OTP ถูกส่งไปยัง<br />
                <span className="font-semibold text-slate-700">{forgotEmail}</span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">รหัส OTP (6 หลัก)</label>
              <input
                type="text"
                value={forgotOtp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setForgotOtp(val);
                }}
                placeholder="000000"
                maxLength={6}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm text-center text-2xl tracking-[0.5em] font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
              />
            </div>
            <div className="text-center">
              {otpCountdown > 0 ? (
                <p className="text-xs text-slate-400">
                  ส่งรหัสใหม่ได้ใน <span className="font-semibold text-blue-600">{otpCountdown}</span> วินาที
                </p>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className="text-xs text-blue-600 hover:underline cursor-pointer font-semibold"
                >
                  ส่งรหัส OTP อีกครั้ง
                </button>
              )}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              ยืนยันรหัส OTP
            </button>
          </div>
        )}

        {/* Step 3: Set New Password */}
        {forgotStep === 'reset' && (
          <div className="space-y-4 animate-[fadeInUp_0.3s_ease]">
            <div className="text-center mb-4">
              <span className="text-5xl block mb-3">🔐</span>
              <p className="text-sm text-slate-500">
                กรุณากำหนดรหัสผ่านใหม่<br />
                อย่างน้อย 6 ตัวอักษร
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">รหัสผ่านใหม่</label>
              <input
                type="password"
                value={forgotNewPassword}
                onChange={(e) => setForgotNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
              />
              {forgotNewPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          level <= resetStrength.level ? resetStrength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${resetStrength.color.replace('bg-', 'text-')}`}>
                    ความปลอดภัย: {resetStrength.label}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">ยืนยันรหัสผ่านใหม่</label>
              <input
                type="password"
                value={forgotConfirmPassword}
                onChange={(e) => setForgotConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm ${
                  forgotConfirmPassword && forgotConfirmPassword !== forgotNewPassword
                    ? 'border-red-300 focus:ring-red-300'
                    : 'border-slate-200'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
              />
              {forgotConfirmPassword && forgotConfirmPassword !== forgotNewPassword && (
                <p className="text-xs text-red-500 mt-1 animate-[fadeIn_0.3s_ease]">รหัสผ่านไม่ตรงกัน</p>
              )}
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              ✓ ตั้งรหัสผ่านใหม่
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transition-all duration-300 relative ${
          shakeForm ? 'animate-[shake_0.5s_ease]' : ''
        } ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center rounded-3xl animate-[fadeIn_0.3s_ease]">
            <span className="text-6xl mb-4 animate-bounce">🎉</span>
            <h4 className="text-2xl font-bold text-green-600 mb-2">สำเร็จ!</h4>
            <p className="text-slate-500">{successMessage}</p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all z-20 hover:rotate-90 duration-300 cursor-pointer"
        >
          ✕
        </button>

        {/* Header — only for auth view */}
        {currentView === 'auth' && (
          <>
            <div className="p-6 pb-0 text-center">
              <span className="text-4xl block mb-2">🩺</span>
              <h3 className="text-xl font-bold gradient-text">AsthmaCare</h3>
            </div>

            {/* Tabs */}
            <div className="flex relative mx-6 mt-4 bg-slate-100 rounded-xl p-1">
              <div
                className="absolute top-1 bottom-1 rounded-lg bg-white shadow-sm transition-all duration-300"
                style={{
                  left: activeTab === 'login' ? '4px' : '50%',
                  width: 'calc(50% - 8px)',
                }}
              />
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors duration-300 cursor-pointer ${
                  activeTab === 'login' ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                เข้าสู่ระบบ
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors duration-300 cursor-pointer ${
                  activeTab === 'register' ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                สมัครสมาชิก
              </button>
            </div>
          </>
        )}

        {/* Form Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {currentView === 'terms' && renderTermsContent()}
          {currentView === 'privacy' && renderPrivacyContent()}
          {currentView === 'forgot-password' && renderForgotPassword()}
          {currentView === 'google-picker' && (
            <div className="animate-[fadeInUp_0.3s_ease]">
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => {
                    setCurrentView('auth');
                    setGoogleLoading(false);
                    setSelectedGoogleAccount(null);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer"
                >
                  ←
                </button>
                <h3 className="text-lg font-bold text-slate-800">เลือกบัญชี Google</h3>
              </div>

              <div className="flex items-center justify-center gap-3 mb-5 py-3 bg-slate-50 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="text-sm font-medium text-slate-600">เข้าสู่ระบบด้วย Google</span>
              </div>

              <p className="text-xs text-slate-400 mb-4 text-center">เลือกบัญชีเพื่อดำเนินการต่อไปยัง AsthmaCare</p>

              <div className="space-y-2">
                {googleAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectGoogleAccount(index)}
                    disabled={googleLoading}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                      selectedGoogleAccount === index
                        ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
                        : 'border-slate-100 hover:border-blue-300 hover:bg-slate-50'
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-xl shadow-sm`}>
                      {account.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {account.name}
                      </p>
                      <p className="text-xs text-slate-400">{account.email}</p>
                    </div>
                    {selectedGoogleAccount === index && googleLoading ? (
                      <span className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    ) : (
                      <span className={`text-slate-300 group-hover:text-blue-500 transition-colors ${
                        selectedGoogleAccount === index ? 'text-blue-500' : ''
                      }`}>
                        →
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setCurrentView('auth');
                    setGoogleLoading(false);
                    setSelectedGoogleAccount(null);
                  }}
                  className="w-full text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer py-2"
                >
                  ใช้บัญชีอื่น
                </button>
              </div>
            </div>
          )}

          {currentView === 'auth' && activeTab === 'login' && (
            <div className="space-y-4 animate-[fadeInUp_0.3s_ease]">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">อีเมล</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">รหัสผ่าน</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentView('forgot-password')}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer"
              >
                เข้าสู่ระบบ
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400">หรือ</span>
                </div>
              </div>
              <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 active:scale-95 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {googleLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                    กำลังเชื่อมต่อ...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    เข้าสู่ระบบด้วย Google
                  </>
                )}
              </button>
            </div>
          )}

          {currentView === 'auth' && activeTab === 'register' && (
            <div className="space-y-4 animate-[fadeInUp_0.3s_ease]">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="สมชาย ใจดี"
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">อีเมล</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="08x-xxx-xxxx"
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">รหัสผ่าน</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                />
                {/* Password Strength Meter */}
                {regPassword && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                            level <= strength.level ? strength.color : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>
                      ความปลอดภัย: {strength.label}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm ${
                    regConfirm && regConfirm !== regPassword
                      ? 'border-red-300 focus:ring-red-300'
                      : 'border-slate-200'
                  }`}
                />
                {regConfirm && regConfirm !== regPassword && (
                  <p className="text-xs text-red-500 mt-1 animate-[fadeIn_0.3s_ease]">รหัสผ่านไม่ตรงกัน</p>
                )}
              </div>
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={regAccept}
                  onChange={(e) => setRegAccept(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 mt-0.5"
                />
                <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">
                  ฉันยอมรับ{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentView('terms');
                    }}
                    className="text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    เงื่อนไขการใช้บริการ
                  </button>{' '}
                  และ{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentView('privacy');
                    }}
                    className="text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    นโยบายความเป็นส่วนตัว
                  </button>
                </span>
              </label>
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 btn-ripple active:scale-95 cursor-pointer"
              >
                สมัครสมาชิก
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
