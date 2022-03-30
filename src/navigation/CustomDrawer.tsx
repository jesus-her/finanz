import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import { COLORS, FONTS } from "../constants";
import Fintech from "../screens/Fintech";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomTab from "./CustomTab";

import Wallet from "../screens/Wallet";
import CETES from "../screens/CETES";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerActiveBackgroundColor: COLORS.primary2,
            drawerActiveTintColor: COLORS.white,
            drawerInactiveTintColor: COLORS.white,
            drawerLabelStyle: { marginLeft: -20, ...FONTS.h3 },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            drawerStyle: {
              backgroundColor: COLORS.primary0,
            },
            headerStyle: {
              backgroundColor: COLORS.black,
            },
            drawerType: "back",
          }}
        >
          <Drawer.Screen
            name="BottomTab"
            component={CustomTab}
            options={{
              title: "Home",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Wallet"
            component={Wallet}
            options={{
              title: "Wallet",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="wallet" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Fintech"
            component={Fintech}
            options={{
              title: "Fintech",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="piggy-bank" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="CETES"
            component={CETES}
            options={{
              title: "CETES",
              headerShown: false,
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="web" size={22} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </View>
    </>
  );
};

export default CustomDrawer;
