'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  FolderOpen, 
  MessageSquare, 
  Star,
  Upload,
  ExternalLink,
  Settings,
  Image as ImageIcon,
  RefreshCw,
  Moon,
  Sun,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import CloudinaryUpload from '@/components/admin/cloudinary-upload';

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

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  content: string;
  rating: number;
  project_context: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image_url: '',
    tags: '',
    project_type: 'architectural',
    gallery_urls: [] as string[]
  });

  const [testimonialForm, setTestimonialForm] = useState({
    client_name: '',
    client_title: '',
    content: '',
    rating: 5,
    project_context: ''
  });

  useEffect(() => {
    // Check authentication
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      router.push('/admin');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects
      const projectsResponse = await fetch('/api/projects');
      const projectsResult = await projectsResponse.json();
      
      if (projectsResult.error) {
        console.error('Error loading projects:', projectsResult.error);
        toast.error('Error loading projects: ' + projectsResult.error);
      } else {
        setProjects(projectsResult.data || []);
      }

      // Fetch testimonials
      const testimonialsResponse = await fetch('/api/testimonials');
      const testimonialsResult = await testimonialsResponse.json();
      
      if (testimonialsResult.error) {
        console.error('Error loading testimonials:', testimonialsResult.error);
        toast.error('Error loading testimonials: ' + testimonialsResult.error);
      } else {
        setTestimonials(testimonialsResult.data || []);
      }

      // Fetch contact submissions
      const contactsResponse = await fetch('/api/contacts');
      const contactsResult = await contactsResponse.json();
      
      if (contactsResult.error) {
        console.error('Error loading contact messages:', contactsResult.error);
        toast.error('Error loading contact messages: ' + contactsResult.error);
      } else {
        setContacts(contactsResult.data || []);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin');
  };

  const handleAddProject = async () => {
    if (!projectForm.title || !projectForm.description || !projectForm.image_url) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const projectData = {
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        image_url: projectForm.image_url.trim(),
        tags: projectForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        project_type: projectForm.project_type,
        gallery_urls: projectForm.gallery_urls || [],
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Unknown server error');
      }

      toast.success('Project added successfully!');
      setIsProjectDialogOpen(false);
      resetProjectForm();
      await fetchData();
    } catch (error: any) {
      console.error('Error adding project:', error);
      toast.error(`Error adding project: ${error.message || 'Unexpected error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject || !projectForm.title || !projectForm.description || !projectForm.image_url) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const projectData = {
        id: editingProject.id,
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        image_url: projectForm.image_url.trim(),
        tags: projectForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        project_type: projectForm.project_type,
        gallery_urls: projectForm.gallery_urls || [],
      };

      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Project updated successfully!');
      setIsProjectDialogOpen(false);
      setEditingProject(null);
      resetProjectForm();
      await fetchData();
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast.error('Error updating project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setDeletingItems(prev => new Set(prev).add(id));

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to delete project');
      }

      toast.success('Project deleted successfully!');
      await fetchData();
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project. Please try again.');
    } finally {
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleAddTestimonial = async () => {
    if (!testimonialForm.client_name || !testimonialForm.content || !testimonialForm.project_context) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const testimonialData = {
        client_name: testimonialForm.client_name.trim(),
        client_title: testimonialForm.client_title.trim(),
        content: testimonialForm.content.trim(),
        rating: testimonialForm.rating,
        project_context: testimonialForm.project_context.trim(),
      };

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Testimonial added successfully!');
      setIsTestimonialDialogOpen(false);
      resetTestimonialForm();
      await fetchData();
    } catch (error: any) {
      console.error('Error adding testimonial:', error);
      toast.error('Error adding testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTestimonial = async () => {
    if (!editingTestimonial || !testimonialForm.client_name || !testimonialForm.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const testimonialData = {
        id: editingTestimonial.id,
        client_name: testimonialForm.client_name.trim(),
        client_title: testimonialForm.client_title.trim(),
        content: testimonialForm.content.trim(),
        rating: testimonialForm.rating,
        project_context: testimonialForm.project_context.trim(),
      };

      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Testimonial updated successfully!');
      setIsTestimonialDialogOpen(false);
      setEditingTestimonial(null);
      resetTestimonialForm();
      await fetchData();
    } catch (error: any) {
      console.error('Error updating testimonial:', error);
      toast.error('Error updating testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setDeletingItems(prev => new Set(prev).add(id));

    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to delete testimonial');
      }

      toast.success('Testimonial deleted successfully!');
      await fetchData();
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      toast.error('Error deleting testimonial. Please try again.');
    } finally {
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };
const handleDeleteContact = async (id: string) => {
  if (!confirm('Are you sure you want to delete this message?')) return;

  setDeletingItems(prev => new Set(prev).add(id));

  try {
    const response = await fetch(`/api/contacts?id=${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to delete message');
    }

    toast.success('Message deleted successfully!');
    setSelectedContact(null);
    await fetchData();
  }  catch (error: any) {
  console.error('Error deleting message:', error);
  if (error instanceof Response) {
    const err = await error.json();
    console.error('API Error:', err);
  }
  toast.error('Error deleting message. Please try again.');
}
finally {
    setDeletingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }
};


  const markContactAsRead = async (id: string) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, is_read: true }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setContacts(prev =>
        prev.map(contact =>
          contact.id === id ? { ...contact, is_read: true } : contact
        )
      );
      toast.success('Message marked as read');
    } catch (error: any) {
      console.error('Error marking message as read:', error);
      toast.error('Error updating message');
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      image_url: '',
      tags: '',
      project_type: 'architectural',
      gallery_urls: []
    });
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      client_name: '',
      client_title: '',
      content: '',
      rating: 5,
      project_context: ''
    });
  };

  const openEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      tags: project.tags.join(', '),
      project_type: project.project_type,
      gallery_urls: project.gallery_urls || []
    });
    setIsProjectDialogOpen(true);
  };

  const openEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      client_name: testimonial.client_name,
      client_title: testimonial.client_title,
      content: testimonial.content,
      rating: testimonial.rating,
      project_context: testimonial.project_context
    });
    setIsTestimonialDialogOpen(true);
  };

  const handleMediaUpload = (url: string, type: string) => {
    if (type === 'image') {
      if (!projectForm.image_url) {
        setProjectForm(prev => ({ ...prev, image_url: url }));
      } else {
        setProjectForm(prev => ({ 
          ...prev, 
          gallery_urls: [...prev.gallery_urls, url] 
        }));
      }
    } else {
      setProjectForm(prev => ({ 
        ...prev, 
        gallery_urls: [...prev.gallery_urls, url] 
      }));
    }
  };

  const removeGalleryItem = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      gallery_urls: prev.gallery_urls.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button 
              variant="outline" 
              onClick={fetchData}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/admin/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('/', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonials.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => !c.is_read).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">
              <FolderOpen className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Star className="mr-2 h-4 w-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="contacts">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages ({contacts.filter(c => !c.is_read).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingProject(null);
                      resetProjectForm();
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Input
                            placeholder="Project Title *"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                          />
                          <Textarea
                            placeholder="Project Description *"
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                            rows={4}
                          />
                          <Input
                            placeholder="Tags (comma separated)"
                            value={projectForm.tags}
                            onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                          />
                          <Select 
                            value={projectForm.project_type} 
                            onValueChange={(value) => setProjectForm({...projectForm, project_type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="architectural">Architectural</SelectItem>
                              <SelectItem value="interior">Interior</SelectItem>
                              <SelectItem value="production">Production</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Main Image *</label>
                            {projectForm.image_url && (
                              <div className="mb-2">
                                <img
                                  src={projectForm.image_url}
                                  alt="Main project image"
                                  className="w-full h-32 object-cover rounded-lg"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <Input
                              placeholder="Main Image URL"
                              value={projectForm.image_url}
                              onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                            />
                          </div>

                          <CloudinaryUpload
                            onUpload={handleMediaUpload}
                            acceptedTypes={['image', 'video', 'raw']}
                            multiple={true}
                          />
                        </div>
                      </div>

                      {projectForm.gallery_urls.length > 0 && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">Gallery Items</label>
                          <div className="grid grid-cols-3 gap-4">
                            {projectForm.gallery_urls.map((url, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                                  {url.includes('.pdf') || url.includes('.dwg') ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
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
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeGalleryItem(index)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button 
                          onClick={editingProject ? handleUpdateProject : handleAddProject}
                          className="flex-1"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {editingProject ? 'Updating...' : 'Adding...'}
                            </>
                          ) : (
                            editingProject ? 'Update Project' : 'Add Project'
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsProjectDialogOpen(false)}
                          disabled={submitting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No projects found. Add your first project to get started.
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {project.description}
                            </p>
                            <div className="flex space-x-2 mt-2">
                              <Badge variant="outline" className="capitalize">
                                {project.project_type}
                              </Badge>
                              {project.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                              {project.tags.length > 2 && (
                                <Badge variant="secondary">
                                  +{project.tags.length - 2} more
                                </Badge>
                              )}
                              {project.gallery_urls && project.gallery_urls.length > 0 && (
                                <Badge variant="secondary">
                                  +{project.gallery_urls.length} files
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditProject(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deletingItems.has(project.id)}
                          >
                            {deletingItems.has(project.id) ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Testimonials</CardTitle>
                <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingTestimonial(null);
                      resetTestimonialForm();
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Testimonial
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Client Name *"
                        value={testimonialForm.client_name}
                        onChange={(e) => setTestimonialForm({...testimonialForm, client_name: e.target.value})}
                      />
                      <Input
                        placeholder="Client Title"
                        value={testimonialForm.client_title}
                        onChange={(e) => setTestimonialForm({...testimonialForm, client_title: e.target.value})}
                      />
                      <Textarea
                        placeholder="Testimonial Content *"
                        value={testimonialForm.content}
                        onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})}
                        rows={4}
                      />
                      <Input
                        placeholder="Project Context *"
                        value={testimonialForm.project_context}
                        onChange={(e) => setTestimonialForm({...testimonialForm, project_context: e.target.value})}
                      />
                      <Select 
                        value={testimonialForm.rating.toString()} 
                        onValueChange={(value) => setTestimonialForm({...testimonialForm, rating: parseInt(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={editingTestimonial ? handleUpdateTestimonial : handleAddTestimonial}
                          className="flex-1"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {editingTestimonial ? 'Updating...' : 'Adding...'}
                            </>
                          ) : (
                            editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsTestimonialDialogOpen(false)}
                          disabled={submitting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No testimonials found. Add your first testimonial to get started.
                    </div>
                  ) : (
                    testimonials.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{testimonial.client_name}</h3>
                              <Badge variant="outline">{testimonial.client_title}</Badge>
                            </div>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {testimonial.content}
                            </p>
                            <p className="text-sm text-primary">
                              {testimonial.project_context}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditTestimonial(testimonial)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                              disabled={deletingItems.has(testimonial.id)}
                            >
                              {deletingItems.has(testimonial.id) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No contact messages found.
                    </div>
                  ) : (
                    contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 border rounded-lg ${
                          contact.is_read ? 'border-border' : 'border-primary bg-primary/5'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{contact.name}</h3>
                              <Badge variant="outline">{contact.email}</Badge>
                              {!contact.is_read && (
                                <Badge variant="default">New</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">
                              {contact.message}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(contact.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    if (!contact.is_read) {
                                      markContactAsRead(contact.id);
                                    }
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Message from {contact.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>Email:</strong> {contact.email}
                                  </div>
                                  <div>
                                    <strong>Date:</strong> {new Date(contact.created_at).toLocaleString()}
                                  </div>
                                  <div>
                                    <strong>Message:</strong>
                                    <p className="mt-2 p-3 bg-muted rounded-lg">{contact.message}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleDeleteContact(contact.id)}
                                      disabled={deletingItems.has(contact.id)}
                                      className="flex-1"
                                    >
                                      {deletingItems.has(contact.id) ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Deleting...
                                        </>
                                      ) : (
                                        <>
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete Message
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}