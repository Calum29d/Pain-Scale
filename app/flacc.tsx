import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";


export default function FlaccScale() {

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


    const [currentIndex, setCurrentIndex] = useState(0)
    const currentSection = flaccQuestions[currentIndex]



    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Pressable style={styles.backArrow}
                        onPress={() => router.back()}>
                        <FontAwesome name="arrow-left" size={30} color="#005EB8" />
                    </Pressable>
                </View>

                {/*question card section*/}
                <View style={styles.cardSection}>
                    {currentSection.options.map((question) => (
                        <TouchableRipple
                            key = {question.value}
                            rippleColor="rgba(0, 94, 184, 0.2)"
                            style={styles.card}
                            onPress={() => (null)}>
                            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>{question.label}</Text>
                                </View>
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

    cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    marginBottom: 10,
  },

    });
