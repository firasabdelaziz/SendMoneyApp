import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';
import { TransactionSuccessScreen } from '../screens/TransactionSuccessScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SendMoney" 
        component={SendMoneyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TransactionSuccess" 
        component={TransactionSuccessScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}