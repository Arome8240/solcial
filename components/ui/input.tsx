import { cn } from '@/lib/utils';
import * as React from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, error, secureTextEntry, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const isPassword = secureTextEntry === true;

    return (
      <View className="gap-2">
        {label && <Text className="text-sm font-medium text-gray-900">{label}</Text>}
        <View className="relative">
          <TextInput
            ref={ref}
            className={cn(
              'h-14 rounded-xl bg-white px-4 text-base text-gray-900 border-2',
              isFocused ? 'border-purple-600' : 'border-transparent',
              error && 'border-red-500',
              isPassword && 'pr-12',
              className
            )}
            placeholderTextColor="#9ca3af"
            secureTextEntry={isPassword && !isPasswordVisible}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {isPassword && (
            <Pressable
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-0 h-14 justify-center"
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color="#9ca3af" />
              ) : (
                <Eye size={20} color="#9ca3af" />
              )}
            </Pressable>
          )}
        </View>
        {error && <Text className="text-sm text-red-500">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
