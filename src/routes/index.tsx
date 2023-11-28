import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePageRoutes from './HomePage.Routes';
import SearchPage from '../pages/SearchPage';
import PhotoGalleryPageRoutes from './PhotoGalleryPage.Routes';

const Tab = createMaterialBottomTabNavigator();

const HomeRoutes: React.FC = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            inactiveColor='#3e2465'
            barStyle={{backgroundColor: '#009387'}}>
            <Tab.Screen
                name="Home"
                component={HomePageRoutes}
                options={{
                tabBarLabel: 'Feed',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color={color} size={26}/>)
            }}/>
                <Tab.Screen
                    name="Camera"
                    component={PhotoGalleryPageRoutes}
                    options={{
                    tabBarLabel: '',
                    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="plus-box-outline" color={color} size={26}/>)
                }}/>
            <Tab.Screen
                name="Search"
                component={SearchPage}
                options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="magnify-plus-outline" color={color} size={26}/>)
            }}/>
        </Tab.Navigator>
    );
}

export default HomeRoutes;