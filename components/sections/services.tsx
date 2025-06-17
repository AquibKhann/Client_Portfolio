'use client';

import { motion } from 'framer-motion';
import { Building2, Home, Factory, Ruler, PaintBucket, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: 'Architectural Design',
      description: 'Complete architectural solutions from concept to construction, including residential, commercial, and institutional buildings.',
      features: ['Conceptual Design', 'Technical Drawings', 'Building Permits', '3D Visualization']
    },
    {
      icon: Home,
      title: 'Interior Design',
      description: 'Creating beautiful and functional interior spaces that reflect your style and meet your practical needs.',
      features: ['Space Planning', 'Material Selection', 'Furniture Design', 'Lighting Design']
    },
    {
      icon: Factory,
      title: 'Production Design',
      description: 'Specialized design services for manufacturing and industrial facilities, optimizing workflow and efficiency.',
      features: ['Facility Planning', 'Workflow Optimization', 'Safety Compliance', 'Equipment Layout']
    },
    {
      icon: Ruler,
      title: 'Project Management',
      description: 'Comprehensive project management services ensuring timely delivery and quality control throughout the construction process.',
      features: ['Timeline Management', 'Quality Control', 'Budget Oversight', 'Contractor Coordination']
    },
    {
      icon: PaintBucket,
      title: 'Renovation & Remodeling',
      description: 'Transform existing spaces with innovative renovation and remodeling solutions that maximize potential.',
      features: ['Space Optimization', 'Modern Updates', 'Structural Changes', 'Historic Preservation']
    },
    {
      icon: Lightbulb,
      title: 'Design Consultation',
      description: 'Expert design consultation services to help you make informed decisions about your project.',
      features: ['Design Review', 'Code Compliance', 'Cost Estimation', 'Feasibility Studies']
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive design services tailored to bring your vision to life,
            from initial concept to final construction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group flex flex-col">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}