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

const Gastos = ({ navigation }) => {
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
          Casa propia
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
            <RadioButton.Item label="Propietario" value="first" />
            <RadioButton.Item label="Renta" value="second" />
            <RadioButton.Item
              label="Pensión/Vive con familiares"
              value="third"
            />
          </RadioButton.Group>
        </View>
        <FormInput
          labelText="Núm. de dependientes económicos"
          placeholderText=""
          keyboardType="numeric"
        />

        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Gastos mensuales
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.gray30,
            marginBottom: SIZES.padding,
          }}
        >
          Coloca tus gastos mensuales. Si en cierto rubro no tienes gastos, pon
          cero.
        </Text>
        <FormInput
          labelText="Tarjetas/Otras deudas"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Comidas y entretenimiento"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Luz/Agua/Cable/Internet"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Seguros"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Gastos de renta/casa"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Gastos auto transporte"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Ropa/Gastos hogar"
          placeholderText=""
          keyboardType="numeric"
        />
        <FormInput
          labelText="Gastos misceláneos/Imprevistos"
          placeholderText=""
          keyboardType="numeric"
        />

        <TextButton
          onPress={() => navigation.navigate("ReferenciasYBanco")}
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

export default Gastos;
