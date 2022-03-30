import React from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import HeaderSection from "../components/shared/HeaderSection";
import images from "../constants/images";

import { LinearGradient } from "expo-linear-gradient";
import BalanceInfo from "../components/Investment/BalanceInfo";
import IconTextButton from "../components/Investment/IconTextButton";
import IconLabel from "../components/IconLabel";

const Portfolio = ({ navigation }) => {
  function renderCurrentBalanceSection() {
    return (
      <LinearGradient
        colors={[COLORS.black, COLORS.primary0]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.primary0,
        }}
      >
        {/*Balance Info*/}
        <BalanceInfo
          title="Current Balance"
          displayAmount="735,831"
          changePct={2.3}
          containerStyle={{
            marginBottom: SIZES.padding,
          }}
        />
      </LinearGradient>
    );
  }

  function renderAssets() {
    return (
      <>
        <View style={{ margin: SIZES.padding }}>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Your Assets</Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: SIZES.padding,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconLabel
            label="Aún no tienes ningún asset"
            labelStyle={{ ...FONTS.h2 }}
            icon={icons.search}
            iconStyle={{
              width: SIZES.padding,
              height: SIZES.padding,
              tintColor: COLORS.lightGreen,
            }}
          />
          <IconLabel
            label="Aquí aparecerán los assets que tengas en tu cuenta. Comienza a automatizar tus compras y ventas de criptomonedas
             para tener tus primeros assets!"
            labelStyle={{
              ...FONTS.h3,
              marginTop: SIZES.padding,
              textAlign: "center",
            }}
          />
          <IconTextButton
            onPress={() => navigation.navigate("Home")}
            icon={icons.global}
            label="Explore"
            containerStyle={{
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.padding,
            }}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        <HeaderSection
          title="Portfolio"
          onPress={() => navigation.openDrawer()}
          icon={images.drawer}
        />
        {/*header - current balance*/}
        {renderCurrentBalanceSection()}
        {renderAssets()}

        <Text>Hola</Text>
      </View>
    </>
  );
};
export default Portfolio;
