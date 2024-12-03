import { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';

// Define the type for the properties that the hook accepts
interface UseLottieAnimationProps {
  autoPlay?: boolean; // Whether the animation should start playing automatically
  delay?: number;     // Delay (in milliseconds) before starting the animation (if autoPlay is true)
  speed?: number;     // Speed of the animation playback
  loop?: boolean;     // Whether the animation should loop
}

/**
 * A custom React hook for managing Lottie animations.
 *
 * Provides utility functions to play, reset, and pause animations, as well as default settings.
 */
export const useLottieAnimation = ({
  autoPlay = false, // Default: Do not auto-play
  delay = 100,      // Default: 100ms delay before auto-playing
  speed = 0.7,      // Default: Animation speed is 70% of the original
  loop = false,     // Default: Do not loop the animation
}: UseLottieAnimationProps = {}) => {
  // Create a reference for the Lottie animation view
  const animationRef = useRef<LottieView>(null);

  /**
   * Starts playing the animation from the beginning.
   * Resets the animation before playing to ensure it starts fresh.
   */
  const playAnimation = () => {
    animationRef.current?.reset();
    animationRef.current?.play();
  };

  /**
   * Resets the animation to its initial state.
   */
  const resetAnimation = () => {
    animationRef.current?.reset();
  };

  /**
   * Pauses the currently playing animation.
   */
  const pauseAnimation = () => {
    animationRef.current?.pause();
  };

  /**
   * Automatically plays the animation with a delay, if `autoPlay` is enabled.
   */
  useEffect(() => {
    if (autoPlay) {
      // Small delay to ensure the animation starts after the component mounts
      const timer = setTimeout(() => {
        playAnimation();
      }, delay);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [autoPlay, delay]);

  /**
   * Provides the properties to be passed to the LottieView component.
   *
   * These properties include the reference to the animation view, playback settings like speed,
   * autoPlay, and loop, and other view-related configurations.
   */
  const getLottieProps = () => ({
    ref: animationRef,  // Reference to the Lottie animation view
    speed,              // Playback speed of the animation
    autoPlay,           // Whether the animation should play automatically
    loop,               // Whether the animation should loop
    resizeMode: 'cover' as const, // Resize mode for the animation view
  });

  // Return the utilities and the configuration function
  return {
    animationRef,  // Reference to the LottieView instance
    playAnimation, // Function to play the animation
    resetAnimation, // Function to reset the animation
    pauseAnimation, // Function to pause the animation
    getLottieProps, // Function to get props for LottieView
  };
};
