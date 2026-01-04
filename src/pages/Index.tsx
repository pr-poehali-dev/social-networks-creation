import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/VideoPlayer';
import AudioPlayer from '@/components/AudioPlayer';

interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  video?: string;
  audio?: {
    url: string;
    title: string;
    artist: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked?: boolean;
}

interface Message {
  id: number;
  sender: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  preview: string;
  timestamp: string;
  unread: boolean;
}

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Анна Смирнова',
        username: '@annasm',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
        verified: true
      },
      content: 'Новый день — новые возможности! Сегодня запускаю свой проект, о котором так долго мечтала. Путь к мечте начинается с первого шага 🚀',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      likes: 1247,
      comments: 89,
      shares: 34,
      timestamp: '2 часа назад',
      liked: false
    },
    {
      id: 2,
      author: {
        name: 'Дмитрий Новиков',
        username: '@dmitrynov',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
        verified: true
      },
      content: 'Кто еще работает в субботу? ☕ Делюсь своим рабочим пространством и любимым местом для креатива',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      likes: 892,
      comments: 45,
      shares: 12,
      timestamp: '4 часа назад',
      liked: true
    },
    {
      id: 3,
      author: {
        name: 'Елена Волкова',
        username: '@elenavolk',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        verified: false
      },
      content: 'Всем привет! Ищу дизайнера для нового стартапа. Если вы талантливы и любите вызовы — пишите в личные сообщения! 💼',
      likes: 456,
      comments: 67,
      shares: 23,
      timestamp: '6 часов назад',
      liked: false
    },
    {
      id: 4,
      author: {
        name: 'Максим Соловьев',
        username: '@maxsol',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxim',
        verified: true
      },
      content: 'Делюсь своим новым треком! Работал над ним последние два месяца. Надеюсь, вам понравится 🎵',
      audio: {
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        title: 'Summer Vibes',
        artist: 'Максим Соловьев'
      },
      likes: 2341,
      comments: 156,
      shares: 89,
      timestamp: '8 часов назад',
      liked: false
    },
    {
      id: 5,
      author: {
        name: 'Ирина Белова',
        username: '@irinabelova',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Irina',
        verified: true
      },
      content: 'Мой новый влог из путешествия по Байкалу! Невероятные пейзажи и эмоции 🏔️',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      likes: 3567,
      comments: 234,
      shares: 145,
      timestamp: '1 день назад',
      liked: true
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: {
        name: 'Мария Петрова',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        verified: true
      },
      preview: 'Привет! Смотрела твой проект, очень круто получилось...',
      timestamp: '10 мин',
      unread: true
    },
    {
      id: 2,
      sender: {
        name: 'Александр Иванов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        verified: false
      },
      preview: 'Спасибо за подписку! Давай сотрудничать',
      timestamp: '1 час',
      unread: true
    },
    {
      id: 3,
      sender: {
        name: 'Ольга Соколова',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',
        verified: true
      },
      preview: 'Отправила тебе файлы по проекту',
      timestamp: '3 часа',
      unread: false
    }
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Игорь Козлов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Igor',
        verified: true
      },
      content: 'оценил ваш пост',
      timestamp: '5 мин',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Светлана Белова',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Svetlana',
        verified: false
      },
      content: 'прокомментировал: "Отличная работа!"',
      timestamp: '15 мин',
      read: false
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Андрей Морозов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrey',
        verified: true
      },
      content: 'подписался на вас',
      timestamp: '1 час',
      read: true
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const currentUser = {
    name: 'Вы',
    username: '@yourname',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    verified: true,
    followers: 2847,
    following: 392,
    posts: 156
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-purple-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Social
              </h1>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск пользователей и контента..." 
                  className="pl-10 bg-white/50 border-purple-200 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-purple-100">
                <Icon name="Bell" size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </Button>
              <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>Вы</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex gap-6 p-6">
          <aside className="w-72 shrink-0">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg sticky top-24 animate-fade-in">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>Вы</AvatarFallback>
                  </Avatar>
                  {currentUser.verified && (
                    <div className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center ring-4 ring-white">
                      <Icon name="BadgeCheck" size={16} className="text-white" />
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-bold">{currentUser.name}</h3>
                <p className="text-sm text-muted-foreground">{currentUser.username}</p>

                <div className="flex gap-6 mt-6 w-full justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{currentUser.posts}</p>
                    <p className="text-xs text-muted-foreground">Постов</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{currentUser.followers}</p>
                    <p className="text-xs text-muted-foreground">Подписчиков</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{currentUser.following}</p>
                    <p className="text-xs text-muted-foreground">Подписок</p>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity">
                  Редактировать профиль
                </Button>
              </div>
            </Card>
          </aside>

          <main className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm border border-purple-100 shadow-md">
                <TabsTrigger value="feed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                  <Icon name="Home" size={18} className="mr-2" />
                  Лента
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Сообщения
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                  <Icon name="Bell" size={18} className="mr-2" />
                  Уведомления
                </TabsTrigger>
                <TabsTrigger value="explore" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                  <Icon name="Compass" size={18} className="mr-2" />
                  Рекомендации
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4">
                {posts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="p-6 bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-primary/10">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.author.name}</h4>
                          {post.author.verified && (
                            <div className="w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                              <Icon name="BadgeCheck" size={12} className="text-white" />
                            </div>
                          )}
                          <span className="text-sm text-muted-foreground">{post.author.username}</span>
                          <span className="text-sm text-muted-foreground">·</span>
                          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                        </div>

                        <p className="mt-3 text-foreground leading-relaxed">{post.content}</p>

                        {post.image && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-purple-100">
                            <img 
                              src={post.image} 
                              alt="Post content" 
                              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {post.video && (
                          <div className="mt-4">
                            <VideoPlayer src={post.video} />
                          </div>
                        )}

                        {post.audio && (
                          <div className="mt-4">
                            <AudioPlayer 
                              src={post.audio.url} 
                              title={post.audio.title} 
                              artist={post.audio.artist}
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-purple-100">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`gap-2 hover:bg-pink-50 ${post.liked ? 'text-pink-500' : ''}`}
                            onClick={() => handleLike(post.id)}
                          >
                            <Icon name="Heart" size={18} className={post.liked ? 'fill-pink-500' : ''} />
                            <span className="font-medium">{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 hover:bg-blue-50">
                            <Icon name="MessageCircle" size={18} />
                            <span className="font-medium">{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 hover:bg-purple-50">
                            <Icon name="Share2" size={18} />
                            <span className="font-medium">{post.shares}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="ml-auto hover:bg-purple-50">
                            <Icon name="Bookmark" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="messages">
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg">
                  <ScrollArea className="h-[600px]">
                    {messages.map((message, index) => (
                      <div key={message.id}>
                        <div 
                          className={`flex items-start gap-4 p-4 hover:bg-purple-50/50 cursor-pointer transition-colors animate-fade-in ${message.unread ? 'bg-purple-50/30' : ''}`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={message.sender.avatar} />
                              <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                            </Avatar>
                            {message.unread && (
                              <span className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-full ring-2 ring-white"></span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold truncate">{message.sender.name}</h4>
                              {message.sender.verified && (
                                <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shrink-0">
                                  <Icon name="BadgeCheck" size={10} className="text-white" />
                                </div>
                              )}
                              <span className="text-sm text-muted-foreground ml-auto">{message.timestamp}</span>
                            </div>
                            <p className={`text-sm mt-1 truncate ${message.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                              {message.preview}
                            </p>
                          </div>
                        </div>
                        {index < messages.length - 1 && <Separator />}
                      </div>
                    ))}
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg">
                  <ScrollArea className="h-[600px]">
                    {notifications.map((notification, index) => (
                      <div key={notification.id}>
                        <div 
                          className={`flex items-start gap-4 p-4 hover:bg-purple-50/50 transition-colors animate-fade-in ${!notification.read ? 'bg-purple-50/30' : ''}`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{notification.user.name}</h4>
                              {notification.user.verified && (
                                <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                  <Icon name="BadgeCheck" size={10} className="text-white" />
                                </div>
                              )}
                              <span className="text-sm text-muted-foreground">{notification.content}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.timestamp}</p>
                          </div>

                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.type === 'like' ? 'bg-pink-100' :
                            notification.type === 'comment' ? 'bg-blue-100' :
                            'bg-purple-100'
                          }`}>
                            <Icon 
                              name={
                                notification.type === 'like' ? 'Heart' :
                                notification.type === 'comment' ? 'MessageCircle' :
                                'UserPlus'
                              } 
                              size={16} 
                              className={
                                notification.type === 'like' ? 'text-pink-500' :
                                notification.type === 'comment' ? 'text-blue-500' :
                                'text-purple-500'
                              }
                            />
                          </div>
                        </div>
                        {index < notifications.length - 1 && <Separator />}
                      </div>
                    ))}
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="explore" className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} className="text-primary" />
                    Популярное сегодня
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <Card 
                        key={item} 
                        className="p-4 bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all cursor-pointer group animate-scale-in"
                        style={{ animationDelay: `${index * 0.08}s` }}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-3">
                          <img 
                            src={`https://images.unsplash.com/photo-${1550000000000 + item * 1000000}?w=400&h=400&fit=crop`}
                            alt={`Trending ${item}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Heart" size={14} className="text-pink-500" />
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 5000) + 1000}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Users" size={24} className="text-secondary" />
                    Рекомендуемые пользователи
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Татьяна Морозова', username: '@tanyamoroz', verified: true },
                      { name: 'Максим Попов', username: '@maxpopov', verified: true },
                      { name: 'Юлия Федорова', username: '@juliafed', verified: false },
                      { name: 'Сергей Кузнецов', username: '@sergeyk', verified: true }
                    ].map((user, index) => (
                      <Card 
                        key={user.username} 
                        className="p-4 bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-14 h-14">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            {user.verified && (
                              <div className="absolute bottom-0 right-0 w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center ring-2 ring-white">
                                <Icon name="BadgeCheck" size={10} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{user.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">{user.username}</p>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shrink-0">
                            Подписаться
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>

          <aside className="w-80 shrink-0">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-100 shadow-lg sticky top-24 animate-fade-in">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Flame" size={20} className="text-orange-500" />
                Актуальные темы
              </h3>
              <div className="space-y-4">
                {[
                  { tag: '#НовыйПроект', posts: '12.5k постов' },
                  { tag: '#ТехноТренды', posts: '8.3k постов' },
                  { tag: '#Креатив', posts: '6.1k постов' },
                  { tag: '#Стартапы', posts: '4.7k постов' }
                ].map((topic, index) => (
                  <div 
                    key={topic.tag} 
                    className="p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <Badge variant="secondary" className="mb-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-0">
                      Trending
                    </Badge>
                    <h4 className="font-semibold text-primary">{topic.tag}</h4>
                    <p className="text-sm text-muted-foreground">{topic.posts}</p>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}