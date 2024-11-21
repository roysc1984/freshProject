import React, { FC, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Animated,
} from 'react-native';

const FADE_IN_ANIMATION_DURATION = 100;
const FADE_OUT_ANIMATION_DURATION = 200;

interface PressableOpacityProps extends PressableProps {
  children: React.ReactNode;
}

const PressableOpacity: FC<PressableOpacityProps> = ({
  children,
  onPress,
  ...props
}) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_IN_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_OUT_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onPressPressable = (event: GestureResponderEvent) => {
    onPress?.(event);
  };

  return (
    <Pressable
      onPress={onPressPressable}
      onPressIn={fadeOut}
      onPressOut={fadeIn}
      {...props}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PressableOpacity;
