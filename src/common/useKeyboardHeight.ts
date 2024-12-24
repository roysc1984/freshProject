import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

const useKeyboardHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const eventShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow,
    );
    const eventHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide,
    );
    return () => {
      eventShow.remove();
      eventHide.remove();
    };
  }, []);

  const keyboardWillShow = (event: KeyboardEvent) => {
    setHeight(event.endCoordinates.height);
  };

  const keyboardWillHide = () => {
    setHeight(0);
  };

  return {
    height,
  };
};

export default useKeyboardHeight;
