'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { doctorsData, Doctor } from '../data/doctors';

type ConsultStep = 'select-doctor' | 'fill-symptoms' | 'schedule' | 'confirm' | 'waiting' | 'in-call';

interface SymptomData {
  mainSymptom: string;
  severity: string;
  duration: string;
  triggers: string[];
  medications: string[];
  peakFlow: string;
  additionalNotes: string;
}

const ASTHMA_TRIGGERS = [
  { id: 'dust', label: 'ฝุ่น / ไรฝุ่น', icon: '🌫️' },
  { id: 'smoke', label: 'ควันบุหรี่ / ควันไฟ', icon: '🚬' },
  { id: 'pollen', label: 'เกสรดอกไม้', icon: '🌸' },
  { id: 'weather', label: 'อากาศเปลี่ยนแปลง', icon: '🌡️' },
  { id: 'exercise', label: 'ออกกำลังกาย', icon: '🏃' },
  { id: 'cold', label: 'ไข้หวัด / ติดเชื้อ', icon: '🤧' },
  { id: 'pet', label: 'ขนสัตว์เลี้ยง', icon: '🐱' },
  { id: 'stress', label: 'ความเครียด / อารมณ์', icon: '😰' },
  { id: 'food', label: 'อาหาร / สารเคมี', icon: '🍤' },
  { id: 'pollution', label: 'มลพิษทางอากาศ (PM2.5)', icon: '🏭' },
];

const CURRENT_MEDICATIONS = [
  { id: 'ics', label: 'ยาพ่นสเตียรอยด์ (ICS)', desc: 'เช่น Budesonide, Fluticasone' },
  { id: 'laba', label: 'ยาพ่นขยายหลอดลมออกฤทธิ์ยาว (LABA)', desc: 'เช่น Salmeterol, Formoterol' },
  { id: 'saba', label: 'ยาพ่นฉุกเฉิน (SABA)', desc: 'เช่น Salbutamol (Ventolin)' },
  { id: 'combo', label: 'ยาพ่นรวม (ICS/LABA)', desc: 'เช่น Seretide, Symbicort' },
  { id: 'ltra', label: 'ยากิน Montelukast', desc: 'ยาควบคุมอาการหอบหืดแบบเม็ด' },
  { id: 'antihistamine', label: 'ยาแก้แพ้ (Antihistamine)', desc: 'เช่น Cetirizine, Loratadine' },
  { id: 'none', label: 'ไม่ได้ใช้ยาใดๆ', desc: 'ไม่เคยได้รับยาควบคุมหอบหืด' },
];

const TIME_SLOTS = [
  { time: '09:00', period: 'เช้า' },
  { time: '10:00', period: 'เช้า' },
  { time: '11:00', period: 'เช้า' },
  { time: '13:00', period: 'บ่าย' },
  { time: '14:00', period: 'บ่าย' },
  { time: '15:00', period: 'บ่าย' },
  { time: '16:00', period: 'บ่าย' },
  { time: '18:00', period: 'เย็น' },
  { time: '19:00', period: 'เย็น' },
  { time: '20:00', period: 'เย็น' },
];

