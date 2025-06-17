'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel } from '@/components/ui/carousel';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  project_type: string;
  gallery_urls: string[];
  created_at: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'architectural', label: 'Architectural' },
    { value: 'interior', label: 'Interior' },
    { value: 'production', label: 'Production' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.project_type === filter);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of architectural, interior, and production design projects
            that showcase innovation, functionality, and aesthetic excellence.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filterType) => (
            <Button
              key={filterType.value}
              variant={filter === filterType.value ? 'default' : 'outline'}
              onClick={() => setFilter(filterType.value)}
              className="capitalize"
            >
              <Filter className="mr-2 h-4 w-4" />
              {filterType.label}
            </Button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-muted-foreground text-lg">
              {filter === 'all' ? 'No projects found.' : `No ${filter} projects found.`}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="space-y-3 flex-grow">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold line-clamp-1">{project.title}</h3>
                        <Badge variant="outline" className="capitalize text-xs">
                          {project.project_type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Project Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Main Image or Gallery Carousel */}
                  {selectedProject.gallery_urls && selectedProject.gallery_urls.length > 0 ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <Carousel showArrows showDots autoPlay autoPlayInterval={4000}>
                        <div className="aspect-video">
                          <img
                            src={selectedProject.image_url}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {selectedProject.gallery_urls.map((url, index) => (
                          <div key={index} className="aspect-video">
                            {url.includes('.pdf') || url.includes('.dwg') ? (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <div className="text-center">
                                  <div className="text-4xl mb-2">📄</div>
                                  <p className="text-sm text-muted-foreground">
                                    {url.includes('.pdf') ? 'PDF Document' : 'AutoCAD File'}
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => window.open(url, '_blank')}
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open File
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={url}
                                alt={`Gallery item ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            )}
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={selectedProject.image_url}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="capitalize">
                      {selectedProject.project_type}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {new Date(selectedProject.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Project Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Project Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}