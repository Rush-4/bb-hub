
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, Upload, Heart, Smile } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'meme';
  likes: number;
  isLiked: boolean;
  memeUrl?: string;
}

interface MemeChat {
  id: number;
  title: string;
  sender: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  memeUrl?: string;
  description: string;
}

const ChatSystem = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [memeTitle, setMemeTitle] = useState('');
  const [memeDescription, setMemeDescription] = useState('');
  const [selectedMemeFile, setSelectedMemeFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Sarah M.',
      content: 'Hey everyone! How is everyone preparing for the finals?',
      timestamp: '2024-01-15T10:30:00',
      type: 'text',
      likes: 3,
      isLiked: false
    },
    {
      id: 2,
      sender: 'Mike J.',
      content: 'I\'m drowning in calculus problems! Anyone want to form a study group?',
      timestamp: '2024-01-15T10:32:00',
      type: 'text',
      likes: 5,
      isLiked: true
    },
    {
      id: 3,
      sender: 'Alex K.',
      content: 'Count me in! I have some great chemistry notes to share too.',
      timestamp: '2024-01-15T10:35:00',
      type: 'text',
      likes: 2,
      isLiked: false
    }
  ]);

  const [memeChats, setMemeChats] = useState<MemeChat[]>([
    {
      id: 1,
      title: 'When the professor says "this will be on the exam"',
      sender: 'Jake M.',
      timestamp: '2024-01-15T09:00:00',
      likes: 15,
      isLiked: true,
      description: 'That moment when you realize you need to actually pay attention 😅'
    },
    {
      id: 2,
      title: 'Group project energy',
      sender: 'Sophie R.',
      timestamp: '2024-01-15T08:30:00',
      likes: 12,
      isLiked: false,
      description: 'When you\'re carrying the whole team but trying to be polite about it'
    },
    {
      id: 3,
      title: 'Coffee addiction level: Student',
      sender: 'Maya T.',
      timestamp: '2024-01-15T08:00:00',
      likes: 18,
      isLiked: true,
      description: 'At this point, I think I\'m 90% caffeine and 10% human'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (userName.trim() && message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: userName,
        content: message,
        timestamp: new Date().toISOString(),
        type: 'text',
        likes: 0,
        isLiked: false
      };

      setMessages([...messages, newMessage]);
      setMessage('');
      
      toast({
        title: "Message sent!",
        description: "Your message has been added to the chat.",
      });
    }
  };

  const handleMemeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedMemeFile(file);
    }
  };

  const handleSendMeme = () => {
    if (userName.trim() && memeTitle.trim() && memeDescription.trim()) {
      const memeUrl = selectedMemeFile ? URL.createObjectURL(selectedMemeFile) : undefined;
      
      const newMeme: MemeChat = {
        id: memeChats.length + 1,
        title: memeTitle,
        sender: userName,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        memeUrl: memeUrl,
        description: memeDescription
      };

      setMemeChats([newMeme, ...memeChats]);
      setMemeTitle('');
      setMemeDescription('');
      setSelectedMemeFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('meme-file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      toast({
        title: "Meme posted!",
        description: "Your meme has been shared with the squad!",
      });
    }
  };

  const handleLikeMessage = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1, isLiked: !msg.isLiked }
        : msg
    ));
  };

  const handleLikeMeme = (memeId: number) => {
    setMemeChats(memeChats.map(meme => 
      meme.id === memeId 
        ? { ...meme, likes: meme.isLiked ? meme.likes - 1 : meme.likes + 1, isLiked: !meme.isLiked }
        : meme
    ));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Study Chat</span>
          </TabsTrigger>
          <TabsTrigger value="memes" className="flex items-center space-x-2">
            <Smile className="h-4 w-4" />
            <span>Meme Chat</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          {/* Chat Messages */}
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Squad Chat</span>
                <Badge variant="secondary">{messages.length} messages</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col space-y-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeMessage(msg.id)}
                      className={`flex items-center space-x-1 ${msg.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      <Heart className={`h-3 w-3 ${msg.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{msg.likes}</span>
                    </Button>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>

          {/* Message Input */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-32"
                />
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!userName.trim() || !message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memes" className="space-y-4">
          {/* Meme Upload */}
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Share a Meme</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  placeholder="Meme title"
                  value={memeTitle}
                  onChange={(e) => setMemeTitle(e.target.value)}
                />
              </div>
              <Textarea
                placeholder="Describe your meme..."
                value={memeDescription}
                onChange={(e) => setMemeDescription(e.target.value)}
                rows={2}
              />
              <div className="flex space-x-2">
                <Input
                  id="meme-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleMemeFileChange}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMeme}
                  disabled={!userName.trim() || !memeTitle.trim() || !memeDescription.trim()}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Post Meme
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meme Feed */}
          <div className="space-y-4">
            {memeChats.map((meme) => (
              <Card key={meme.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{meme.sender}</span>
                        <span className="text-sm text-gray-500">{formatTimestamp(meme.timestamp)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeMeme(meme.id)}
                        className={`flex items-center space-x-1 ${meme.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        <Heart className={`h-4 w-4 ${meme.isLiked ? 'fill-current' : ''}`} />
                        <span>{meme.likes}</span>
                      </Button>
                    </div>
                    <h3 className="font-bold text-lg">{meme.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{meme.description}</p>
                    {meme.memeUrl && (
                      <div className="flex justify-center">
                        <img 
                          src={meme.memeUrl} 
                          alt={meme.title}
                          className="max-w-full max-h-64 object-contain rounded-lg"
                        />
                      </div>
                    )}
                    {!meme.memeUrl && (
                      <div className="flex justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <div className="text-6xl">😂</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSystem;
