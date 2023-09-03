import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import emailjs from "@emailjs/browser";
import { validateInput } from "../utils/formAction";

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "", // Fixed the typo in "message"
  });
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(null);

  const { name, email, message } = formData;

  const textChange = (key, value) => {
    const result = validateInput(key, value);
    if (result) {
      setError((perError) => ({ ...perError, ...result }));
    } else if (result == undefined) {
      setError((perv) => ({
        ...perv,
        [key]: null,
      }));
    }

    setFormData((perv) => ({
      ...perv,
      [key]: value,
    }));
  };
  const onSubmit = () => {
    emailjs
      .send(
        "service_3k0ekto",
        "template_mms7kkk",
        { name, email, message },
        "vWY253AsB8LFUqx_O"
      )
      .then(
        (result) => {
          // console.log(result.text);
          setSuccess(true);
          setFormData({
            name: "",
            email: "",
            message: "", // Fixed the typo in "message"
          });
        },
        (error) => {
          console.error(error);
          setSuccess(false);
        }
      );
  };
  const failedNotEmpty =
    error.name === null && error.email === null && error.message === null;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16, // Adjust the horizontal padding as needed
      }}
    >
      <View style={{ width: "100%" }}>
        <Text> Name:</Text>
        <TextInput
          style={{
            width: "100%",
            padding: 4,
            marginVertical: 4,
            backgroundColor: "white",
            fontWeight: "bold",
          }}
          placeholderTextColor={"gray"}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => textChange("name", text)}
        />
        {error.name && (
          <Text style={{ color: "red", marginBottom: 10 }}>{error.name}</Text>
        )}
      </View>
      <View style={{ width: "100%" }}>
        <Text> Email:</Text>
        <TextInput
          style={{
            width: "100%",
            padding: 4,
            marginVertical: 4,
            backgroundColor: "white",
            fontWeight: "bold",
          }}
          placeholderTextColor={"gray"}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => textChange("email", text)}
        />
        {error.email && (
          <Text style={{ color: "red", marginBottom: 10 }}>{error.email}</Text>
        )}
      </View>
      <View style={{ width: "100%" }}>
        <Text> Message:</Text>
        <TextInput
          style={{
            width: "100%",
            padding: 4,
            marginVertical: 4,
            backgroundColor: "white",
            fontWeight: "bold",
          }}
          placeholderTextColor={"gray"}
          placeholder="Enter your message"
          multiline
          numberOfLines={4} // Adjust the number of lines as needed
          value={message}
          onChangeText={(text) => textChange("message", text)}
        />
        {error.message && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {error.message}
          </Text>
        )}
      </View>
      {success && (
        <Text style={{ color: "red", fontStyle: "italic" }}>
          Succeed to send the message....
        </Text>
      )}
      {success === false && (
        <Text style={{ color: "red", fontStyle: "italic" }}>
          failed to send the message please try again later....
        </Text>
      )}
      <TouchableOpacity
        style={{
          padding: 4,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: "blue",
          opacity: failedNotEmpty ? 1 : 0.4,
        }}
        onPress={onSubmit}
        disabled={failedNotEmpty ? false : true}
      >
        <Text
          style={{
            padding: 4,
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactScreen;
