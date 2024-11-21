import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { PURPLE_COLOR, WHITE_COLOR } from 'theme/themeStyles';
import PressableOpacity from './PressableOpacity';

interface ActionButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
const ActionButton: FC<ActionButtonProps> = ({
  text,
  onPress,
  style,
  disabled,
}) => (
  <PressableOpacity
    disabled={disabled}
    style={[styles.button, style]}
    onPress={onPress}
  >
    <Text allowFontScaling={false} style={[styles.text]}>
      {text}
    </Text>
  </PressableOpacity>
);

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: PURPLE_COLOR,
    width: 148,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Helvetica',
    color: WHITE_COLOR,
    fontWeight: 'bold',
  },
});
