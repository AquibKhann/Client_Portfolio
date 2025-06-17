'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye, EyeOff, Upload, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import CloudinaryUpload from '@/components/admin/cloudinary-upload';

interface HeroSettings {
  background_image_url: string;
  name: string;
  tagline: string;
  description: string;
  cv_url: string;
}

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

interface AdminCredentials {
  username: string;
  password: string;
}

export default function AdminSettings() {
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    background_image_url: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
    name: 'Shaquib Khan',
    tagline: 'Architect | Interior Designer | Production Expert',
    description: 'Creating innovative architectural solutions that blend functionality with aesthetic excellence. Specializing in residential, commercial, and production design projects.',
    cv_url: '/cv/shaquib-khan-cv.pdf'
  });

  const [aboutSettings, setAboutSettings] = useState<AboutSettings>({
    profile_image_url: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
    bio: 'With over a decade of experience in architectural design, I bring creativity, technical expertise, and a passion for sustainable design to every project.',
    achievements: [
      { icon: 'Award', title: 'Design Excellence Awards', description: 'Multiple awards for innovative architectural solutions' },
      { icon: 'Users', title: '100+ Happy Clients', description: 'Successfully completed projects for diverse clientele' },
      { icon: 'Building', title: 'Commercial Projects', description: 'Specialized in large-scale commercial developments' },
      { icon: 'Palette', title: 'Interior Design', description: 'Expert in creating beautiful and functional spaces' }
    ]
  });

  const [credentials, setCredentials] = useState<AdminCredentials>({
    username: 'Aquib',
    password: 'Khan@123'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const iconOptions = [
    { value: 'Award', label: 'Award' },
    { value: 'Users', label: 'Users' },
    { value: 'Building', label: 'Building' },
    { value: 'Palette', label: 'Palette' },
    { value: 'Star', label: 'Star' },
    { value: 'Trophy', label: 'Trophy' },
    { value: 'Target', label: 'Target' },
    { value: 'Zap', label: 'Zap' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Shield', label: 'Shield' }
  ];

  useEffect(() => {
    // Check authentication
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      router.push('/admin');
      return;
    }

    fetchSettings();
  }, [router]);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      // Fetch hero settings
      const heroResponse = await fetch('/api/settings/hero');
      const heroResult = await heroResponse.json();
      
      if (heroResult.error) {
        console.error('Error loading hero settings:', heroResult.error);
      } else if (heroResult.data) {
        setHeroSettings(heroResult.data);
      }

      // Fetch about settings
      const aboutResponse = await fetch('/api/settings/about');
      const aboutResult = await aboutResponse.json();
      
      if (aboutResult.error) {
        console.error('Error loading about settings:', aboutResult.error);
      } else if (aboutResult.data) {
        // Convert legacy achievements array to new format if needed
        const achievements = aboutResult.data.achievements;
        if (achievements && achievements.length > 0) {
          if (typeof achievements[0] === 'string') {
            // Legacy format - convert to new format
            const defaultDescriptions = [
              'Multiple awards for innovative architectural solutions',
              'Successfully completed projects for diverse clientele',
              'Specialized in large-scale commercial developments',
              'Expert in creating beautiful and functional spaces'
            ];
            const defaultIcons = ['Award', 'Users', 'Building', 'Palette'];
            
            const convertedAchievements = achievements.map((title: string, index: number) => ({
              icon: defaultIcons[index] || 'Star',
              title,
              description: defaultDescriptions[index] || 'Professional achievement in architectural design'
            }));
            
            setAboutSettings({
              ...aboutResult.data,
              achievements: convertedAchievements
            });
          } else {
            // New format
            setAboutSettings(aboutResult.data);
          }
        }
      }

      // Fetch admin credentials
      const credResponse = await fetch('/api/settings/admin');
      const credResult = await credResponse.json();
      
      if (credResult.error) {
        console.error('Error loading admin credentials:', credResult.error);
      } else if (credResult.data) {
        setCredentials(credResult.data);
      }

    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Error loading settings');
    } finally {
      setLoading(false);
    }
  };

  const saveHeroSettings = async () => {
    setSaving(true);
    
    try {
      const response = await fetch('/api/settings/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroSettings),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Hero settings saved successfully!');
    } catch (error) {
      console.error('Error saving hero settings:', error);
      toast.error('Error saving hero settings');
    } finally {
      setSaving(false);
    }
  };

  const saveAboutSettings = async () => {
    setSaving(true);
    
    try {
      const response = await fetch('/api/settings/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutSettings),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('About settings saved successfully!');
    } catch (error) {
      console.error('Error saving about settings:', error);
      toast.error('Error saving about settings');
    } finally {
      setSaving(false);
    }
  };

  const saveCredentials = async () => {
    setSaving(true);
    
    try {
      const response = await fetch('/api/settings/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Update local storage with new credentials
      localStorage.setItem('admin_credentials', JSON.stringify(credentials));
      toast.success('Admin credentials updated successfully!');
    } catch (error) {
      console.error('Error saving credentials:', error);
      toast.error('Error saving credentials');
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImageUpload = (url: string, type: string) => {
    if (type === 'image') {
      setHeroSettings(prev => ({ ...prev, background_image_url: url }));
    }
  };

  const handleProfileImageUpload = (url: string, type: string) => {
    if (type === 'image') {
      setAboutSettings(prev => ({ ...prev, profile_image_url: url }));
    }
  };

  const handleCVUpload = (url: string, type: string) => {
    setHeroSettings(prev => ({ ...prev, cv_url: url }));
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...aboutSettings.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setAboutSettings(prev => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      icon: 'Star',
      title: '',
      description: ''
    };
    setAboutSettings(prev => ({ 
      ...prev, 
      achievements: [...prev.achievements, newAchievement] 
    }));
  };

  const removeAchievement = (index: number) => {
    setAboutSettings(prev => ({ 
      ...prev, 
      achievements: prev.achievements.filter((_, i) => i !== index) 
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/admin/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="admin">Admin Credentials</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Background Image</label>
                    <div className="mt-2 space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={heroSettings.background_image_url}
                          alt="Hero Background"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CloudinaryUpload
                        onUpload={handleHeroImageUpload}
                        acceptedTypes={['image']}
                        className="w-full"
                      />
                      <Input
                        placeholder="Or enter image URL directly"
                        value={heroSettings.background_image_url}
                        onChange={(e) => setHeroSettings(prev => ({ 
                          ...prev, 
                          background_image_url: e.target.value 
                        }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={heroSettings.name}
                      onChange={(e) => setHeroSettings(prev => ({ 
                        ...prev, 
                        name: e.target.value 
                      }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tagline</label>
                    <Input
                      value={heroSettings.tagline}
                      onChange={(e) => setHeroSettings(prev => ({ 
                        ...prev, 
                        tagline: e.target.value 
                      }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={heroSettings.description}
                      onChange={(e) => setHeroSettings(prev => ({ 
                        ...prev, 
                        description: e.target.value 
                      }))}
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">CV/Resume File</label>
                    <div className="mt-2 space-y-4">
                      <CloudinaryUpload
                        onUpload={handleCVUpload}
                        acceptedTypes={['raw']}
                        className="w-full"
                      />
                      <Input
                        placeholder="Or enter CV URL directly"
                        value={heroSettings.cv_url}
                        onChange={(e) => setHeroSettings(prev => ({ 
                          ...prev, 
                          cv_url: e.target.value 
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveHeroSettings} className="w-full" disabled={saving}>
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Hero Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Profile Image</label>
                    <div className="mt-2 space-y-4">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted mx-auto">
                        <img
                          src={aboutSettings.profile_image_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CloudinaryUpload
                        onUpload={handleProfileImageUpload}
                        acceptedTypes={['image']}
                        className="w-full"
                      />
                      <Input
                        placeholder="Or enter image URL directly"
                        value={aboutSettings.profile_image_url}
                        onChange={(e) => setAboutSettings(prev => ({ 
                          ...prev, 
                          profile_image_url: e.target.value 
                        }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      value={aboutSettings.bio}
                      onChange={(e) => setAboutSettings(prev => ({ 
                        ...prev, 
                        bio: e.target.value 
                      }))}
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium">Achievement Cards</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addAchievement}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Achievement
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {aboutSettings.achievements.map((achievement, index) => (
                        <Card key={index} className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Achievement {index + 1}</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeAchievement(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Icon</label>
                                <Select
                                  value={achievement.icon}
                                  onValueChange={(value) => updateAchievement(index, 'icon', value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {iconOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Title</label>
                                <Input
                                  value={achievement.title}
                                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                                  placeholder="Achievement title"
                                  className="mt-1"
                                />
                              </div>
                              
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Description</label>
                                <Input
                                  value={achievement.description}
                                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                                  placeholder="Achievement description"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={saveAboutSettings} className="w-full" disabled={saving}>
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save About Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Username</label>
                    <Input
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ 
                        ...prev, 
                        username: e.target.value 
                      }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative mt-2">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ 
                          ...prev, 
                          password: e.target.value 
                        }))}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Warning:</strong> Changing these credentials will require you to log in again with the new credentials.
                  </p>
                </div>

                <Button onClick={saveCredentials} className="w-full" disabled={saving}>
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Credentials
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}