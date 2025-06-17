
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ExamCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 14,
    minutes: 32,
    seconds: 45
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const upcomingExams = [
    { name: 'Physics Midterm', date: '2024-06-24', subject: 'Physics' },
    { name: 'Calculus Final', date: '2024-06-28', subject: 'Mathematics' },
    { name: 'Chemistry Lab Exam', date: '2024-07-02', subject: 'Chemistry' }
  ];

  const handleAddExam = () => {
    if (examName && examDate) {
      console.log('Adding exam:', { examName, examDate });
      setExamName('');
      setExamDate('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Main Countdown */}
      <Card className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-700">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div>Next Exam: Physics Midterm</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{timeLeft.days}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Days</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{timeLeft.hours}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Hours</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Minutes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Seconds</div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-300">
              You've got this! 💪 Time to hit those books!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span>📅</span>
              <span>Upcoming Exams</span>
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
              variant="outline"
            >
              Add Exam
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="space-y-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <Label htmlFor="examName">Exam Name</Label>
                <Input
                  id="examName"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g., Biology Final"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="examDate">Exam Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddExam} size="sm" className="flex-1">
                  Add
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-semibold">{exam.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{exam.subject}</div>
                </div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {exam.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamCountdown;
