
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const StudyMaterials = () => {
  const [uploaderName, setUploaderName] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const materials = [
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
  ];

  const handleUpload = () => {
    if (uploaderName && materialTitle) {
      console.log('Uploading material:', { uploaderName, materialTitle });
      setUploaderName('');
      setMaterialTitle('');
      setShowUploadForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📤</span>
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
              <div className="flex space-x-2">
                <Button onClick={handleUpload} className="flex-1">
                  Upload File
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploadForm(false)}
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
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
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
