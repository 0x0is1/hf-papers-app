import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const lastDirectionRef = useRef<number>(0); // Track last navigation direction: -1 (back) or 1 (forward)
  const isAutoNavigatingRef = useRef<boolean>(false); // Prevent infinite loops

  const fetchPapers = async (
    targetDate: Date = date,
    isRefresh = false,
    autoNavigate = true,
  ) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const dateStr = formatDate(targetDate);
      const response = await papersApi.getDailyPapers(dateStr);

      const newPapers = Array.isArray(response?.papers) ? response.papers : [];

      // If papers are empty and we should auto-navigate
      if (
        newPapers.length === 0 &&
        autoNavigate &&
        lastDirectionRef.current !== 0 &&
        !isAutoNavigatingRef.current
      ) {
        isAutoNavigatingRef.current = true;

        // Navigate in the same direction as before
        const nextDate = new Date(targetDate);
        nextDate.setDate(nextDate.getDate() + lastDirectionRef.current);

        // Check boundaries
        if (
          formatDate(nextDate) <= todayStr &&
          formatDate(nextDate) >= "2000-01-01"
        ) {
          setDate(nextDate);
          // The useEffect will trigger fetchPapers again
        } else {
          // Reached boundary, stop auto-navigation
          setPapers([]);
          isAutoNavigatingRef.current = false;
        }
      } else {
        setPapers(newPapers);
        isAutoNavigatingRef.current = false;
      }
    } catch {
      setError("Failed to load papers. Please try again.");
      isAutoNavigatingRef.current = false;
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
    lastDirectionRef.current = 0; // Reset direction on manual refresh
    isAutoNavigatingRef.current = false;
    fetchPapers(date, true, false); // Don't auto-navigate on refresh
  }, [date]);

  const changeDate = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);

    // Check forward boundary
    if (formatDate(next) > todayStr) return;

    // Check backward boundary (optional, set a reasonable limit)
    if (formatDate(next) < "2000-01-01") return;

    lastDirectionRef.current = delta; // Store the direction
    isAutoNavigatingRef.current = false; // Reset auto-navigation flag
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
          <MaterialIcons name="home" size={28} color={COLORS.primary} />
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
          disabled={loading}
        >
          <MaterialIcons
            name="chevron-left"
            size={28}
            color={loading ? COLORS.textTertiary : COLORS.text}
          />
        </TouchableOpacity>

        <View style={styles(COLORS, SIZES).dateDisplay}>
          <MaterialIcons
            name="calendar-today"
            size={18}
            color={COLORS.primary}
          />
          <Text style={styles(COLORS, SIZES).dateText}>{formatDate(date)}</Text>
          {isAutoNavigatingRef.current && (
            <Text style={styles(COLORS, SIZES).searchingText}>
              (searching...)
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles(COLORS, SIZES).dateNavBtn,
            (formatDate(date) === todayStr || loading) &&
              styles(COLORS, SIZES).disabledBtn,
          ]}
          disabled={formatDate(date) === todayStr || loading}
          onPress={() => changeDate(1)}
        >
          <MaterialIcons
            name="chevron-right"
            size={28}
            color={
              formatDate(date) === todayStr || loading
                ? COLORS.textTertiary
                : COLORS.text
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles(COLORS, SIZES).emptyContainer}>
      <MaterialIcons name="article" size={64} color={COLORS.textTertiary} />
      <Text style={styles(COLORS, SIZES).emptyText}>
        {loading ? "Loading papers…" : "No papers available for this date"}
      </Text>
      {!loading && papers.length === 0 && (
        <Text style={styles(COLORS, SIZES).emptySubtext}>
          Try navigating to a different date
        </Text>
      )}
    </View>
  );

  if (loading && papers.length === 0 && !isAutoNavigatingRef.current) {
    return <LoadingSpinner message="Loading papers..." />;
  }

  if (error && papers.length === 0) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => fetchPapers(date, true, false)}
      />
    );
  }

  return (
    <View style={styles(COLORS, SIZES).container}>
      <StatusBar
        barStyle={
          COLORS.background === "#F8F9EF" ? "dark-content" : "light-content"
        }
      />
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
      backgroundColor: COLORS.primaryLight + "20",
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
    searchingText: {
      fontSize: SIZES.small,
      color: COLORS.textTertiary,
      fontStyle: "italic",
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
    emptySubtext: {
      fontSize: SIZES.caption,
      color: COLORS.textTertiary,
      marginTop: SIZES.sm,
    },
  });

export default HomeScreen;
