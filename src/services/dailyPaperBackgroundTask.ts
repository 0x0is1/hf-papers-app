import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import papersApi from "@/services/papersApi";

const DAILY_PAPER_TASK = "DAILY_PAPER_FETCH_TASK";
const LAST_NOTIFIED_KEY = "@last_notified_date_test_3";

TaskManager.defineTask(DAILY_PAPER_TASK, async () => {
  try {
    const recentPapers = await papersApi.getRecentPapers(50);
    if (!recentPapers || recentPapers.length === 0) {
      console.log("No recent papers fetched.");
      return BackgroundTask.BackgroundTaskResult.NoData;
    }

    // Find the most recent published date among the papers
    const latestPaper = recentPapers.reduce((latest, current) => {
      return current.publishedAt > latest.publishedAt ? current : latest;
    }, recentPapers[0]);

    const latestDate = latestPaper.publishedAt.split('T')[0]; // e.g. "2026-04-28"
    const papersForLatestDate = recentPapers.filter(p => p.publishedAt.startsWith(latestDate));

    const lastNotifiedDate = await AsyncStorage.getItem(LAST_NOTIFIED_KEY);

    if (lastNotifiedDate !== latestDate) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Papers on Hugging Face!",
          body: `${papersForLatestDate.length} top papers for ${latestDate}. Tap to explore.`,
          sound: true,
          data: { screen: "trending" },
        },
        trigger: null,
      });

      // Mark this date as notified
      await AsyncStorage.setItem(LAST_NOTIFIED_KEY, latestDate);
      console.log(`Notification sent for ${latestDate} (${papersForLatestDate.length} papers).`);
    } else {
      console.log(`Already notified for ${latestDate}. Skipping.`);
    }

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("Background task failed:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export async function registerDailyPaperTask() {
  const status = await BackgroundTask.getStatusAsync();

  if (status === BackgroundTask.BackgroundTaskStatus.Restricted) {
    console.log("Background tasks are restricted.");
    return;
  }

  await BackgroundTask.registerTaskAsync(DAILY_PAPER_TASK, {
    minimumInterval: 60 * 2, // 2 minutes for testing
  });

  console.log("Daily paper task registered with 2m interval.");
}
