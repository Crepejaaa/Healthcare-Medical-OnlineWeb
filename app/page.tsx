'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import PackagesSection from './components/PackagesSection';
import DoctorTeam from './components/DoctorTeam';
import ScreeningForm from './components/ScreeningForm';
import Testimonials from './components/Testimonials';
import HealthArticles from './components/HealthArticles';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar onLoginClick={() => setAuthModalOpen(true)} />
      <HeroSection />
      <HowItWorks />
      <PackagesSection />
      <DoctorTeam />
      <ScreeningForm />
      <Testimonials />
      <HealthArticles />
      <FAQ />
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ScrollToTop />
    </main>
  );
}