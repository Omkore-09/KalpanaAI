import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fontFamily, fontSize } from '../theme'
import Icon from "react-native-vector-icons/MaterialIcons"
import { ActivityIndicator } from 'react-native'
import ImageCard from '../components/ImageCard'

const HomeScreen = () => {
  const [prompt , setPrompt] = useState("")
  const [isLoading , setIsLoading] = useState(false)
  const [image , setImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s")

  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s

  const handleOpenLink=()=>{
    //open link
    const url ="";
    Linking.openURL(url).catch((err)=>{
      console.error('Error opening link:', err);
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container} >

      {/* Logo container  */}
      <View style={styles.appLogoContainer} >
        <Text style={styles.appName} >Kalpana AI</Text>
        <TouchableOpacity onPress={handleOpenLink} >
          <Text style={styles.madeBy} >Made by {" "}
            <Text style={[styles.madeBy,
                {textDecorationLine:"underline" }

            ]} >omkore</Text>
             </Text>
        </TouchableOpacity>
      </View>

      {/* input container  */}
      <View style={styles.textInputWrapper} >
        <View style={styles.textInputContainer} >

          <TextInput placeholder='Enter your prompt..' placeholderTextColor={"#808080"} multiline style={styles.textInput}  value={prompt} onChangeText={setPrompt} />

            {
              prompt?(
                <TouchableOpacity style={styles.clearButton} >
                  <Icon name={"close"} size={24} color={"#fff"} />
                </TouchableOpacity>
              ) : null
            }

        </View>
      </View>

      {/* Generate Button  */}
      <TouchableOpacity style={styles.generateButton} >

            {
              isLoading ? (<ActivityIndicator size={'small'} color={"#fff"} />) : 
              <Text style={styles.generateBtnText} >
          Generate
              </Text>
            }

        
      </TouchableOpacity>

      {/* description  */}
      {
        !image && <Text style={styles.description} >
        Generate images in real-time. Enter a prompt and
        generate images in milliseconds as you type. Powered
        by Flux on Together Al.
        </Text>
      }


      {
        image && (
          <View style={styles.imageWrapper} >
            {/* image card component   */}
            <ImageCard  item={{imageUrl :image, prompt : "Generate an AI image"}} />

          </View>
        )
      }

      {/* Footer  */}
      {
        !image && <View  style={styles.footer} >
        <Text style={styles.poweredText} >
        Powered by Together.ai & Flux
        </Text>
        </View>
      }


    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container : {
      flexGrow:1,
      backgroundColor : "#1E1E1E",
      paddingHorizontal:20,
      justifyContent : "space-between",
      paddingBottom : 30
  },

  appLogoContainer :{
    alignItems : "center",
    marginTop: 13
  },

  appName:{
    color : "#FFF",
    fontFamily : fontFamily.bold,
    fontSize : 32,
    textAlign : "center"
  },

  madeBy:{
    color : '#808080',
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginTop: 5 
  },

  textInputWrapper : {
      marginTop : 20,

  },

  textInputContainer : {
    position : "relative"
  },

  textInput :{
    width : "100%",
    height : 120,
    borderWidth : 2,
    borderColor : "#565656",
    borderRadius : 10,
    backgroundColor : "#222",
    color: "#fff",
    paddingHorizontal : 15,
    paddingVertical : 10,
    fontFamily : fontFamily.regular,
    fontSize : 16
  } ,

  clearButton : {
    position : "absolute",
    right : 10,
    top : 10
  },

  generateButton : {
      marginTop : 10,
      backgroundColor : "#000",
      paddingVertical : 15,
      paddingHorizontal : 30,
      borderRadius : 10 ,
      alignItems : "center",
      borderWidth : 2,
      borderBottomWidth : 10,
      borderColor : "#f8f2f2",
      // shadowColor : "#000",
      // shadowOffset : { width : 0, height : 5 },
      // shadowOpacity : 0.3,
      // shadowRadius : 7,
      // elevation : 11
  },

  generateBtnText:{
      color : "#fff",
      fontFamily : fontFamily.semiBold,
      fontSize : 20
  },

  description : {
      color : "#808080",
      fontFamily : fontFamily.regular,
      fontSize : 14,
      textAlign : "center",
      marginTop : 20
  },

  poweredText : {
    color :"#808080",
    fontFamily : fontFamily.regular,
    fontSize : 12,
    textAlign : "center"
  },

  footer :{
    alignItems : "center",
    marginTop : 30
  },

  imageWrapper:{
    marginTop : 20,
    alignItems : "center",
    
  }
})