import React from "react";
import { View } from "react-native";
import { COLORS } from "../../constants";

const LineDivider = ({ lineStyle }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 3,
        backgroundColor: COLORS.lightGray,
        ...lineStyle,
      }}
    />
  );
};

export default LineDivider;
