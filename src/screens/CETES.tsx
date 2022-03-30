import React from "react";
import { Text, View } from "react-native";
import ContentView from "./ContentView";
import { COLORS, images } from "../constants";
import HeaderSection from "../components/shared/HeaderSection";

export default function CETES({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: "center",
      }}
    >
      <HeaderSection
        title="CETES"
        icon={images.drawer}
        onPress={() => navigation.openDrawer()}
      />
      <ContentView />
    </View>
  );
}
