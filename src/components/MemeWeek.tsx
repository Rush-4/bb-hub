
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const MemeWeek = () => {
  const [uploaderName, setUploaderName] = useState('');
  const [memeTitle, setMemeTitle] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const memes = [
    {
      id: 1,
      title: 'When you realize the exam is tomorrow',
      uploader: 'Jake M.',
      votes: 42,
      date: '2024-06-16',
      isWinner: true
    },
    {
      id: 2,
      title: 'Me explaining to my parents why I need more money',
      uploader: 'Sophie R.',
      votes: 38,
      date: '2024-06-15',
      isWinner: false
    },
    {
      id: 3,
      title: 'Group project be like...',
      uploader: 'Chris P.',
      votes: 35,
      date: '2024-06-14',
      isWinner: false
    },
    {
      id: 4,
      title: 'Coffee on exam week hits different',
      uploader: 'Maya T.',
      votes: 29,
      date: '2024-06-13',
      isWinner: false
    }
  ];

  const handleUpload = () => {
    if (uploaderName && memeTitle) {
      console.log('Uploading meme:', { uploaderName, memeTitle });
      setUploaderName('');
      setMemeTitle('');
      setShowUploadForm(false);
    }
  };

  const handleVote = (memeId: number) => {
    console.log('Voting for meme:', memeId);
  };

  return (
    <div className="space-y-6">
      {/* Current Winner */}
      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>👑</span>
            <span>Meme of the Week Winner!</span>
            <Badge className="bg-yellow-500 text-yellow-900">42 votes</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <div className="text-6xl mb-4">😱</div>
            <h3 className="text-xl font-bold mb-2">"When you realize the exam is tomorrow"</h3>
            <p className="text-gray-600 dark:text-gray-300">by Jake M.</p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-2 border-dashed border-pink-300 dark:border-pink-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎨</span>
            <span>Submit Your Meme</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showUploadForm ? (
            <Button 
              onClick={() => setShowUploadForm(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Upload Meme
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="memeUploader">Your Name</Label>
                <Input
                  id="memeUploader"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="memeTitle">Meme Title/Caption</Label>
                <Input
                  id="memeTitle"
                  value={memeTitle}
                  onChange={(e) => setMemeTitle(e.target.value)}
                  placeholder="Give your meme a funny title"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleUpload} className="flex-1">
                  Upload Meme
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

      {/* Memes Grid */}
      <div className="grid gap-4">
        <h3 className="text-xl font-bold mb-4">Vote for your favorites! 🗳️</h3>
        {memes.map((meme) => (
          <Card key={meme.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{meme.title}</h3>
                    {meme.isWinner && <Badge className="bg-yellow-500 text-yellow-900">Winner!</Badge>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>😄 {meme.uploader}</span>
                    <span>📅 {meme.date}</span>
                    <span>❤️ {meme.votes} votes</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={() => handleVote(meme.id)}
                    variant="outline"
                    size="sm"
                    className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-800/20"
                  >
                    ❤️ Vote
                  </Button>
                  <Button size="sm" variant="outline">
                    View
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

export default MemeWeek;
