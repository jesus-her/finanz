import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import { COLORS, FONTS, SIZES } from "../constants";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
          setContacts(data);
        }
      }
    })();
  }, []);

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
        Send Money
      </Text>
      <View
        style={{
          backgroundColor: COLORS.primary0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          scrollEnabled={true}
          data={contacts}
          keyExtractor={(item) => item.id}
          horizontal={true}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: SIZES.heightPlayScreen / 7,
          }}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: "column",
                    height: SIZES.heightPlayScreen / 7,
                    width: SIZES.heightPlayScreen / 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.firstName != "9-1-1" ? (
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary2,
                        justifyContent: "center",
                        borderColor: COLORS.gray30,
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.h2,
                          color: COLORS.white,
                          alignSelf: "center",
                        }}
                      >
                        {item.firstName.slice(0, 2)}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        borderStyle: "dashed",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.25)",

                        alignSelf: "center",
                      }}
                    >
                      <Text style={{ ...FONTS.h1, color: COLORS.white }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.white,
                      marginTop: SIZES.base,
                    }}
                  >
                    {item.firstName != "9-1-1" ? item.firstName : null}
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </>
  );
}
