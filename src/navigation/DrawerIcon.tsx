import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const DrawerIcon = ({ label, onPress, icon, color, colorText }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={icon} size={22} color={color} />
          <Text style={{ ...FONTS.h3, marginLeft: 10, color: colorText }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DrawerIcon;
