import {
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {fontFamily} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {requestWriteStoragePermission} from '../utils';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import { LikeImagesContext } from '../context/LikeImageContext';

type ImageItem = {
  imageUrl: string;
  prompt?: string;
};

type ImageCardProps = {
  item: ImageItem;
};

const ImageCard: React.FC<ImageCardProps> = ({item}) => {
  const {likedImages, toggleLikeImage} = useContext(LikeImagesContext);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = async () => {
    const granted = await requestWriteStoragePermission();
    if (!granted) return;
    const imageUrl = item.imageUrl;
    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    const filePath = `${PictureDir}/download_image_${Date.now()}.png`;
    setIsDownloading(true);
    console.log('file :', filePath);

    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: '.png',
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading Image',
        mime: 'image/png',
        mediaScannable: true,
      },
    })
      .fetch('GET', imageUrl)
      .progress({interval: 100}, (received, total) => {
        let percentag = Math.floor((received / total) * 100);
        setDownloadProgress(percentag);
        //add the state
      })
      .then(res => {
        copyMediaToStorage(filePath, filePath);
        setIsDownloading(false);
        setDownloadProgress(0);
        ToastAndroid.show('Image Download Succesfully', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log('error', error);
        setIsDownloading(false);
        //set
      });
  };

  const copyMediaToStorage = async (filePath: string, fileName: string) => {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: fileName,
          parentFolder: 'kalpnachitra',
          mimeType: 'image/png',
        },
        'Download',
        filePath,
      );
    } catch (error) {
      console.log('Failed to copy');
    }
  };

  const processImageToShare = async () => {
    const granted = await requestWriteStoragePermission();
    if (!granted) return;
    const imageUrl = item.imageUrl;
    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    const filePath = `${PictureDir}/download_image_${Date.now()}.png`;
    // setIsDownloading(true);
    //setisProcessing
    setIsProcessing(true);
    console.log('file :', filePath);

    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: '.png',
      fileCache: true,
    })
      .fetch('GET', imageUrl)
      .progress({interval: 100}, (received, total) => {
        let percentag = Math.floor((received / total) * 100);
        setDownloadProgress(percentag);
        //add the state
      })
      .then(res => {
        // copyMediaToStorage(filePath, filePath);
        // setIsDownloading(false);
        setIsProcessing(false);
        setDownloadProgress(0);
        const base64data = res.data;
        if (!base64data) {
          ToastAndroid.show('No Image to share', ToastAndroid.SHORT);
          return;
        }

        
            const options = {
                title: 'Share Image',
                url : `file://${base64data}`,
                message: 'Check out this image',
            }
          Share.open(options)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              err && console.log(err);
            });
        
        // return base64data;
      })
      .catch(error => {
        console.log('error', error);
        setIsDownloading(false);
        //set
        return null;
      });
  };

  const handleShareImage = async () => {
    //you have to download the file
    const base64Data = await processImageToShare();
    
    // then get base64 data format
    // then share it
  };

  const handleCopy= ()=>{
    const imageUrl = item.imageUrl;
    //here logic copy to clipbord
    Clipboard.setString(imageUrl);
    ToastAndroid.show('Image copied succesfully', ToastAndroid.SHORT);
  }

  const handleLikeImage =()=>{
    toggleLikeImage(item)
  }

  const isLiked = likedImages.some((likeImage)=>likeImage._id == item._id)

  return (
    <View style={styles.imageCard}>
      <Image
        source={{uri: item.imageUrl}}
        style={styles.image}
        resizeMode="cover"
      />

      {/* prompt text  */}
      <Text style={styles.promptText} numberOfLines={2}>
        {item?.prompt || 'No prompt'}
      </Text>

      {/* button conatiner  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name={'download-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShareImage}>
          <Ionicons name={'share-social-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCopy} >
          <Feather name={'copy'} size={25} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLikeImage} >
          <AntDesign name={isLiked?'heart' : 'hearto'} size={25} color={isLiked?'#ec0808' : '#fff'} />
        </TouchableOpacity>
      </View>

      {/* modal container  */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isDownloading || isProcessing}>
        <View style={styles.overlay}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>
              {' '}
              {isProcessing ? 'Processing Image' : 'Downloading Image'}{' '}
            </Text>
            <Text style={styles.progressText}>{downloadProgress}% </Text>
            <Text style={styles.progressDescription}>
              Please wait while we {isProcessing ? 'processing' : 'downloading'}{' '}
              your image.
            </Text>

            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progresBar, {width: `${downloadProgress}%`}]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 20,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 8,
  },
  promptText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 50,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  progressContainer: {
    width: '80%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: fontFamily.bold,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: fontFamily.bold,
    marginBottom: 10,
  },
  progressDescription: {
    fontSize: 14,
    color: '#fff',
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    marginTop: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginTop: 10,
  },
  progresBar: {
    height: 10,
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
});
