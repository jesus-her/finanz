import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
import DrawerIcon from "./DrawerIcon";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../utils/auth";

const DrawerFooter = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.footer}>
        <DrawerIcon
          icon="information-circle-outline"
          label="About"
          color={COLORS.white}
          colorText={COLORS.white}
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        />

        <DrawerIcon
          icon="exit-outline"
          label="Exit"
          onPress={signOut}
          color={COLORS.red}
          colorText={COLORS.red}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  footer: {
    padding: SIZES.padding,
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 3,
    backgroundColor: COLORS.primary0,
  },
});
export default DrawerFooter;
