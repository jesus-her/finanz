import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { COLORS, icons, images, constants, SIZES, FONTS } from "../constants";
import HeaderSection from "../components/shared/HeaderSection";
import TextButton from "../components/Investment/TextButton";
import { LineChart } from "react-native-chart-kit";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX, scrollY }) => {
  return (
    <View>
      {marketTabs.map((_, i) => {
        const inputRange = marketTabs.map((_, i) => i * SIZES.width);
        const indicatorWidth = scrollX.interpolate({
          inputRange,
          outputRange: measureLayout.map((measure) => measure.width),
          extrapolate: "clamp",
        });
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: measureLayout.map((measure) => measure.x),
        });
        /*  const translateY = scrollY.interpolate({
            inputRange,
            outputRange: measureLayout.map((measure) => measure.y),
          });*/

        return (
          <Animated.View
            style={{
              position: "absolute",
              left: /*measureLayout[0].x*/ 0,
              height: "100%",
              width: indicatorWidth,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray,
              transform: [
                {
                  translateX,
                },
              ],
            }}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const Tabs = ({ scrollX, scrollY, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];
    marketTabs.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);
  console.log(measureLayout);

  return (
    <View ref={containerRef} style={{ flexDirection: "row" }}>
      {/*Tab Indicator*/}
      {measureLayout.length > 0 && (
        <TabIndicator
          measureLayout={measureLayout}
          scrollX={scrollX}
          scrollY={scrollY}
        />
      )}

      {/*Tabs*/}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            onPress={() => onMarketTabPress(index)}
            style={{
              flex: 1,
            }}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();
  const onMarketTabPress = useCallback((marketTabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  const [coins, setCoins] = useState([]);

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
    );
    const data = await res.json();
    setCoins(data);
    /*console.log(data);*/
  };

  useEffect(() => {
    loadData();
  }, []);

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs
          scrollX={scrollX}
          scrollY={scrollY}
          onMarketTabPress={onMarketTabPress}
        />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label="USD" />
        <TextButton
          label="% 7d"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        data={marketTabs}
        ref={marketTabScrollViewRef}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    /* item.price_change_percentage_7d_in_currency == 0
                                          ? COLORS.lightGray3
                                          : item.price_change_percentage_7d_in_currency > 0
                                          ? COLORS.lightGreen
                                          : COLORS.red;*/
                    item.price_change_percentage_24h == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_24h > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: SIZES.padding,
                          marginBottom: SIZES.radius,
                          alignItems: "center",
                        }}
                      >
                        {/*Coins*/}
                        <View
                          style={{
                            flex: 1.5,
                            flexDirection: "row",
                            alignItems: "center",

                            maxWidth: SIZES.width / 3,
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 20, height: 20 }}
                          />
                          <Text
                            numberOfLines={2}
                            style={{
                              marginLeft: SIZES.radius,
                              color: COLORS.white,

                              fontSize: item.name.length > 9 ? 12 : 16,
                              fontWeight: "bold",
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                        {/*Charts*/}
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                          }}
                        >
                          <LineChart
                            withHorizontalLabels={false}
                            withVerticalLabels={false}
                            withDots={false}
                            withInnerLines={false}
                            withVerticalLines={false}
                            withOuterLines={false}
                            data={{
                              datasets: [
                                {
                                  data: item.sparkline_in_7d.price.slice(0, 7),
                                },
                              ],
                            }}
                            width={100}
                            height={60}
                            chartConfig={{
                              backgroundColor: COLORS.black,
                              backgroundGradientFrom: COLORS.black,
                              backgroundGradientTo: COLORS.black,
                              color: () => priceColor,
                            }}
                            bezier
                            style={{
                              paddingRight: 0,
                            }}
                          />
                        </View>
                        {/*Figures*/}
                        <View
                          style={{
                            flex: 1,
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              ...FONTS.h4,
                              color: COLORS.white,
                            }}
                          >
                            $ {item.current_price}
                          </Text>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            {item.price_change_percentage_7d_in_currency !=
                              0 && (
                              <Image
                                source={icons.upArrow}
                                style={{
                                  width: 10,
                                  height: 10,
                                  tintColor: priceColor,
                                  transform:
                                    item.price_change_percentage_7d_in_currency >
                                    0
                                      ? [{ rotate: "45deg" }]
                                      : [{ rotate: "125deg" }],
                                }}
                              />
                            )}
                            <Text
                              style={{
                                marginLeft: 5,
                                color: priceColor,
                                ...FONTS.body5,
                              }}
                            >
                              {item.price_change_percentage_24h.toFixed(2)}%
                            </Text>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/*Header*/}
      <HeaderSection
        title="Market"
        icon={images.drawer}
        onPress={() => navigation.openDrawer()}
      />
      {/*Tab Bar*/}
      {renderTabBar()}
      {/*Buttons*/}
      {renderButtons()}
      {/*Market List*/}
      {renderList()}
    </View>
  );
};
export default Market;
