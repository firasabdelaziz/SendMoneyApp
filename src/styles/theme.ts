import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme, // Extends the default MD3 Light theme from react-native-paper
  colors: {
    ...MD3LightTheme.colors, // Inherits the default colors from MD3LightTheme
    primary: '#EB654A', // Main color for call-to-action buttons, highlights, or primary elements (e.g., Send Money button)
    secondary: '#0EAA7E', // Used for secondary actions, accents, or alternative highlights
    lightGray: '#f5f5f5', // Light gray color, often used for background or section dividers
    darkGray: '#666666', // Darker gray, commonly used for text or borders
    black: '#000000', // Standard black color, used for strong text or dark UI elements
    white: '#ffffff', // Standard white color, used for backgrounds, text, or icons on dark backgrounds
    gray: '#666666', // Another shade of gray, used for text or muted UI elements
    disabledGray: '#B4B5B6', // Light gray for disabled UI elements like buttons or form inputs (non-interactive)
  },
  fontFamily: {
    regular: 'Ubuntu-Regular', // Regular weight font, typically used for body text or paragraphs
    medium: 'Ubuntu-Medium', // Medium weight font, used for emphasis or subheadings
    bold: 'Ubuntu-Bold', // Bold weight font, used for headings, titles, or important elements
    light: 'Ubuntu-Light', // Light weight font, used for subtle text or smaller elements
  },
};
