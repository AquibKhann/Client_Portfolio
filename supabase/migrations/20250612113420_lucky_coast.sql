/*
  # Seed Initial Data

  1. Sample Projects
    - Add sample architectural, interior, and production projects
  
  2. Sample Testimonials
    - Add client testimonials with ratings
  
  3. Notes
    - This data provides a foundation for the portfolio
    - Real data should replace this in production
*/

-- Insert sample projects
INSERT INTO projects (title, description, image_url, tags, project_type) VALUES
  (
    'Modern Residential Complex',
    'A contemporary residential development featuring sustainable design principles and modern amenities. This project incorporates energy-efficient systems, natural lighting optimization, and community-focused spaces.',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    ARRAY['residential', 'sustainable', 'modern', 'community'],
    'architectural'
  ),
  (
    'Corporate Office Interior',
    'Innovative interior design for a tech company office, focusing on collaboration and productivity. Features include flexible workspaces, biophilic design elements, and state-of-the-art technology integration.',
    'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
    ARRAY['office', 'corporate', 'modern', 'collaborative'],
    'interior'
  ),
  (
    'Industrial Production Facility',
    'Design and planning of a state-of-the-art manufacturing facility with optimized workflow. Emphasizes safety, efficiency, and scalability for future expansion.',
    'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg',
    ARRAY['industrial', 'manufacturing', 'efficiency', 'safety'],
    'production'
  ),
  (
    'Luxury Hotel Interior',
    'Elegant interior design for a boutique hotel combining local culture with contemporary luxury. Features custom furniture, artisanal details, and sophisticated lighting design.',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    ARRAY['hospitality', 'luxury', 'boutique', 'cultural'],
    'interior'
  ),
  (
    'Sustainable Housing Development',
    'Eco-friendly residential project featuring passive house design principles. Incorporates renewable energy systems, rainwater harvesting, and sustainable materials.',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    ARRAY['residential', 'sustainable', 'eco-friendly', 'passive-house'],
    'architectural'
  ),
  (
    'Film Production Studio',
    'Complete design and build of a professional film production facility. Includes sound stages, post-production suites, and flexible creative spaces.',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    ARRAY['entertainment', 'film', 'studio', 'creative'],
    'production'
  );

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_title, content, rating, project_context) VALUES
  (
    'Sarah Johnson',
    'CEO, Tech Innovations',
    'Shaquib transformed our office space into a modern, collaborative environment that truly reflects our company culture. His attention to detail and innovative approach exceeded our expectations. The new design has significantly improved our team productivity and employee satisfaction.',
    5,
    'Corporate Office Redesign'
  ),
  (
    'Michael Chen',
    'Homeowner',
    'The architectural design for our dream home was beyond what we imagined. Shaquib listened to our needs and created a space that is both beautiful and functional. Every detail was carefully considered, from natural lighting to sustainable materials.',
    5,
    'Custom Residential Home'
  ),
  (
    'Emma Rodriguez',
    'Restaurant Owner',
    'The interior design of our restaurant created the perfect atmosphere for our customers. The space is both elegant and practical, exactly what we needed. Our customer feedback has been overwhelmingly positive since the renovation.',
    5,
    'Restaurant Interior Design'
  ),
  (
    'David Wilson',
    'Manufacturing Director',
    'The production facility design optimized our workflow beyond our expectations. Shaquib''s understanding of industrial processes and safety requirements was exceptional. The new layout has increased our efficiency by 30%.',
    5,
    'Manufacturing Facility'
  ),
  (
    'Lisa Thompson',
    'Hotel Manager',
    'Our boutique hotel interior design perfectly captures the local culture while providing modern luxury. Guests consistently compliment the sophisticated yet welcoming atmosphere. The design has become a key differentiator for our property.',
    5,
    'Boutique Hotel Interior'
  );