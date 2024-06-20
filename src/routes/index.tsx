import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Details from '../pages/Details';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#212121',
                },
                headerTintColor: '#FFD700',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home as React.ComponentType}
                options={{ title: 'Character list' }}
            />
            <Stack.Screen
                name="Details"
                component={Details as React.ComponentType}
                options={{ title: 'Character details' }}
            />
        </Stack.Navigator>
    );
}

// Favorite
function FavoriteStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#212121',
                },
                headerTintColor: '#FFD700',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Favorite"
                component={Favorite}
                options={{ title: 'Favorites' }}
            />
        </Stack.Navigator>
    );
}

export default function Routes() {
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: '#FFD700',
                        tabBarInactiveTintColor: '#FFFFFF',
                        tabBarStyle: {
                            backgroundColor: '#212121',
                        },
                    }}
                >
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
        </GestureHandlerRootView>
    );
}