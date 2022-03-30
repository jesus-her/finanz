import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

import { LinearGradient } from "expo-linear-gradient";
import HeaderSection from "../components/shared/HeaderSection";
import images from "../constants/images";

import { firestore, auth } from "../../firebase";
import BalanceInfo from "../components/Investment/BalanceInfo";
import IconTextButton from "../components/Investment/IconTextButton";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";

const Section = ({ containerStyle, title, onPress, children }) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        {/*<TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />*/}
      </View>
      {children}
    </View>
  );
};
// @ts-ignore
const HomeScreen = ({ navigation }) => {
  /* const ref = React.useRef(null);
        useScrollToTop(ref);*/
  const ref = useRef();

  const [coins, setCoins] = useState([]);
  const [initialCoin, setInitialCoin] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState([
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ]);
  const [titleChart, setTitleChart] = useState("");
  const [coinName, setCoinName] = useState("");
  const [imageChart, setImageChart] = useState(
    "https://i.imgur.com/T337T6e.png"
  );
  console.log(selectedCoin);
  const onPressTouch = () => {
    this.scrollListReftop.scrollTo({
      x: 0,
      y: 225,
      animated: true,
    });
  };

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
    );
    const data = await res.json();
    setCoins(data);
    // setInitialCoin(data.sparkline_in_7d.price);
    // console.log(initialCoin);
  };

  useEffect(() => {
    loadData();
  }, []);

  const EmptyListMessage = () => {
    return (
      <View
        style={{
          width: SIZES.width,

          padding: SIZES.padding,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            marginVertical: SIZES.padding,
            width: SIZES.heightPlayScreen / 5,
            height: SIZES.heightPlayScreen / 5,
            tintColor: COLORS.gray20,
            alignSelf: "center",
          }}
          source={require("../../assets/icons/no-fire.png")}
        />
        <Text
          style={{ ...FONTS.h1, color: COLORS.primary, textAlign: "center" }}
        >
          There are no popular Quizzes yet!
        </Text>

        <Text
          style={{
            color: COLORS.gray50,
            ...FONTS.h3,
            fontWeight: "bold",
            marginVertical: SIZES.padding,
            textAlign: "center",
          }}
        >
          Explore the quizzes and play your favorites to view them here!
        </Text>
      </View>
    );
  };

  function renderWalletInfoSection() {
    const user = auth.currentUser;
    return (
      <LinearGradient
        colors={[COLORS.black, COLORS.primary0]}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.primary0,
        }}
      >
        {/*Balance Info*/}
        <BalanceInfo
          username={user.displayName}
          title="Your Wallet"
          displayAmount="45,000"
          changePct={2.3}
          containerStyle={{
            marginTop: SIZES.padding,
          }}
        />

        {/*Buttons*/}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transferir"
            icon={icons.send}
            /*    onPress={() => navigation.navigate("Scan")}*/
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
          <IconTextButton
            label="Retirar"
            icon={icons.retirar}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("retirar")}
          />
        </View>
      </LinearGradient>
    );
  }

  const data = {
    labels: ["1h", "1d", "7d", "1w", "3w", "1m"],
    datasets: [
      {
        data: [selectedCoin],
      },
    ],
  };

  function renderChart() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.base,
            }}
          >
            <Image
              source={{ uri: imageChart }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              textTransform: "uppercase",
            }}
          >
            {titleChart != "" ? titleChart : "Select a coin"}
          </Text>
          {coinName ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Buy&Sell", {
                  currentCoinImg: imageChart,
                  currentCoinName: coinName,
                  selectedCoin: selectedCoin,
                })
              }
              style={{
                position: "absolute",
                right: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.lightGreen,
                  ...FONTS.h3,
                  textAlign: "center",
                }}
              >
                Buy & Sell
              </Text>
              {/*Icon*/}

              <Image
                source={icons.right_arrow}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.white,
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <LineChart
          withDots={false}
          data={{
            labels: ["Last 7 days"],
            datasets: [
              {
                data: selectedCoin,
              },
            ],
          }}
          /*   data={data}*/
          width={SIZES.width - SIZES.padding} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: COLORS.primary0,
            backgroundGradientFrom: COLORS.primary,
            backgroundGradientTo: COLORS.primary2 + "10",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              padding: 15,
            },
          }}
          bezier={true}
          style={{
            borderRadius: 16,
            alignSelf: "center",
            marginTop: SIZES.base,
          }}
        />
      </View>
    );
  }

  function renderTopCryptocurrency() {
    return (
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          marginTop: 30,
        }}
        ListHeaderComponent={
          <View style={{ marginBottom: SIZES.radius }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Top Cryptocurrency
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          let priceColor =
            item.price_change_percentage_24h == 0
              ? COLORS.lightGray3
              : item.price_change_percentage_24h > 0
              ? COLORS.lightGreen
              : COLORS.red;
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedCoin(item.sparkline_in_7d.price.slice(0, 10));
                setTitleChart(item.symbol);
                setImageChart(item.image);
                setCoinName(item.name);
                onPressTouch();
              }}
              style={{
                height: 55,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/*Logo*/}
              <View style={{ width: 35 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
              {/*Name*/}
              <View style={{ flex: 1 }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                  {item.name}
                </Text>
              </View>
              {/*Figures*/}
              <View>
                <Text
                  style={{
                    textAlign: "right",
                    color: COLORS.white,
                    ...FONTS.h4,
                  }}
                >
                  $ {item.current_price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.price_change_percentage_24h != 0 && (
                    <Image
                      source={icons.upArrow}
                      style={{
                        height: 10,
                        width: 10,
                        tintColor: priceColor,
                        transform:
                          item.price_change_percentage_24h > 0
                            ? [{ rotate: "45deg" }]
                            : [{ rotate: "125deg" }],
                      }}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: 5,
                      color: priceColor,
                      ...FONTS.h5,
                      lineHeight: 15,
                    }}
                  >
                    {item.price_change_percentage_24h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.secondary0}
        barStyle={"light-content"}
      />
      <HeaderSection
        title=""
        onPress={() => navigation.openDrawer()}
        icon={images.drawer}
        /* source={require("../../assets/logo/TheQuizTitle2.png")}*/
      />
      <View style={styles.container}>
        <ScrollView
          ref={(ref) => {
            this.scrollListReftop = ref;
          }}
          contentContainerStyle={{
            paddingBottom: 75,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/*Render Header Section*/}
          {renderWalletInfoSection()}

          {/*Render Chart*/}
          {renderChart()}

          {/*Render Top Cryptocurrency*/}
          {renderTopCryptocurrency()}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    height: SIZES.height - SIZES.heightNav,
    width: SIZES.width,
    /* resizeMode: "contain",*/
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: "60%",
    borderRadius: SIZES.radius,
    overflow: "hidden",
    alignSelf: "center",
  },
  appName: {
    resizeMode: "contain",
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary2,
    letterSpacing: 7,
    textAlign: "center",
  },
  subtitle: {
    ...FONTS.h2,
    color: COLORS.primary2,
    letterSpacing: 5,
    textAlign: "center",
  },
  buttonContainer: {
    height: SIZES.height / 4,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default HomeScreen;
