import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "../constants";

export default class Loader extends React.Component {
  render() {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
          source={require("../../assets/Loader/95771-loading-animation.json")}
          autoPlay
          loop
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
});
