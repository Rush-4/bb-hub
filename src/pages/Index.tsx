
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Moon, 
  Sun, 
  BookOpen, 
  Users, 
  Trophy, 
  Calendar, 
  CheckSquare, 
  MessageCircle, 
  TrendingUp, 
  Bell,
  Plus,
  Download,
  Upload,
  Clock,
  Target
} from 'lucide-react';
import StudyMaterials from '@/components/StudyMaterials';
import Updates from '@/components/Updates';
import MemeWeek from '@/components/MemeWeek';
import Leaderboard from '@/components/Leaderboard';
import ExamCountdown from '@/components/ExamCountdown';
import TodoList from '@/components/TodoList';
import FeedbackBox from '@/components/FeedbackBox';
import ChatSystem from '@/components/ChatSystem';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const quickStats = [
    { icon: BookOpen, label: 'Study Materials', value: '0', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: TrendingUp, label: 'Recent Updates', value: '0', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Users, label: 'Active Members', value: '0', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Trophy, label: 'Memes Posted', value: '0', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target, description: 'Overview & Stats' },
    { id: 'materials', label: 'Study Materials', icon: BookOpen, description: 'Notes & Resources' },
    { id: 'updates', label: 'Updates', icon: Bell, description: 'Latest News' },
    { id: 'todo', label: 'My Tasks', icon: CheckSquare, description: 'To-Do List' },
    { id: 'memes', label: 'Meme Corner', icon: Trophy, description: 'Fun & Relaxation' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users, description: 'Community Rankings' },
    { id: 'chat', label: 'Group Chat', icon: MessageCircle, description: 'Discussion Hub' },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle, description: 'Share Your Thoughts' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'materials':
        return <StudyMaterials />;
      case 'updates':
        return <Updates />;
      case 'memes':
        return <MemeWeek />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'todo':
        return <TodoList />;
      case 'chat':
        return <ChatSystem />;
      case 'feedback':
        return <FeedbackBox />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300">
                <span className="mr-2">🎓</span>
                Welcome to Your Study Squad
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
                Learn Together, Succeed Together
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Your one-stop hub for study materials, updates, memes, and everything we need to ace our college journey together!
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className={`${stat.bgColor} border-0 hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Exam Countdown - Prominent */}
            <ExamCountdown />

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Upload className="h-5 w-5" />
                    Quick Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Share study materials with your squad instantly
                  </p>
                  <Button 
                    onClick={() => setActiveSection('materials')}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Material
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Bell className="h-5 w-5" />
                    Latest Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Stay informed about important announcements
                  </p>
                  <Button 
                    onClick={() => setActiveSection('updates')}
                    variant="outline"
                    className="w-full border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900/20"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Updates
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Preview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div>
                        <p className="font-medium text-sm">Calculus Notes</p>
                        <p className="text-xs text-gray-500">by Sarah M.</p>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div>
                        <p className="font-medium text-sm">Physics Lab Report</p>
                        <p className="text-xs text-gray-500">by Mike J.</p>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <Button 
                    variant="link" 
                    className="w-full mt-3 p-0" 
                    onClick={() => setActiveSection('materials')}
                  >
                    View All Materials →
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Squad Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-medium">Alex uploaded new notes</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        M
                      </div>
                      <div>
                        <p className="text-sm font-medium">Maria shared a meme</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="link" 
                    className="w-full mt-3 p-0" 
                    onClick={() => setActiveSection('chat')}
                  >
                    Join Discussion →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
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

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-16 min-h-screen bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 p-3">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 group relative ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                title={item.label}
              >
                <item.icon className="h-5 w-5" />
                
                {/* Tooltip on hover */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {navigationItems.find(item => item.id === activeSection)?.description || 'Overview of your study hub'}
              </p>
            </div>

            {/* Dynamic Content */}
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
