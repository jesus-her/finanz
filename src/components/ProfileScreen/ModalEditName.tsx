import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Alert,
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

const ModalEditName = ({ modalNameVisible, setModalNameVisible, title }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [isNewNameLoading, setIsNewNameLoading] = useState(false);
  const [error, setError] = useState("");

  //Validate Create QUIZ
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 4500);
  };

  //Conditions an error messages
  const isValidForm = () => {
    //Only if all of the fields have value
    if (newName == "") {
      setIsNewNameLoading(false);

      setNewName("");
      setModalNameVisible(false);
    }

    if (!newName.trim() || newName.length < 3)
      return updateError("Name must have at least 3 characters", setError);

    return true;
  };
  //Reauthenticate
  /* reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };*/

  //Set a new password
  const handleOnChangeName = () => {
    if (isValidForm()) {
      setIsNewNameLoading(true);
      var user = auth.currentUser;
      user
        .updateProfile({ displayName: newName })
        .then(() => {
          setIsNewNameLoading(false);
          ToastAndroid.show("New name saved!", ToastAndroid.LONG);
          setNewName("");
          setModalNameVisible(false);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
    /*  this.reauthenticate(currentPassword).then(() => {
      var user = auth.currentUser;
      user
        .updateProfile({ displayName: newName })
        .then(() => {
          ToastAndroid.show("New name saved!", ToastAndroid.LONG);
          setCurrentPassword("");
          setNewName("");
          setModalNameVisible(false);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    });*/
  };
  const user = auth.currentUser;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalNameVisible}
      onRequestClose={() => {
        setModalNameVisible(false);
      }}
    >
      {isNewNameLoading ? <Loader /> : null}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Ionicons
              name="close"
              color={COLORS.white}
              size={35}
              onPress={() => {
                setModalNameVisible(!modalNameVisible);
              }}
            />
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              Edit {title}
            </Text>
            <Ionicons
              name="checkmark-circle"
              size={35}
              color={COLORS.lightGreen}
              onPress={handleOnChangeName}
            />
          </View>
          <View style={styles.textInputContainer}>
            {error ? (
              <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
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
              {/* <FormInput
                autoCapitalize="none"
                labelText="Current Password"
                placeholderText="Enter your current password"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={(value) => setCurrentPassword(value)}
              />*/}
              {/*Enter a new (password, email, etc)*/}
              <FormInput
                labelText="Name"
                placeholderText={user.displayName}
                secureTextEntry={false}
                value={newName}
                onChangeText={(value) => setNewName(value)}
              />

              {/*SET BUTTON*/}
              {/*<FormButton
                onPress={handleOnChangeName}
                labelText="Set New Name"
                style={{ width: "100%" }}
              />*/}
            </View>
          </View>
        </View>
      </View>
    </Modal>
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

export default ModalEditName;
