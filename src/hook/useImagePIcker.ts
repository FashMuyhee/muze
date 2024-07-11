import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Snackbar from 'react-native-snackbar';

export const useImagePicker = () => {
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (Number(result?.assets[0]?.fileSize) > 5242880) {
      Snackbar.show({ text: 'File Size should be less than 5MB', duration: 3000 });
      return;
    }
    if (!result.canceled) {
      setImage(result.assets[0]);
      const imageData = await fetch(result.assets[0].uri);
      const blob = await imageData.blob();
      return result.assets[0];
    }
    return null;
  };

  return { image, pickImage };
};
