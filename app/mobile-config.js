App.info({
  id: 'br.com.devhouse.clinicafacil',
  name: 'Clínica Fácil',
  description: 'Redefinindo software médico para clínicas e consultórios',
  author: 'DevHouse',
  email: 'contato@devhouse.com.br',
  website: 'http://www.devhouse.com.br',
  version: '0.0.1'
});

App.icons({
  'iphone_2x': 'icons/ios/Icon-App@2x.png',
  'iphone_3x': 'icons/ios/Icon-App@3x.png',
  'ipad': 'icons/ios/Icon-App-iPad.png',
  'ipad_2x': 'icons/ios/Icon-App-iPad@2x.png',
  'ipad_pro': 'icons/ios/Icon-App-iPad-Pro.png',
  'ios_settings': 'icons/ios/Icon-Settings.png',
  'ios_settings_2x': 'icons/ios/Icon-Settings@2x.png',
  'ios_settings_3x': 'icons/ios/Icon-Settings@3x.png',
  'ios_spotlight': 'icons/ios/Icon-Spotlight.png',
  'ios_spotlight_2x': 'icons/ios/Icon-Spotlight@2x.png',
  'android_mdpi': 'icons/android/ic_launcher/drawable-mdpi/ic_launcher_clinica-facil.png',
  'android_hdpi': 'icons/android/ic_launcher/drawable-hdpi/ic_launcher_clinica-facil.png',
  'android_xhdpi': 'icons/android/ic_launcher/drawable-xhdpi/ic_launcher_clinica-facil.png',
  'android_xxhdpi': 'icons/android/ic_launcher/drawable-xxhdpi/ic_launcher_clinica-facil.png',
  'android_xxxhdpi': 'icons/android/ic_launcher/drawable-xxxhdpi/ic_launcher_clinica-facil.png',
});

App.launchScreens({
  'iphone_2x': 'splash/ios/iphone_2x.png',
  'iphone5': 'splash/ios/iphone5.png',
  'iphone6': 'splash/ios/iphone6.png',
  'iphone6p_portrait': 'splash/ios/iphone6p_portrait.png',
  'iphone6p_landscape': 'splash/ios/iphone6p_landscape.png',
  'ipad_portrait': 'splash/ios/ipad_portrait.png',
  'ipad_portrait_2x': 'splash/ios/ipad_portrait_2x.png',
  'ipad_landscape': 'splash/ios/ipad_landscape.png',
  'ipad_landscape_2x': 'splash/ios/ipad_landscape_2x.png',
  'android_mdpi_portrait': 'splash/android/android_mdpi_portrait.png',
  'android_mdpi_landscape': 'splash/android/android_mdpi_landscape.png',
  'android_hdpi_portrait': 'splash/android/android_hdpi_portrait.png',
  'android_hdpi_landscape': 'splash/android/android_hdpi_landscape.png',
  'android_xhdpi_portrait': 'splash/android/android_xhdpi_portrait.png',
  'android_xhdpi_landscape': 'splash/android/android_xhdpi_landscape.png',
  'android_xxhdpi_portrait': 'splash/android/android_xxhdpi_portrait.png',
  'android_xxhdpi_landscape': 'splash/android/android_xxhdpi_landscape.png',
});

App.setPreference('BackgroundColor', '0xf3f3f4ff');
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.accessRule("*://clinicafacil.devhouse.com.br/*");