import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapviewPage from "../pages/MapviewPage";
import HomePageRoutes from "./HomePage.Routes";
import PhotoGalleryPageRoutes from "./PhotoGalleryPage.Routes";
import SearchPageRoutes from "./SearchPage.Routes";
import ProfilePageRoutes from "./UserProfilePage.Routes";

const Tab = createMaterialBottomTabNavigator();

const HomeRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#121212"
      inactiveColor="#808080"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Home"
        component={HomePageRoutes}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPageRoutes}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify-plus-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={PhotoGalleryPageRoutes}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-box-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapviewPage}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePageRoutes}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeRoutes;
