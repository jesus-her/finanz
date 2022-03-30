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
import { RadioButton } from "react-native-paper";
import FormInputDate from "../components/shared/FormInputDate";

const DatosPersonales = ({ navigation }) => {
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
        {/* <View
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
        </View>*/}
        <FormInput labelText="Primer nombre" placeholderText="" />
        <FormInput labelText="Segundo nombre" placeholderText="" />
        <FormInput labelText="Apellido paterno" placeholderText="" />
        <FormInput labelText="Apellido materno" placeholderText="" />
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            marginTop: SIZES.padding,
          }}
        >
          Fecha de nacimiento
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <FormInputDate
            labelText=""
            placeholderText="dd"
            keyboardType="numeric"
          />
          <FormInputDate
            labelText=""
            placeholderText="mm"
            keyboardType="numeric"
          />
          <FormInputDate
            labelText=""
            placeholderText="yyyy"
            keyboardType="numeric"
          />
        </View>
        <FormInput labelText="Estado civil" placeholderText="" />
        <FormInput labelText="R.F.C." placeholderText="" />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Domicilio particular
        </Text>
        <FormInput labelText="Calle" placeholderText="" />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <FormInputDate
            labelText="Número exterior"
            placeholderText=""
            keyboardType="numeric"
          />
          <FormInputDate
            labelText="Número interior"
            placeholderText=""
            keyboardType="numeric"
          />
          <FormInputDate
            labelText="Código postal"
            placeholderText=""
            keyboardType="numeric"
          />
        </View>
        <FormInput labelText="Colonia" placeholderText="" />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Números de contacto
        </Text>
        <FormInput
          labelText="Teléfono de casa con LADA"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Teléfono móvil"
          placeholderText=""
          keyboardType="numeric"
        />

        <TextButton
          onPress={() => navigation.navigate("DatosLaborales")}
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

export default DatosPersonales;
