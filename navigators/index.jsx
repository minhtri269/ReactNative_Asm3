import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerLayout from './DrawerLayout';
import Detail from '../screens/Detail';

const Stack = createNativeStackNavigator()

function MyOrchids() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Drawer' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Drawer' component={DrawerLayout} />
                <Stack.Screen name='Detail' component={Detail} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyOrchids