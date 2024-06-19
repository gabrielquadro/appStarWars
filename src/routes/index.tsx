import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Details from '../pages/Details';
import { Feather } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home as React.ComponentType}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Details"
                component={Details as React.ComponentType}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}

function FavoriteStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Favorite" component={Favorite} />
        </Stack.Navigator>
    );
}

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="HomeTab"
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
                        tabBarLabel: 'Home'
                    }}
                />
                <Tab.Screen
                    name="FavoriteTab"
                    component={FavoriteStack}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name='star' color={color} size={size} />,
                        tabBarLabel: 'Favorites'
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}