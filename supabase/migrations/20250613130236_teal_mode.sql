/*
  # Create Hero Settings and Admin Credentials Tables

  1. New Tables
    - `hero_settings`
      - `id` (uuid, primary key)
      - `background_image_url` (text)
      - `name` (text)
      - `tagline` (text)
      - `description` (text)
      - `cv_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_credentials`
      - `id` (uuid, primary key)
      - `username` (text)
      - `password` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `about_settings`
      - `id` (uuid, primary key)
      - `profile_image_url` (text)
      - `bio` (text)
      - `achievements` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create hero_settings table
CREATE TABLE IF NOT EXISTS hero_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  background_image_url text DEFAULT 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
  name text DEFAULT 'Shaquib Khan',
  tagline text DEFAULT 'Architect | Interior Designer | Production Expert',
  description text DEFAULT 'Creating innovative architectural solutions that blend functionality with aesthetic excellence. Specializing in residential, commercial, and production design projects.',
  cv_url text DEFAULT '/cv/shaquib-khan-cv.pdf',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text DEFAULT 'Aquib',
  password text DEFAULT 'Khan@123',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create about_settings table
CREATE TABLE IF NOT EXISTS about_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_image_url text DEFAULT 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
  bio text DEFAULT 'With over a decade of experience in architectural design, I bring creativity, technical expertise, and a passion for sustainable design to every project.',
  achievements text[] DEFAULT ARRAY['Design Excellence Awards', '100+ Happy Clients', 'Commercial Projects', 'Interior Design'],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for hero_settings
CREATE POLICY "Anyone can read hero settings"
  ON hero_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can manage hero settings"
  ON hero_settings
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for admin_credentials
CREATE POLICY "Service role can manage admin credentials"
  ON admin_credentials
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for about_settings
CREATE POLICY "Anyone can read about settings"
  ON about_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can manage about settings"
  ON about_settings
  FOR ALL
  TO service_role
  USING (true);

-- Insert default data
INSERT INTO hero_settings (id) VALUES ('00000000-0000-0000-0000-000000000001') ON CONFLICT DO NOTHING;
INSERT INTO admin_credentials (id) VALUES ('00000000-0000-0000-0000-000000000001') ON CONFLICT DO NOTHING;
INSERT INTO about_settings (id) VALUES ('00000000-0000-0000-0000-000000000001') ON CONFLICT DO NOTHING;

-- Create triggers for updated_at
CREATE TRIGGER update_hero_settings_updated_at BEFORE UPDATE ON hero_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_admin_credentials_updated_at BEFORE UPDATE ON admin_credentials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_about_settings_updated_at BEFORE UPDATE ON about_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();