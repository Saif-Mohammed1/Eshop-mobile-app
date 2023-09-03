import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/axios/axios";
import { setCurrentUser } from "../../store/user/userSlice";

const CustomDrawerContent = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPress = () => {
    navigation.navigate("Login");
  };

  const SignOut = async () => {
    try {
      await api.post("/logout");
      await AsyncStorage.clear(); // Clear the entire storage when the user signs out
      dispatch(setCurrentUser(null));
    } catch (error) {
      Alert.alert(error);
      console.log("error", error);
    }
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="contact us"
          onPress={() => navigation.navigate("Contact Us")}
        />
      </DrawerContentScrollView>
      <View style={styles.userContainer}>
        {currentUser ? (
          <TouchableOpacity style={styles.userButton} onPress={SignOut}>
            <Entypo name="log-out" size={24} color="black" />
            <Text style={styles.userButtonText}>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.userButton} onPress={onPress}>
            <Entypo name="login" size={24} color="black" />
            <Text style={styles.userButtonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    padding: 16,
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userButtonText: {
    fontSize: 18,
  },
});

export default CustomDrawerContent;
