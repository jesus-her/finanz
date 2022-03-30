import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import LottieView from "lottie-react-native";

import CreditCardForm, { Button, FormModel } from "rn-credit-card";
import { COLORS } from "../constants";
import StackCarousel from "../components/PlayScreen/StackCarousel/StackCarousel";
import images from "../constants/images";
import HeaderSection from "../components/shared/HeaderSection";
import ContactsList from "../components/ContactsList";
import Transactions from "../components/Transactions";

const Wallet = ({ navigation }) => {
  return (
    <>
      <HeaderSection
        title="Wallet"
        onPress={() => navigation.openDrawer()}
        icon={images.drawer}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StackCarousel />
          <ContactsList />
          <Transactions />
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

export default Wallet;
