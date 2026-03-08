import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image, TextInput, Modal } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Heart, MessageCircle, Share, User, Coins, DollarSign, Send } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { usePost, usePosts } from '@/hooks/usePosts';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import type { Comment, Post } from '@/types';
import { toast } from 'sonner-native';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: postData, isLoading } = usePost(id || '');
  const post = postData as Post | undefined;
  const { user } = useAuth();
  const { comments, isLoading: isLoadingComments, createComment, isCreatingComment } = useComments(id || '');
  const { buyToken, isBuyingToken, likePost, unlikePost, tipPost, isTippingPost } = usePosts();
  const [commentText, setCommentText] = useState('');
  const [showTipModal, setShowTipModal] = useState(false);
  const [showBuyTokenModal, setShowBuyTokenModal] = useState(false);
  const [tipAmount, setTipAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  const handleBuyToken = () => {
    if (!buyAmount || !post) return;
    const amount = parseInt(buyAmount);
    if (amount <= 0) {
      toast.error('Invalid amount');
      return;
    }
    buyToken({ postId: post.id, amount });
    setShowBuyTokenModal(false);
    setBuyAmount('');
  };

  const handleLike = () => {
    if (!post) return;
    if (post.isLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleTip = () => {
    if (!tipAmount || !post) return;
    const amount = parseFloat(tipAmount);
    if (amount <= 0) {
      toast.error('Invalid amount');
      return;
    }
    tipPost({ postId: post.id, amount });
    setShowTipModal(false);
    setTipAmount('');
  };

  const formatTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return '';
    }
  };

  const handleCreateComment = () => {
    if (!commentText.trim()) return;
    createComment({ content: commentText });
    setCommentText('');
  };

  const navigateToProfile = (username: string) => {
    router.push(`/(tabs)/profile?username=${username}`);
  };

  const handleShare = () => {
    toast.success('Share functionality coming soon!');
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  if (!post) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">Post not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 rounded-xl bg-purple-600 px-6 py-3">
          <Text className="font-semibold text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border bg-card px-4 pb-4 pt-12">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon as={ArrowLeft} size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Post</Text>
        <TouchableOpacity onPress={handleShare}>
          <Icon as={Share} size={24} className="text-foreground" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Post Content */}
        <View className="border-b border-border bg-card p-4">
          {/* Author Info */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => navigateToProfile(post.author.username)}>
              {post.author.avatar ? (
                <Image source={{ uri: post.author.avatar }} className="h-12 w-12 rounded-full" />
              ) : (
                <View className="h-12 w-12 items-center justify-center rounded-full bg-purple-200">
                  <Icon as={User} size={24} className="text-purple-600" />
                </View>
              )}
            </TouchableOpacity>
            <View className="flex-1">
              <TouchableOpacity onPress={() => navigateToProfile(post.author.username)}>
                <Text className="font-bold">{post.author.name || post.author.username}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToProfile(post.author.username)}>
                <Text className="text-sm text-muted-foreground">@{post.author.username}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Post Text */}
          <Text className="mt-4 text-lg">{post.content}</Text>

          {/* Token Badge */}
          {post.isTokenized && (
            <View className="mt-3 flex-row items-center gap-2 self-start rounded-full bg-purple-100 px-3 py-1.5">
              <Icon as={Coins} size={16} className="text-purple-600" />
              <Text className="text-sm font-medium text-purple-600">
                {post.tokenSupply} tokens @ {post.tokenPrice} SOL
              </Text>
              <Text className="text-xs text-purple-500">• {post.tokenHolders} holders</Text>
            </View>
          )}

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <View className={`mt-4 gap-2 ${post.images.length === 1 ? '' : 'flex-row flex-wrap'}`}>
              {post.images.map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img }}
                  className={`rounded-xl ${
                    post.images.length === 1 
                      ? 'h-80 w-full' 
                      : 'h-40 w-[48%]'
                  }`}
                  resizeMode="cover"
                />
              ))}
            </View>
          )}

          {/* Timestamp */}
          <Text className="mt-4 text-sm text-muted-foreground">
            {formatTime(post.createdAt)}
          </Text>

          {/* Stats */}
          <View className="mt-4 flex-row gap-6 border-t border-border pt-4">
            <View>
              <Text className="text-xl font-bold">{post.likesCount}</Text>
              <Text className="text-sm text-muted-foreground">Likes</Text>
            </View>
            <View>
              <Text className="text-xl font-bold">{post.commentsCount}</Text>
              <Text className="text-sm text-muted-foreground">Comments</Text>
            </View>
            <View>
              <Text className="text-xl font-bold">{post.tipsCount || 0}</Text>
              <Text className="text-sm text-muted-foreground">Tips</Text>
            </View>
            {post.isTokenized && (
              <View>
                <Text className="text-xl font-bold">{post.tokenHolders}</Text>
                <Text className="text-sm text-muted-foreground">Holders</Text>
              </View>
            )}
          </View>

          {/* Tips Display */}
          {post.totalTipsAmount > 0 && (
            <View className="mt-3 rounded-lg bg-green-50 p-3">
              <Text className="text-sm text-green-700">
                💰 Received {post.totalTipsAmount.toFixed(4)} SOL in tips
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View className="mt-4 flex-row gap-3 border-t border-border pt-4">
            <TouchableOpacity 
              onPress={handleLike}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-border py-3"
            >
              <Icon as={Heart} size={20} className={post.isLiked ? "text-red-600" : "text-foreground"} />
              <Text className="font-semibold">{post.isLiked ? 'Liked' : 'Like'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setShowTipModal(true)}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-green-600 py-3"
            >
              <Icon as={DollarSign} size={20} className="text-white" />
              <Text className="font-semibold text-white">Tip</Text>
            </TouchableOpacity>
            
            {post.isTokenized && (
              <TouchableOpacity 
                onPress={() => setShowBuyTokenModal(true)}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-purple-600 py-3"
              >
                <Icon as={Coins} size={20} className="text-white" />
                <Text className="font-semibold text-white">Buy</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Comments Section */}
        <View className="mt-2 bg-card">
          <View className="border-b border-border px-4 py-3">
            <Text className="font-bold">Comments ({post.commentsCount})</Text>
          </View>

          {/* Add Comment */}
          <View className="flex-row items-center gap-3 border-b border-border p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-200">
              <Icon as={User} size={20} className="text-purple-600" />
            </View>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-base text-foreground"
            />
            <TouchableOpacity
              onPress={handleCreateComment}
              disabled={!commentText.trim() || isCreatingComment}
              className={`rounded-full p-2 ${commentText.trim() ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <Icon as={Send} size={18} className="text-white" />
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          {isLoadingComments ? (
            <View className="items-center py-8">
              <ActivityIndicator size="small" color="#9333ea" />
            </View>
          ) : comments.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-muted-foreground">No comments yet</Text>
              <Text className="mt-1 text-sm text-muted-foreground">Be the first to comment!</Text>
            </View>
          ) : (
            (comments as Comment[]).map((comment: Comment) => (
              <View key={comment.id} className="border-b border-border p-4">
                <View className="flex-row gap-3">
                  <TouchableOpacity onPress={() => navigateToProfile(comment.author.username)}>
                    {comment.author.avatar ? (
                      <Image source={{ uri: comment.author.avatar }} className="h-8 w-8 rounded-full" />
                    ) : (
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-purple-200">
                        <Icon as={User} size={16} className="text-purple-600" />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <TouchableOpacity onPress={() => navigateToProfile(comment.author.username)}>
                        <Text className="font-semibold">{comment.author.name || comment.author.username}</Text>
                      </TouchableOpacity>
                      <Text className="text-sm text-muted-foreground">
                        {formatTime(comment.createdAt)}
                      </Text>
                    </View>
                    <Text className="mt-1">{comment.content}</Text>
                    {comment.repliesCount > 0 && (
                      <TouchableOpacity className="mt-2">
                        <Text className="text-sm text-purple-600">
                          View {comment.repliesCount} {comment.repliesCount === 1 ? 'reply' : 'replies'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Tip Modal */}
      <Modal
        visible={showTipModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTipModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 p-4">
          <View className="w-full max-w-sm rounded-2xl bg-background p-6">
            <Text className="text-xl font-bold">Tip Post</Text>
            <Text className="mt-2 text-sm text-muted-foreground">
              Send SOL to @{post.author.username}
            </Text>
            
            <View className="mt-4">
              <Text className="mb-2 text-sm font-medium">Amount (SOL)</Text>
              <TextInput
                value={tipAmount}
                onChangeText={setTipAmount}
                placeholder="0.1"
                keyboardType="decimal-pad"
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
              />
            </View>

            <View className="mt-6 flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowTipModal(false)}
                className="flex-1 rounded-xl border border-border py-3"
              >
                <Text className="text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTip}
                disabled={isTippingPost}
                className="flex-1 rounded-xl bg-green-600 py-3"
              >
                <Text className="text-center font-semibold text-white">
                  {isTippingPost ? 'Sending...' : 'Send Tip'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Buy Token Modal */}
      <Modal
        visible={showBuyTokenModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBuyTokenModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 p-4">
          <View className="w-full max-w-sm rounded-2xl bg-background p-6">
            <Text className="text-xl font-bold">Buy Post Tokens</Text>
            <Text className="mt-2 text-sm text-muted-foreground">
              Price: {post.tokenPrice} SOL per token
            </Text>
            
            <View className="mt-4">
              <Text className="mb-2 text-sm font-medium">Number of Tokens</Text>
              <TextInput
                value={buyAmount}
                onChangeText={setBuyAmount}
                placeholder="10"
                keyboardType="numeric"
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
              />
              {buyAmount && (
                <Text className="mt-2 text-sm text-muted-foreground">
                  Total: {(parseInt(buyAmount) * post.tokenPrice).toFixed(4)} SOL
                </Text>
              )}
            </View>

            <View className="mt-6 flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowBuyTokenModal(false)}
                className="flex-1 rounded-xl border border-border py-3"
              >
                <Text className="text-center font-semibold">Cancel</Text> 
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBuyToken}
                disabled={isBuyingToken}
                className="flex-1 rounded-xl bg-purple-600 py-3"
              >
                <Text className="text-center font-semibold text-white">
                  {isBuyingToken ? 'Buying...' : 'Buy Tokens'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
