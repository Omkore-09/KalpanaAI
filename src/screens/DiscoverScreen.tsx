import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'

const DiscoverScreen = () => {
  const [refreshing , setRefreshing ] = useState (false)

  const data = [
    {
      id: 1 ,
      imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s",
      prompt : "Generate an AI image"
    },
    {
      id: 2 ,
      imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s",
      prompt : "Generate an AI image"
    },
    {
      id: 3 ,
      imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s",
      prompt : "Generate an AI image"
    },
  ]

  const onRefresh = () =>{
    setRefreshing(true);
    //api call
    setRefreshing(false)
  }

  return (
    <View style={styles.conatainer} >
      <Text style={styles.title} >Discover</Text>
      <FlatList data={data} 
      
      renderItem={({item , index})=>{
        return(
          <ImageCard item={item}/>
        )
      }}
      keyExtractor={(item)=>item.id}
      showsVerticalScrollIndicator ={false}
      contentContainerStyle= {styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"#3B82F6"} />
      }
      />
    </View>
  )
}

export default DiscoverScreen

const styles = StyleSheet.create({
  conatainer : {
      flex : 1,
      backgroundColor : "#1E1E1E",
      paddingHorizontal : 20
  },
  title :{
    color : "#fff",
    fontSize : 30,
    fontFamily : fontFamily.bold,
    textAlign : "center",
    marginVertical : 20
  },
  listContainer :{
    paddingBottom : 50
  }
})