import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { auth, db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://assets.newglue.com/assets/avatar_placeholder-c4a9963ad86c68649100b476add586667aaaf4672a3dbfd6abf0e7338f4f5337.jpg",
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          fuck
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
