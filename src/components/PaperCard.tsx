import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Paper } from "../services/papersApi";
import { useTheme } from "@/contexts/ThemeContext";
import { format } from "date-fns";

interface PaperCardProps {
  paper: Paper;
  onPress: () => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 16 * 2;

const PaperCard: React.FC<PaperCardProps> = ({ paper, onPress }) => {
  const { COLORS, SIZES, SHADOWS } = useTheme();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <TouchableOpacity
      style={styles(COLORS, SIZES, SHADOWS).container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Thumbnail */}
      {paper.thumbnail && (
        <View style={styles(COLORS, SIZES, SHADOWS).thumbnailContainer}>
          <Image
            source={{ uri: paper.thumbnail }}
            style={styles(COLORS, SIZES, SHADOWS).thumbnail}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Content */}
      <View style={styles(COLORS, SIZES, SHADOWS).content}>
        {/* Header */}
        <View style={styles(COLORS, SIZES, SHADOWS).header}>
          <View style={styles(COLORS, SIZES, SHADOWS).upvoteContainer}>
            <Ionicons name="arrow-up" size={16} color={COLORS.success} />
            <Text style={styles(COLORS, SIZES, SHADOWS).upvoteText}>
              {paper.upvotes}
            </Text>
          </View>
          <Text style={styles(COLORS, SIZES, SHADOWS).arxivId}>
            arXiv:{paper.arxivId}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles(COLORS, SIZES, SHADOWS).title} numberOfLines={3}>
          {paper.title}
        </Text>

        {/* Summary */}
        {paper.summary && (
          <Text style={styles(COLORS, SIZES, SHADOWS).summary} numberOfLines={3}>
            {truncateText(paper.summary, 150)}
          </Text>
        )}

        {/* Authors */}
        {paper.authors && paper.authors.length > 0 && (
          <View style={styles(COLORS, SIZES, SHADOWS).authorsContainer}>
            <MaterialIcons name="person" size={14} color={COLORS.textTertiary} />
            <Text
              style={styles(COLORS, SIZES, SHADOWS).authorsText}
              numberOfLines={1}
            >
              {paper.authors.map((a) => a.name).join(", ")}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles(COLORS, SIZES, SHADOWS).footer}>
          <View style={styles(COLORS, SIZES, SHADOWS).dateContainer}>
            <MaterialIcons
              name="calendar-today"
              size={14}
              color={COLORS.textTertiary}
            />
            <Text style={styles(COLORS, SIZES, SHADOWS).dateText}>
              {formatDate(paper.publishedAt)}
            </Text>
          </View>

          <View style={styles(COLORS, SIZES, SHADOWS).commentsContainer}>
            <MaterialIcons name="comment" size={14} color={COLORS.textTertiary} />
            <Text style={styles(COLORS, SIZES, SHADOWS).commentsText}>
              {paper.numComments}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles(COLORS, SIZES, SHADOWS).tagsContainer}>
          <View style={styles(COLORS, SIZES, SHADOWS).tag}>
            <MaterialIcons name="article" size={12} color={COLORS.accent} />
            <Text style={styles(COLORS, SIZES, SHADOWS).tagText}>Paper</Text>
          </View>

          {paper.githubUrl && (
            <View style={styles(COLORS, SIZES, SHADOWS).tag}>
              <MaterialIcons name="code" size={12} color={COLORS.accentSecondary} />
              <Text style={styles(COLORS, SIZES, SHADOWS).tagText}>Code</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ===================== STYLES ===================== */

const styles = (COLORS: any, SIZES: any, SHADOWS: any) =>
  StyleSheet.create({
    container: {
      width: CARD_WIDTH,
      backgroundColor: COLORS.card,
      borderRadius: SIZES.radiusLg,
      marginBottom: SIZES.md,
      overflow: "hidden",
      ...SHADOWS.card,
    },
    thumbnailContainer: {
      width: "100%",
      height: 180,
      position: "relative",
    },
    thumbnail: {
      width: "100%",
      height: "100%",
    },
    gradientOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    content: {
      padding: SIZES.md,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SIZES.sm,
    },
    upvoteContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.backgroundTertiary,
      paddingHorizontal: SIZES.sm,
      paddingVertical: 4,
      borderRadius: SIZES.radiusSm,
    },
    upvoteText: {
      color: COLORS.success,
      fontSize: SIZES.caption,
      fontWeight: "600",
      marginLeft: 4,
    },
    arxivId: {
      color: COLORS.textTertiary,
      fontSize: SIZES.small,
      fontFamily: "monospace",
    },
    title: {
      color: COLORS.text,
      fontSize: SIZES.h5,
      fontWeight: "700",
      marginBottom: SIZES.sm,
      lineHeight: 24,
    },
    summary: {
      color: COLORS.textSecondary,
      fontSize: SIZES.caption,
      lineHeight: 20,
      marginBottom: SIZES.sm,
    },
    authorsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SIZES.sm,
    },
    authorsText: {
      color: COLORS.textTertiary,
      fontSize: SIZES.small,
      marginLeft: 4,
      flex: 1,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SIZES.sm,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    dateText: {
      color: COLORS.textTertiary,
      fontSize: SIZES.small,
      marginLeft: 4,
    },
    commentsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    commentsText: {
      color: COLORS.textTertiary,
      fontSize: SIZES.small,
      marginLeft: 4,
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tag: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.backgroundTertiary,
      paddingHorizontal: SIZES.sm,
      paddingVertical: 4,
      borderRadius: SIZES.radiusSm,
      marginRight: SIZES.xs,
    },
    tagText: {
      color: COLORS.textSecondary,
      fontSize: SIZES.tiny,
      marginLeft: 4,
      fontWeight: "600",
    },
  });

export default PaperCard;
