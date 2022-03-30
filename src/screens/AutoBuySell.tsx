import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  ToastAndroid,
} from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../constants";

import FormInput from "../components/shared/FormInput";

import { LinearGradient } from "expo-linear-gradient";

import TextButton from "../components/Investment/TextButton";
import { LineChart } from "react-native-chart-kit";

const AutoBuySell = ({ navigation, route }) => {
  const [currentCoinImg, setCurrentCoinImg] = useState(
    route.params.currentCoinImg
  );
  const [selectedCoin, setSelectedCoin] = useState(route.params.selectedCoin);
  const [currentCoinName] = useState(route.params.currentCoinName);

  function renderCoinInfo() {
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
          /* borderRadius: SIZES.radius,*/
          backgroundColor: COLORS.primary0,
          alignItems: "center",
          height: 200 + SIZES.padding,
          borderBottomRightRadius: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            opacity: 1,
          }}
        >
          <LineChart
            withDots={false}
            data={{
              labels: ["Last 7 days"],
              datasets: [
                {
                  data: selectedCoin,
                },
              ],
            }}
            /*   data={data}*/
            width={SIZES.width - SIZES.padding} // from react-native
            height={200}
            chartConfig={{
              backgroundColor: COLORS.primary0,
              backgroundGradientFrom: COLORS.lightGreen,
              backgroundGradientTo: COLORS.lightGreen + "10",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                padding: 15,
              },
            }}
            bezier={true}
            style={{
              borderRadius: 16,
              alignSelf: "center",
            }}
          />
        </View>
        {/*Profile Image*/}
        <View
          style={{
            width: 80,
            height: 80,
            marginBottom: SIZES.padding,
            alignSelf: "center",
            opacity: 1,
          }}
        >
          <Image
            source={{ uri: currentCoinImg }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              borderWidth: 2,
              borderColor: COLORS.white,
              backgroundColor: COLORS.lightGray2,
            }}
          />
        </View>

        {/* Status
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.verified} style={{ width: 25, height: 25 }} />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.lightGreen,
              ...FONTS.body4,
            }}
          >
            Verified
          </Text>
        </View>*/}
        {/* Details */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",

            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h1,
            }}
          >
            {currentCoinName}
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <>
      {/* <HeaderSection
        title="Buy & Sell"
        onPress={() => navigation.goBack()}
        icon={icons.upArrow}
      />*/}
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderCoinInfo()}
          <KeyboardAvoidingView style={{ flex: 1, padding: SIZES.padding }}>
            <FormInput
              labelText="Comprar ($ MXN)"
              placeholderText="$1000.00"
              keyboardType="numeric"
              /*  icon="logo-bitcoin"
              color={COLORS.white}*/
            />
            <FormInput
              labelText="Vender ($ MXN)"
              placeholderText="$1000.00"
              keyboardType="numeric"
            />
            <FormInput
              labelText="Cantidad ($ MXN)"
              placeholderText="$1000.00"
              keyboardType="numeric"
            />
            <TextButton
              onPress={() => {
                ToastAndroid.show("Saved!", ToastAndroid.SHORT);
                navigation.goBack();
              }}
              containerStyle={{
                backgroundColor: COLORS.lightGreen,
                height: 40,
              }}
              label="DONE!"
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <Text
          style={{
            ...FONTS.h4,
            fontWeight: "900",
            color: COLORS.lightGray3,
            bottom: SIZES.padding,
            textAlign: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          * La comisión por transacción será del 1% para todos los casos, de
          acuerdo a la política de privacidad y acuerdos de ®Finanz.
        </Text>
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

export default AutoBuySell;
