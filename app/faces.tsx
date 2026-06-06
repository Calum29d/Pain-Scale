import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FacesScale() {

    const  router = useRouter();

    return (
        <SafeAreaView style = {styles.safeArea}>
            <ScrollView style = {styles.scrollContent}>
                <Pressable style = {styles.backArrow}
                    onPress = {() => router.back()}>
                        <FontAwesome name="arrow-left" size={30} color="#005EB8" />
                    </Pressable>
                { /* Header */}
                <View style = {styles.header}>

                    <Text style = {styles.title}>Wong-Baker {"\n"} FACES Scale</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    backArrow: {
        marginLeft: 20,
    },


    title: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Inter_700Bold",
        color: "#0e0c0c",
        textAlign: "center",
        marginTop: 20,

    },

    header: {
        marginBottom: 24,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
  },

    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC",
  },

    scrollContent: {
        backgroundColor: "#F8FAFC",
  },

})
