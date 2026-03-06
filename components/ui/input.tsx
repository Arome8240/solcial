import { cn } from '@/lib/utils';
import * as React from 'react';
import { TextInput, View, Text } from 'react-native';

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <View className="gap-2">
        {label && <Text className="text-sm font-medium text-gray-900">{label}</Text>}
        <TextInput
          ref={ref}
          className={cn(
            'h-14 rounded-xl bg-white px-4 text-base text-gray-900',
            error && 'border border-red-500',
            className
          )}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {error && <Text className="text-sm text-red-500">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
