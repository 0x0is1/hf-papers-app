import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PaperCard from '@/components/PaperCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import papersApi, { Paper } from '@/services/papersApi';
import { useTheme } from '@/contexts/ThemeContext';

const TrendingScreen = () => {
  const router = useRouter();
  const { COLORS, SIZES } = useTheme();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingPapers = async () => {
    try {
      setError(null);
      const trendingPapers = await papersApi.getTrendingPapers();
      setPapers(trendingPapers);
    } catch (err) {
      setError('Failed to load trending papers.');
      console.error('Error fetching trending papers:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrendingPapers();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTrendingPapers();
  }, []);

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
          <MaterialIcons name="whatshot" size={28} color={COLORS.success} />
        </View>
        <View style={styles(COLORS, SIZES).titleContainer}>
          <Text style={styles(COLORS, SIZES).appTitle}>Trending</Text>
          <Text style={styles(COLORS, SIZES).appSubtitle}>Most upvoted papers</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles(COLORS, SIZES).emptyContainer}>
      <MaterialIcons name="trending-up" size={64} color={COLORS.textTertiary} />
      <Text style={styles(COLORS, SIZES).emptyText}>No trending papers</Text>
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (error && papers.length === 0) {
    return <ErrorMessage message={error} onRetry={fetchTrendingPapers} />;
  }

  return (
    <View style={styles(COLORS, SIZES).container}>
      <StatusBar barStyle={COLORS.background === '#FAFAFC' ? 'dark-content' : 'light-content'} />
      {renderHeader()}
      <FlatList
        data={papers}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles(COLORS, SIZES).paperContainer}>
            <View style={styles(COLORS, SIZES).rankBadge}>
              <Text style={styles(COLORS, SIZES).rankText}>#{index + 1}</Text>
            </View>
            <PaperCard paper={item} onPress={() => handlePaperPress(item)} />
          </View>
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
    },
    logoContainer: {
      width: 48,
      height: 48,
      borderRadius: SIZES.radiusMd,
      backgroundColor: COLORS.successLight,
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
    paperContainer: {
      position: 'relative',
    },
    rankBadge: {
      position: 'absolute',
      top: -8,
      left: -8,
      zIndex: 10,
      backgroundColor: COLORS.primary,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: COLORS.background,
    },
    rankText: {
      color: COLORS.text,
      fontSize: SIZES.small,
      fontWeight: '700',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.xxxl,
    },
    emptyText: {
      fontSize: SIZES.body,
      color: COLORS.textSecondary,
      marginTop: SIZES.md,
    },
  });

export default TrendingScreen;
