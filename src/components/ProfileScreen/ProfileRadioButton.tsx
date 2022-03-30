import React from "react";
import { TouchableOpacity, View, Text, Image, Animated } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

// @ts-ignore
const ProfileRadioButton = ({ icon, label, isSelected, onPress }) => {
  const radioAnimated = React.useRef(new Animated.Value(0)).current;

  const circleColorAnimated = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.gray40, COLORS.lightGreen],
  });

  const lineColorAnimated = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.additionalColor4, COLORS.lightGreen + "99"],
  });

  React.useEffect(() => {
    if (isSelected) {
      Animated.timing(radioAnimated, {
        toValue: 17,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(radioAnimated, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelected]);

  return (
    <View
      style={{
        flexDirection: "row",
        height: 80,
        alignItems: "center",
      }}
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

      {/*Label*/}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
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
      </View>

      {/*Radio Button*/}
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Animated.View
          style={{
            width: "100%",
            height: 5,
            borderRadius: 3,
            backgroundColor: lineColorAnimated, //Animate
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            left: radioAnimated, //animate
            width: 20,
            height: 20,
            borderRadius: 15,
            borderWidth: 5,
            borderColor: circleColorAnimated, //Animate
            backgroundColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileRadioButton;
