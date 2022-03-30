import React from "react";

import { StyleSheet, ScrollView, View, Text, FlatList } from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../constants";

import images from "../constants/images";
import HeaderSection from "../components/shared/HeaderSection";

import { LinearGradient } from "expo-linear-gradient";

import Prestamos from "../components/Fintech/Prestamos";

import data from "../components/Fintech/data";

import IconTextButton from "../components/Investment/IconTextButton";
const Fintech = ({ navigation }) => {
  function renderSections() {
    return (
      <LinearGradient
        colors={[COLORS.black, COLORS.primary0]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "column",
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: SIZES.radius,
          alignItems: "center",
          borderBottomRightRadius: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        >
          <IconTextButton
            label="Solicitar un crédito"
            icon={icons.payment}
            containerStyle={{
              flex: 1,
              height: 45,
              marginRight: SIZES.radius,
            }}
            onPress={() => navigation.navigate("NewCredit")}
          />
        </View>
      </LinearGradient>
    );
  }
  return (
    <>
      <HeaderSection
        title=""
        onPress={() => navigation.openDrawer()}
        icon={images.drawer}
      />
      <View style={styles.container}>
        {renderSections()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.base,
              marginTop: SIZES.padding,
            }}
          >
            Préstamos
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Prestamos item={item} />}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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

export default Fintech;
