import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons'
import * as firebase from 'firebase'

import { db, auth} from '../firebase'


const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect (() => {
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisibility:false,
            headerTitleAlign:"right",

            headerTitle: () => (
                <View style={styles.header}>
                    <Avatar rounded source={{uri:"https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png"}} />
                    <Text style={styles.headerText}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () =>(
                <TouchableOpacity style={styles.backArrow} onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.icon}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" color="#fff" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" color="#fff" size={24} />
                    </TouchableOpacity>
                </View>
            )

        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })

        setInput('')
    }

    // show chats

    useLayoutEffect(() =>{
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            }))
        ))

        return unsubscribe
    }, [route])

    return (
        <SafeAreaView style={styles.text}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView>
                  {messages.map(({id, data}) => (
                      data.email === auth.currentUser.email ? ( 
                      <View key={id} style={styles.reciver}>
                          <Avatar rounded size={30} source={{uri:data.photoURL}} bottom={-45} right={-30} />
                          <Text style={styles.recieverText}>{data.message}</Text>
                      </View>
                      ) : (
                      <View style={styles.sender}>
                          <Text style={styles.senderText}>{data.message}</Text>
                      </View>
                      )
                  ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                    placeholder="Signal Message"
                     value={input} 
                     onChangeText={(text) => setInput(text)}
                     onSubmitEditing={sendMessage}
                      style={styles.textInput} 
                      />
                    <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>
                </View>
                </>
                </TouchableWithoutFeedback>
             
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    backArrow:{
        marginLeft:10
    },
    container:{
        flex:1
    },
    footer:{
        flexDirection:"row",
        alignItems:'center',
        width:"100%",
        padding:15
    },
    header:{
        alignItems:'center',
        flexDirection:'row'
    },
    headerText:{
        color:"#fff",
        marginLeft:10,
        fontWeight:"700"
        
    },
    icon:{
        flexDirection:"row",
        justifyContent:'space-between',
        width:80,
        marginRight:20,

    },
    reciver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:10,
        marginBottom:20,
        maxWidth:"80%",
        position:'relative'
    },
    recieverText:{
       
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:'flex-start',
        borderRadius:20,
        margin:10,
        maxWidth:"80%",
        position:'relative'

    },
    senderText:{},
    text:{
        backgroundColor:"#fff",
        flex:1
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderBottomColor:"transparent",
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30

    }
})
