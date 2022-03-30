import { COLORS, FONTS, SIZES } from "../../constants";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import { auth } from "../../../firebase";
import Loader from "../Loader";

const ModalEditEmail = ({ modalEmailVisible, setModalEmailVisible, title }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [isNewEmailLoading, setIsNewEmailLoading] = useState(false);

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 4500);
  };

  //Validating email
  const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([[A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  //Conditions for Sign In
  const isValidForm = () => {
    //Only if all of the fields have value
    /*  if (currentPassword == "")
      return updateError("Required your current password!", setError);*/
    //Validating email
    if (!isValidEmail(newEmail))
      return updateError("Invalid email address", setError);
    //
    if (newEmail !== confirmEmail)
      return updateError("Emails does not match!", setError);

    return true;
  };

  //Set a new password
  const handleOnChangeEmail = () => {
    if (isValidForm()) {
      setIsNewEmailLoading(true);
      /*  this.reauthenticate(currentPassword)
        .then(() => {*/
      var user = auth.currentUser;
      user
        .updateEmail(newEmail)
        .then(() => {
          ToastAndroid.show("New email address saved!", ToastAndroid.LONG);
          setCurrentPassword("");
          setNewEmail("");
          setConfirmEmail("");
          setModalEmailVisible(false);
          setIsNewEmailLoading(false);
        })
        .catch((error) => {
          setIsNewEmailLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEmailVisible}
        onRequestClose={() => {
          setModalEmailVisible(false);
        }}
      >
        {isNewEmailLoading ? <Loader /> : null}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="close"
                color={COLORS.white}
                size={35}
                onPress={() => {
                  setModalEmailVisible(!modalEmailVisible);
                }}
              />
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Edit {title}
              </Text>
              <Ionicons
                name="checkmark-circle"
                size={35}
                color={COLORS.lightGreen}
                onPress={handleOnChangeEmail}
              />
            </View>
            <View style={styles.textInputContainer}>
              {error ? (
                <Text
                  style={{ color: "red", ...FONTS.h4, textAlign: "center" }}
                >
                  {error}
                </Text>
              ) : null}
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.black,
                  elevation: 3,
                  borderRadius: SIZES.radius,
                  padding: SIZES.radius,
                }}
              >
                {/*Authentication Password */}
                {/*<FormInput
                  autoCapitalize="none"
                  labelText="Current Password"
                  placeholderText="Enter your current password"
                  secureTextEntry={true}
                  value={currentPassword}
                  onChangeText={(value) => setCurrentPassword(value)}
                />*/}
                {/*Enter a new (password, email, etc)*/}
                <FormInput
                  autoCapitalize="none"
                  labelText="New Email"
                  placeholderText="Enter your new email address"
                  secureTextEntry={false}
                  value={newEmail}
                  onChangeText={(value) => setNewEmail(value)}
                />
                {/* Confirm a new (password, email, etc)*/}
                <FormInput
                  autoCapitalize="none"
                  labelText="Confirm New Email"
                  placeholderText="Confirm your new email address"
                  onChangeText={(value) => setConfirmEmail(value)}
                  value={confirmEmail}
                  secureTextEntry={false}
                />

                {/*SET BUTTON*/}
                {/*<FormButton
                onPress={handleOnChangeEmail}
                labelText="Set New Email"
                style={{ width: "100%" }}
              />*/}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: COLORS.black + "70",
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    backgroundColor: COLORS.primary0,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 5,
    width: "95%",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  textInputContainer: {
    marginVertical: SIZES.padding,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalEditEmail;
