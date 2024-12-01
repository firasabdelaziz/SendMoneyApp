import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';
import { TransactionSuccessScreen } from '../screens/TransactionSuccessScreen';
import { RootStackParamList } from '../types/navigation';

/**
 * Create a stack navigator for the app using `@react-navigation/native-stack`.
 * The `RootStackParamList` provides type safety for navigation between screens.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


/**
 * AppNavigator component sets up the navigation stack for the application.
 * 
 * It defines the navigation structure, mapping route names to their corresponding
 * screens and configuration options.
 * 
 * @returns {JSX.Element} A navigator with defined screens.
 */
export function AppNavigator() {
  return (
    <Stack.Navigator>

      {/* Define the SendMoneyScreen */}
      <Stack.Screen 
        name="SendMoney" 
        component={SendMoneyScreen}
        options={{ headerShown: false }}
      />

      {/* Define the TransactionSuccessScreen */}
      <Stack.Screen 
        name="TransactionSuccess" 
        component={TransactionSuccessScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}