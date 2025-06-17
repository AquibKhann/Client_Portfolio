'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSettings {
  background_image_url: string;
  name: string;
  tagline: string;
  description: string;
  cv_url: string;
}

export default function Hero() {
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    background_image_url: '',
    name: 'Shaquib Khan',
    tagline: 'Architect | Interior Designer | Production Expert',
    description: 'Creating innovative architectural solutions that blend functionality with aesthetic excellence. Specializing in residential, commercial, and production design projects.',
    cv_url: '/cv/shaquib-khan-cv.pdf'
  });

  useEffect(() => {
    fetchHeroSettings();
  }, []);

  const fetchHeroSettings = async () => {
    try {
      const response = await fetch('/api/settings/hero');
      const result = await response.json();

      if (result.data && !result.error) {
        setHeroSettings(result.data);
      }
    } catch (error) {
      console.log('Using default hero settings');
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    window.open(heroSettings.cv_url, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={heroSettings.background_image_url}
          alt="Architecture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </motion.div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center space-x-2"
              >
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-primary font-medium">Welcome to <b>NOVA </b> studios</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroSettings.name.split(' ')[0]}
                <br />
                <motion.span 
                  className="text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {heroSettings.name.split(' ')[1]}
                </motion.span>
              </motion.h1>
              
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <p className="text-xl lg:text-2xl text-gray-200 font-light">
                  {heroSettings.tagline}
                </p>
                <motion.div 
                  className="w-24 h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </motion.div>
            </div>

            <motion.p
              className="text-lg text-gray-300 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {heroSettings.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="group bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
              >
                Learn More
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={downloadCV}
                className="group border-white/30 bg-white/10 text-white hover:bg-white hover:text-black dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black px-8 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative lg:block hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Floating Stats Cards */}
            <motion.div
              className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg border border-white/20"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg border border-white/20"
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm opacity-90">Projects Completed</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-12 bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl shadow-lg border border-white/20"
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">★ 5.0</div>
                <div className="text-xs opacity-90">Client Rating</div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-10 right-10 w-4 h-4 bg-primary rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-20 left-10 w-6 h-6 border-2 border-primary rounded-full"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-sm opacity-70">Scroll to explore</span>
          <ArrowDown className="h-4 w-4 opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}