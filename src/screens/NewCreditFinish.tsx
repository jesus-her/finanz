import React, { useState } from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  ToastAndroid,
} from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../constants";

import { LinearGradient } from "expo-linear-gradient";

import FormInput from "../components/shared/FormInput";
import TextButton from "../components/Investment/TextButton";
import { RadioButton } from "react-native-paper";

const NewCreditFinish = ({ navigation }) => {
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
          backgroundColor: COLORS.primary0,
          alignItems: "flex-start",

          borderBottomRightRadius: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
        }}
      >
        {/*<Text
          style={{
            ...FONTS.h2,
            color: COLORS.lightGreen,
            marginBottom: SIZES.base * 3,
          }}
        >
          Finish
        </Text>*/}
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: SIZES.base,
          }}
        >
          Autorizo expresamente a Finanz, para que lleve a cabo investigaciones
          sobre mi comportamiento crediticio en las Sociedades de Información
          Crediticia que estime conveniente. Conozco la naturaleza y alcance de
          la información que se solicitará, del uso que se le dará y que se
          podrán realizar consultas periódicas de mi historial crediticio.
          Consiento que esta autorización tenga vigencia de 3 años contados a
          partir de hoy, y en su caso mientras mantengamos relación jurídica.
        </Text>
      </LinearGradient>
    );
  }

  function renderSolicitud1() {
    const [value, setValue] = React.useState("first");
    return (
      <View style={{ margin: SIZES.padding }}>
        <FormInput
          labelText="Ingresa tu contraseña para continuar"
          placeholderText="* * * * * * * *"
          /*  icon="logo-bitcoin"
                  color={COLORS.white}*/
        />
        <View
          style={{
            flexDirection: "row",
            padding: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.gray20,
              marginBottom: SIZES.base * 3,
            }}
          >
            Al ingresar mi contraseña, acepto el Contrato de Comisión Mercantil
          </Text>
        </View>

        <TextButton
          onPress={() => {
            ToastAndroid.show("Solicitud enviada!", ToastAndroid.SHORT);
            navigation.navigate("Home");
          }}
          containerStyle={{
            backgroundColor: COLORS.lightGreen,
            height: 40,
          }}
          label="Validar y enviar solicitud"
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSections()}

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

export default NewCreditFinish;
