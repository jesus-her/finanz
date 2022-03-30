import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = React.useState(null);

  const dimensions = useRef(Dimensions.get("window"));
  const screenWidth = dimensions.current.width;
  const height = Math.round((screenWidth * 16) / 9);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      // @ts-ignore
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              height: 20,
              width: 40,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            Scan your document
          </Text>
        </View>

        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.primary2,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Info")}
        >
          <Image
            source={icons.info}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderScanFocus() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            width: SIZES.width - SIZES.padding * 2,
            height: SIZES.height / 4,
          }}
        />
      </View>
    );
  }

  function renderPaymentMethods() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          position: "absolute",
          bottom: SIZES.padding,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => console.log("Shot")}
      >
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: COLORS.lightGreen,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
        >
          <Image
            source={icons.rec}
            resizeMode="cover"
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function onBarCodeRead(result) {
    console.log(result.data);
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <Camera
        ratio="16:9"
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{ height: height, width: "100%" }}
        captureAudio={false}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
        onBarCodeScanned={onBarCodeRead}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "Camera is required for barcode scanning",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }}
      >
        {renderHeader()}
        {renderScanFocus()}
      </Camera>
      {renderPaymentMethods()}
    </View>
  );
};

export default Scan;
