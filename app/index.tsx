import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from "@expo-google-fonts/inter";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, useRouter } from "expo-router";
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
      description: "Visual pain assessment - For children aged 3 years and older",
      route: "/faces"
    },

  ]

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Entypo name="squared-plus" size={70} color="#005EB8"/>
          <Text style={styles.title}>Pain Assesments</Text>
          <Text style={styles.subtitle}>Validated scales used to assist healthcare professionals</Text>
          
        </View>
        <View style = {styles.cardSection}>
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

    padding: 20,
    marginBottom: 4,
    

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

