import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
    // Load the actual Montserrat TTF files
    const fonts = {
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
    };
    
    await Font.loadAsync(fonts);
    console.log('Montserrat fonts loaded successfully');
  } catch (error) {
    console.error('Error loading Montserrat fonts:', error);
    // Continue without custom fonts - system fonts will be used
  }
};
