import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'
import { api } from '../utils/api'

const DiscoverScreen = () => {
  const [page , setPage] = useState<number>(1)
  const [images , setImages] = useState([]);
  const [refreshing , setRefreshing ] = useState (false)
  const [loading , setLoading]= useState(false)
  const [hasNextPage , setHasNextPage] = useState(true)

  useEffect(()=>{
    handleFetchImage()
  }, [page])

  // const data = [
  //   {
  //     id: 1 ,
  //     imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s",
  //     prompt : "Generate an AI image"
  //   },
  //   {
  //     id: 2 ,
  //     imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s",
  //     prompt : "Generate an AI image"
  //   },
  //   {
  //     id: 3 ,
  //     imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJLg26Psc-i7q9ict7xIBuvdHNCBARduzFQ&s",
  //     prompt : "Generate an AI image"
  //   },
  // ]

  const handleFetchImage = async () =>{
    try {
      setLoading(true)
      const response = await api.get("/discover-image", {
        params :{
          page,
        }
      });
      if(page==1){
        setImages(response.data.images)
      }else{
        setImages((prevImages)=>[...prevImages,...response.data.images]);
      }
      let isNextPage = response.data.totalPages > response.data.currentPage? true: false
      setHasNextPage(isNextPage)
      setLoading(false)
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT)
      setLoading(false)
    }
  }

  const handleLoadMoreImages = ()=>{
    if(hasNextPage){
      setPage(page+1)
    }
  }

  const onRefresh = () =>{
    setRefreshing(true);
    setPage(1)
    setRefreshing(false)
  }

  return (
    <View style={styles.conatainer} >
      <Text style={styles.title} >Discover</Text>
      <FlatList data={images} 
      
      renderItem={({item , index})=>{
        return(
          <ImageCard item={item}/>
        )
      }}
      keyExtractor={(item)=>item._id}
      showsVerticalScrollIndicator ={false}
      contentContainerStyle= {styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"#3B82F6"} />
      }
      ListFooterComponent={
        loading ? <ActivityIndicator size={"large"} color={"#3BB2F6"} /> : null
      }
      onEndReached={handleLoadMoreImages}
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