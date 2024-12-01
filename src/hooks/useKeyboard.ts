import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';


/**
 * Custom hook to track keyboard visibility and provide utility to dismiss the keyboard.
 * 
 * @returns {Object} An object containing:
 *  - `keyboardVisible`: A boolean indicating whether the keyboard is visible.
 *  - `dismissKeyboard`: A function to dismiss the keyboard.
 */
export const useKeyboard = () => {

  // State to track if the keyboard is visible
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {

    /**
     * Event listener to detect when the keyboard is shown and update the state.
     */
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );

    /**
     * Event listener to detect when the keyboard is hidden and update the state.
     */
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    // Cleanup function to remove listeners when the component using this hook unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };

  }, []);


  /**
   * Utility function to programmatically dismiss the keyboard.
   */
  const dismissKeyboard = () => Keyboard.dismiss();

  return {
    keyboardVisible,
    dismissKeyboard
  };
};