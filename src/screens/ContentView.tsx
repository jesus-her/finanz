import React from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { COLORS } from "../constants";

const ContentView = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <WebView
        source={{ uri: "https://www.cetesdirecto.com/sites/portal/inicio" }}
      />
    </View>
  );
};

export default ContentView;
