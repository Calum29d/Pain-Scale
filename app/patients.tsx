import { Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Patients() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_500Medium });
  const router = useRouter();

 


  /*declare what a patient object/type shoud look like*/
  type Patient = {
    id: number,
    medCode: string,
    name: string,
  };

  const [patients, setPatients] = useState<Patient[]>([])
  const [errorMessage, setErrorMessage] = useState("")

  /*load the patient list everytime the page is loaded*/
  useFocusEffect(
    useCallback(() => {
          const loadPatients = async () => {
            const token = await SecureStore.getItemAsync('authToken');

            /*check if the user is actaully logged in first*/
            if (!token){
              router.replace("/");
              return;
            }

            /*get patient list*/
            const response = await fetch("http://192.168.1.188:8082/api/patients", {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            });

            if(response.ok) {
              const data: Patient[] = await response.json();
              setPatients(data);
            }else{
              const msg = await response.text();
              setErrorMessage(msg);
            }


          };
          loadPatients();
        }, [])
  );

   if (!fontsLoaded) return null;


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Pressable style={styles.backArrow} onPress={() => router.replace("/")}>
            <FontAwesome name="arrow-left" size={30} color="#005EB8" />
          </Pressable>
          <View>
            <Text style = {styles.title}>Patients</Text>
            <Text style = {styles.subtitle}>Select a patient to see their{"\n"} past pain assessments</Text>
            <Text style = {styles.errorMsg}>{errorMessage}</Text>
          </View>

          {/*Add patient button*/}
          <TouchableRipple
            style={styles.addButton}
            onPress={() => router.push("/addPatient")}
            rippleColor="rgba(255, 255, 255, 0.2)">
              <Text style={styles.addButtonText}>Add Patient</Text>
          </TouchableRipple>

        </View>

        <View style={styles.cardSection}>
          {/*List of patients*/}
          {patients.map((patient) => (
            <TouchableRipple
              key={patient.id}
              rippleColor="rgba(0, 94, 184, 0.2)"
              style={styles.card}
              /*go to the patients page by passing their name and id*/
              onPress={() => router.push({ pathname: "/patient/[id]", params: { id: String(patient.id), name: patient.name } })}
              >
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "space-between" }}>
                  <Text style={styles.cardTitle}>{patient.name} - {patient.medCode}</Text>
                  
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

  errorMsg: {
            fontFamily: "Inter_500Medium",
            fontSize: 15,
            color: "red",
        },

  addButton: {
    backgroundColor: "#005EB8",
    borderRadius: 8,
    marginVertical: 8,
    boxShadow: "0 4px 10px rgba(0, 94, 184, 1)",
    alignSelf: "center",
    minWidth: 120,
  },

  addButtonText: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
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

    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
  },

  cardDesc: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    marginRight: 12,
    color: "#525050",
  },
});
