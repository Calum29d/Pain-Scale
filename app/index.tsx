import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from "@expo-google-fonts/inter";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from "@react-navigation/native";
import { Href, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular, Inter_800ExtraBold, Inter_600SemiBold, Inter_500Medium});
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      SecureStore.getItemAsync('authToken').then((token) => setIsLoggedIn(!!token));
    }, [])
  );

  /*logout function/go to login*/
  const handleAccountPress = async () => {
    if (isLoggedIn) {
      await SecureStore.deleteItemAsync('authToken');
      setIsLoggedIn(false);
    } else {
      router.push("/login");
    }
  };

  if (!fontsLoaded) return null;



  type PainScale = {
    id: string;
    title: string;
    description: string;
    route: Href;
  };


  const painScales: PainScale[] = [
    {
      id: "faces",
      title: "Wong-Baker FACES",
      description: "Visual pain assessment - For children aged 3 years and older.",
      route: "/faces"
    },

    {
      id: "painRuler",
      title: "Visual Analogue Scale (VAS)",
      description: "Pain Ruler, used for children who are able to rate their own pain.",
      route: "/painRuler",
    },

    {
      id: "FLACC",
      title: "(FLACC) Face, Legs, Activity, Cry and Consolability",
      description: "Behavioral observation scale used for neonates, children under 3 years, and older children with cognitive or communication impairments who cannot reliably rate their own pain",
      route: "/flacc"
    },
    {
      id: "CRIES",
      title: "(CRIES) Crying, Requires oxygen, Increased vital signs, Expression, Sleep",
      description: "Behavioral and physiological pain assessment tool used to measure postoperative pain in neonates.",
      route: "/cries"
    },



  ]

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          {/*login button*/}
          <TouchableRipple
          style = {styles.loginCard}
          onPress={handleAccountPress}
          rippleColor="rgba(255, 255, 255, 0.2)">
            <View style = {{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <Text style = {styles.loginText}>{isLoggedIn ? "Log out" : "Login or create an account"}</Text>
              <MaterialIcons name={isLoggedIn ? "logout" : "account-box"} size={30} color="#005EB8" style={{marginRight: 5}}/>
            </View>
          </TouchableRipple>
          {/*Header text*/}
          <Entypo name="squared-plus" size={70} color="#005EB8"/>
          <Text style={styles.title}>Pain Assessments</Text>
          <Text style={styles.subtitle}>Track patients pain with validated scales used to assist healthcare professionals</Text>
          
        </View>

        <View style = {styles.cardSection}>
          {/*Pain scale cards*/}
          {painScales.map((scale) => (
            <TouchableRipple
              key={scale.id}
              rippleColor="rgba(0, 94, 184, 0.2)"
              style={styles.card}
              onPress = {() => router.push(scale.route)}
              >
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{scale.title}</Text>
                    <Text style={styles.cardDesc}>{scale.description}</Text>
                  </View>
                  <FontAwesome name="arrow-right" size={24} color="#005EB8" />
                </View>
            </TouchableRipple>
          ))}
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    backgroundColor: "#F8FAFC",
  },
  header: {
    marginBottom: 24,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },

  loginCard: {
    backgroundColor: "rgba(0, 94, 184, 0.2)",
     borderColor: "#005EB8",
     borderWidth: 2,
     borderRadius: 8,
     margin: 10,
     boxShadow: "0 4px 10px rgba(0, 94, 184, 1)",
  },

  loginText: {
    fontSize: 20,
    fontFamily: "Inter_500Medium",
    padding: 10,
    textAlign: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    color: "#0e0c0c",
    textAlign: "center",

  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#525050",
    marginTop: 4,
    textAlign: "center",
  },

  cardSection: {
    margin: 20,
  },


  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#B1B4B6",
    borderRadius: 8,
    boxShadow: "0 4px 10px rgba(0, 94, 184, 1)",

    padding: 20,
    marginBottom: 25,
    

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardPressed: {
    borderColor: "#005EB8",
  },



  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    marginBottom: 10,
  },

  cardDesc: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
  }

  

});

