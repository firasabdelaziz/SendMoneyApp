import { useMemo, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardHandling = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const showSubscription = useMemo(() => {
    return Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
  }, []);

  const hideSubscription = useMemo(() => {
    return Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
  }, []);

  useMemo(() => {
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [showSubscription, hideSubscription]);

  return keyboardStatus;
};

export default useKeyboardHandling;