import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, SIZES } from "../constants";
import CustomDrawer from "./CustomDrawer";
import Picker from "../Picker/Picker";
import Scan from "../screens/Scan";
import EditProfileScreen from "../screens/EditProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ForgotPassword from "../screens/ForgotPassword";
import AutoBuySell from "../screens/AutoBuySell";
import NewCredit from "../screens/NewCredit";
import DatosPersonales from "../screens/DatosPersonales";
import DatosLaborales from "../screens/DatosLaborales";
import Gastos from "../screens/Gastos";
import ReferenciasYBanco from "../screens/ReferenciasYBanco";
import Comprobantes from "../screens/Comprobantes";
import NewCreditFinish from "../screens/NewCreditFinish";

const Stack = createStackNavigator();

export default function CustomStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: COLORS.black,
          height: SIZES.heightNav,
        },
      }}
    >
      {/* <Stack.Screen name="BottomTab" component={CustomTab} />*/}
      <Stack.Screen
        name="Drawer"
        component={CustomDrawer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          title: "Scan",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Picker"
        component={Picker}
        options={{
          title: "Social",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: "Welcome",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Buy&Sell"
        component={AutoBuySell}
        options={{
          title: "Buy & Sell",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="NewCredit"
        component={NewCredit}
        options={{
          title: "Nuevo Crédito",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="DatosPersonales"
        component={DatosPersonales}
        options={{
          title: "Datos personales",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="DatosLaborales"
        component={DatosLaborales}
        options={{
          title: "Datos laborales",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Gastos"
        component={Gastos}
        options={{
          title: "Gastos",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ReferenciasYBanco"
        component={ReferenciasYBanco}
        options={{
          title: "Referencias y banco",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Comprobantes"
        component={Comprobantes}
        options={{
          title: "Comprobantes",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="NewCreditFinish"
        component={NewCreditFinish}
        options={{
          title: "Finalizar solicitud",
          headerShown: true,
        }}
      />
      <Stack.Screen
        options={{
          title: "",
        }}
        name="ForgotPasswordInside"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}
