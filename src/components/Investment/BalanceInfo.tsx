import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";

const BalanceInfo = ({
  title,
  displayAmount,
  changePct,
  containerStyle,
  username,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      {/*User*/}
      <Text numberOfLines={2} style={{ color: COLORS.white, ...FONTS.h2 }}>
        {username}
      </Text>
      {/*Title*/}
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>{title}</Text>
      {/*Figures*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h1 }}>$</Text>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            marginHorizontal: SIZES.base,
          }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h2 }}>MXN</Text>
      </View>
      {/*Change Percentage*/}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        {changePct != 0 && (
          <Image
            source={icons.sun}
            style={{
              width: 10,
              height: 10,
              alignSelf: "center",
              tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePct > 0 ? [{ rotate: "45deg" }] : [{ rotate: "125deg" }],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: "flex-end",
            color:
              changePct === 0
                ? COLORS.lightGray3
                : changePct > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}
        >
          {changePct.toFixed(2)}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.radius,
            alignSelf: "flex-end",
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  );
};
export default BalanceInfo;
