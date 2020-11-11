import React from "react";
import { Title, Text, T } from "react-native-paper";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { Button, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { removeData } from "../functions/AsyncStorageFunctions";

const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.container}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />

          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Image
                style={{ width: 150, height: 150, borderRadius: 200 / 2 }}
                source={require("./../../assets/user.jpg")}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 50,

                      marginBottom: 5,
                    },
                  ]}
                >
                  {auth.CurrentUser.name}
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <FontAwesome name="birthday-cake" size={24} color="#777777" />
              <Text style={{ color: "#777777", marginLeft: 20, fontSize: 20 }}>
                {" "}
                Born on 22 July, 1997{" "}
              </Text>
            </View>

            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={30} />
              <Text style={{ color: "#777777", marginLeft: 20, fontSize: 20 }}>
                Dhaka, Bangladesh
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={30} />
              <Text style={{ color: "#777777", marginLeft: 20, fontSize: 20 }}>
                01923-789900
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={30} />
              <Text style={{ color: "#777777", marginLeft: 20, fontSize: 20 }}>
                {auth.CurrentUser.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              paddingTop: 100,
            }}
          >
            <Button
              type="solid"
              icon={<AntDesign name="deleteuser" size={24} color="black" />}
              title=" Delete Profile"
              onPress={function () {
                removeData(auth.CurrentUser.email);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </AuthContext.Consumer>
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
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default ProfileScreen;
