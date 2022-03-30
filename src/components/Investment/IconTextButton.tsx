import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const IconTextButton = ({ onPress, icon, containerStyle, label }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
        }}
      />
      <Text
        style={{
          ...FONTS.h3,
          marginLeft: SIZES.base,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default IconTextButton;
