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
import IconTextButton from "../components/Investment/IconTextButton";

const Comprobantes = ({ navigation }) => {
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
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Identificación
        </Text>

        <IconLabel
          iconStyle={{
            width: SIZES.padding,
            height: SIZES.padding,
            tintColor: COLORS.white,
          }}
          icon={icons.payment}
          label="INE, Pasaporte"
        />
        <IconTextButton
          onPress={() => navigation.navigate("Scan")}
          containerStyle={{ marginVertical: SIZES.padding }}
          icon={icons.rec}
          label="Escanear documento"
        />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Comprobante de domicilio
        </Text>
        <IconLabel
          iconStyle={{
            width: SIZES.padding,
            height: SIZES.padding,
            tintColor: COLORS.white,
          }}
          icon={icons.payment}
          label="Recibo de luz, agua, teléfono (reciente)"
        />
        <IconTextButton
          onPress={() => navigation.navigate("Scan")}
          containerStyle={{ marginVertical: SIZES.padding }}
          icon={icons.rec}
          label="Escanear documento"
        />
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray30,
            marginVertical: SIZES.padding,
          }}
        >
          Comprobante de ingresos
        </Text>
        <IconLabel
          iconStyle={{
            width: SIZES.padding,
            height: SIZES.padding,
            tintColor: COLORS.white,
          }}
          icon={icons.payment}
          label="Estados de cuenta bancarios completos"
        />
        <IconTextButton
          onPress={() => navigation.navigate("Scan")}
          containerStyle={{
            marginVertical: SIZES.padding,
          }}
          icon={icons.rec}
          label="Escanear documento"
        />

        <TextButton
          onPress={() => navigation.navigate("NewCreditFinish")}
          containerStyle={{
            backgroundColor: COLORS.lightGreen,
            height: 40,
            marginTop: SIZES.padding,
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

export default Comprobantes;
