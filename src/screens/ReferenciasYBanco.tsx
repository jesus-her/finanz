import React, { useState } from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Button,
} from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../constants";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import FormInput from "../components/shared/FormInput";
import TextButton from "../components/Investment/TextButton";
import FormInputDate from "../components/shared/FormInputDate";
import { RadioButton } from "react-native-paper";
import IconLabel from "../components/IconLabel";

const ReferenciasYBanco = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  function renderTimePicker() {
    return (
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  }

  function renderSolicitud1() {
    const [value, setValue] = React.useState("first");
    return (
      <View style={{ margin: SIZES.padding }}>
        <View
          style={{
            backgroundColor: COLORS.primary2,
            borderRadius: SIZES.radius,
            padding: SIZES.radius,
          }}
        >
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              marginVertical: SIZES.base,
            }}
          >
            Tus referencias sólo serán contactadas para validar tu identidad y
            en caso de que no podamos contactarte si te retrasas en tus pagos.
          </Text>
        </View>

        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Referencia personal
        </Text>

        <FormInput labelText="Nombre" placeholderText="" />
        <FormInput labelText="Relación/Parentesco" placeholderText="" />
        <FormInput labelText="Email" placeholderText="" />

        <FormInput
          labelText="Teléfono fijo"
          placeholderText="Teléfono a 10 dígitos"
          keyboardType="numeric"
        />
        <FormInput
          labelText="Teléfono móvil"
          placeholderText="Teléfono a 10 dígitos"
          keyboardType="numeric"
        />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Referencia laboral
        </Text>

        <FormInput labelText="Nombre" placeholderText="" />
        <FormInput labelText="Puesto en la empresa" placeholderText="" />
        <FormInput labelText="Email" placeholderText="" />

        <FormInput
          labelText="Tel. Jefe o RR.HH."
          placeholderText="Teléfono a 10 dígitos"
          keyboardType="numeric"
        />
        <FormInput
          labelText="Teléfono móvil"
          placeholderText="Teléfono a 10 dígitos"
          keyboardType="numeric"
        />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Datos bancarios
        </Text>

        <IconLabel
          containerStyle={{
            backgroundColor: COLORS.lightGreen,
            borderRadius: SIZES.radius,
            padding: SIZES.radius,
            position: "relative",
            marginBottom: SIZES.padding,
          }}
          label="Requerimos tus datos bancarios para poder transferirte tu crédito en caso de que sea aprobado.
             Finanz no comparte tu información bancaria y no comparte tu infprmación bancaria y no cobramos absolutamente
              nada antes de otorgarte el crédito."
          labelStyle={{ color: COLORS.white, ...FONTS.h4 }}
        />

        <FormInput labelText="Banco" placeholderText="" />
        <FormInput labelText="Nombre del titular" placeholderText="" />

        <FormInput
          labelText="CLABE"
          placeholderText=""
          keyboardType="numeric"
        />

        <TextButton
          onPress={() => navigation.navigate("Comprobantes")}
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
          {renderSolicitud1()}
          {/*   {renderTimePicker()}*/}
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

export default ReferenciasYBanco;
