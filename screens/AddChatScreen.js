import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Input, Button } from 'react-native-elements'
import {db} from '../firebase'

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState('')

    const createChat = async () => {
        await db
        .collection("chats")
        .add({
            chatName:input
        })
        .then(() => {
            navigation.goBack()
        })
        .catch((error) => alert(error))
    }

   useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle:"Home"
        })
   }, [])
    return (
        <View style={styles.container}>
            <Input 
            placeholder="Enter a name" 
            value={input}  
            onChangeText={(text) => setInput(text)} 
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            }
            /> 
            <Button onPress={createChat} title="Create new chat" />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})

export default AddChatScreen

