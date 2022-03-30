import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Button,
  ToastAndroid,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { COLORS, FONTS } from "../constants";
import { signUp } from "../utils/auth";
import { firestore } from "../../firebase";
import AppLoader from "../components/AppLoader";

const SignUpScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);
  const [icon2, setIcon2] = useState("eye");
  const [hidePassword2, setHidePassword2] = useState(true);

  //Validate Create QUIZ
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

  //Conditions an error messages
  const isValidForm = () => {
    //Only if all of the fields have value
    if (
      displayName == "" &&
      email == "" &&
      password == "" &&
      confirmPassword == ""
    )
      return updateError("Required all fields!", setError);
    //If title have 3 or more characters
    if (!displayName.trim() || displayName.length < 3)
      return updateError("Invalid name", setError);
    //Validating email
    if (!isValidEmail(email))
      return updateError("Invalid email address", setError);
    //
    if (!password.trim() || password.length < 8)
      return updateError("Password must have at least 8 characters", setError);
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);
    return true;
  };

  const handleOnSubmit = () => {
    if (isValidForm()) {
      setIsLoading(true);
      signUp(email, password, displayName, setIsLoading, setError);
    }
  };

  const _changeIcon = () => {
    icon !== "eye-off"
      ? (setIcon("eye-off"), setHidePassword(false))
      : (setIcon("eye"), setHidePassword(true));
  };
  const _changeIcon2 = () => {
    icon2 !== "eye-off"
      ? (setIcon2("eye-off"), setHidePassword2(false))
      : (setIcon2("eye"), setHidePassword2(true));
  };
  /*const handleOnSubmit = () => {
    if (isValidForm()) {
      signUp(email, password, displayName);
      /!*if (
        email != "" &&
        password != "" &&
        confirmPassword != "" &&
        displayName != ""
      ) {
        //   SignUp
        signUp(email, password, displayName);
      } else {
        Alert.alert("Error please try again");
      }*!/
    }
  };*/

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            backgroundColor: COLORS.primary0,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 20,
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: 24,
              color: COLORS.white,
              fontWeight: "bold",
              marginVertical: 32,
            }}
          >
            Sign Up
          </Text>

          {/* Username */}
          {error ? (
            <Text style={{ color: "red", ...FONTS.h4, textAlign: "center" }}>
              {error}
            </Text>
          ) : null}
          <FormInput
            labelText="Username"
            placeholderText="Username or Nickname"
            onChangeText={(value) => setDisplayName(value)}
            /*value={displayName}*/
          />
          {/*<Button title="save username" onPress={() => saveNewUser()} />*/}

          {/* Email */}
          <FormInput
            autoCapitalize="none"
            labelText="Email"
            placeholderText="Enter your email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            keyboardType={"email-address"}
          />

          {/* Password */}
          <FormInput
            labelText="Password"
            placeholderText="Enter your password"
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={hidePassword}
            icon={icon}
            color={COLORS.white}
            _changeIcon={_changeIcon}
          />

          {/* Confirm Password */}
          <FormInput
            labelText="Confirm Password"
            placeholderText="Confirm your password"
            onChangeText={(value) => setConfirmPassword(value)}
            value={confirmPassword}
            secureTextEntry={hidePassword2}
            icon2={icon2}
            color={COLORS.white}
            _changeIcon2={_changeIcon2}
          />

          {/* Submit button */}
          <FormButton
            labelText="Sign up"
            handleOnPress={handleOnSubmit}
            style={{ width: "100%" }}
          />

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ color: COLORS.white, ...FONTS.h4, fontWeight: "900" }}
            >
              Already have an account?
            </Text>
            <Text
              style={{ marginLeft: 4, color: COLORS.primary2, ...FONTS.h4 }}
              onPress={() => navigation.navigate("SignInScreen")}
            >
              Sign in
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {isLoading ? <AppLoader /> : null}
    </>
  );
};

export default SignUpScreen;
