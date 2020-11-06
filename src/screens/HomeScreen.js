import React, { useState , useEffect} from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
 
} from "react-native";

import {
    Card,
    Button,
    Text,
    Avatar,
    Input,
    Header,
  } from "react-native-elements";
  import { AntDesign, Entypo } from "@expo/vector-icons";
  import { AuthContext } from "../providers/AuthProvider";
  import PostCard from "./../components/PostCard";

  import { storeDataJSON } from "../functions/AsyncStorageFunctions";
  import { addDataJSON , getDataJSON } from "../functions/AsyncStorageFunctions";
  import moment from 'moment';


 
const HomeScreen = (props) => {

  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
 


  
 const Inputcard = (auth) => {
   
                
    return (
      <Card>
        <Input
          placeholder="What's On Your Mind?"
          leftIcon={<Entypo name="pencil" size={24} color="black" />}
          onChangeText={function (currentInput) {
            setPost(currentInput);
          }}
        />
        <Button
          title="Post"
          type="outline"
          onPress={function () {
           let  newpost = {
              user: auth.CurrentUser,
              time: moment().format('DD MMM, YYYY'),
              postid=auth.CurrentUser.Email + moment().format('YYYY-MM-DD hh:mm:ss a'),
              body: post,
            };
            if (posts == undefined) {
              setPosts([newpost]);
              storeDataJSON(postid, [newpost]);
            } else {
              setPosts([...posts, newpost]);
              addDataJSON(postid, newpost);
            }
          }}
        />
      </Card>
    );
  };
  const loadPosts = async () => {
    setLoading(true);

    let allpost = await getDataJSON(postid);
    setPosts(allpost);
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


        <FlatList
          ListHeaderComponent={Inputcard(auth)}
          data={posts}
          renderItem={({ item }) => {
            return (
              <PostCard
                author={item.user.name}
                title={'Posted on ' + item.time}
                body={item.body}
                navigation={props.navigation}
                post={item}
              />
            );
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

export default HomeScreen;

