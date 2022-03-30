import { COLORS, FONTS, icons, SIZES } from "../../constants";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { auth, storage } from "../../../firebase";

import * as ImagePicker from "expo-image-picker";

import Loader from "../Loader";

const ModalEditPhoto = ({ modalPhotoVisible, setModalPhotoVisible, title }) => {
  const [photoURL, setPhotoURL] = useState("https://i.imgur.com/IN5sYw6.png");
  const [imageUri, setImageUri] = useState("https://i.imgur.com/IN5sYw6.png");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const uid = auth.currentUser.uid;
  //Reauthenticate
  /*
  reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
*/

  const handleOnChangePhoto = () => {
    var user = auth.currentUser;
    user
      .updateProfile({ photoURL: photoURL })
      .then(() => {
        ToastAndroid.show("New photo saved!", ToastAndroid.LONG);
        setModalPhotoVisible(false);

        setImageUri("https://i.imgur.com/IN5sYw6.png");
      })
      .catch((error) => {
        Alert.alert(error.message);
        console.log(error.message);
      });

    /*firestore.collection("Quizzes").where("userId", "==", uid).update;*/
    /*  db.ref("Quizzes")
      .where("userId", "==", uid)
      .update({ ownerPhotoURL: photoURL })
      .then(() => {
        console.log("update");
      });*/
    /*firestore
          .collection("Quizzes")
          .where("userId", "==", uid)
          .set({ ownerPhotoURL: photoURL })
          .then(() => {
              console.log("it works");
          });*/

    // Load PhotoURL to Firebase  SignUp
    // this.reauthenticate(currentPassword)
    //   .then(() => {
    //     var user = auth.currentUser;
    //     user
    //       .updateProfile({ photoURL: photoURL })
    //       .then(() => {
    //         ToastAndroid.show("New photo saved!", ToastAndroid.LONG);
    //         setCurrentPassword("");
    //         setModalPhotoVisible(false);
    //       })
    //       .catch((error) => {
    //         Alert.alert(error.message);
    //       });
    //   })
    //   .catch((error) => {
    //     Alert.alert(error.message);
    //   });
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    console.log(result);
    if (!result.cancelled) {
      setIsImageLoading(true);
      this.uploadImage(result.uri)
        .then(() => {
          console.log("Image Uploaded");
          /*   setIsImageLoading(false);*/
        })
        .catch((error) => {
          Alert.alert(error);
        });
      setImageUri(result.uri);
      /* firestore
        .collection("Quizzes")
        .where("userId", "==", uid)
        .update({ ownerPhotoURL: photoURL })
        .then(() => {
          console.log("it works");
        });*/
    }
  };

  //Upload Image to Firebase
  uploadImage = async (uri) => {
    const currentPhotoUrlID = Math.floor(
      100000 + Math.random() * 9000
    ).toString();
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      var ref = storage.ref(`/images/users/profilePhotos/${currentPhotoUrlID}`);
      await ref
        .put(blob)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          console.log("you image:" + downloadURL);
          setPhotoURL(downloadURL);
          setIsImageLoading(false);

          return downloadURL;
        });

      return null;
    } catch (error) {
      return null;
    }
  };
  const user = auth.currentUser;
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPhotoVisible}
        onRequestClose={() => {
          setModalPhotoVisible(false);
        }}
      >
        {isImageLoading ? <Loader /> : null}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="close"
                color={COLORS.white}
                size={35}
                onPress={() => {
                  setModalPhotoVisible(!modalPhotoVisible);
                }}
              />
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Edit {title}
              </Text>

              <Ionicons
                name="checkmark-circle"
                size={35}
                color={COLORS.lightGreen}
                onPress={handleOnChangePhoto}
              />
            </View>
            <View style={styles.textInputContainer}>
              {/*<FormInput
                autoCapitalize="none"
                labelText="Current Password"
                placeholderText="Enter your current password"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={(value) => setCurrentPassword(value)}
              />*/}
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.black,
                  padding: SIZES.radius,
                  borderRadius: SIZES.radius,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={selectImage}
                >
                  {/*  {user.photoURL === null ? (*/}
                  {/* <Image
                      source={{ uri: photoURL }}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: COLORS.white,
                      }}
                    />*/}

                  <Image
                    source={{
                      uri: imageUri,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: COLORS.white,
                    }}
                  />

                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        marginBottom: -15,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.primary2,
                        borderRadius: 15,
                      }}
                    >
                      {/* Camera Icon*/}
                      <Image
                        source={icons.camera}
                        resizeMode="contain"
                        style={{
                          width: 17,
                          height: 17,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

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
    </>
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

export default ModalEditPhoto;
