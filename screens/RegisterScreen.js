import React, {useState, useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'

import {auth} from '../firebase'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackText:"Back to Login",
        })
        
    }, [navigation])

   const register = () => {
       auth
       .createUserWithEmailAndPassword(email,password)
       .then((authUser) => {
           authUser.user.updateProfile({
               displayName:name,
               photoURL: imageUrl
           })
       })
       .catch(error => alert(error.message))
   }
    

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={styles.headerText}>
                Create a Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input type="text" placeholder="Full Name" autoFocus value={name} onChangeText={(text) => setName(text)} />
                <Input type="email" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                <Input type="text" placeholder="Profile Picture URL (optional)" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
            </View>

            <Button containerStyle={styles.button} raised title="Register" onPress={register} />
            {/* <View style={{height:100}}></View> */}

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    button:{
        width:200
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:"#fff"

    },
    headerText:{
        marginBottom:50,
        textAlign:'center'
    },
    inputContainer:{
        width:350
    }
})

export default RegisterScreen
