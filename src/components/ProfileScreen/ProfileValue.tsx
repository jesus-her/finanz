import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../../constants";

// @ts-ignore
const ProfileValue = ({ icon, value, label, onPress, valueStyles }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 80,
      }}
      onPress={onPress}
    >
      {/*Icon*/}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          backgroundColor: COLORS.primary + "70",
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary2,
          }}
        />
      </View>

      {/*Label and Value*/}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}
      >
        {label && (
          <Text
            style={{
              color: COLORS.lightGray3,
              ...FONTS.body3,
            }}
          >
            {label}
          </Text>
        )}
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            ...valueStyles,
          }}
        >
          {value}
        </Text>
      </View>
      {/*Icon*/}
      <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
          tintColor: COLORS.white,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileValue;
