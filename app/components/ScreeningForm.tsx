'use client';

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import ResultModal from './ResultModal';

interface UploadedFile {
  name: string;
  id: string;
}

export default function ScreeningForm() {
  const [painLevel, setPainLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'warning' | 'emergency'>('success');
  const [modalIcon, setModalIcon] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = useCallback(
    (type: 'success' | 'warning' | 'emergency', icon: string, title: string, message: string) => {
      setModalType(type);
      setModalIcon(icon);
      setModalTitle(title);
      setModalMessage(message);
      setModalOpen(true);
    },
    []
  );

  // Pain level color
  const getPainColor = (val: number) => {
    if (val <= 3) return 'bg-green-100 text-green-700';
    if (val <= 6) return 'bg-yellow-100 text-yellow-700';
    if (val <= 8) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  // File handling
  const handleFiles = useCallback(
    (fileList: FileList) => {
      Array.from(fileList).forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          showModal(
            'warning',
            '⚠️',
            'ไฟล์ใหญ่เกินไป',
            `ไฟล์ "${file.name}" มีขนาดเกิน 10MB กรุณาเลือกไฟล์ที่เล็กกว่า`
          );
          return;
        }
        setFiles((prev) => [...prev, { name: file.name, id: crypto.randomUUID() }]);
      });
    },
    [showModal]
  );

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Submit
  const handleSubmit = () => {
    const bodyPart = (document.getElementById('bodyPart') as HTMLSelectElement)?.value;
    const duration = (document.getElementById('duration') as HTMLSelectElement)?.value;

    if (!bodyPart) {
      showModal('warning', '⚠️', 'กรุณากรอกข้อมูล', 'กรุณาเลือกจุดที่ผิดปกติก่อนส่งข้อมูล');
      return;
    }
    if (!duration) {
      showModal('warning', '⚠️', 'กรุณากรอกข้อมูล', 'กรุณาเลือกระยะเวลาที่มีอาการก่อนส่งข้อมูล');
      return;
    }

    const redFlags = document.querySelectorAll('.red-flag:checked');
    if (redFlags.length > 0) {
      const flagTexts = Array.from(redFlags)
        .map((cb) => '• ' + (cb as HTMLInputElement).parentElement?.textContent?.trim())
        .join('\n');
      showModal(
        'emergency',
        '🚨',
        'สัญญาณอันตรายฉุกเฉิน!',
        'อาการที่คุณเลือกมีความเสี่ยงสูง:\n\n' +
          flagTexts +
          '\n\nกรุณาเดินทางไปห้องฉุกเฉิน (ER) หรือโทร 1669 ทันที!\nระบบไม่สามารถให้บริการปรึกษาออนไลน์สำหรับเคสฉุกเฉินได้ค่ะ'
      );
    } else {
      showModal(
        'success',
        '✅',
        'ส่งข้อมูลสำเร็จ!',
        'ระบบกำลังค้นหาแพทย์ที่เหมาะสมกับอาการของคุณ กรุณารอสักครู่...\n\nคุณจะได้รับการแจ้งเตือนเมื่อแพทย์พร้อมให้บริการ'
      );
    }
  };

  return (
    <>
      <section id="screening" className="bg-gradient-to-br from-slate-100 to-slate-200 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              📋 Screening Form
            </span>
            <h3 className="text-3xl md:text-4xl font-bold">แบบฟอร์มคัดกรองอาการเบื้องต้น</h3>
            <p className="text-slate-500 mt-3">
              กรอกข้อมูลเพื่อให้ระบบจับคู่แพทย์ที่เหมาะสมกับอาการของคุณ
            </p>
          </div>

          <form className="bg-white p-8 md:p-10 rounded-3xl shadow-xl" onSubmit={(e) => e.preventDefault()}>
            {/* Current Symptoms */}
            <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                1
              </span>
              อาการปัจจุบัน
            </h4>

            {/* Body Part */}
            <div className="mb-5">
              <label htmlFor="bodyPart" className="block text-slate-700 mb-2 font-medium text-sm">
                จุดที่ผิดปกติ <span className="text-red-500">*</span>
              </label>
              <select
                id="bodyPart"
                required
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm cursor-pointer"
              >
                <option value="">กรุณาเลือก...</option>
                <option value="head">ศีรษะ</option>
                <option value="chest">ทรวงอก</option>
                <option value="abdomen">ช่องท้อง</option>
                <option value="skin">ผิวหนัง</option>
                <option value="muscle">กล้ามเนื้อ/กระดูก</option>
                <option value="mental">สุขภาพจิต/ความเครียด</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            {/* Pain Level */}
            <div className="mb-5">
              <label className="block text-slate-700 mb-2 font-medium text-sm">
                ระดับความเจ็บปวด <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">น้อย</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-slate-400">มาก</span>
              </div>
              <div className="text-center mt-2">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${getPainColor(painLevel)}`}
                >
                  {painLevel} / 10
                </span>
              </div>
            </div>

            {/* Duration */}
            <div className="mb-5">
              <label htmlFor="duration" className="block text-slate-700 mb-2 font-medium text-sm">
                มีอาการมานานเท่าใด <span className="text-red-500">*</span>
              </label>
              <select
                id="duration"
                required
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm cursor-pointer"
              >
                <option value="">กรุณาเลือก...</option>
                <option value="today">วันนี้ (เพิ่งเริ่มมีอาการ)</option>
                <option value="few_days">2-3 วัน</option>
                <option value="week">ประมาณ 1 สัปดาห์</option>
                <option value="month">มากกว่า 1 สัปดาห์</option>
                <option value="chronic">เป็นประจำ/เรื้อรัง</option>
              </select>
            </div>

            {/* Symptom Checkboxes */}
            <div className="mb-8">
              <label className="block text-slate-700 mb-2 font-medium text-sm">อาการร่วมอื่นๆ</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'fever', label: 'มีไข้' },
                  { value: 'cough', label: 'ไอ/เจ็บคอ' },
                  { value: 'nausea', label: 'คลื่นไส้/อาเจียน' },
                  { value: 'diarrhea', label: 'ท้องเสีย' },
                  { value: 'fatigue', label: 'อ่อนเพลีย' },
                  { value: 'rash', label: 'ผื่น/คัน' },
                ].map((symptom) => (
                  <label
                    key={symptom.value}
                    className="flex items-center gap-2 p-2.5 border border-slate-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-all text-sm group"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600 symptom-checkbox"
                      value={symptom.value}
                    />
                    <span className="group-hover:text-blue-700 transition-colors">{symptom.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold">
                !
              </span>
              <span className="text-red-600">สัญญาณอันตราย (Red Flags)</span>
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              ⚠️ หากมีอาการเหล่านี้ ระบบจะแจ้งเตือนฉุกเฉินทันที
            </p>

            <div className="mb-8 space-y-2.5 bg-red-50 p-5 rounded-2xl border border-red-100">
              {[
                'เจ็บแน่นหน้าอกร้าวไปที่แขน',
                'หายใจลำบาก/หอบเหนื่อยรุนแรง',
                'ปากเบี้ยว/แขนขาอ่อนแรงเฉียบพลัน',
                'หมดสติ/ซึมลง',
                'ชัก/เกร็งกระตุก',
              ].map((flag, i) => (
                <label
                  key={i}
                  className="red-flag-label flex items-center gap-3 text-red-700 font-medium cursor-pointer text-sm p-2 rounded-xl hover:bg-red-100 transition-all"
                >
                  <input type="checkbox" className="w-4 h-4 accent-red-600 red-flag" />
                  {flag}
                </label>
              ))}
            </div>

            {/* Additional Info */}
            <h4 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                2
              </span>
              ข้อมูลเพิ่มเติม
            </h4>

            <div className="mb-5">
              <label htmlFor="additionalNotes" className="block text-slate-700 mb-2 font-medium text-sm">
                รายละเอียดอาการเพิ่มเติม
              </label>
              <textarea
                id="additionalNotes"
                rows={3}
                placeholder="อธิบายอาการเพิ่มเติม เช่น อาการเริ่มตอนไหน มีอะไรกระตุ้น..."
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-sm resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <label className="block text-slate-700 mb-2 font-medium text-sm">
                แนบรูปภาพอาการ / ผลเลือด (ถ้ามี)
              </label>
              <div
                className={`border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer ${
                  isDragging ? 'drop-zone-active' : ''
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e: DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className={`text-4xl mb-2 transition-transform duration-300 ${isDragging ? 'scale-125 rotate-6' : ''}`}>
                  📎
                </div>
                <p className="text-sm text-slate-500">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
                <p className="text-xs text-slate-400 mt-1">รองรับ JPG, PNG, PDF (ไม่เกิน 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </div>

              {/* File List */}
              <div className="mt-3 space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-xl text-sm fade-in-up"
                    style={{ animationDelay: '0s' }}
                  >
                    <span className="text-slate-600 truncate flex-1">📄 {file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="text-red-400 hover:text-red-600 ml-3 font-bold hover:scale-125 transition-all cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 btn-ripple active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="transition-transform group-hover:rotate-12">🔍</span> ส่งข้อมูลและค้นหาแพทย์ที่เหมาะสม
            </button>
          </form>
        </div>
      </section>

      {/* Result Modal */}
      <ResultModal
        isOpen={modalOpen}
        type={modalType}
        icon={modalIcon}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
