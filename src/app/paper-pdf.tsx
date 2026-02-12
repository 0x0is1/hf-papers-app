import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeModules } from "react-native";
console.log("BlobUtil native module:", NativeModules.RNBlobUtil);
console.log("PDF native module:", NativeModules.RCTPdf);
import Pdf from "react-native-pdf";
import { useTheme } from "@/contexts/ThemeContext";

const PaperPDFScreen = () => {
  const router = useRouter();
  const { COLORS, SIZES } = useTheme();
  const { pdfUrl, title } = useLocalSearchParams<{
    pdfUrl: string;
    title?: string;
  }>();

  if (!pdfUrl) {
    return (
      <View style={styles(COLORS, SIZES).center}>
        <Text style={styles(COLORS, SIZES).error}>PDF not available</Text>
      </View>
    );
  }
  return (
    <View style={styles(COLORS, SIZES).container}>
      {/* Header */}
      <View style={styles(COLORS, SIZES).header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles(COLORS, SIZES).title} numberOfLines={1}>
          {title || "PDF"}
        </Text>
      </View>

      <Pdf
        source={{ uri: pdfUrl, cache: true }}
        style={styles(COLORS, SIZES).pdf}
        trustAllCerts={false}
        onError={(error) => {
          console.log("PDF error:", error);
        }}
        onLoadComplete={(pages) => {
          console.log(`Loaded ${pages} pages`);
        }}
      />
    </View>
  );
};

const styles = (COLORS: any, SIZES: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: SIZES.md,
      paddingHorizontal: SIZES.md,
      paddingTop: SIZES.lg,
      paddingBottom: SIZES.md,
      backgroundColor: COLORS.background,
    },
    title: {
      flex: 1,
      color: COLORS.text,
      fontSize: SIZES.body,
      fontWeight: "600",
    },
    pdf: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: COLORS.textSecondary,
      fontSize: SIZES.body,
    },
  });

export default PaperPDFScreen;
