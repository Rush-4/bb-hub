
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, BookOpen, Users, Trophy, Calendar, CheckSquare, MessageCircle, TrendingUp, Upload } from 'lucide-react';
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

  const quickStats = [
    { icon: BookOpen, label: 'Study Materials', value: '23', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: TrendingUp, label: 'Recent Updates', value: '12', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Users, label: 'Active Members', value: '8', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Trophy, label: 'Memes Posted', value: '45', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                📚
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Study Hub Squad
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Academic Community</p>
              </div>
            </div>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 mb-4">
            <span className="mr-2">🎓</span>
            Welcome to Your Study Squad
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent leading-tight">
            Learn Together,<br />Succeed Together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your one-stop hub for study materials, updates, memes, and everything we need to ace our college journey together!
          </p>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className={`${stat.bgColor} border-0 hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exam Countdown - Featured */}
        <div className="mb-12">
          <ExamCountdown />
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="materials" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-1 rounded-2xl">
              <TabsTrigger value="materials" className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Materials</span>
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Updates</span>
              </TabsTrigger>
              <TabsTrigger value="memes" className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
                <span className="text-lg">😂</span>
                <span className="hidden sm:inline">Memes</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Leaders</span>
              </TabsTrigger>
              <TabsTrigger value="todo" className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Feedback</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="animate-fade-in">
            <TabsContent value="materials" className="space-y-6">
              <StudyMaterials />
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <Updates />
            </TabsContent>

            <TabsContent value="memes" className="space-y-6">
              <MemeWeek />
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Leaderboard />
            </TabsContent>

            <TabsContent value="todo" className="space-y-6">
              <TodoList />
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <FeedbackBox />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
                📚
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Study Hub Squad</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Made with ❤️ for our awesome study squad! Keep learning, keep growing! 🚀
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>🎯 Focus • 📈 Growth • 🤝 Community</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
