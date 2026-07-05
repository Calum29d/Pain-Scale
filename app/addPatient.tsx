import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";


export default function AddPatient() {

    const [fontsLoaded] = useFonts({ Inter_600SemiBold, Inter_500Medium, Inter_700Bold });

    const [medCode, setMedCode] = useState("");
    const [name, setName] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    /*add patient variables and functions*/

    /*loading is not used but would be used to disable the user from making more requests but since this is a small project we dont really need to use it*/
    const [Loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddPatient = async () => {

        /*make sure that the user hasnt made an empty input so null requests cant be sent*/
        if (!medCode.trim() || !name.trim()) {
            setErrorMessage("Please fill in all fields");
            return;
        }
        setErrorMessage("")
        setLoading(true)

        try {
            const token = await SecureStore.getItemAsync('authToken');

            const response = await fetch("http://192.168.1.188:8082/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ medCode, name })
            });
            if (response.ok) {
                router.replace("/patients");
            } else {
                const msg = await response.text();
                setErrorMessage(msg);
            }
        } catch {
            setErrorMessage("Network error, try again please")
        } finally {
            setLoading(false);
        }
    }

    const router = useRouter();

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Pressable style={styles.backArrow}
                        onPress={() => router.replace("/patients")}>
                        <FontAwesome name="arrow-left" size={30} color="#005EB8" />
                    </Pressable>
                    <View>
                        <Text style={styles.title}>Add Patient</Text>
                        <Text style={styles.subtitle}>Add a new patient to your list</Text>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Medical Code</Text>
                    <TextInput
                        style={[styles.input, focusedField === "medCode" && styles.inputFocused]}
                        placeholder="Enter the patient's medical code"
                        placeholderTextColor="#8A8D91"
                        autoCapitalize="none"
                        value={medCode}
                        onChangeText={setMedCode}
                        onFocus={() => setFocusedField("medCode")}
                        onBlur={() => setFocusedField(null)}
                    />

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={[styles.input, focusedField === "name" && styles.inputFocused]}
                        placeholder="Enter the patient's name"
                        placeholderTextColor="#8A8D91"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                    />

                    <Text style={styles.errorMsg}>{errorMessage}</Text>

                    <TouchableRipple
                        rippleColor="rgba(255, 255, 255, 0.2)"
                        style={styles.button}
                        onPress={handleAddPatient}>
                        <View>
                            <Text style={styles.buttonText}>Add Patient</Text>
                        </View>
                    </TouchableRipple>
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

    formSection: {
        margin: 20,
    },

    label: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 16,
        color: "#0e0c0c",
        marginBottom: 8,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#B1B4B6",
        borderRadius: 8,
        padding: 14,
        marginBottom: 20,
        fontFamily: "Inter_500Medium",
        fontSize: 16,
        color: "#0e0c0c",
    },

    inputFocused: {
        borderColor: "#005EB8",
    },

    button: {
        backgroundColor: "#005EB8",
        borderRadius: 8,
        marginVertical: 8,
        boxShadow: "0 4px 10px rgba(0, 94, 184, 1)",
        alignSelf: "center",
        minWidth: 120,
    },

    buttonText: {
        fontFamily: "Inter_500Medium",
        fontSize: 18,
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: "center",
    },

    errorMsg: {
        fontFamily: "Inter_500Medium",
        fontSize: 15,
        color: "red",
    },

});
