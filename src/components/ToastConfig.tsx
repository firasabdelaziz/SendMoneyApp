import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import normalize from '../hooks/useNormalize';

const toastConfig: ToastConfig = {
  error: ({ text1, props, hide }: ToastConfigParams<any>) => (
    <View style={styles.errorToast}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <IconButton
            icon="close-circle"
            size={normalize(35)}
            iconColor="#BD0F1B"
          />
        </View>
        <Text style={styles.messageText}>{text1}</Text>
      </View>
      <IconButton
        icon="close"
        size={normalize(20)}
        iconColor="#000"
      />
    </View>
  )
};

const styles = StyleSheet.create({
  errorToast: {
    backgroundColor: 'white',
    padding: normalize(8),
    borderRadius: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalize(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: normalize(3.84),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: normalize(2),
  },
  messageText: {
    fontSize: normalize(16),
    color: '#000000',
    fontFamily: 'Ubuntu-Medium',
  }
});

export default toastConfig;