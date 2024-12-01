import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get the screen width and height from the device's dimensions
export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'window',
);

/**
 * Calculate the scaling factors for width and height based on a design baseline.
 * The baseline is a reference device with dimensions 375x667 (iPhone 8).
 * `wscale` and `hscale` are used to adapt sizes proportionally to different screen sizes.
 */
const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 667;

/**
 * Normalize a size value to ensure consistency across different screen sizes and resolutions.
 * This utility function adjusts sizes for width or height based on the screen dimensions
 * and pixel density.
 *
 * @param {number} size - The original size value (e.g., font size, padding, margin).
 * @param {'width' | 'height'} based - The dimension to base the scaling on ('width' or 'height').
 *                                      Defaults to 'width'.
 * @returns {number} - The scaled size adjusted for the current platform and screen resolution.
 */
export default function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
) {

  // Determine the new size based on the specified dimension (width or height)
  const newSize = based === 'height' ? size * hscale : size * wscale;

  // Adjust the size slightly for iOS and Android platforms
  if (Platform.OS === 'ios') {

    // On iOS, return the size rounded to the nearest pixel
    return Math.round(PixelRatio.roundToNearestPixel(newSize));

  } else {

    // On Android, reduce the size slightly (subtract 2 pixels) for better scaling
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    
  }
}
