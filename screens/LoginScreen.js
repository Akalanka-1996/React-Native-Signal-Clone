import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native";
import { Input, Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";

import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
        auth
            .signInWithEmailAndPassword(email,password)
            .catch((error) => alert(error))
  };

  return (
    <KeyboardAvoidingView
      // behavior='padding'
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={{
            uri: "https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg",
          }}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={signIn}
          />
        </View>

        <Button title="Login" containerStyle={styles.button} onPress={signIn} />
        <Button
          title="Register"
          containerStyle={styles.button}
          type="outline"
          onPress={() => navigation.navigate("Register")}
        />
        {/* <View style={{height:100}}></View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  button: {
    width: 200,
    marginBottom: 10,
  },
});

export default LoginScreen;
