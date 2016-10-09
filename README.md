# Clínica Fácil
Sistema de gerenciamento de informações para Clínicas Médicas.

## Desenvolvido usando:
* [Meteor](https://www.meteor.com/)
* Iron Meteor (https://github.com/iron-meteor)
* Bootstrap

www.devhouse.com.br

# Building for Android

## Build the App
```sh
$ meteor build ../meteor-build --server http://clinicafacil.devhouse.com.br --mobile-settings mobile-config.json
```

## Create a private key for the app:
```sh
keytool -genkey -v -keystore clinica-facil.keystore -alias clinica-facil -keyalg RSA -keysize 2048 -validity 10000
```

## Sign the app:
```sh
cd ../meteor-build/android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../clinica-facil.keystore release-unsigned.apk clinica-facil
$ANDROID_HOME/build-tools/23.0.2/zipalign 4 release-unsigned.apk clinica-facil.apk
```