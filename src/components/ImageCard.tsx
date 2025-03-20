import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontFamily } from '../theme'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"

const ImageCard = ({item}) => {
  return (
    <View style={styles.imageCard} >
      <Image source={{uri : item.imageUrl }} 
      style={styles.image} resizeMode='cover' />

    {/* prompt text  */}
    <Text style={styles.promptText} numberOfLines={2} >{item?.prompt || "No prompt"}</Text>


    {/* button conatiner  */}
    <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.actionButton} >
            <Ionicons name={"download-outline"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} >
            <Ionicons name={"share-social-outline"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} >
            <Feather name={"copy"} size={25} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} >
            <AntDesign name={"hearto"} size={25} color={"#fff"} />
        </TouchableOpacity>
    </View>

    </View>
  )
}

export default ImageCard

const styles = StyleSheet.create({
    imageCard : {
        width : "100%",
        padding : 15,
        backgroundColor : "#333",
        marginBottom : 20,
        borderRadius : 8
    },
    image : {
        width : "100%",
        height : 350,
        borderRadius : 8
    },
    promptText : {
        color : "#fff",
        marginTop : 10,
        fontSize : 16,
        fontFamily : fontFamily.regular,
        textAlign : "center"
    },
    buttonContainer:{
        flexDirection : "row",
        justifyContent : "space-between",
        marginTop : 10,

    },
    actionButton: {
        padding : 10, 
        backgroundColor : "#444",
        borderRadius : 50,
        alignItems : "center"
    }
})