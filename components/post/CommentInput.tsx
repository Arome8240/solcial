import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { toast } from 'sonner-native';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
  placeholder?: string;
}

export function CommentInput({
  onSubmit,
  isSubmitting,
  placeholder = 'Add a comment...',
}: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    onSubmit(content.trim());
    setContent('');
  };

  return (
    <View className="border-t border-border bg-background p-4">
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        multiline
        maxLength={500}
        className="mb-3 min-h-[80px] rounded-lg border border-border bg-card px-4 py-3 text-foreground"
        style={{ textAlignVertical: 'top' }}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!content.trim() || isSubmitting}
        className={`rounded-xl py-3 ${
          content.trim() && !isSubmitting ? 'bg-purple-600' : 'bg-gray-300'
        }`}
      >
        <Text className="text-center font-semibold text-white">
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
