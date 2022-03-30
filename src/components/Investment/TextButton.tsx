import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const TextButton = ({ onPress, containerStyle, label }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        paddingVertical: 3,
        paddingHorizontal: 18,
        ...containerStyle,
      }}
    >
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.white,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default TextButton;
