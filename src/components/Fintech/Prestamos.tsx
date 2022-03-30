import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import LottieView from "lottie-react-native";

import CreditCardForm, { Button, FormModel } from "rn-credit-card";
import { COLORS, FONTS, SIZES } from "../../constants";

import FormInput from "../shared/FormInput";
import { PieChart } from "react-native-chart-kit";
import LiquidProgressFill from "../LiquidProgressFill";
import LiquidProgress from "react-native-liquid-progress";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import LineDivider from "../LineDivider";

const Prestamos = ({ item }) => {
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: "25%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormInput
            labelText="Prestar"
            placeholderText="0 ($MXN)"
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: "45%" }}>
          <Text
            style={{ color: COLORS.white, ...FONTS.h3, textAlign: "center" }}
          >
            {item.progress * 100} %
          </Text>
          <ProgressBar
            progress={item.progress}
            color={COLORS.primary2}
            style={{ marginVertical: SIZES.base }}
          />
          <Text
            style={{ color: COLORS.white, ...FONTS.h4, textAlign: "center" }}
          >
            Restan ${item.restante}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="checkmark-circle"
            size={25}
            color={COLORS.lightGreen}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 3,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
});

export default Prestamos;
