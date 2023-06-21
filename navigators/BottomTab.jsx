import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WishList from '../screens/Wishlist';
import Home from '../screens/Home';
import { Ionicons, Fontisto } from 'react-native-vector-icons'

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator initialRouteName='Orchids' screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#6fc4f2',
            tabBarInactiveTintColor: '#ccc'
        }}>
            <Tab.Screen name="Orchids" component={Home} options={{
                tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
            }}
            />
            <Tab.Screen name="WishList" component={WishList} options={{
                tabBarIcon: ({ color }) => <Fontisto name="favorite" size={22} color={color} />,
            }}
            />
        </Tab.Navigator>
    );
}

export default BottomTab