import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import ProfileScreen from "../screens/ProfileScreen";
import Market from "../screens/Market";
import ModalTrade from "../components/modals/ModalTrade";
import Portfolio from "../screens/Portfolio";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = (props) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </>
  );
};

const CustomTab = () => {
  const [tradeModalVisible, setTradeModalVisible] = useState(false);
  return (
    <>
      {/*Modal Trade*/}
      <ModalTrade
        tradeModalVisible={tradeModalVisible}
        setTradeModalVisible={setTradeModalVisible}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarLabelStyle: {
            ...FONTS.h4,
          },
          tabBarStyle: {
            height: 140,
            backgroundColor: COLORS.primary0,
            borderTopColor: COLORS.lightGray,
            borderTopWidth: 3,
            paddingBottom: SIZES.base,
          },
          tabBarInactiveTintColor: COLORS.lightGray,
          tabBarActiveTintColor: COLORS.primary2,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => (
              <>
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h4,
                    color: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                >
                  Inicio
                </Text>
              </>
            ),
          })}
        />
        <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => (
              <>
                <Image
                  source={icons.briefcase}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h4,
                    color: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                >
                  Portafolio
                </Text>
              </>
            ),
          })}
        />
        <Tab.Screen
          name="Trade"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <>
                <View
                  style={{
                    backgroundColor: COLORS.black,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}
                >
                  {/* <AntDesign name="home" color={color} size={30} />*/}
                  <Image
                    source={
                      /*isTradeModalVisible ? icons.close : */ icons.trade
                    }
                    resizeMode="contain"
                    style={{
                      /*width: isTradeModalVisible ? 15 : 25,*/
                      width: 25,
                      height: 25,
                      tintColor: COLORS.white,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: COLORS.white,
                    }}
                  >
                    Transacción
                  </Text>
                </View>
              </>
            ),
            tabBarButton: (props) => (
              <TabBarCustomButton
                {...props}
                onPress={() => {
                  setTradeModalVisible(!tradeModalVisible);
                  console.log(tradeModalVisible);
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Market"
          component={Market}
          options={{
            /* tabBarBadge: 5,*/

            tabBarBadgeStyle: { backgroundColor: COLORS.primary2 },
            tabBarIcon: ({ color, size, focused }) => (
              <>
                <Image
                  source={icons.market}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h4,
                    color: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                >
                  Mercado
                </Text>
              </>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarBadgeStyle: { backgroundColor: COLORS.primary2 },
            tabBarIcon: ({ color, size, focused }) => (
              <>
                <Image
                  source={icons.profile}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h4,
                    color: focused ? COLORS.primary2 : COLORS.lightGray,
                  }}
                >
                  Perfil
                </Text>
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default CustomTab;
