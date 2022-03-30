import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { COLORS, FONTS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const Transactions = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    axios
      .get(`https://randomuser.me/api/?page=${currentPage}&results=10`)
      .then((res) => {
        //setUsers(res.data.results);
        setUsers([...users, ...res.data.results]);
        console.log(users);
        setIsLoading(false);
      });
  };

  const renderItem = ({ item }) => {
    let priceColor =
      item.location.coordinates.latitude == 0
        ? COLORS.lightGray3
        : item.location.coordinates.latitude > 0
        ? COLORS.lightGreen
        : COLORS.red;
    return (
      <TouchableOpacity activeOpacity={0.55} style={styles.itemWrapperStyle}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.itemImageStyle}
            source={{ uri: item.picture.large }}
          />
          <View style={styles.contentWrapperStyle}>
            <Text
              style={styles.txtNameStyle}
            >{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
            <Text style={styles.txtEmailStyle}>{item.email}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: priceColor, ...FONTS.h3 }}>
            $ {item.location.coordinates.latitude.slice(0, 5)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <>
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.white,
          paddingHorizontal: SIZES.padding,
          marginBottom: SIZES.base,
          marginTop: SIZES.padding,
        }}
      >
        Transactions
      </Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: SIZES.base,
    paddingVertical: 16,
    borderBottomWidth: 3,
    borderColor: COLORS.lightGray,
    justifyContent: "space-between",
    marginHorizontal: SIZES.padding,
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  txtEmailStyle: {
    color: COLORS.gray50,
    ...FONTS.h5,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default Transactions;
