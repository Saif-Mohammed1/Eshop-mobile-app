import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { validateInput } from "../utils/formAction";
import { Entypo, Ionicons } from "@expo/vector-icons";
import api from "../utils/axios/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentUser, setUserAdmin } from "../store/user/userSlice";

const SignUp = ({ navigation }) => {
  const [formFailed, setFormFailed] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState([]);
  const [visible, setVisible] = useState(false);
  const { email, password, name, confirmPassword } = formFailed;

  const navigate = () => {
    navigation.navigate("Log-In");
  };
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (confirmPassword !== password) {
      setError({
        email: null,
        password: null,
        name: null,
        confirmPassword: ["must match the original password"],
      });
      return;
    }
    setError([]);
    try {
      const {
        data: { user, admin, token },
      } = await api.post("/signup", {
        email,
        password,
        name,
        confirmPassword,
      });
      await AsyncStorage.setItem("Token", token);
      dispatch(setCurrentUser(user));
      dispatch(setUserAdmin(admin));
      setError({
        email: null,
        password: null,
        name: null,
        confirmPassword: null,
      });
      setFormFailed({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      });
      navigation.navigate("HomeScreen");
    } catch (error) {
      if (error.response.status === 422) {
        setError(error.response.data.errors);
      }
      Alert.alert("oops something went wrong please try again later", error);
    }
  };
  const googleSignIn = () => {
    api
      .get("/auth/google")
      .then((response) => {
        response.data.redirect;
        console.log("res", response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const changeHandler = (field, value) => {
    let result;
    field === "confirmPassword"
      ? (result = validateInput(field, { password, confirmPassword: value }))
      : (result = validateInput(field, value));
    if (result) {
      setError((preError) => ({ ...preError, ...result }));
    } else if (result === undefined) {
      setError((prev) => ({
        ...prev,
        [field]: null,
      }));
    }

    setFormFailed((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer} // Add this line
    >
      <TextInput
        value={name}
        placeholder="Enter your Name"
        onChangeText={(text) => changeHandler("name", text)}
        style={styles.input}
      />
      {error.name && <Text style={{ color: "red" }}>{error.name}</Text>}
      <TextInput
        value={email}
        keyboardType="email-address"
        placeholder="Enter your Email"
        onChangeText={(text) => changeHandler("email", text)}
        style={styles.input}
      />
      {error.email && <Text style={{ color: "red" }}>{error.email}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          value={password}
          placeholder="Enter your Password"
          onChangeText={(text) => changeHandler("password", text)}
          secureTextEntry={visible ? false : true}
          style={{ ...styles.input, flex: 1 }}
        />
        {visible ? (
          <TouchableOpacity
            style={{ position: "absolute", right: 0 }}
            onPress={() => setVisible(!visible)}
          >
            <Entypo name="eye-with-line" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ position: "absolute", right: 0 }}
            onPress={() => setVisible(!visible)}
          >
            <Entypo name="eye" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {error.password && (
        <Text style={{ color: "red", marginBottom: 10 }}>{error.password}</Text>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          value={confirmPassword}
          placeholder="confirmPassword your password"
          onChangeText={(text) => changeHandler("confirmPassword", text)}
          secureTextEntry={visible ? false : true}
          style={{ ...styles.input, flex: 1 }}
        />
        {visible ? (
          <TouchableOpacity
            style={{ position: "absolute", right: 0 }}
            onPress={() => setVisible(!visible)}
          >
            <Entypo name="eye-with-line" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ position: "absolute", right: 0 }}
            onPress={() => setVisible(!visible)}
          >
            <Entypo name="eye" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {error.confirmPassword && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {error.confirmPassword}
        </Text>
      )}
      <Button
        onPress={onSubmit}
        title="Sign Up"
        color="#841584"
        disabled={
          error.email === null &&
          error.password === null &&
          error.confirmPassword === null &&
          error.name === null
            ? false
            : true
        }
      />
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 20 }}
        onPress={googleSignIn}
      >
        <View style={{ borderRadius: 50, backgroundColor: "blue" }}>
          <Ionicons name="logo-google" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigate}>
        <Text style={styles.text}>You have an account log In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   padding: 6,
  //   backgroundColor: "red",
  // },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1, // Take up full height of ScrollView
    justifyContent: "center", // Center vertically
    padding: 6,
  },

  input: {
    backgroundColor: "white",
    marginVertical: 10,
    padding: 6,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    color: "blue",
    marginTop: 20,
    fontSize: 20,
  },
});

export default SignUp;
