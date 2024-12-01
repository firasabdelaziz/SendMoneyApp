import { StyleSheet } from 'react-native';
import normalize from '../hooks/useNormalize';
import { theme } from './theme';

/**
 * Styles for common
 */
export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    borderBottomWidth: 2,
    borderColor: theme.colors.lightGray,
    height: normalize(56),
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: normalize(18),
    fontWeight: '500',
    fontFamily: theme.fontFamily.medium,
  },
  
  primaryButton: {
    height: normalize(48),
    borderRadius: normalize(8),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: normalize(16),
    fontWeight: '500',
    fontFamily: theme.fontFamily.medium,
  },
  
  avatar: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    overflow: 'hidden',
    backgroundColor: '#007bff',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  
  labelText: {
    color: theme.colors.darkGray,
    fontFamily: theme.fontFamily.medium,
  },
  
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});