import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import PaperCard from "@/components/PaperCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import papersApi, { Paper } from "@/services/papersApi";
import { useTheme } from "@/contexts/ThemeContext";

const formatDate = (d: Date) => d.toISOString().slice(0, 10);
const today = new Date();
const todayStr = formatDate(today);

const HomeScreen = () => {
  const router = useRouter();
  const { COLORS, SIZES } = useTheme();

  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Date>(today);

  const fetchPapers = async (targetDate: Date = date, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const dateStr = formatDate(targetDate);
      const response = await papersApi.getDailyPapers(dateStr);

      const newPapers = Array.isArray(response?.papers) ? response.papers : [];
      setPapers(newPapers);
    } catch {
      setError("Failed to load papers. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPapers(date, true);
  }, [date]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPapers(date, true);
  }, [date]);

  const changeDate = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);

    if (formatDate(next) > todayStr) return;

    setPapers([]);
    setDate(next);
  };

  const handlePaperPress = (paper: Paper) => {
    router.push({
      pathname: "/paper-details",
      params: { paper: JSON.stringify(paper) },
    });
  };

  const renderHeader = () => (
    <View style={styles(COLORS, SIZES).headerContainer}>
      {/* Logo Row */}
      <View style={styles(COLORS, SIZES).logoRow}>
        <View style={styles(COLORS, SIZES).logoContainer}>
          <MaterialIcons name="auto-awesome" size={28} color={COLORS.primary} />
        </View>
        <View style={styles(COLORS, SIZES).titleContainer}>
          <Text style={styles(COLORS, SIZES).appTitle}>HF Papers</Text>
          <Text style={styles(COLORS, SIZES).appSubtitle}>Daily Research</Text>
        </View>
      </View>

      {/* Date Navigation Bar */}
      <View style={styles(COLORS, SIZES).dateNavBar}>
        <TouchableOpacity
          style={styles(COLORS, SIZES).dateNavBtn}
          onPress={() => changeDate(-1)}
        >
          <MaterialIcons name="chevron-left" size={28} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles(COLORS, SIZES).dateDisplay}>
          <MaterialIcons name="calendar-today" size={18} color={COLORS.primary} />
          <Text style={styles(COLORS, SIZES).dateText}>{formatDate(date)}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles(COLORS, SIZES).dateNavBtn,
            formatDate(date) === todayStr && styles(COLORS, SIZES).disabledBtn,
          ]}
          disabled={formatDate(date) === todayStr}
          onPress={() => changeDate(1)}
        >
          <MaterialIcons
            name="chevron-right"
            size={28}
            color={formatDate(date) === todayStr ? COLORS.textTertiary : COLORS.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles(COLORS, SIZES).emptyContainer}>
      <MaterialIcons name="article" size={64} color={COLORS.textTertiary} />
      <Text style={styles(COLORS, SIZES).emptyText}>
        {loading ? "Loading papers…" : "No papers available"}
      </Text>
    </View>
  );

  if (loading && papers.length === 0) {
    return <LoadingSpinner message="Loading papers..." />;
  }

  if (error && papers.length === 0) {
    return <ErrorMessage message={error} onRetry={() => fetchPapers(date, true)} />;
  }

  return (
    <View style={styles(COLORS, SIZES).container}>
      <StatusBar barStyle={COLORS.background === '#FAFAFC' ? 'dark-content' : 'light-content'} />
      {renderHeader()}
      <FlatList
        data={papers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PaperCard paper={item} onPress={() => handlePaperPress(item)} />
        )}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles(COLORS, SIZES).listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
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
    headerContainer: {
      backgroundColor: COLORS.background,
      paddingTop: SIZES.lg,
      paddingHorizontal: SIZES.md,
      paddingBottom: SIZES.md,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.divider,
    },
    logoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SIZES.md,
    },
    logoContainer: {
      width: 48,
      height: 48,
      borderRadius: SIZES.radiusMd,
      backgroundColor: COLORS.primaryLight + '20',
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      marginLeft: SIZES.md,
    },
    appTitle: {
      fontSize: SIZES.h3,
      fontWeight: "700",
      color: COLORS.text,
    },
    appSubtitle: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      marginTop: 2,
    },
    dateNavBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: COLORS.card,
      borderRadius: SIZES.radiusLg,
      padding: SIZES.sm,
    },
    dateNavBtn: {
      width: 44,
      height: 44,
      borderRadius: SIZES.radiusMd,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.backgroundTertiary,
    },
    disabledBtn: {
      opacity: 0.5,
    },
    dateDisplay: {
      flexDirection: "row",
      alignItems: "center",
      gap: SIZES.sm,
    },
    dateText: {
      fontSize: SIZES.body,
      fontWeight: "600",
      color: COLORS.text,
    },
    listContent: {
      paddingHorizontal: SIZES.md,
      paddingTop: SIZES.md,
      paddingBottom: SIZES.xxl,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: SIZES.xxxl,
    },
    emptyText: {
      fontSize: SIZES.body,
      color: COLORS.textSecondary,
      marginTop: SIZES.md,
    },
  });

export default HomeScreen;
