import { View, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Search as SearchIcon, User, FileText, Coins, TrendingUp } from 'lucide-react-native';
import { useState } from 'react';
import { api } from '@/lib/api';
import { router } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';

interface SearchUser {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

interface SearchPost {
  id: string;
  content: string;
  author: {
    username: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likesCount: number;
  commentsCount: number;
}

interface SearchToken {
  id: string;
  content: string;
  author: {
    username: string;
    name: string;
    avatar?: string;
  };
  tokenPrice: number;
  tokenSupply: number;
  tokensSold: number;
  createdAt: string;
}

type TabType = 'users' | 'posts' | 'tokens';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [isSearching, setIsSearching] = useState(false);
  
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [tokens, setTokens] = useState<SearchToken[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setUsers([]);
      setPosts([]);
      setTokens([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Search all categories in parallel
      const [usersRes, postsRes, tokensRes] = await Promise.all([
        api.searchUsers(query),
        api.searchPosts(query),
        api.searchTokens(query),
      ]);

      console.log('Search responses:', {
        users: usersRes,
        posts: postsRes,
        tokens: tokensRes,
      });

      // Handle users response
      if (usersRes.data && Array.isArray(usersRes.data)) {
        setUsers(usersRes.data as SearchUser[]);
      } else if (Array.isArray(usersRes)) {
        setUsers(usersRes as SearchUser[]);
      } else {
        setUsers([]);
      }
      
      // Handle posts response
      if (postsRes.data && Array.isArray(postsRes.data)) {
        setPosts(postsRes.data as SearchPost[]);
      } else if (Array.isArray(postsRes)) {
        setPosts(postsRes as SearchPost[]);
      } else {
        setPosts([]);
      }
      
      // Handle tokens response
      if (tokensRes.data && Array.isArray(tokensRes.data)) {
        setTokens(tokensRes.data as SearchToken[]);
      } else if (Array.isArray(tokensRes)) {
        setTokens(tokensRes as SearchToken[]);
      } else {
        setTokens([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setUsers([]);
      setPosts([]);
      setTokens([]);
    } finally {
      setIsSearching(false);
    }
  };

  const formatTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return '';
    }
  };

  const renderUsers = () => {
    if (isSearching) {
      return (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#9333ea" />
        </View>
      );
    }

    if (users.length === 0 && searchQuery.length >= 2) {
      return (
        <View className="items-center py-20">
          <Icon as={User} size={48} className="text-muted-foreground mb-4" />
          <Text className="text-muted-foreground">No users found</Text>
        </View>
      );
    }

    return users.map((user) => (
      <TouchableOpacity
        key={user.id}
        onPress={() => router.push(`/(tabs)/profile?username=${user.username}`)}
        className="flex-row items-center gap-3 border-b border-border py-4"
      >
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} className="h-12 w-12 rounded-full" />
        ) : (
          <View className="h-12 w-12 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-900">
            <Icon as={User} size={20} className="text-purple-600 dark:text-purple-300" />
          </View>
        )}
        <View className="flex-1">
          <Text className="font-semibold">{user.name || user.username}</Text>
          <Text className="text-sm text-muted-foreground">@{user.username}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderPosts = () => {
    if (isSearching) {
      return (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#9333ea" />
        </View>
      );
    }

    if (posts.length === 0 && searchQuery.length >= 2) {
      return (
        <View className="items-center py-20">
          <Icon as={FileText} size={48} className="text-muted-foreground mb-4" />
          <Text className="text-muted-foreground">No posts found</Text>
        </View>
      );
    }

    return posts.map((post) => (
      <TouchableOpacity
        key={post.id}
        onPress={() => router.push(`/post/${post.id}`)}
        className="border-b border-border py-4"
      >
        <View className="flex-row items-start gap-3">
          {post.author.avatar ? (
            <Image source={{ uri: post.author.avatar }} className="h-10 w-10 rounded-full" />
          ) : (
            <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-900">
              <Text className="text-sm font-bold text-purple-600 dark:text-purple-300">
                {post.author.name?.charAt(0)?.toUpperCase() || post.author.username?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
          )}
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold">{post.author.name || post.author.username}</Text>
              <Text className="text-sm text-muted-foreground">@{post.author.username}</Text>
              <Text className="text-sm text-muted-foreground">· {formatTime(post.createdAt)}</Text>
            </View>
            <Text className="mt-1" numberOfLines={3}>{post.content}</Text>
            <View className="mt-2 flex-row gap-4">
              <Text className="text-sm text-muted-foreground">{post.likesCount} likes</Text>
              <Text className="text-sm text-muted-foreground">{post.commentsCount} comments</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderTokens = () => {
    if (isSearching) {
      return (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#9333ea" />
        </View>
      );
    }

    if (tokens.length === 0 && searchQuery.length >= 2) {
      return (
        <View className="items-center py-20">
          <Icon as={Coins} size={48} className="text-muted-foreground mb-4" />
          <Text className="text-muted-foreground">No tokens found</Text>
        </View>
      );
    }

    return tokens.map((token) => (
      <TouchableOpacity
        key={token.id}
        onPress={() => router.push(`/post/${token.id}`)}
        className="border-b border-border py-4"
      >
        <View className="flex-row items-start gap-3">
          {token.author.avatar ? (
            <Image source={{ uri: token.author.avatar }} className="h-10 w-10 rounded-full" />
          ) : (
            <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-900">
              <Text className="text-sm font-bold text-purple-600 dark:text-purple-300">
                {token.author.name?.charAt(0)?.toUpperCase() || token.author.username?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
          )}
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-semibold">{token.author.name || token.author.username}</Text>
              <View className="rounded-full bg-purple-100 px-2 py-0.5 dark:bg-purple-900">
                <Text className="text-xs font-semibold text-purple-600 dark:text-purple-300">TOKEN</Text>
              </View>
            </View>
            <Text className="mt-1" numberOfLines={2}>{token.content}</Text>
            <View className="mt-2 flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Icon as={Coins} size={14} className="text-purple-600" />
                <Text className="text-sm font-semibold text-purple-600">{token.tokenPrice} SOL</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Icon as={TrendingUp} size={14} className="text-muted-foreground" />
                <Text className="text-sm text-muted-foreground">
                  {token.tokensSold}/{token.tokenSupply} sold
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <Text className="text-3xl font-bold mb-4">Search</Text>
        
        {/* Search Input */}
        <View className="flex-row items-center gap-3 rounded-2xl border-2 border-border bg-background px-4 py-3">
          <Icon as={SearchIcon} size={20} className="text-muted-foreground" />
          <TextInput
            placeholder="Search users, posts, or tokens..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9ca3af"
            className="flex-1 text-base text-foreground"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-border px-4">
        <TouchableOpacity
          onPress={() => setActiveTab('users')}
          className={`flex-1 items-center py-3 ${activeTab === 'users' ? 'border-b-2 border-purple-600' : ''}`}
        >
          <Text className={`font-semibold ${activeTab === 'users' ? 'text-purple-600' : 'text-muted-foreground'}`}>
            Users {users.length > 0 && `(${users.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('posts')}
          className={`flex-1 items-center py-3 ${activeTab === 'posts' ? 'border-b-2 border-purple-600' : ''}`}
        >
          <Text className={`font-semibold ${activeTab === 'posts' ? 'text-purple-600' : 'text-muted-foreground'}`}>
            Posts {posts.length > 0 && `(${posts.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('tokens')}
          className={`flex-1 items-center py-3 ${activeTab === 'tokens' ? 'border-b-2 border-purple-600' : ''}`}
        >
          <Text className={`font-semibold ${activeTab === 'tokens' ? 'text-purple-600' : 'text-muted-foreground'}`}>
            Tokens {tokens.length > 0 && `(${tokens.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {searchQuery.length < 2 ? (
          <View className="items-center py-20">
            <Icon as={SearchIcon} size={48} className="text-muted-foreground mb-4" />
            <Text className="text-center text-muted-foreground">
              Search for users, posts, or tokens
            </Text>
            <Text className="mt-2 text-center text-sm text-muted-foreground">
              Enter at least 2 characters to start searching
            </Text>
          </View>
        ) : (
          <>
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'posts' && renderPosts()}
            {activeTab === 'tokens' && renderTokens()}
          </>
        )}
      </ScrollView>
    </View>
  );
}
