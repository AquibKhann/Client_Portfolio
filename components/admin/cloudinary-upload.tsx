'use client';

import { useState } from 'react';
import { Upload, X, Image, FileText, Video, File, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface CloudinaryUploadProps {
  onUpload: (url: string, type: string, publicId?: string) => void;
  onDelete?: (publicId: string) => void;
  acceptedTypes?: string[];
  multiple?: boolean;
  className?: string;
  currentImages?: Array<{ url: string; publicId?: string }>;
}

export default function CloudinaryUpload({ 
  onUpload, 
  onDelete,
  acceptedTypes = ['image', 'video', 'raw'], 
  multiple = false,
  className = '',
  currentImages = []
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  const uploadPreset = 'portfolio_uploads'; // Make sure this exists in your Cloudinary settings

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'portfolio_uploads');
      
      // Determine resource type
      let resourceType = 'auto';
      if (file.type.startsWith('image/')) resourceType = 'image';
      else if (file.type.startsWith('video/')) resourceType = 'video';
      else resourceType = 'raw';

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/${resourceType}/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        onUpload(data.secure_url, resourceType, data.public_id);
        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    });

    await Promise.all(uploadPromises);
    setUploading(false);
  };

  const handleDelete = async (publicId: string) => {
    try {
      const response = await fetch(`/api/cloudinary/delete?public_id=${publicId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete?.(publicId);
        toast.success('Image deleted successfully!');
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-8 w-8" />;
      case 'video': return <Video className="h-8 w-8" />;
      case 'raw': return <FileText className="h-8 w-8" />;
      default: return <File className="h-8 w-8" />;
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Upload Media Files</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports: Images, Videos, PDFs, AutoCAD files
                </p>
              </div>

              <div className="flex justify-center space-x-2">
                {acceptedTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-1 text-xs text-muted-foreground">
                    {getFileIcon(type)}
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple={multiple}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
                accept={acceptedTypes.includes('image') ? 'image/*,video/*,.pdf,.dwg,.dxf' : ''}
              />
              
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Select Files
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Current Images Display */}
          {currentImages.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Current Images</h4>
              <div className="grid grid-cols-3 gap-4">
                {currentImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image.url}
                        alt={`Current image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {image.publicId && onDelete && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(image.publicId!)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}