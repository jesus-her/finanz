import React, { useState } from "react";

import { StyleSheet, ScrollView, View, Text, FlatList } from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../constants";

import { LinearGradient } from "expo-linear-gradient";

import FormInput from "../components/shared/FormInput";
import TextButton from "../components/Investment/TextButton";
import { RadioButton } from "react-native-paper";

const NewCredit = ({ navigation }) => {
  function renderSections() {
    return (
      <LinearGradient
        colors={[COLORS.black, COLORS.primary0]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "column",
          marginVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          /* borderRadius: SIZES.radius,*/
          alignItems: "flex-start",

          borderBottomRightRadius: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.lightGreen,
            marginBottom: SIZES.base * 3,
          }}
        >
          Sólo cobramos comisión si tu crédito es otorgado.
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            fontWeight: "900",
            textAlign: "left",
            marginBottom: SIZES.base,
          }}
        >
          ° Tasas desde el 8.9% hasta el 28.9% ANUAL.
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            fontWeight: "900",
            textAlign: "left",
            marginBottom: SIZES.base,
          }}
        >
          ° Podrás cancelar sin costo si la tasa no te conviene.
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            fontWeight: "900",
            textAlign: "left",
            marginBottom: SIZES.base,
          }}
        >
          ° Necesitarás cmprobar ingresos, buen historial y cuenta bancaria.
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            fontWeight: "900",
            textAlign: "left",
            marginBottom: SIZES.base,
          }}
        >
          ° Recibe el dinero en tu cuenta bancaria y haz pagos mensuales.
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            fontWeight: "900",
            textAlign: "left",
            marginBottom: SIZES.base,
          }}
        >
          ° Descontamos una comisión entre el 3% y 5% sobre el monto depositado.
        </Text>
      </LinearGradient>
    );
  }

  function renderSolicitud1() {
    const [value, setValue] = React.useState("first");
    return (
      <View style={{ margin: SIZES.padding }}>
        <FormInput
          labelText="Monto deseado ($ MXN)"
          placeholderText="0"
          keyboardType="numeric"
          /*  icon="logo-bitcoin"
                  color={COLORS.white}*/
        />
        <View
          style={{
            backgroundColor: COLORS.gray40,
            borderRadius: SIZES.radius,
            marginBottom: SIZES.base * 2,
          }}
        >
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <RadioButton.Item label="3 Meses" value="first" />
            <RadioButton.Item label="6 Meses" value="second" />
            <RadioButton.Item label="12 Meses" value="third" />
          </RadioButton.Group>
        </View>
        <FormInput
          labelText="Destino del crédito"
          placeholderText="¿Para qué quieres el crédito?"
          /*  icon="logo-bitcoin"
                  color={COLORS.white}*/
        />
        <FormInput
          labelText="Describe brevemente el uso del crédito"
          placeholderText=""
          /*  icon="logo-bitcoin"
                  color={COLORS.white}*/
        />
        <TextButton
          onPress={() => navigation.navigate("DatosPersonales")}
          containerStyle={{
            backgroundColor: COLORS.lightGreen,
            height: 40,
          }}
          label="Next"
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSections()}
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              paddingHorizontal: SIZES.padding,
              marginBottom: SIZES.base,
              marginTop: SIZES.padding,
            }}
          >
            LLena tu solicitud
          </Text>
          {renderSolicitud1()}
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

export default NewCredit;
