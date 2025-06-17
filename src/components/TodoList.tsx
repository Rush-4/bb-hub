
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const TodoList = () => {
  const [newTask, setNewTask] = useState('');
  const [taskCreator, setTaskCreator] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Submit group project proposal',
      creator: 'Emma L.',
      completed: false,
      priority: 'high',
      dueDate: '2024-06-20'
    },
    {
      id: 2,
      task: 'Review Chapter 12 for quiz',
      creator: 'Mike J.',
      completed: true,
      priority: 'medium',
      dueDate: '2024-06-18'
    },
    {
      id: 3,
      task: 'Print handouts for study group',
      creator: 'Sarah M.',
      completed: false,
      priority: 'low',
      dueDate: '2024-06-19'
    },
    {
      id: 4,
      task: 'Book library room for weekend session',
      creator: 'Alex K.',
      completed: false,
      priority: 'medium',
      dueDate: '2024-06-21'
    }
  ]);

  const handleAddTask = () => {
    if (newTask && taskCreator) {
      const task = {
        id: tasks.length + 1,
        task: newTask,
        creator: taskCreator,
        completed: false,
        priority: 'medium',
        dueDate: '2024-06-22'
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setTaskCreator('');
      setShowAddForm(false);
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Progress Overview</span>
            </div>
            <Badge className="bg-blue-500 text-white">
              {completedTasks}/{totalTasks} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium">
              {Math.round(completionPercentage)}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-dashed border-purple-300 dark:border-purple-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>➕</span>
            <span>Add New Task</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showAddForm ? (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Create Task
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskCreator">Your Name</Label>
                <Input
                  id="taskCreator"
                  value={taskCreator}
                  onChange={(e) => setTaskCreator(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="newTask">Task Description</Label>
                <Input
                  id="newTask"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="e.g., Prepare presentation slides"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddTask} className="flex-1">
                  Add Task
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Team Tasks ✅</h3>
        {tasks.map((task) => (
          <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-75' : 'hover:shadow-md'}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                        {task.task}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <span>👤 {task.creator}</span>
                        <span>📅 Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      {task.completed && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
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

export default TodoList;
