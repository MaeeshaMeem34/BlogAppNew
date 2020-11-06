import React, { useState, useEffect } from "react";
import { View, StyleSheet, } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import PostCard from "./../components/PostCard";
import { addDataJSON , getDataJSON } from "../functions/AsyncStorageFunctions";

const PostScreen = (props) => {

  const [loading, setLoading] = useState(false);


  const loadPosts = async () => {
    setLoading(true);

    let allpost = await getDataJSON("Post");
    return allpost;
  };

  useEffect(() => {
    loadPosts();
  }, [])

  return (


  
 
    <AuthContext.Consumer>
    {(auth) => (
      <View style={styles.viewStyle}>
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
       
      </View>
    )}
  </AuthContext.Consumer>
);
            }

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default PostScreen;