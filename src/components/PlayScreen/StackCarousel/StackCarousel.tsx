import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("screen");
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";

// https://www.creative-flyers.com
const DATA = [
  {
    title: "$15,516.00",
    location: "Mumbai, India",
    date: "Mar 17th, 2023",
    poster: "https://i.imgur.com/aFRdl0Pl.png",
    name: "Jesús Hernández",
    number: "**** **** **** 4615",
    exp: "03/23",
    bank: "VISA",
  },
  {
    title: "$68,245.00",
    location: "Unknown",
    date: "Sept 3rd, 2026",
    poster: "https://i.imgur.com/aFRdl0Pl.png",
    name: "Jesús Hernández",
    number: "**** **** **** 5181",
    exp: "09/26",
    bank: "Mastercard",
  },
  {
    title: "$4,558.15",
    location: "New York, USA",
    date: "Jun 11th, 2025",
    poster: "https://i.imgur.com/aFRdl0Pl.png",
    name: "Jesús Hernández",
    number: "**** **** **** **** 8970",
    exp: "06/25",
    bank: "VISA",
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 0;
const ITEM_WIDTH = width * 0.5;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <AntDesign name="creditcard" size={16} color="white" />{" "}
                  {item.bank}
                </Text>
                <Text style={[styles.date]}>Exp: {item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function StackCarousel() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <LinearGradient
          colors={[COLORS.black, COLORS.primary0]}
          start={{ x: 1, y: 0.1 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: ITEM_WIDTH * 2,
            justifyContent: "center",
            backgroundColor: COLORS.primary0,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <>
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: -ITEM_HEIGHT / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.poster }}
                      imageStyle={{
                        borderRadius: SIZES.radius,
                      }}
                      style={{
                        width: ITEM_HEIGHT,
                        height: ITEM_WIDTH,
                        padding: SIZES.padding,
                        position: "relative",
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.h3,
                          color: COLORS.white,
                          position: "absolute",
                          top: SIZES.padding,
                          left: SIZES.padding,
                        }}
                      >
                        {item.bank}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.h2,
                          color: COLORS.white,
                          position: "absolute",
                          top: SIZES.padding * 2.5,
                          left: SIZES.padding,
                        }}
                      >
                        {item.number}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.white,
                          position: "absolute",
                          bottom: SIZES.padding,
                          left: SIZES.padding,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.white,
                          position: "absolute",
                          bottom: SIZES.padding,
                          right: SIZES.padding,
                        }}
                      >
                        Exp: {item.exp}
                      </Text>
                    </ImageBackground>
                  </Animated.View>
                </>
              );
            }}
          />
          <TouchableOpacity
            style={{
              marginBottom: SIZES.padding,
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.lightGreen }}>
              + Add new card
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  title: {
    ...FONTS.h1,
    textTransform: "uppercase",
    letterSpacing: -1,
    color: COLORS.white,
    marginLeft: SIZES.padding,
  },
  location: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: SIZES.padding,
  },
  date: {
    ...FONTS.h5,
    color: COLORS.white,
    marginRight: SIZES.padding,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});
