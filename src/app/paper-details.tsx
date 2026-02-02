import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import papersApi, { PaperDetails } from "@/services/papersApi";
import { useTheme } from "@/contexts/ThemeContext";
import { format } from "date-fns";

const PaperDetailsScreen = () => {
  const router = useRouter();
  const { COLORS, SIZES } = useTheme();
  const params = useLocalSearchParams<{
    arxivId?: string;
    paper?: string;
  }>();

  const initialPaper: PaperDetails | null = params.paper
    ? JSON.parse(params.paper)
    : null;

  const [paper, setPaper] = useState<PaperDetails | null>(initialPaper);
  const [loading, setLoading] = useState(!initialPaper);
  const [error, setError] = useState<string | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);

  const arxivId = paper?.arxivId || paper?._id || params.arxivId || undefined;

  useEffect(() => {
    if (!arxivId) return;
    fetchPaperDetails();
  }, [arxivId]);

  const fetchPaperDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const details = await papersApi.getPaperDetails(arxivId!);

      setPaper((prev) => ({
        ...details,
        ...prev,
        arxivId: prev?.arxivId || details.arxivId || details._id,
      }));
    } catch (err) {
      setError("Failed to load paper details. Please try again.");
      console.error("Error fetching paper details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenURL = (url: string) => Linking.openURL(url);

  const handleShare = async () => {
    if (!paper || !arxivId) return;
    await Share.share({
      title: paper.title,
      message: `Check out this paper:\n\n${paper.title}\n${papersApi.getArxivUrl(
        arxivId,
      )}`,
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  /* ===================== STATES ===================== */

  if (loading && !paper) {
    return <LoadingSpinner message="Loading paper details..." />;
  }

  if (error || !paper) {
    return (
      <ErrorMessage
        message={error || "Paper not found"}
        onRetry={fetchPaperDetails}
      />
    );
  }

  /* ===================== MAIN VIEW ===================== */

  return (
    <View style={styles(COLORS, SIZES).container}>
      <View style={styles(COLORS, SIZES).headerBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles(COLORS, SIZES).backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles(COLORS, SIZES).pageHeader}>
          Overview
        </Text>
        <View style={styles(COLORS, SIZES).headerActions}>
          <TouchableOpacity
            onPress={handleShare}
            style={styles(COLORS, SIZES).iconButton}
          >
            <MaterialIcons name="share" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles(COLORS, SIZES).scrollView}
        contentContainerStyle={styles(COLORS, SIZES).scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Media (images first, fallback to thumbnail) */}
        {paper.mediaUrls?.some((u) => /\.(png|jpg|jpeg|webp|gif)$/i.test(u)) ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles(COLORS, SIZES).mediaCarousel}
          >
            {paper.mediaUrls
              .filter((u) => /\.(png|jpg|jpeg|webp|gif)$/i.test(u))
              .map((url, index) => (
                <Image
                  key={url + index}
                  source={{ uri: url }}
                  style={styles(COLORS, SIZES).mediaImage}
                  resizeMode="cover"
                />
              ))}
          </ScrollView>
        ) : (
          paper.thumbnail && (
            <View style={styles(COLORS, SIZES).thumbnailContainer}>
              <Image
                source={{ uri: paper.thumbnail }}
                style={styles(COLORS, SIZES).thumbnail}
                resizeMode="cover"
              />
            </View>
          )
        )}

        <View style={styles(COLORS, SIZES).infoSection}>
          <View style={styles(COLORS, SIZES).metadataBar}>
            <View style={styles(COLORS, SIZES).upvoteContainer}>
              <Ionicons name="arrow-up" size={20} color={COLORS.success} />
              <Text style={styles(COLORS, SIZES).upvoteText}>
                {paper.upvotes ?? 0} upvotes
              </Text>
            </View>

            {typeof paper.numComments === "number" && (
              <View style={styles(COLORS, SIZES).metadataItem}>
                <MaterialIcons
                  name="comment"
                  size={16}
                  color={COLORS.textTertiary}
                />
                <Text style={styles(COLORS, SIZES).metadataText}>
                  {paper.numComments} comments
                </Text>
              </View>
            )}
          </View>

          <Text style={styles(COLORS, SIZES).title}>{paper.title}</Text>

          {arxivId && (
            <TouchableOpacity
              style={styles(COLORS, SIZES).arxivBadge}
              onPress={() => handleOpenURL(papersApi.getArxivUrl(arxivId))}
            >
              <MaterialIcons name="link" size={16} color={COLORS.accent} />
              <Text style={styles(COLORS, SIZES).arxivText}>
                arXiv:{arxivId}
              </Text>
            </TouchableOpacity>
          )}

          {/* Authors */}
          {paper.authors && paper.authors.length > 0 && (
            <View style={styles(COLORS, SIZES).authorsSection}>
              <Text style={styles(COLORS, SIZES).sectionTitle}>Authors</Text>

              {(showAllAuthors ? paper.authors : paper.authors.slice(0, 2)).map(
                (author) => (
                  <Text
                    key={author._id}
                    style={styles(COLORS, SIZES).authorItem}
                  >
                    <Text style={styles(COLORS, SIZES).authorName}>
                      {author.user?.fullname ||
                        author.user?.name ||
                        author.name}
                    </Text>

                    {author.user?.isPro && (
                      <View style={styles(COLORS, SIZES).proBadge}>
                        <Text style={styles(COLORS, SIZES).proText}>PRO</Text>
                      </View>
                    )}
                  </Text>
                ),
              )}

              {paper.authors.length > 2 && (
                <TouchableOpacity
                  onPress={() => setShowAllAuthors((v) => !v)}
                  style={styles(COLORS, SIZES).expandAuthorsBtn}
                >
                  <Text style={styles(COLORS, SIZES).expandAuthorsText}>
                    {showAllAuthors
                      ? "Show less"
                      : `+ ${paper.authors.length - 2} more`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles(COLORS, SIZES).dateSection}>
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={COLORS.textTertiary}
            />
            <Text style={styles(COLORS, SIZES).dateText}>
              Published on {formatDate(paper.publishedAt)}
            </Text>
          </View>

          <View style={styles(COLORS, SIZES).abstractSection}>
            <Text style={styles(COLORS, SIZES).sectionTitle}>Abstract</Text>
            <Text style={styles(COLORS, SIZES).abstractText}>
              {paper.summary || paper.abstract || "No abstract available."}
            </Text>
          </View>

          <View style={styles(COLORS, SIZES).actionsSection}>
            <TouchableOpacity
              style={[
                styles(COLORS, SIZES).actionButton,
                styles(COLORS, SIZES).primaryButton,
              ]}
              onPress={() =>
                router.push({
                  pathname: "/paper-pdf",
                  params: {
                    pdfUrl: papersApi.getPdfUrl(paper.arxivId),
                    title: paper.title,
                  },
                })
              }
            >
              <MaterialIcons
                name="picture-as-pdf"
                size={24}
                color={COLORS.text}
              />
              <Text
                style={[
                  styles(COLORS, SIZES).actionButtonText,
                  {
                    color: COLORS.text,
                  },
                ]}
              >
                Read PDF
              </Text>
            </TouchableOpacity>

            {arxivId && (
              <TouchableOpacity
                style={[
                  styles(COLORS, SIZES).actionButton
                ]}
                onPress={() => handleOpenURL(papersApi.getArxivUrl(arxivId))}
              >
                <MaterialIcons name="language" size={24} color={COLORS.text} />
                <Text
                  style={[
                    styles(COLORS, SIZES).actionButtonText,
                    {
                      color: COLORS.text,
                    },
                  ]}
                >
                  View on arXiv
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {paper.githubUrl && (
            <TouchableOpacity
              style={styles(COLORS, SIZES).githubButton}
              onPress={() => handleOpenURL(paper.githubUrl || "")}
            >
              <MaterialIcons name="code" size={24} color={COLORS.text} />
              <Text style={styles(COLORS, SIZES).githubButtonText}>
                View Code on GitHub
              </Text>
            </TouchableOpacity>
          )}

          {(paper.mediaUrls || []).length > 0 && (
            <View style={styles(COLORS, SIZES).mediaSection}>
              <Text style={styles(COLORS, SIZES).sectionTitle}>
                Additional Resources
              </Text>

              {paper.mediaUrls!.map((url, index) => (
                <TouchableOpacity
                  key={url + index}
                  style={styles(COLORS, SIZES).mediaItem}
                  onPress={() => handleOpenURL(url)}
                >
                  <MaterialIcons
                    name="play-circle-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text
                    style={styles(COLORS, SIZES).mediaText}
                    numberOfLines={1}
                  >
                    Media Resource {index + 1}
                  </Text>
                  <MaterialIcons
                    name="open-in-new"
                    size={20}
                    color={COLORS.textTertiary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {paper.submittedBy && (
            <TouchableOpacity
              onPress={() => {
                handleOpenURL(
                  `https://huggingface.co/${paper.submittedBy?.name || ""}`,
                );
              }}
            >
              <View style={styles(COLORS, SIZES).submittedSection}>
                <Text style={styles(COLORS, SIZES).submittedLabel}>
                  Submitted by
                </Text>
                <View style={styles(COLORS, SIZES).submitterInfo}>
                  <Text style={styles(COLORS, SIZES).submitterName}>
                    {paper.submittedBy.fullname ||
                      paper.submittedBy.name ||
                      "Unknown"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (COLORS: any, SIZES: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    headerBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: SIZES.md,
      paddingTop: SIZES.lg,
      paddingBottom: SIZES.md,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: SIZES.radiusMd,
      backgroundColor: COLORS.card,
      justifyContent: "center",
      alignItems: "center",
    },
    headerActions: { flexDirection: "row", gap: SIZES.sm },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: SIZES.radiusMd,
      backgroundColor: COLORS.card,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: SIZES.xxl },
    thumbnailContainer: { width: "100%", height: 240 },
    thumbnail: { width: "100%", height: "100%" },
    infoSection: { padding: SIZES.md },
    mediaCarousel: { height: 200 },
    mediaImage: { minWidth: "100%", height: 200, objectFit: "fill" },
    metadataBar: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SIZES.md,
      gap: SIZES.md,
    },
    upvoteContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.backgroundTertiary,
      paddingHorizontal: SIZES.sm,
      paddingVertical: 6,
      borderRadius: SIZES.radiusSm,
    },
    upvoteText: {
      color: COLORS.success,
      fontSize: SIZES.caption,
      fontWeight: "600",
      marginLeft: 4,
    },
    metadataItem: { flexDirection: "row", alignItems: "center" },
    metadataText: {
      color: COLORS.textTertiary,
      fontSize: SIZES.caption,
      marginLeft: 4,
    },
    title: {
      fontSize: SIZES.h3,
      fontWeight: "700",
      color: COLORS.text,
      marginBottom: SIZES.md,
    },
    arxivBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.card,
      paddingHorizontal: SIZES.md,
      paddingVertical: SIZES.sm,
      borderRadius: SIZES.radiusMd,
      marginBottom: SIZES.md,
    },
    arxivText: {
      color: COLORS.accent,
      fontSize: SIZES.caption,
      marginLeft: 6,
      fontWeight: "600",
      fontFamily: "monospace",
    },
    sectionTitle: {
      fontSize: SIZES.h5,
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: SIZES.sm,
    },
    authorsSection: { marginBottom: SIZES.lg },
    authorsList: { gap: SIZES.sm },
    authorItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.card,
      padding: SIZES.md,
      margin: SIZES.xs,
      borderRadius: SIZES.radiusMd,
    },
    authorAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: SIZES.sm,
    },
    authorName: {
      flex: 1,
      color: COLORS.text,
      fontSize: SIZES.body,
      fontWeight: "500",
    },
    pageHeader: {
      display: "flex",
      color: COLORS.text,
      fontSize: SIZES.h5,
      fontWeight: "600",
      alignItems: "center",
      justifyContent: "center"
    },
    proBadge: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    proText: {
      color: COLORS.text,
      fontSize: SIZES.tiny,
      fontWeight: "700",
    },
    expandAuthorsBtn: {
      paddingVertical: SIZES.sm,
    },
    expandAuthorsText: {
      color: COLORS.primary,
      fontSize: SIZES.body,
      fontWeight: "600",
    },
    dateSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SIZES.lg,
    },
    dateText: {
      color: COLORS.textSecondary,
      fontSize: SIZES.body,
      marginLeft: SIZES.sm,
    },
    abstractSection: { marginBottom: SIZES.lg },
    abstractText: {
      color: COLORS.textSecondary,
      fontSize: SIZES.body,
      lineHeight: 24,
      textAlign: "left",
    },
    actionsSection: { gap: SIZES.sm, marginBottom: SIZES.lg },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.card,
      padding: SIZES.md,
      borderRadius: SIZES.radiusMd,
      gap: SIZES.sm,
    },
    primaryButton: { backgroundColor: COLORS.primary },
    actionButtonText: {
      fontSize: SIZES.body,
      fontWeight: "600",
    },
    githubButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.backgroundTertiary,
      padding: SIZES.md,
      borderRadius: SIZES.radiusMd,
      gap: SIZES.sm,
      marginBottom: SIZES.lg,
    },
    githubButtonText: {
      color: COLORS.text,
      fontSize: SIZES.body,
      fontWeight: "600",
    },
    mediaSection: { marginBottom: SIZES.lg },
    mediaItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.card,
      padding: SIZES.md,
      borderRadius: SIZES.radiusMd,
      marginBottom: SIZES.sm,
    },
    mediaText: {
      flex: 1,
      color: COLORS.text,
      fontSize: SIZES.body,
      marginLeft: SIZES.md,
    },
    submittedSection: {
      backgroundColor: COLORS.card,
      padding: SIZES.md,
      borderRadius: SIZES.radiusMd,
    },
    submittedLabel: {
      color: COLORS.textTertiary,
      fontSize: SIZES.caption,
      marginBottom: SIZES.xs,
    },
    submitterInfo: {},
    submitterName: {
      color: COLORS.text,
      fontSize: SIZES.body,
      fontWeight: "600",
    },
  });

export default PaperDetailsScreen;
