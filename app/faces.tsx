import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";


export default function FacesScale() {

    {/*rotate the screen landscap to accommodate for picture width*/}
   useEffect( () => {
    ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
        try {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        } catch (e) {
            console.warn("Orientation lock doesnt seem to work properly on expo go:", e)
        }
        
    };
   }, []);


    const  router = useRouter();

    return (
        <SafeAreaView style = {styles.safeArea}>
            <View style = {styles.content}>
                <Pressable style = {styles.backArrow}
                    onPress = {() => router.back()}>
                        <FontAwesome name="arrow-left" size={30} color="#005EB8" />
                    </Pressable>


                {/*image*/}
                <View style = {styles.imageBox}>
                    <Image source = {require('../assets/images/FACES-Unlicensed.jpg')}
                    style = {{ width: 650, height: 250, }}/>
                
                <TouchableRipple
                rippleColor="rgba(255, 255, 255, 0.2)"
                onPress={ () => router.push("/patients")}
                style = {styles.savePainButton}>
                    <View>
                        <Text style = {styles.buttonText}>Save Rating</Text>
                    </View>
                </TouchableRipple>
                
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    backArrow: {
        marginLeft: 20,
    },

    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC",
  },

    content: {
        backgroundColor: "#F8FAFC",
  },

  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },

  savePainButton: {
    backgroundColor: "#005EB8",
    borderRadius: 8,
    margin: 5,
    boxShadow: "0 4px 10px rgba(0, 94, 184, 1)",

  },

  buttonText: {
    fontFamily: "Inter_500Medium",
    color: "white",
    padding: 5,
  },


})
