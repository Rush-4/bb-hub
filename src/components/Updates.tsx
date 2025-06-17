
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const Updates = () => {
  const [posterName, setPosterName] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const updates = [
    {
      id: 1,
      title: '🚨 Physics Midterm Moved to Friday!',
      content: 'Hey everyone! Prof. Johnson just announced that the Physics midterm has been moved from Wednesday to Friday. Make sure to update your study schedules!',
      poster: 'Emma L.',
      date: '2024-06-17',
      time: '2:30 PM',
      priority: 'high'
    },
    {
      id: 2,
      title: '📚 Group Study Session This Weekend',
      content: 'Organizing a group study session for Calculus this Saturday at the library. Room 204, 2 PM. Bring your practice problems!',
      poster: 'David R.',
      date: '2024-06-16',
      time: '4:15 PM',
      priority: 'medium'
    },
    {
      id: 3,
      title: '🎉 Pizza Party After Finals!',
      content: 'To celebrate surviving finals week, we\'re having a pizza party next Friday at 7 PM. Location TBD. Can\'t wait to see everyone!',
      poster: 'Lily C.',
      date: '2024-06-15',
      time: '11:45 AM',
      priority: 'low'
    }
  ];

  const handlePost = () => {
    if (posterName && updateTitle && updateContent) {
      console.log('Posting update:', { posterName, updateTitle, updateContent });
      setPosterName('');
      setUpdateTitle('');
      setUpdateContent('');
      setShowPostForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Post Update Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-dashed border-green-300 dark:border-green-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📢</span>
            <span>Post Update</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showPostForm ? (
            <Button 
              onClick={() => setShowPostForm(true)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Share an Update
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="poster">Your Name</Label>
                <Input
                  id="poster"
                  value={posterName}
                  onChange={(e) => setPosterName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="updateTitle">Update Title</Label>
                <Input
                  id="updateTitle"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  placeholder="e.g., Important: Exam Date Changed!"
                />
              </div>
              <div>
                <Label htmlFor="updateContent">Update Content</Label>
                <Textarea
                  id="updateContent"
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  placeholder="Share the details..."
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handlePost} className="flex-1">
                  Post Update
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPostForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col md:flex-row md:items-start justify-between space-y-2 md:space-y-0">
                  <h3 className="font-semibold text-lg flex-1">{update.title}</h3>
                  <Badge className={getPriorityColor(update.priority)}>
                    {update.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {update.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>👤 {update.poster}</span>
                  <span>📅 {update.date}</span>
                  <span>🕐 {update.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Updates;
