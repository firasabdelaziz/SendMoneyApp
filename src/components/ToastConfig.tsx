import Toast, { BaseToast, ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const toastConfig: ToastConfig = {
  error: ({ text1, props, hide }: ToastConfigParams<any>) => (
    <View style={styles.errorToast}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <IconButton
            icon="close-circle"
            size={35}
            iconColor="#BD0F1B"
          />
        </View>
        <Text style={styles.messageText}>{text1}</Text>
      </View>
      <IconButton
        icon="close"
        size={20}
        iconColor="#000"
      />
    </View>
  )
};

const styles = StyleSheet.create({
  errorToast: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Ubuntu-Medium',
  }
});

export default toastConfig;