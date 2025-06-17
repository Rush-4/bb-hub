
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Moon, Toggle } from 'lucide-react';
import StudyMaterials from '@/components/StudyMaterials';
import Updates from '@/components/Updates';
import MemeWeek from '@/components/MemeWeek';
import Leaderboard from '@/components/Leaderboard';
import ExamCountdown from '@/components/ExamCountdown';
import TodoList from '@/components/TodoList';
import FeedbackBox from '@/components/FeedbackBox';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-gray-800/80 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">📚</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Study Hub Squad
            </h1>
          </div>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Moon className="h-4 w-4" />
            <span>{darkMode ? 'Light' : 'Dark'}</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 dark:text-white">Welcome to Our Study Squad! 🎓</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your one-stop hub for study materials, updates, memes, and everything we need to ace our college journey together!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">23</div>
              <div className="text-sm text-green-600 dark:text-green-400">Materials</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">12</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Updates</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">45</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Memes</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 border-0">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">8</div>
              <div className="text-sm text-pink-600 dark:text-pink-400">Contributors</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Row - Exam Countdown */}
        <div className="mb-8">
          <ExamCountdown />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-white/50 dark:bg-gray-800/50">
            <TabsTrigger value="materials" className="text-xs md:text-sm">📚 Materials</TabsTrigger>
            <TabsTrigger value="updates" className="text-xs md:text-sm">📢 Updates</TabsTrigger>
            <TabsTrigger value="memes" className="text-xs md:text-sm">😂 Memes</TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-xs md:text-sm">🏆 Leaders</TabsTrigger>
            <TabsTrigger value="todo" className="text-xs md:text-sm">✅ Tasks</TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs md:text-sm">💬 Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="materials">
            <StudyMaterials />
          </TabsContent>

          <TabsContent value="updates">
            <Updates />
          </TabsContent>

          <TabsContent value="memes">
            <MemeWeek />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="todo">
            <TodoList />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackBox />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 border-t dark:border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Made with ❤️ for our awesome study squad! Keep learning, keep growing! 🚀
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
