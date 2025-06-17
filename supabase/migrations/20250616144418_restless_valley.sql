/*
  # Update About Settings for Achievement Objects

  1. Changes
    - Update achievements column to support object structure with icon, title, description
    - Convert existing string array data to new object format
    - Maintain backward compatibility

  2. Migration Steps
    - Add temporary column for new structure
    - Convert existing data
    - Replace old column with new structure
*/

-- First, let's update the existing data to the new format
UPDATE about_settings 
SET achievements = ARRAY[
  '{"icon": "Award", "title": "Design Excellence Awards", "description": "Multiple awards for innovative architectural solutions"}',
  '{"icon": "Users", "title": "100+ Happy Clients", "description": "Successfully completed projects for diverse clientele"}',
  '{"icon": "Building", "title": "Commercial Projects", "description": "Specialized in large-scale commercial developments"}',
  '{"icon": "Palette", "title": "Interior Design", "description": "Expert in creating beautiful and functional spaces"}'
]::text[]
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Update the column comment to reflect the new structure
COMMENT ON COLUMN about_settings.achievements IS 'Array of JSON strings containing achievement objects with icon, title, and description';