import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Shield, Upload, Calendar, Users, Trash, Edit, Plus, Settings, Lock } from 'lucide-react';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  isTrusted: boolean;
  contributions: number;
  joinDate: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

interface TimetableEntry {
  id: number;
  subject: string;
  time: string;
  room: string;
  day: string;
  instructor: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: 'Midterm Schedule Updated', content: 'Check the new exam dates', date: '2024-01-15', priority: 'high' },
    { id: 2, title: 'Library Extended Hours', content: 'Open until 11 PM during finals', date: '2024-01-14', priority: 'medium' }
  ]);
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 1, name: 'Sarah M.', email: 'sarah@email.com', isTrusted: true, contributions: 23, joinDate: '2024-01-10' },
    { id: 2, name: 'Mike J.', email: 'mike@email.com', isTrusted: false, contributions: 12, joinDate: '2024-01-12' },
    { id: 3, name: 'Alex K.', email: 'alex@email.com', isTrusted: true, contributions: 31, joinDate: '2024-01-08' }
  ]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([
    { id: 1, subject: 'Mathematics', time: '09:00 AM', room: 'Room 101', day: 'Monday', instructor: 'Dr. Smith' },
    { id: 2, subject: 'Physics', time: '11:00 AM', room: 'Lab 203', day: 'Monday', instructor: 'Prof. Johnson' },
    { id: 3, subject: 'Chemistry', time: '02:00 PM', room: 'Lab 105', day: 'Tuesday', instructor: 'Dr. Wilson' }
  ]);

  // Forms state
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'medium' as const });
  const [newTimetableEntry, setNewTimetableEntry] = useState({ subject: '', time: '', room: '', day: '', instructor: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const ADMIN_PIN = '2024'; // In production, this should be more secure

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin dashboard.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
    }
    setPinInput('');
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        id: announcements.length + 1,
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0]
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', priority: 'medium' });
      toast({
        title: "Announcement Added",
        description: "New announcement has been posted.",
      });
    }
  };

  const handleUpdateAnnouncement = () => {
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id ? editingAnnouncement : a
      ));
      setEditingAnnouncement(null);
      toast({
        title: "Announcement Updated",
        description: "Announcement has been successfully updated.",
      });
    }
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "Announcement has been removed.",
    });
  };

  const handleAddTimetableEntry = () => {
    if (newTimetableEntry.subject && newTimetableEntry.time && newTimetableEntry.day) {
      const entry: TimetableEntry = {
        id: timetable.length + 1,
        ...newTimetableEntry
      };
      setTimetable([...timetable, entry]);
      setNewTimetableEntry({ subject: '', time: '', room: '', day: '', instructor: '' });
      toast({
        title: "Timetable Updated",
        description: "New entry added to timetable.",
      });
    }
  };

  const handleDeleteTimetableEntry = (id: number) => {
    setTimetable(timetable.filter(t => t.id !== id));
    toast({
      title: "Entry Deleted",
      description: "Timetable entry has been removed.",
    });
  };

  const toggleTrustedStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isTrusted: !user.isTrusted } : user
    ));
    toast({
      title: "User Status Updated",
      description: "Trusted contributor status has been changed.",
    });
  };

  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: "User has been successfully removed from the system.",
      variant: "destructive",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
              Admin Access Required
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Enter the admin PIN to access the dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <Label htmlFor="pin">Admin PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Lock className="h-4 w-4 mr-2" />
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Study Hub Squad Management Panel</p>
              </div>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Users</p>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Announcements</p>
                  <p className="text-3xl font-bold">{announcements.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Timetable Entries</p>
                  <p className="text-3xl font-bold">{timetable.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Trusted Contributors</p>
                  <p className="text-3xl font-bold">{users.filter(u => u.isTrusted).length}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="materials">Study Materials</TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Create New Announcement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      placeholder="Announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                      placeholder="Announcement content"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value as any })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <Button onClick={handleAddAnnouncement} className="w-full">
                    Post Announcement
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{announcement.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{announcement.content}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant={announcement.priority === 'high' ? 'destructive' : announcement.priority === 'medium' ? 'default' : 'secondary'}>
                                {announcement.priority}
                              </Badge>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setEditingAnnouncement(announcement)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Announcement</DialogTitle>
                                </DialogHeader>
                                {editingAnnouncement && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Title</Label>
                                      <Input
                                        value={editingAnnouncement.title}
                                        onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label>Content</Label>
                                      <Textarea
                                        value={editingAnnouncement.content}
                                        onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                                        rows={3}
                                      />
                                    </div>
                                    <Button onClick={handleUpdateAnnouncement} className="w-full">
                                      Update Announcement
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAnnouncement(announcement.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timetable Tab */}
          <TabsContent value="timetable">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Timetable Entry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Subject</Label>
                      <Input
                        value={newTimetableEntry.subject}
                        onChange={(e) => setNewTimetableEntry({ ...newTimetableEntry, subject: e.target.value })}
                        placeholder="e.g., Mathematics"
                      />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        value={newTimetableEntry.time}
                        onChange={(e) => setNewTimetableEntry({ ...newTimetableEntry, time: e.target.value })}
                        placeholder="e.g., 09:00 AM"
                      />
                    </div>
                    <div>
                      <Label>Room</Label>
                      <Input
                        value={newTimetableEntry.room}
                        onChange={(e) => setNewTimetableEntry({ ...newTimetableEntry, room: e.target.value })}
                        placeholder="e.g., Room 101"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Day</Label>
                      <select
                        value={newTimetableEntry.day}
                        onChange={(e) => setNewTimetableEntry({ ...newTimetableEntry, day: e.target.value })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </select>
                    </div>
                    <div>
                      <Label>Instructor</Label>
                      <Input
                        value={newTimetableEntry.instructor}
                        onChange={(e) => setNewTimetableEntry({ ...newTimetableEntry, instructor: e.target.value })}
                        placeholder="e.g., Dr. Smith"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddTimetableEntry} className="w-full">
                    Add to Timetable
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Timetable</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Day</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timetable.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.subject}</TableCell>
                          <TableCell>{entry.day}</TableCell>
                          <TableCell>{entry.time}</TableCell>
                          <TableCell>{entry.room}</TableCell>
                          <TableCell>{entry.instructor}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteTimetableEntry(entry.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management & Trusted Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contributions</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Trusted Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.contributions}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={user.isTrusted}
                              onCheckedChange={() => toggleTrustedStatus(user.id)}
                            />
                            <Badge variant={user.isTrusted ? "default" : "secondary"}>
                              {user.isTrusted ? "Trusted" : "Regular"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRemoveUser(user.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Materials Tab */}
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Study Materials Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Material Management</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload new study materials, delete inappropriate content, and manage file access.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full mb-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Material
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Trash className="h-4 w-4 mr-2" />
                      Manage Existing Materials
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;