
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';

const StudyMaterials = () => {
  const [uploaderName, setUploaderName] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Calculus Final Exam Notes',
      uploader: 'Sarah M.',
      date: '2024-06-15',
      downloads: 23,
      type: 'PDF',
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Physics Lab Report Template',
      uploader: 'Mike J.',
      date: '2024-06-14',
      downloads: 18,
      type: 'DOCX',
      subject: 'Physics'
    },
    {
      id: 3,
      title: 'Chemistry Formula Sheet',
      uploader: 'Alex K.',
      date: '2024-06-13',
      downloads: 31,
      type: 'PDF',
      subject: 'Chemistry'
    }
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toUpperCase();
    return extension || 'FILE';
  };

  const getSubjectFromTitle = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('math') || titleLower.includes('calculus') || titleLower.includes('algebra')) return 'Mathematics';
    if (titleLower.includes('physics')) return 'Physics';
    if (titleLower.includes('chemistry') || titleLower.includes('chem')) return 'Chemistry';
    if (titleLower.includes('biology') || titleLower.includes('bio')) return 'Biology';
    if (titleLower.includes('english') || titleLower.includes('literature')) return 'English';
    if (titleLower.includes('history')) return 'History';
    if (titleLower.includes('computer') || titleLower.includes('programming')) return 'Computer Science';
    return 'General';
  };

  const handleUpload = () => {
    if (uploaderName && materialTitle && selectedFile) {
      const newMaterial = {
        id: materials.length + 1,
        title: materialTitle,
        uploader: uploaderName,
        date: new Date().toISOString().split('T')[0],
        downloads: 0,
        type: getFileType(selectedFile.name),
        subject: getSubjectFromTitle(materialTitle)
      };

      setMaterials([newMaterial, ...materials]);
      console.log('Material uploaded successfully:', newMaterial);
      
      // Reset form
      setUploaderName('');
      setMaterialTitle('');
      setSelectedFile(null);
      setShowUploadForm(false);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleDownload = (materialId: number) => {
    setMaterials(materials.map(material => 
      material.id === materialId 
        ? { ...material, downloads: material.downloads + 1 }
        : material
    ));
    console.log('Download initiated for material ID:', materialId);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Study Material</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showUploadForm ? (
            <Button 
              onClick={() => setShowUploadForm(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Share Your Materials
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="uploader">Your Name</Label>
                <Input
                  id="uploader"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="title">Material Title</Label>
                <Input
                  id="title"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  placeholder="e.g., Math Final Study Guide"
                />
              </div>
              <div>
                <Label htmlFor="file-upload">Select File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                  className="cursor-pointer"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleUpload} 
                  className="flex-1"
                  disabled={!uploaderName || !materialTitle || !selectedFile}
                >
                  Upload File
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowUploadForm(false);
                    setSelectedFile(null);
                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Materials List */}
      <div className="grid gap-4">
        {materials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                  <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>📤 {material.uploader}</span>
                    <span>📅 {material.date}</span>
                    <span>⬇️ {material.downloads} downloads</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{material.subject}</Badge>
                  <Badge variant="outline">{material.type}</Badge>
                  <Button 
                    size="sm" 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleDownload(material.id)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