export default function ConsultPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConsultStep>('select-doctor');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultType, setConsultType] = useState<'video' | 'chat'>('video');
  const [waitingSeconds, setWaitingSeconds] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [symptoms, setSymptoms] = useState<SymptomData>({
    mainSymptom: '',
    severity: '',
    duration: '',
    triggers: [],
    medications: [],
    peakFlow: '',
    additionalNotes: '',
  });

  // Generate next 7 days for scheduling
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('th-TH', { weekday: 'short' }),
        dayNum: date.getDate(),
        monthName: date.toLocaleDateString('th-TH', { month: 'short' }),
        isToday: i === 0,
      });
    }
    return days;
  };

  // Waiting room timer
  useEffect(() => {
    if (currentStep !== 'waiting') return;
    const interval = setInterval(() => {
      setWaitingSeconds((s) => {
        if (s >= 5) {
          setCurrentStep('in-call');
          clearInterval(interval);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Call duration timer
  useEffect(() => {
    if (currentStep !== 'in-call') return;
    const interval = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleTrigger = (id: string) => {
    setSymptoms((prev) => ({
      ...prev,
      triggers: prev.triggers.includes(id)
        ? prev.triggers.filter((t) => t !== id)
        : [...prev.triggers, id],
    }));
  };

  const toggleMedication = (id: string) => {
    setSymptoms((prev) => ({
      ...prev,
      medications: prev.medications.includes(id)
        ? prev.medications.filter((m) => m !== id)
        : [...prev.medications, id],
    }));
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'patient', text: chatInput, time: timeStr }]);
    setChatInput('');

    // Simulate doctor reply
    setTimeout(() => {
      const replies = [
        'ขอบคุณที่แจ้งข้อมูลครับ ผมกำลังตรวจสอบอาการของคุณ',
        'อาการที่คุณอธิบายมานั้น ผมแนะนำให้ใช้ยาพ่นฉุกเฉินก่อนนะครับ',
        'คุมีค่า Peak Flow ล่าสุดไหมครับ? จะช่วยให้ประเมินอาการได้ดีขึ้น',
        'ผมจะแนะนำยาพ่นควบคุมอาการให้ใหม่นะครับ และนัดติดตามอาการอีก 2 สัปดาห์',
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setChatMessages((prev) => [...prev, { sender: 'doctor', text: reply, time: replyTime }]);
    }, 1500);
  };

  const onlineDoctors = doctorsData.filter((d) => d.available);

  const steps = [
    { key: 'select-doctor', label: 'เลือกแพทย์', icon: '👨‍⚕️', num: 1 },
    { key: 'fill-symptoms', label: 'กรอกอาการ', icon: '📋', num: 2 },
    { key: 'schedule', label: 'นัดหมาย', icon: '📅', num: 3 },
    { key: 'confirm', label: 'ยืนยัน', icon: '✅', num: 4 },
  ];

  const stepOrder = ['select-doctor', 'fill-symptoms', 'schedule', 'confirm'];
  const currentStepIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={() => setAuthModalOpen(true)} />

      <main className="flex-grow bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          {currentStep !== 'waiting' && currentStep !== 'in-call' && (
            <div className="text-center mb-10 fade-in-up">
              <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                🩺 Asthma Consultation
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                ปรึกษาแพทย์เฉพาะทาง<span className="gradient-text">โรคหอบหืด</span>
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                พูดคุยกับแพทย์ผู้เชี่ยวชาญด้านระบบทางเดินหายใจผ่านแชท
              </p>
            </div>
          )}

          {/* Step Progress Bar */}
          {currentStep !== 'waiting' && currentStep !== 'in-call' && (
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 mx-10" />
                <div
                  className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-10 transition-all duration-500"
                  style={{ width: `${Math.max(0, currentStepIndex) * 33.33}%` }}
                />

                {steps.map((step, i) => {
                  const isActive = currentStep === step.key;
                  const isCompleted = currentStepIndex > i;
                  return (
                    <div key={step.key} className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200 scale-110'
                          : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-white border-2 border-slate-200 text-slate-400'
                          }`}
                      >
                        {isCompleted ? '✓' : step.icon}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium transition-colors ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'
                          }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================== STEP 1: SELECT DOCTOR ===================== */}
          {currentStep === 'select-doctor' && (
            <div className="max-w-5xl mx-auto fade-in-up">
              {/* Consult Type Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setConsultType('video')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer ${consultType === 'video'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                    }`}
                >

                  💬 แชทกับแพทย์
                </button>
              </div>

              {/* Online Now Banner */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-green-700 font-medium text-sm">
                  ขณะนี้มีแพทย์ออนไลน์ {onlineDoctors.length} ท่าน พร้อมให้บริการ
                </p>
              </div>

              {/* Doctor Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctorsData.map((doc, i) => (
                  <div
                    key={doc.id}
                    onClick={() => doc.available && setSelectedDoctor(doc)}
                    className={`card-interactive bg-white rounded-3xl p-6 shadow-md border-2 group relative overflow-hidden fade-in-up transition-all duration-300 ${!doc.available
                      ? 'opacity-50 cursor-not-allowed border-slate-100'
                      : selectedDoctor?.id === doc.id
                        ? 'border-blue-500 shadow-xl shadow-blue-100 ring-2 ring-blue-200'
                        : 'border-slate-100 hover:border-blue-200 cursor-pointer'
                      }`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                      <span className={`w-2.5 h-2.5 rounded-full ${doc.available ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                      <span className={`text-xs font-bold ${doc.available ? 'text-green-600' : 'text-slate-400'}`}>
                        {doc.available ? 'ออนไลน์' : 'ออฟไลน์'}
                      </span>
                    </div>

                    {/* Selected Check */}
                    {selectedDoctor?.id === doc.id && (
                      <div className="absolute top-4 left-4 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        ✓
                      </div>
                    )}

                    <div className={`w-20 h-20 bg-gradient-to-br ${doc.color} rounded-full flex items-center justify-center text-4xl mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
                      {doc.avatar}
                    </div>

                    <div className="text-center">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{doc.name}</h4>
                      <p className="text-xs border border-blue-100 bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full inline-block mb-2">
                        {doc.specialty}
                      </p>
                      <div className="text-xs text-slate-500 mb-3 space-y-0.5">
                        <p>🏥 {doc.hospital}</p>
                        <p>🎓 ประสบการณ์ {doc.experience}</p>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <span key={j} className={`text-xs ${j < Math.round(doc.rating) ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-700 ml-1">{doc.rating}</span>
                        <span className="text-[10px] text-slate-400">({doc.reviews})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <div className="mt-10 text-center">
                <button
                  onClick={() => selectedDoctor && setCurrentStep('fill-symptoms')}
                  disabled={!selectedDoctor}
                  className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 btn-ripple ${selectedDoctor
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 active:scale-95 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                  ถัดไป — กรอกอาการ →
                </button>
              </div>
            </div>
          )}

          {/* ===================== STEP 2: FILL SYMPTOMS ===================== */}
          {currentStep === 'fill-symptoms' && (
            <div className="max-w-3xl mx-auto fade-in-up">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                {/* Main Symptom */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                  อาการหลักที่ต้องการปรึกษา
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {[
                    { id: 'wheezing', label: 'หายใจเสียงหวีด', icon: '🫁', desc: 'Wheezing' },
                    { id: 'shortness', label: 'หอบเหนื่อย', icon: '😮‍💨', desc: 'Dyspnea' },
                    { id: 'chest', label: 'แน่นหน้าอก', icon: '💔', desc: 'Chest tightness' },
                    { id: 'cough', label: 'ไอเรื้อรัง', icon: '🤧', desc: 'Chronic cough' },
                    { id: 'nocturnal', label: 'อาการกลางคืน', icon: '🌙', desc: 'Nocturnal symptoms' },
                    { id: 'flare', label: 'หอบหืดกำเริบ', icon: '🔥', desc: 'Acute exacerbation' },
                    { id: 'medication', label: 'ปรึกษาเรื่องยา', icon: '💊', desc: 'Medication review' },
                    { id: 'followup', label: 'ติดตามอาการ', icon: '📊', desc: 'Follow-up' },
                    { id: 'other', label: 'อื่นๆ', icon: '❓', desc: 'Others' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSymptoms((prev) => ({ ...prev, mainSymptom: item.id }))}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer group ${symptoms.mainSymptom === item.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/30'
                        }`}
                    >
                      <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Severity */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                  ระดับความรุนแรงของอาการ
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {[
                    { id: 'mild', label: 'เล็กน้อย', color: 'green', desc: 'ยังทำกิจวัตรได้ปกติ' },
                    { id: 'moderate', label: 'ปานกลาง', color: 'yellow', desc: 'เริ่มรบกวนกิจวัตร' },
                    { id: 'severe', label: 'รุนแรง', color: 'orange', desc: 'ทำกิจวัตรลำบาก' },
                    { id: 'critical', label: 'วิกฤต', color: 'red', desc: 'ต้องการช่วยเหลือด่วน' },
                  ].map((item) => {
                    const colorMap: Record<string, string> = {
                      green: symptoms.severity === item.id ? 'border-green-500 bg-green-50' : 'border-slate-100',
                      yellow: symptoms.severity === item.id ? 'border-yellow-500 bg-yellow-50' : 'border-slate-100',
                      orange: symptoms.severity === item.id ? 'border-orange-500 bg-orange-50' : 'border-slate-100',
                      red: symptoms.severity === item.id ? 'border-red-500 bg-red-50' : 'border-slate-100',
                    };
                    const dotColor: Record<string, string> = { green: 'bg-green-500', yellow: 'bg-yellow-500', orange: 'bg-orange-500', red: 'bg-red-500' };
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSymptoms((prev) => ({ ...prev, severity: item.id }))}
                        className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer ${colorMap[item.color]} hover:shadow-md`}
                      >
                        <div className={`w-4 h-4 rounded-full ${dotColor[item.color]} mx-auto mb-2`} />
                        <p className="text-sm font-bold text-slate-800">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Duration */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                  ระยะเวลาที่มีอาการ
                </h4>

                <select
                  value={symptoms.duration}
                  onChange={(e) => setSymptoms((prev) => ({ ...prev, duration: e.target.value }))}
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm cursor-pointer mb-8"
                >
                  <option value="">กรุณาเลือก...</option>
                  <option value="just_now">เพิ่งเกิดขึ้น (ภายใน 1 ชม.)</option>
                  <option value="today">วันนี้</option>
                  <option value="few_days">2-3 วัน</option>
                  <option value="week">ประมาณ 1 สัปดาห์</option>
                  <option value="weeks">1-4 สัปดาห์</option>
                  <option value="chronic">มากกว่า 1 เดือน / เรื้อรัง</option>
                </select>

                {/* Triggers */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                  สิ่งกระตุ้นที่ทำให้อาการแย่ลง
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-8">
                  {ASTHMA_TRIGGERS.map((trigger) => (
                    <button
                      key={trigger.id}
                      onClick={() => toggleTrigger(trigger.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer text-xs ${symptoms.triggers.includes(trigger.id)
                        ? 'border-amber-400 bg-amber-50 shadow-sm'
                        : 'border-slate-100 hover:border-amber-200'
                        }`}
                    >
                      <span className="text-lg block mb-1">{trigger.icon}</span>
                      <span className="font-medium text-slate-700">{trigger.label}</span>
                    </button>
                  ))}
                </div>

                {/* Current Medications */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                  ยาที่ใช้อยู่ปัจจุบัน
                </h4>

                <div className="space-y-2.5 mb-8">
                  {CURRENT_MEDICATIONS.map((med) => (
                    <label
                      key={med.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${symptoms.medications.includes(med.id)
                        ? 'border-teal-400 bg-teal-50'
                        : 'border-slate-100 hover:border-teal-200 hover:bg-teal-50/30'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={symptoms.medications.includes(med.id)}
                        onChange={() => toggleMedication(med.id)}
                        className="w-4 h-4 accent-teal-600"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{med.label}</p>
                        <p className="text-xs text-slate-400">{med.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Peak Flow */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                  ค่า Peak Flow ล่าสุด (ถ้ามี)
                </h4>

                <div className="flex items-center gap-3 mb-8">
                  <input
                    type="number"
                    value={symptoms.peakFlow}
                    onChange={(e) => setSymptoms((prev) => ({ ...prev, peakFlow: e.target.value }))}
                    placeholder="เช่น 350"
                    className="flex-1 border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm"
                  />
                  <span className="text-sm text-slate-500 font-medium">L/min</span>
                </div>

                {/* Additional Notes */}
                <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                  รายละเอียดเพิ่มเติม
                </h4>

                <textarea
                  value={symptoms.additionalNotes}
                  onChange={(e) => setSymptoms((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                  rows={4}
                  placeholder="อธิบายอาการเพิ่มเติม เช่น อาการเกิดขึ้นบ่อยแค่ไหน มีอะไรกระตุ้น ยาที่ใช้แล้วได้ผลหรือไม่..."
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm resize-none mb-4"
                />

                {/* Emergency Warning */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
                  <p className="text-xs text-red-700 font-medium">
                    🚨 <strong>กรณีฉุกเฉิน:</strong> หากมีอาการหอบรุนแรง หายใจไม่ออก ริมฝีปากเขียว หรือพ่นยาฉุกเฉินแล้วไม่ดีขึ้นภายใน 15 นาที
                    กรุณาโทร 1669 หรือไปห้องฉุกเฉินทันที
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('select-doctor')}
                    className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
                  >
                    ← ย้อนกลับ
                  </button>
                  <button
                    onClick={() => {
                      if (symptoms.mainSymptom && symptoms.severity && symptoms.duration) {
                        setCurrentStep('schedule');
                      }
                    }}
                    disabled={!symptoms.mainSymptom || !symptoms.severity || !symptoms.duration}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 btn-ripple ${symptoms.mainSymptom && symptoms.severity && symptoms.duration
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-blue-200 cursor-pointer active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    ถัดไป →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================== STEP 3: SCHEDULE ===================== */}
          {currentStep === 'schedule' && (
            <div className="max-w-3xl mx-auto fade-in-up">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                {/* Selected Doctor Summary */}
                {selectedDoctor && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 mb-8 flex items-center gap-4 border border-blue-100">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedDoctor.color} rounded-full flex items-center justify-center text-3xl shadow-sm`}>
                      {selectedDoctor.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-slate-800">{selectedDoctor.name}</p>
                      <p className="text-sm text-blue-600 font-medium">{selectedDoctor.specialty}</p>
                      <p className="text-xs text-slate-500">🏥 {selectedDoctor.hospital}</p>
                    </div>
                  </div>
                )}

                {/* Quick Consult Option */}
                <div className="mb-8">
                  <button
                    onClick={() => {
                      setSelectedDate('now');
                      setSelectedTime('now');
                    }}
                    className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${selectedDate === 'now'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-slate-100 hover:border-green-300'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">⚡</div>
                      <div className="text-left">
                        <p className="font-bold text-slate-800">ปรึกษาทันที</p>
                        <p className="text-xs text-slate-500">เริ่มสนทนากับแพทย์ได้เลยตอนนี้ (รอคิวประมาณ 2-5 นาที)</p>
                      </div>
                      <span className="ml-auto flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 font-bold">พร้อมให้บริการ</span>
                      </span>
                    </div>
                  </button>
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-400">หรือเลือกวันเวลา</span>
                  </div>
                </div>

                {/* Date Selection */}
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  📅 เลือกวันที่
                </h4>

                <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2">
                  {getNextDays().map((day) => (
                    <button
                      key={day.date}
                      onClick={() => { setSelectedDate(day.date); setSelectedTime(''); }}
                      className={`min-w-[80px] p-3 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer flex-shrink-0 ${selectedDate === day.date
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-slate-100 hover:border-blue-200'
                        }`}
                    >
                      <p className="text-xs text-slate-500">{day.dayName}</p>
                      <p className="text-xl font-bold text-slate-800">{day.dayNum}</p>
                      <p className="text-xs text-slate-400">{day.monthName}</p>
                      {day.isToday && (
                        <span className="text-[10px] text-blue-600 font-bold">วันนี้</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Time Selection */}
                {selectedDate && selectedDate !== 'now' && (
                  <>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      🕐 เลือกเวลา
                    </h4>
                    <div className="grid grid-cols-5 gap-2.5 mb-8">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selectedTime === slot.time
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-slate-100 hover:border-blue-200'
                            }`}
                        >
                          <p className="text-sm font-bold text-slate-800">{slot.time}</p>
                          <p className="text-[10px] text-slate-400">{slot.period}</p>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('fill-symptoms')}
                    className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
                  >
                    ← ย้อนกลับ
                  </button>
                  <button
                    onClick={() => (selectedDate && (selectedDate === 'now' || selectedTime)) && setCurrentStep('confirm')}
                    disabled={!selectedDate || (selectedDate !== 'now' && !selectedTime)}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 btn-ripple ${selectedDate && (selectedDate === 'now' || selectedTime)
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-blue-200 cursor-pointer active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    ถัดไป →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================== STEP 4: CONFIRM ===================== */}
          {currentStep === 'confirm' && (
            <div className="max-w-2xl mx-auto fade-in-up">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-8">
                  <span className="text-5xl block mb-3">📋</span>
                  <h3 className="text-2xl font-bold text-slate-800">ยืนยันข้อมูลการนัดหมาย</h3>
                  <p className="text-sm text-slate-500 mt-1">กรุณาตรวจสอบข้อมูลก่อนยืนยัน</p>
                </div>

                <div className="space-y-4 mb-8">
                  {/* Doctor */}
                  {selectedDoctor && (
                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${selectedDoctor.color} rounded-full flex items-center justify-center text-3xl`}>
                        {selectedDoctor.avatar}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">แพทย์ผู้ให้คำปรึกษา</p>
                        <p className="font-bold text-slate-800">{selectedDoctor.name}</p>
                        <p className="text-xs text-blue-600">{selectedDoctor.specialty}</p>
                      </div>
                    </div>
                  )}

                  {/* Consultation Type */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 mb-1">รูปแบบการปรึกษา</p>
                    <p className="font-bold text-slate-800">{consultType === 'video' ? '📹 วิดีโอคอล' : '💬 แชทกับแพทย์'}</p>
                  </div>

                  {/* Schedule */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 mb-1">วันและเวลา</p>
                    <p className="font-bold text-slate-800">
                      {selectedDate === 'now'
                        ? '⚡ ปรึกษาทันที'
                        : `${new Date(selectedDate).toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} เวลา ${selectedTime} น.`}
                    </p>
                  </div>

                  {/* Symptoms Summary */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 mb-2">สรุปอาการ</p>
                    <div className="space-y-1.5">
                      <p className="text-sm text-slate-700">
                        <strong>อาการหลัก:</strong>{' '}
                        {symptoms.mainSymptom === 'wheezing' && 'หายใจเสียงหวีด'}
                        {symptoms.mainSymptom === 'shortness' && 'หอบเหนื่อย'}
                        {symptoms.mainSymptom === 'chest' && 'แน่นหน้าอก'}
                        {symptoms.mainSymptom === 'cough' && 'ไอเรื้อรัง'}
                        {symptoms.mainSymptom === 'nocturnal' && 'อาการกลางคืน'}
                        {symptoms.mainSymptom === 'flare' && 'หอบหืดกำเริบ'}
                        {symptoms.mainSymptom === 'medication' && 'ปรึกษาเรื่องยา'}
                        {symptoms.mainSymptom === 'followup' && 'ติดตามอาการ'}
                        {symptoms.mainSymptom === 'other' && 'อื่นๆ'}
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>ความรุนแรง:</strong>{' '}
                        {symptoms.severity === 'mild' && '🟢 เล็กน้อย'}
                        {symptoms.severity === 'moderate' && '🟡 ปานกลาง'}
                        {symptoms.severity === 'severe' && '🟠 รุนแรง'}
                        {symptoms.severity === 'critical' && '🔴 วิกฤต'}
                      </p>
                      {symptoms.peakFlow && (
                        <p className="text-sm text-slate-700"><strong>Peak Flow:</strong> {symptoms.peakFlow} L/min</p>
                      )}
                      {symptoms.triggers.length > 0 && (
                        <p className="text-sm text-slate-700">
                          <strong>สิ่งกระตุ้น:</strong>{' '}
                          {symptoms.triggers.map((t) => ASTHMA_TRIGGERS.find((tr) => tr.id === t)?.label).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-5 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">ค่าปรึกษาแพทย์</p>
                      <p className="text-xs text-slate-400">{consultType === 'video' ? 'วิดีโอคอล 30 นาที' : 'แชท 60 นาที'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{consultType === 'video' ? '฿500' : '฿300'}</p>
                      <p className="text-xs text-slate-400">ต่อครั้ง</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('schedule')}
                    className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
                  >
                    ← ย้อนกลับ
                  </button>
                  <button
                    onClick={() => {
                      setWaitingSeconds(0);
                      setCallDuration(0);
                      setChatMessages([]);
                      setCurrentStep('waiting');
                    }}
                    className="flex-1 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-200 transition-all duration-300 btn-ripple cursor-pointer active:scale-95"
                  >
                    ✅ ยืนยันและเริ่มปรึกษา
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================== WAITING ROOM ===================== */}
          {currentStep === 'waiting' && (
            <div className="max-w-lg mx-auto text-center fade-in-up">
              <div className="bg-white rounded-3xl shadow-xl p-10">
                {/* Animated pulse */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-20" />
                  <div className="absolute inset-3 bg-blue-100 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">🩺</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-2">กำลังเชื่อมต่อกับแพทย์</h3>
                <p className="text-slate-500 mb-6">กรุณารอสักครู่ แพทย์กำลังเตรียมพร้อม...</p>

                {selectedDoctor && (
                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${selectedDoctor.color} rounded-full flex items-center justify-center text-3xl`}>
                      {selectedDoctor.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-800">{selectedDoctor.name}</p>
                      <p className="text-xs text-blue-600">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                )}

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${i <= waitingSeconds ? 'bg-blue-500 scale-110' : 'bg-slate-200'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-400">กำลังรอ... {waitingSeconds + 1}/5</p>
              </div>
            </div>
          )}

          {/* ===================== IN-CALL ===================== */}
          {currentStep === 'in-call' && (
            <div className="max-w-4xl mx-auto fade-in-up">
              {consultType === 'video' ? (
                /* ─── Video Call UI ─── */
                <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Video Area */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    {/* Doctor video (main) */}
                    <div className="text-center">
                      <div className={`w-32 h-32 bg-gradient-to-br ${selectedDoctor?.color || 'from-blue-100 to-blue-50'} rounded-full flex items-center justify-center text-6xl mx-auto mb-4 shadow-lg`}>
                        {selectedDoctor?.avatar || '👨‍⚕️'}
                      </div>
                      <p className="text-white font-bold text-xl">{selectedDoctor?.name}</p>
                      <p className="text-blue-300 text-sm">{selectedDoctor?.specialty}</p>
                    </div>

                    {/* Self video (PiP) */}
                    <div className="absolute bottom-4 right-4 w-36 h-28 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border-2 border-white/20 flex items-center justify-center shadow-lg">
                      {isVideoOff ? (
                        <span className="text-slate-400 text-sm">📵 ปิดกล้อง</span>
                      ) : (
                        <span className="text-3xl">🧑</span>
                      )}
                    </div>

                    {/* Call Duration */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-sm font-mono">{formatTime(callDuration)}</span>
                    </div>

                    {/* Connection quality */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <div className="flex gap-0.5 items-end">
                        <div className="w-1 h-2 bg-green-400 rounded-full" />
                        <div className="w-1 h-3 bg-green-400 rounded-full" />
                        <div className="w-1 h-4 bg-green-400 rounded-full" />
                        <div className="w-1 h-5 bg-green-400 rounded-full" />
                      </div>
                      <span className="text-green-400 text-xs font-medium">สัญญาณดี</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="p-6 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 cursor-pointer ${isMuted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                    >
                      {isMuted ? '🔇' : '🎤'}
                    </button>
                    <button
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 cursor-pointer ${isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                    >
                      {isVideoOff ? '📵' : '📹'}
                    </button>
                    <button
                      onClick={() => setCurrentStep('select-doctor')}
                      className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl hover:bg-red-700 transition-all cursor-pointer hover:scale-110 shadow-lg shadow-red-900/30"
                    >
                      📞
                    </button>
                    <button className="w-14 h-14 rounded-full bg-slate-700 text-white flex items-center justify-center text-xl hover:bg-slate-600 transition-all cursor-pointer">
                      💬
                    </button>
                    <button className="w-14 h-14 rounded-full bg-slate-700 text-white flex items-center justify-center text-xl hover:bg-slate-600 transition-all cursor-pointer">
                      📋
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── Chat UI ─── */
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col" style={{ height: '70vh' }}>
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl`}>
                      {selectedDoctor?.avatar || '👨‍⚕️'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold">{selectedDoctor?.name}</p>
                      <p className="text-blue-100 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full" /> ออนไลน์
                      </p>
                    </div>
                    <div className="text-white/70 text-sm font-mono">{formatTime(callDuration)}</div>
                    <button
                      onClick={() => setCurrentStep('select-doctor')}
                      className="w-10 h-10 rounded-full bg-red-500/30 text-white flex items-center justify-center hover:bg-red-500 transition-all cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
                    {/* Welcome message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        {selectedDoctor?.avatar || '👨‍⚕️'}
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-[75%] shadow-sm">
                        <p className="text-sm text-slate-700">
                          สวัสดีครับ ผม{selectedDoctor?.name} ยินดีให้คำปรึกษาเรื่องโรคหอบหืดครับ
                          รบกวนเล่าอาการให้ผมฟังหน่อยนะครับ 😊
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">เพิ่งส่ง</span>
                      </div>
                    </div>

                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.sender === 'patient' ? 'justify-end' : ''}`}>
                        {msg.sender === 'doctor' && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {selectedDoctor?.avatar || '👨‍⚕️'}
                          </div>
                        )}
                        <div
                          className={`rounded-2xl p-4 max-w-[75%] shadow-sm ${msg.sender === 'patient'
                            ? 'bg-blue-600 text-white rounded-tr-sm'
                            : 'bg-white text-slate-700 rounded-tl-sm'
                            }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <span className={`text-[10px] mt-1 block ${msg.sender === 'patient' ? 'text-blue-200' : 'text-slate-400'}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Replies */}
                  <div className="px-5 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
                    {['มีอาการหอบเหนื่อย', 'ใช้ยาพ่นแล้วไม่ดีขึ้น', 'อยากปรับยา'].map((reply) => (
                      <button
                        key={reply}
                        onClick={() => setChatInput(reply)}
                        className="flex-shrink-0 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg hover:bg-slate-200 transition-all cursor-pointer">
                      📎
                    </button>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      placeholder="พิมพ์ข้อความ..."
                      className="flex-1 bg-slate-50 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                    <button
                      onClick={handleSendChat}
                      disabled={!chatInput.trim()}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all cursor-pointer ${chatInput.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-100 text-slate-400'
                        }`}
                    >
                      ➤
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Back to Home */}
          {currentStep !== 'waiting' && currentStep !== 'in-call' && (
            <div className="mt-12 text-center">
              <Link href="/" className="text-slate-500 hover:text-blue-600 font-medium transition-colors border-b border-transparent hover:border-blue-600 pb-1">
                ← กลับสู่หน้าหลัก
              </Link>
            </div>
          )}
        </div>
      </main>

      {currentStep !== 'in-call' && <Footer />}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
