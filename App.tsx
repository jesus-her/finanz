import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import CustomStackNavigator from "./src/navigation/CustomStackNavigator";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import { auth } from "./firebase";
import { COLORS } from "./src/constants";
console.log("statusBarHeight: ", StatusBar.currentHeight);
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = async (user) => {
    await setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.secondary0}
        barStyle={"light-content"}
      />

      <NavigationContainer>
        {/*<CustomStackNavigator />*/}
        {currentUser ? <CustomStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </>
  );
};

export default App;
