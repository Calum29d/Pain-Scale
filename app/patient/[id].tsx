import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientDetail() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_500Medium });
  const router = useRouter();
  const { name } = useLocalSearchParams<{ id: string, name?: string }>();

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Pressable style={styles.backArrow} onPress={() => router.replace("/patients")}>
            <FontAwesome name="arrow-left" size={30} color="#005EB8" />
          </Pressable>
          <View>
            <Text style={styles.title}>{name}</Text>
            {/**/}
            <Text style={styles.subtitle}></Text>
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    backgroundColor: "#F8FAFC",
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
    marginBottom: 10,
    textAlign: "center",
  },
});
