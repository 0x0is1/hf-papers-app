import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PaperCard from "@/components/PaperCard";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import papersApi, { Paper } from "@/services/papersApi";
import { useTheme } from "@/contexts/ThemeContext";

const SUGGESTED_SEARCHES = [
  "transformer",
  "diffusion",
  "LLM",
  "computer vision",
  "reinforcement learning",
  "GPT",
  "stable diffusion",
  "neural network",
];

const SearchScreen = () => {
  const router = useRouter();
  const { COLORS, SIZES } = useTheme();

  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    const q = query.trim();

    if (!q) {
      setPapers([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchQuery(q);
      setHasSearched(true);

      const results = await papersApi.searchPapers(q);
      setPapers(results.papers);
    } catch (err) {
      console.error("Error searching papers:", err);
      setError("Failed to search papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaperPress = (paper: Paper) => {
    router.push({
      pathname: "/paper-details",
      params: { paper: JSON.stringify(paper) },
    });
  };

  const renderHeader = () => (
    <View style={styles(COLORS, SIZES).headerContainer}>
      <SearchBar onSearch={handleSearch} />
    </View>
  );

  const renderSuggestedSearches = () => (
    <View style={styles(COLORS, SIZES).suggestionsContainer}>
      <Text style={styles(COLORS, SIZES).sectionTitle}>Suggested</Text>
      <View style={styles(COLORS, SIZES).suggestionsGrid}>
        {SUGGESTED_SEARCHES.map((suggestion) => (
          <TouchableOpacity
            key={suggestion}
            style={styles(COLORS, SIZES).suggestionChip}
            onPress={() => handleSearch(suggestion)}
          >
            <Ionicons name="search" size={14} color={COLORS.primary} />
            <Text style={styles(COLORS, SIZES).suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEmptyState = () => {
    if (!hasSearched) return renderSuggestedSearches();

    return (
      <View style={styles(COLORS, SIZES).emptyContainer}>
        <MaterialIcons name="search" size={64} color={COLORS.textTertiary} />
        <Text style={styles(COLORS, SIZES).emptyText}>
          No results for "{searchQuery}"
        </Text>
        <Text style={styles(COLORS, SIZES).emptySubtext}>
          Try different keywords
        </Text>
        {renderSuggestedSearches()}
      </View>
    );
  };

  return (
    <View style={styles(COLORS, SIZES).container}>
      <StatusBar barStyle={COLORS.background === '#FAFAFC' ? 'dark-content' : 'light-content'} />
      {renderHeader()}
      {loading ? (
        <LoadingSpinner message="Searching..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => handleSearch(searchQuery)} />
      ) : (
        <FlatList
          data={papers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PaperCard paper={item} onPress={() => handlePaperPress(item)} />
          )}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles(COLORS, SIZES).listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    listContent: {
      paddingHorizontal: SIZES.md,
      paddingTop: SIZES.md,
      paddingBottom: SIZES.xxl,
    },
    suggestionsContainer: {
      padding: SIZES.md,
    },
    sectionTitle: {
      fontSize: SIZES.h5,
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: SIZES.md,
    },
    suggestionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: SIZES.sm,
    },
    suggestionChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.card,
      paddingHorizontal: SIZES.md,
      paddingVertical: SIZES.sm,
      borderRadius: SIZES.radiusRound,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    suggestionText: {
      color: COLORS.text,
      fontSize: SIZES.caption,
      marginLeft: SIZES.xs,
      fontWeight: "500",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: SIZES.xxxl,
      paddingHorizontal: SIZES.xl,
    },
    emptyText: {
      fontSize: SIZES.h5,
      color: COLORS.textSecondary,
      marginTop: SIZES.md,
      textAlign: "center",
    },
    emptySubtext: {
      fontSize: SIZES.caption,
      color: COLORS.textTertiary,
      marginTop: SIZES.sm,
      textAlign: "center",
    },
  });

export default SearchScreen;
