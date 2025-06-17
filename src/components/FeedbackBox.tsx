
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const FeedbackBox = () => {
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const feedbacks = [
    {
      id: 1,
      type: 'thanks',
      message: 'Thanks for sharing those awesome calculus notes, Sarah! They really helped me understand derivatives better. You\'re a lifesaver! 🙏',
      sender: 'Mike J.',
      date: '2024-06-16',
      time: '3:45 PM'
    },
    {
      id: 2,
      type: 'suggestion',
      message: 'What if we added a chat feature for quick questions? Sometimes I need help with homework and it would be cool to ask the group instantly.',
      sender: 'Emma L.',
      date: '2024-06-15',
      time: '11:20 AM'
    },
    {
      id: 3,
      type: 'thanks',
      message: 'Jake, your memes always make my day! Even during stressful exam weeks, you manage to make us all laugh. Keep them coming! 😂',
      sender: 'Lily C.',
      date: '2024-06-14',
      time: '8:30 PM'
    },
    {
      id: 4,
      type: 'suggestion',
      message: 'Could we organize virtual study rooms? Maybe we could have scheduled video calls for different subjects?',
      sender: 'Alex K.',
      date: '2024-06-13',
      time: '2:15 PM'
    }
  ];

  const handleSubmitFeedback = () => {
    if (feedbackName && feedbackMessage) {
      console.log('Submitting feedback:', { feedbackName, feedbackMessage, feedbackType });
      setFeedbackName('');
      setFeedbackMessage('');
      setShowFeedbackForm(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'thanks': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300';
      case 'suggestion': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'bug': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'thanks': return '💖';
      case 'suggestion': return '💡';
      case 'bug': return '🐛';
      default: return '💬';
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 border-0">
          <CardContent className="p-4">
            <div className="text-2xl">💖</div>
            <div className="text-lg font-bold text-pink-700 dark:text-pink-300">12</div>
            <div className="text-sm text-pink-600 dark:text-pink-400">Thank You's</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
          <CardContent className="p-4">
            <div className="text-2xl">💡</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">8</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Suggestions</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 border-0">
          <CardContent className="p-4">
            <div className="text-2xl">😊</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">98%</div>
            <div className="text-sm text-green-600 dark:text-green-400">Happiness</div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Feedback Section */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-dashed border-orange-300 dark:border-orange-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📝</span>
            <span>Leave Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showFeedbackForm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                onClick={() => {
                  setFeedbackType('thanks');
                  setShowFeedbackForm(true);
                }}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
              >
                💖 Say Thanks
              </Button>
              <Button 
                onClick={() => {
                  setFeedbackType('suggestion');
                  setShowFeedbackForm(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                💡 Suggest Idea
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getTypeEmoji(feedbackType)}</span>
                <Badge className={getTypeColor(feedbackType)}>
                  {feedbackType === 'thanks' ? 'Thank You' : 'Suggestion'}
                </Badge>
              </div>
              <div>
                <Label htmlFor="feedbackName">Your Name</Label>
                <Input
                  id="feedbackName"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="feedbackMessage">Your Message</Label>
                <Textarea
                  id="feedbackMessage"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder={feedbackType === 'thanks' ? 'Share your appreciation...' : 'Share your idea...'}
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSubmitFeedback} className="flex-1">
                  Submit Feedback
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Community Feedback 💬</h3>
        {feedbacks.map((feedback) => (
          <Card key={feedback.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getTypeEmoji(feedback.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getTypeColor(feedback.type)}>
                      {feedback.type === 'thanks' ? 'Thank You' : 'Suggestion'}
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    {feedback.message}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>👤 {feedback.sender}</span>
                    <span>📅 {feedback.date}</span>
                    <span>🕐 {feedback.time}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackBox;
