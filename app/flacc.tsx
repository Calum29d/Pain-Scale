import { Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";


export default function FlaccScale() {

    const [fontsLoaded] = useFonts({ Inter_600SemiBold, Inter_500Medium, Inter_700Bold });

    {/*Define datastructure to hold questions for FLACC*/ }
    type FLACCQuestion = {
        section: string;
        options: {
            label: string;
            value: number;
        }[];
    }

    const flaccQuestions: FLACCQuestion[] = [
        {
            section: "Face",
            options: [
                { label: "No particular experssion or simle", value: 0 },
                { label: "Occasional grimace or frown, withdrawn, disinterested", value: 1 },
                { label: "Frequent to constant quivering chin, clenched jaw", value: 2 }
            ]
        },

        {
            section: "Legs",
            options: [
                { label: "Normal position or relaxed", value: 0 },
                { label: "Uneasy, restless, tense", value: 1 },
                { label: "Kicking, or legs drawn up", value: 2 }
            ]
        },

        {
            section: "Activity",
            options: [
                { label: "Lying quietly, normal position, moves easily", value: 0 },
                { label: "Squirming, shifting back and forth, tense", value: 1 },
                { label: "Arched, rigid or jerking", value: 2 }
            ]
        },

        {
            section: "Cry",
            options: [
                { label: "No cry (awake or asleep)", value: 0 },
                { label: "Moan or whimpers, occasional complaining", value: 1 },
                { label: "Crying steadily, screams or sobs, frequent complaints", value: 2 }
            ]
        },

        {
            section: "Consolability",
            options: [
                { label: "Content, relaxed", value: 0 },
                { label: "Reassured by occasional touching, hugging o rbeing talked to", value: 1 },
                { label: "Difficult to console or comfort", value: 2 }
            ]
        },

    ]

    {/*used to move to the next set of question and keep track of the pain score*/ }
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentSection = flaccQuestions[currentIndex]
    const [score, setScore] = useState(0)
    const [prevScore, setPrev] = useState(0)



    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Pressable style={styles.backArrow}
                        onPress={() => router.back()}>
                        <FontAwesome name="arrow-left" size={30} color="#005EB8" />
                    </Pressable>
                    <View>
                        <Text style={styles.title}>FLACC</Text>
                        <Text style={styles.subtitle}>Complete the questions to calculate a pain score</Text>
                    </View>
                </View>

                {/*check if we are at the end of the questions*/}
                {currentIndex === flaccQuestions.length ? (
                    <View>
                        <Text> score: {score}</Text>
                    </View>
                ) : (
                    
                    <View style={styles.cardSection}>
                        {/*question card section*/}
                        <View>
                            <Text style={styles.sectionHeading}>{currentSection.section}</Text>
                        </View>
                        {currentSection.options.map((question) => (
                            <TouchableRipple
                                key={question.value}
                                rippleColor="rgba(0, 94, 184, 0.2)"
                                style={styles.card}
                                onPress={() => {
                                    setCurrentIndex(currentIndex + 1)
                                    setScore(score + question.value)
                                    setPrev(question.value)

                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.cardTitle}>{question.label}</Text>
                                    </View>
                                </View>
                            </TouchableRipple>
                        ))}
                    </View>
                )}

                {/*display a back button once the user has submitted atleast one question and hide once complete*/}
                {currentIndex > 0 && currentIndex < flaccQuestions.length && (
                    <TouchableRipple
                    rippleColor="rgba(255, 255, 255, 0.2)"
                    style = {styles.backButton}
                    onPress={ () => {
                        setCurrentIndex(currentIndex - 1)
                        setScore(score - prevScore)
                    }}>
                        <View>
                            <Text style = {styles.buttonText}>Back</Text>
                        </View>
                    </TouchableRipple>
                )}

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

    cardSection: {
        margin: 20,
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

    sectionHeading: {
        fontSize: 28,
        fontFamily: "Inter_500Medium",
        color: "#0e0c0c",
        marginTop: 4,
        marginBottom: 10,
        textAlign: "center",
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

    cardTitle: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 20,
        marginBottom: 10,
    },

    backButton: {
    backgroundColor: "#005EB8",
    borderRadius: 8,
    margin: 5,
    boxShadow: "0 4px 10px rgba(0, 94, 184, 1)",
    width: 70,
    alignSelf: "center",
  },

  buttonText: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: "white",
    padding: 5,
    textAlign: "center",
  },

});
