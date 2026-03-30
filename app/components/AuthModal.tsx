'use client';

import { useState, useEffect, useCallback } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [shakeForm, setShakeForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 500);
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      triggerShake();
      return;
    }
    
    try {
      // For demo purposes, we do a basic matching on email
      const res = await fetch('/api/users');
      const users = await res.json();
      const user = users.find((u: any) => u.email === loginEmail);
      
      if (!user) throw new Error('ไม่พบข้อมูลผู้ใช้');

      localStorage.setItem('userId', user.id);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setLoginEmail('');
        setLoginPassword('');
      }, 2000);
    } catch (e) {
      triggerShake();
    }
  };

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
        body: JSON.stringify({ email: regEmail }), // Sending minimal dataset
      });

      if (!res.ok) throw new Error('Failed');
      
      const data = await res.json();
      localStorage.setItem('userId', data.id);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setRegName('');
        setRegEmail('');
        setRegPhone('');
        setRegPassword('');
        setRegConfirm('');
        setRegAccept(false);
      }, 2000);
    } catch (e) {
      triggerShake();
    }
  };

  const strength = getPasswordStrength(regPassword);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transition-all duration-300 ${
          shakeForm ? 'animate-[shake_0.5s_ease]' : ''
        } ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center rounded-3xl animate-[fadeIn_0.3s_ease]">
            <span className="text-6xl mb-4 animate-bounce">🎉</span>
            <h4 className="text-2xl font-bold text-green-600 mb-2">สำเร็จ!</h4>
            <p className="text-slate-500">
              {activeTab === 'login' ? 'เข้าสู่ระบบสำเร็จ' : 'สมัครสมาชิกสำเร็จ'}
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all z-20 hover:rotate-90 duration-300 cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 pb-0 text-center">
          <span className="text-4xl block mb-2">🩺</span>
          <h3 className="text-xl font-bold gradient-text">HealthConnect</h3>
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

        {/* Form Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'login' ? (
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
                />
              </div>
              <div className="flex justify-end">
                <button className="text-sm text-blue-600 hover:underline cursor-pointer">ลืมรหัสผ่าน?</button>
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
              <button className="w-full border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 active:scale-95 text-sm cursor-pointer">
                🔵 เข้าสู่ระบบด้วย LINE
              </button>
            </div>
          ) : (
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
                  <a href="#" className="text-blue-600 hover:underline">
                    เงื่อนไขการใช้บริการ
                  </a>{' '}
                  และ{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    นโยบายความเป็นส่วนตัว
                  </a>
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
