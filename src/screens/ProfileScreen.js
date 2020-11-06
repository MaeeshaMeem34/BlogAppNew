import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ProfileScreen = () => {
  let $ = ":";
  const myself = [
    { value: "Maeesha Tasmeem", key: "Name" },
    { value: "170042034", key: "Id" },
    { value: "306,FHR", key: "RoomNo" },
    { value: "meem@gmail.com", key: "Email" },
  ];
  return (
    <View>
      

      <FlatList
        data={myself}
        renderItem={function ({ item }) {
          return (
            <Text style={styles.textStyle}>
              {item.key}
              {$} {item.value}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: "blue",
    marginTop: 5,
    textAlign: "left",
    paddingLeft: 30,
  },

  
});


export default ProfileScreen;