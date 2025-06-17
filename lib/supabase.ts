import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  project_type: 'architectural' | 'interior' | 'production';
  gallery_urls?: string[];
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  content: string;
  rating: number;
  project_context: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface HeroSettings {
  id: string;
  background_image_url: string;
  name: string;
  tagline: string;
  description: string;
  cv_url: string;
  created_at: string;
  updated_at: string;
}

export interface AdminCredentials {
  id: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface AboutSettings {
  id: string;
  profile_image_url: string;
  bio: string;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

// Helper function to handle database operations with better error handling
export const handleSupabaseOperation = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const result = await operation();
    if (result.error) {
      console.error('Supabase operation error:', result.error);
      return { data: null, error: result.error.message || 'Database operation failed' };
    }
    return { data: result.data, error: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};