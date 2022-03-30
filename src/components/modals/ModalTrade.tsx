import { COLORS, FONTS, icons, SIZES } from "../../constants";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import { auth } from "../../../firebase";
import * as firebase from "firebase";
import QuizLoader from "../QuizLoader";
import IconTextButton from "../Investment/IconTextButton";
import { rgb } from "color";
import { LinearGradient } from "expo-linear-gradient";

const ModalTrade = ({ tradeModalVisible, setTradeModalVisible, title }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={tradeModalVisible}
      onRequestClose={() => {
        setTradeModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.black]}
          style={styles.modalView}
        >
          <View style={styles.modalHeader}>
            <Ionicons
              name="close"
              size={35}
              color={COLORS.white}
              style={{
                position: "absolute",
                left: 0,
              }}
              onPress={() => {
                setTradeModalVisible(!tradeModalVisible);
              }}
            />
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              Transacción
            </Text>
          </View>
          <View style={styles.textInputContainer}>
            {/*Buttons*/}
            <View
              style={{
                flexDirection: "column",
                marginTop: 30,
                marginBottom: -15,
                paddingHorizontal: SIZES.radius,
                height: SIZES.height / 5,
                justifyContent: "space-around",
                width: "100%",

                borderRadius: SIZES.radius,
              }}
            >
              <IconTextButton
                label="Transferir"
                icon={icons.send}
                containerStyle={{
                  height: 40,
                  marginRight: SIZES.radius,
                }}
                onPress={() => console.log("transfer")}
              />
              <IconTextButton
                label="Retirar"
                icon={icons.retirar}
                containerStyle={{
                  height: 40,
                  marginRight: SIZES.radius,
                }}
                onPress={() => console.log("retirar")}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "transparent",
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    /*backgroundColor: COLORS.primary,*/
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 10,
    width: "100%",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textInputContainer: {
    marginVertical: SIZES.padding,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalTrade;
