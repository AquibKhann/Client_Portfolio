'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Building, Palette, Star, Trophy, Target, Zap, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Achievement {
  icon: string;
  title: string;
  description: string;
}

interface AboutSettings {
  profile_image_url: string;
  bio: string;
  achievements: Achievement[];
}

export default function About() {
  const [aboutSettings, setAboutSettings] = useState<AboutSettings>({
    profile_image_url: '',
    bio: 'With over a decade of experience in architectural design, I bring creativity, technical expertise, and a passion for sustainable design to every project.',
    achievements: [
      { icon: 'Award', title: 'Design Excellence Awards', description: 'Multiple awards for innovative architectural solutions' },
      { icon: 'Users', title: '100+ Happy Clients', description: 'Successfully completed projects for diverse clientele' },
      { icon: 'Building', title: 'Commercial Projects', description: 'Specialized in large-scale commercial developments' },
      { icon: 'Palette', title: 'Interior Design', description: 'Expert in creating beautiful and functional spaces' }
    ]
  });

  useEffect(() => {
    fetchAboutSettings();
  }, []);

  const fetchAboutSettings = async () => {
    try {
      const response = await fetch('/api/settings/about');
      const result = await response.json();

      if (result.data && !result.error) {
        // Handle both legacy and new achievement formats
        const achievements = result.data.achievements;
        let processedAchievements: Achievement[] = [];

        if (achievements && achievements.length > 0) {
          processedAchievements = achievements.map((item: any, index: number) => {
            // If it's already an object with the correct structure
            if (typeof item === 'object' && item.icon && item.title && item.description) {
              return item;
            }
            
            // If it's a JSON string, parse it
            if (typeof item === 'string') {
              try {
                const parsed = JSON.parse(item);
                if (parsed.icon && parsed.title && parsed.description) {
                  return parsed;
                }
              } catch (e) {
                // If parsing fails, treat as legacy string format
              }
              
              // Legacy format - convert string to object
              const defaultDescriptions = [
                'Multiple awards for innovative architectural solutions',
                'Successfully completed projects for diverse clientele',
                'Specialized in large-scale commercial developments',
                'Expert in creating beautiful and functional spaces'
              ];
              const defaultIcons = ['Award', 'Users', 'Building', 'Palette'];
              
              return {
                icon: defaultIcons[index] || 'Star',
                title: item,
                description: defaultDescriptions[index] || 'Professional achievement in architectural design'
              };
            }
            
            // Fallback for any other format
            return {
              icon: 'Star',
              title: 'Achievement',
              description: 'Professional achievement in architectural design'
            };
          });
        }

        setAboutSettings({
          ...result.data,
          achievements: processedAchievements
        });
      }
    } catch (error) {
      console.error('Error fetching about settings:', error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Award,
      Users,
      Building,
      Palette,
      Star,
      Trophy,
      Target,
      Zap,
      Heart,
      Shield
    };
    return iconMap[iconName] || Star;
  };

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                About Me
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {aboutSettings.bio}
              </motion.p>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground leading-relaxed">
                My journey in architecture began with a vision to create spaces that not only
                serve their functional purpose but also inspire and elevate the human experience.
                I specialize in architectural design, interior design, and production design,
                offering comprehensive solutions for residential, commercial, and industrial projects.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of collaboration and work closely with clients to understand
                their vision, needs, and constraints. My approach combines innovative design thinking
                with practical solutions, ensuring that every project is both beautiful and functional.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="h-[500px] rounded-2xl overflow-hidden shadow-2xl relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={aboutSettings.profile_image_url}
                alt="Professional workspace"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            {/* Floating decoration elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating geometric shapes */}
            <motion.div
              className="absolute top-10 right-10 w-4 h-4 bg-primary rounded-full"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-20 left-10 w-6 h-6 border-2 border-primary rounded-full"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {aboutSettings.achievements.map((achievement, index) => {
            const IconComponent = getIconComponent(achievement.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group h-full"
              >
                <Card className="text-center p-6 hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm relative overflow-hidden h-full flex flex-col">
                  {/* Card background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <CardContent className="space-y-4 relative z-10 flex-grow flex flex-col justify-center">
                    <motion.div 
                      className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500 relative overflow-hidden"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Icon background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <IconComponent className="h-8 w-8 text-primary relative z-10" />
                    </motion.div>
                    
                    <motion.h3 
                      className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {achievement.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 flex-grow"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {achievement.description}
                    </motion.p>
                  </CardContent>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional floating decorative elements */}
        <motion.div
          className="absolute top-1/2 left-10 w-2 h-2 bg-primary rounded-full opacity-30"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-20 w-3 h-3 bg-secondary rounded-full opacity-40"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full opacity-50"
          animate={{ 
            scale: [1, 3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}