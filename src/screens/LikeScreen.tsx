import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'
import AntDesign from "react-native-vector-icons/AntDesign"
import { LikeImagesContext } from '../context/LikeImageContext'

const LikeScreen = () => {

  const {likedImages} = useContext(LikeImagesContext)

  

  
  


  return (
    <View style={styles.container}  >
      <Text style={styles.title} >Liked Images</Text>

      <FlatList data={likedImages}  
        renderItem={({item , index})=>{
          return(
            <ImageCard item={item} />
          )
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          [
              styles.listContainer,
              likedImages.length===0 && styles.emptyListContainer
          ]
        }


        ListEmptyComponent={(
          <View style={styles.emptyStateContainer} >
              <AntDesign name={"hearto"} size={80} color={"#D3D3D3"} />
              <Text style={styles.emptyStateText} >You haven't liked any images yet! </Text>
              <Text style={styles.subText} >Browse and like images to see the here! </Text>
         </View>
        )}
        
      />
    </View>
  )
}

export default LikeScreen

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#1E1E1E",
    paddingHorizontal : 20,

  },
  title:{
    color : "#fff",
    fontFamily : fontFamily.bold,
    fontSize : 30,
    textAlign : "center",
    marginVertical : 20,
  },
  emptyStateContainer : {
      justifyContent : "center",
      alignItems : "center",
      marginTop : 50
  },
  emptyStateText : {
      color : "#D3D3D3",
      fontFamily : fontFamily.medium,
      fontSize : 20,
      textAlign : "center",
      marginTop : 20
  },
  subText : {
      color :"#A9A9A9",
      fontFamily : fontFamily.regular,
      fontSize : 16,
      marginTop : 10,
      alignItems : "center"
  },
  listContainer : {
    paddingBottom : 50
  },
  emptyListContainer:{
      flexGrow : 1,
      justifyContent : "center",
  }
})