import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {

    const [fontsLoaded] = useFonts({ Inter_600SemiBold, Inter_500Medium, Inter_700Bold });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const router = useRouter();

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Pressable style={styles.backArrow}
                        onPress={() => router.back()}>
                        <FontAwesome name="arrow-left" size={30} color="#005EB8" />
                    </Pressable>
                    <View>
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.subtitle}>Access your healthcare professional account</Text>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, focusedField === "email" && styles.inputFocused]}
                        placeholder="Enter your email"
                        placeholderTextColor="#8A8D91"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={[styles.input, focusedField === "password" && styles.inputFocused]}
                        placeholder="Enter your password"
                        placeholderTextColor="#8A8D91"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                    />

                    <TouchableRipple
                        rippleColor="rgba(255, 255, 255, 0.2)"
                        style={styles.button}
                        onPress={() => {

                        }}>
                        <View>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </TouchableRipple>

                    <View style={styles.linkRow}>
                        <Text style={styles.linkText}>Don&apos;t have an account? </Text>
                        <Pressable onPress={() => router.push("/register")}>
                            <Text style={styles.linkAction}>Register</Text>
                        </Pressable>
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

    linkRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },

    linkText: {
        fontFamily: "Inter_500Medium",
        fontSize: 15,
        color: "#525050",
    },

    linkAction: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 15,
        color: "#005EB8",
    },

});
