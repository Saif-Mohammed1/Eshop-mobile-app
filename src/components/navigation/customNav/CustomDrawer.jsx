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
} from "react-native";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomDrawerContent = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Log-In");
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL("https://mywebsite.com/help")}
        />
      </DrawerContentScrollView>
      <View style={styles.userContainer}>
        {currentUser ? (
          <TouchableOpacity style={styles.userButton}>
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
