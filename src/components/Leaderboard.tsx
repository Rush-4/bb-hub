
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Leaderboard = () => {
  const leaderboard = [
    {
      rank: 1,
      name: 'Sarah M.',
      points: 245,
      uploads: 12,
      posts: 8,
      votes: 25,
      badge: 'Study Master'
    },
    {
      rank: 2,
      name: 'Mike J.',
      points: 198,
      uploads: 9,
      posts: 12,
      votes: 18,
      badge: 'Content King'
    },
    {
      rank: 3,
      name: 'Emma L.',
      points: 175,
      uploads: 7,
      posts: 15,
      votes: 20,
      badge: 'Update Queen'
    },
    {
      rank: 4,
      name: 'Alex K.',
      points: 156,
      uploads: 8,
      posts: 6,
      votes: 22,
      badge: 'Helper'
    },
    {
      rank: 5,
      name: 'Jake M.',
      points: 142,
      uploads: 5,
      posts: 4,
      votes: 35,
      badge: 'Meme Lord'
    },
    {
      rank: 6,
      name: 'Lily C.',
      points: 128,
      uploads: 6,
      posts: 9,
      votes: 12,
      badge: 'Rising Star'
    }
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-600 to-amber-800';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Study Master': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'Content King': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Update Queen': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300';
      case 'Meme Lord': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Helper': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div>Top Contributors</div>
            <p className="text-sm font-normal text-gray-600 dark:text-gray-300 mt-2">
              Points are earned by uploading materials (20pts), posting updates (15pts), and receiving votes (5pts)
            </p>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Podium (Top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {leaderboard.slice(0, 3).map((person) => (
          <Card 
            key={person.rank} 
            className={`bg-gradient-to-br ${getRankColor(person.rank)} text-white transform hover:scale-105 transition-transform`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">{getRankEmoji(person.rank)}</div>
              <div className="text-xl font-bold mb-1">{person.name}</div>
              <div className="text-2xl font-bold mb-2">{person.points} pts</div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {person.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((person) => (
              <div 
                key={person.rank} 
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getRankEmoji(person.rank)}</div>
                  <div>
                    <div className="font-semibold">{person.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      📚 {person.uploads} uploads • 📢 {person.posts} posts • ❤️ {person.votes} votes
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{person.points} pts</div>
                  <Badge className={getBadgeColor(person.badge)}>
                    {person.badge}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
