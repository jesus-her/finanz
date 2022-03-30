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

const DatosLaborales = ({ navigation }) => {
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
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            marginVertical: SIZES.padding,
          }}
        >
          Estado laboral
        </Text>
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
            <RadioButton.Item label="Empleado" value="first" />
            <RadioButton.Item label="Jubilado/Pensionado" value="second" />
            <RadioButton.Item label="Independiente" value="third" />
          </RadioButton.Group>
        </View>

        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Ingresos
        </Text>
        <FormInput
          labelText="Ingreso mensual neto"
          placeholderText="$0"
          keyboardType="numeric"
        />
        <FormInput labelText="Otra ocupación" placeholderText="" />
        <FormInput labelText="Otros ingresos comprobables" placeholderText="" />

        <TextButton
          onPress={() => navigation.navigate("Gastos")}
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

export default DatosLaborales;
