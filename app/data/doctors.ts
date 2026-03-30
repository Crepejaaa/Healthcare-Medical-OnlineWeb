export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  rating: number;
  reviews: number;
  avatar: string;
  color: string;
  available: boolean;
}

export const doctorsData: Doctor[] = [
  {
    id: 'doc-1',
    name: 'นพ. สมชาย หายใจคล่อง',
    specialty: 'อายุรแพทย์โรคระบบหายใจ',
    hospital: 'รพ. ศิริราช',
    experience: '15 ปี',
    rating: 4.9,
    reviews: 128,
    avatar: '👨‍⚕️',
    color: 'from-cyan-100 to-cyan-50',
    available: true,
  },
  {
    id: 'doc-2',
    name: 'พญ. ภูมิใจ ไร้ผื่น',
    specialty: 'กุมารแพทย์โรคภูมิแพ้',
    hospital: 'รพ. รามาธิบดี',
    experience: '12 ปี',
    rating: 4.8,
    reviews: 96,
    avatar: '👩‍⚕️',
    color: 'from-sky-100 to-sky-50',
    available: false,
  },
  {
    id: 'doc-3',
    name: 'นพ. ปอดแข็งแรง ใจดี',
    specialty: 'อายุรแพทย์โรคระบบหายใจ',
    hospital: 'รพ. จุฬาลงกรณ์',
    experience: '20 ปี',
    rating: 5.0,
    reviews: 567,
    avatar: '👨‍⚕️',
    color: 'from-teal-100 to-teal-50',
    available: true,
  },
  {
    id: 'doc-4',
    name: 'พญ. หอบหาย คลายกังวล',
    specialty: 'แพทย์ผู้เชี่ยวชาญภูมิแพ้',
    hospital: 'รพ. บำรุงราษฎร์',
    experience: '10 ปี',
    rating: 4.9,
    reviews: 154,
    avatar: '👩‍⚕️',
    color: 'from-blue-100 to-blue-50',
    available: true,
  },
  {
    id: 'doc-5',
    name: 'นพ. อากาศ บริสุทธิ์',
    specialty: 'อายุรแพทย์โรคระบบหายใจ',
    hospital: 'รพ. ธรรมศาสตร์',
    experience: '8 ปี',
    rating: 4.7,
    reviews: 89,
    avatar: '👨‍⚕️',
    color: 'from-cyan-100 to-teal-50',
    available: false,
  },
  {
    id: 'doc-6',
    name: 'พญ. สายลม เย็นฉ่ำ',
    specialty: 'กุมารแพทย์โรคระบบหายใจ',
    hospital: 'รพ. พระมงกุฎเกล้า',
    experience: '14 ปี',
    rating: 4.9,
    reviews: 210,
    avatar: '👩‍⚕️',
    color: 'from-sky-100 to-indigo-50',
    available: true,
  }
];
