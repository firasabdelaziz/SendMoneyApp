import { Dimensions, Platform, PixelRatio, ScaledSize } from 'react-native';

// Use let for mutable screen dimensions
let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

// Get device pixel ratio and font scale
const pixelRatio: number = PixelRatio.get();
const fontScale: number = PixelRatio.getFontScale();

// Calculate dynamic base dimensions based on device characteristics
const getBaseDimensions = () => {
  // For phones with standard aspect ratios (roughly 16:9)
  const standardWidth = 375;
  const standardHeight = 667;

  // For tablets (typically larger and different aspect ratios)
  const tabletWidth = 768;
  const tabletHeight = 1024;

  // For larger displays
  const largeWidth = 1024;
  const largeHeight = 1366;

  // Determine if device is a tablet based on screen size and pixel ratio
  const isTablet = (SCREEN_WIDTH >= 600 || SCREEN_HEIGHT >= 600) && pixelRatio < 2;

  // Determine if device has a large display
  const isLargeDisplay = SCREEN_WIDTH >= 768 || SCREEN_HEIGHT >= 768;

  if (isLargeDisplay) {
    return {
      baseWidth: largeWidth,
      baseHeight: largeHeight
    };
  } else if (isTablet) {
    return {
      baseWidth: tabletWidth,
      baseHeight: tabletHeight
    };
  } else {
    return {
      baseWidth: standardWidth,
      baseHeight: standardHeight
    };
  }
};

// Calculate scale factors based on dynamic base dimensions
const getScales = () => {
  const { baseWidth, baseHeight } = getBaseDimensions();
  return {
    wscale: SCREEN_WIDTH / baseWidth,
    hscale: SCREEN_HEIGHT / baseHeight
  };
};

let { wscale, hscale } = getScales();

/**
 * Enhanced normalize function with dynamic base dimensions for different device types
 * 
 * @param {number} size - The original size value to be normalized
 * @param {'width' | 'height'} based - The dimension to base the scaling on
 * @returns {number} - The normalized size value
 */
export default function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
): number {
  // Get current scales
  const currentScales = getScales();
  // Calculate the initial scaled size
  const scale = based === 'height' ? currentScales.hscale : currentScales.wscale;
  let newSize = size * scale;

  // Device-specific adjustments
  if (Platform.OS === 'ios') {
    // iOS-specific adjustments based on screen density
    if (pixelRatio >= 3) {
      // High density screens (iPhone Plus/X/11 Pro Max etc.)
      newSize = size * (scale * 0.95);
    } else if (pixelRatio >= 2) {
      // Regular density screens
      newSize = size * scale;
    }
  } else if (Platform.OS === 'android') {
    // Android-specific adjustments
    if (pixelRatio <= 1) {
      // Low density screens
      newSize = size * (scale * 1.1);
    } else if (pixelRatio <= 2) {
      // Medium density screens
      newSize = size * (scale * 1.05);
    } else if (pixelRatio <= 3) {
      // High density screens
      newSize = size * scale;
    } else {
      // Extra high density screens
      newSize = size * (scale * 0.98);
    }
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Dimension change listener
Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
  // Update scales when dimensions change
  const newScales = getScales();
  wscale = newScales.wscale;
  hscale = newScales.hscale;
});

// Export screen dimensions and helper functions for external use
export { 
  SCREEN_WIDTH, 
  SCREEN_HEIGHT,
  getBaseDimensions // Export this in case other components need to know the base dimensions
};