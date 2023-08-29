import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../utils/axios/axios";
import { validateInput } from "../utils/formAction";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUserAdmin } from "../store/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [formFailed, setFormFailed] = useState({ email: "", password: "" });
  const { email, password } = formFailed;
  const [error, setError] = useState([]);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("Sign-Up");
  };
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!email || !password) return;
    setError([]);
    try {
      const {
        data: { user, admin, token },
      } = await api.post("/login", { email, password });

      await AsyncStorage.setItem("Token", token);
      dispatch(setCurrentUser(user));
      dispatch(setUserAdmin(admin));
      setError({
        email: null,
        password: null,
      });
      setFormFailed({
        email: "",
        password: "",
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
        console.log("err", error);
      });
  };
  const changeHandler = (field, value) => {
    // if (field !== "password") {
    const result = validateInput(field, value);
    if (result) {
      setError((perError) => ({ ...perError, ...result }));
    } else if (result == undefined) {
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
    <View style={styles.container}>
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
      {/* {!error.password && password.length >= 1 && password.length < 6 && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Password cant be less than 6 letters
        </Text>
      )} */}
      <Button
        onPress={onSubmit}
        title="Log in"
        color="#841584"
        disabled={
          error.email === null && error.password === null ? false : true
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
        <Text style={styles.text}>You have no account Sign up now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 6 },
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
export default SignIn;
