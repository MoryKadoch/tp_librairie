import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from './CategoriesScreen';
import BooksScreen from './BooksScreen';
import CategoryScreen from './CategoryScreen';
import SearchScreen from './SearchScreen';
import BookDetailsScreen from './BookDetailsScreen';
import AddBookScreen from './AddBookScreen';

const Tab = createBottomTabNavigator();

function NavBottom() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Catégories') {
                        iconName = focused ? 'ios-apps-outline' : 'ios-apps';
                    } else if (route.name === 'Livres') {
                        iconName = focused ? 'ios-book' : 'ios-book-outline';
                    } else if (route.name === 'Recherche') {
                        iconName = focused ? 'ios-search' : 'ios-search-outline';
                    }
                    else if (route.name === 'AddBook') {
                        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Catégories" component={CategoriesScreen} />
            <Tab.Screen name="Livres" component={BooksScreen} />
            <Tab.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Tab.Screen name="Recherche" component={SearchScreen} />
            <Tab.Screen name="BookDetails" component={BookDetailsScreen} options={{
                tabBarButton: () => null
            }} />
            <Tab.Screen name="AddBook" component={AddBookScreen}/>

        </Tab.Navigator>
    );
}

export default NavBottom;
