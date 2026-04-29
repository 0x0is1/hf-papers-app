import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import papersApi from "@/services/papersApi";

const DAILY_PAPER_TASK = "DAILY_PAPER_FETCH_TASK";
const LAST_NOTIFIED_KEY = "@last_notified_date_test_2";

TaskManager.defineTask(DAILY_PAPER_TASK, async () => {
  try {
    const recentPapers = await papersApi.getRecentPapers(50);
    const today = new Date().toISOString().slice(0, 10);
    const todaysPapers = recentPapers.filter(p => p.publishedAt.startsWith(today));

    if (todaysPapers.length > 0) {
      const lastNotifiedDate = await AsyncStorage.getItem(LAST_NOTIFIED_KEY);

      if (lastNotifiedDate !== today) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New Papers Published",
            body: `${todaysPapers.length} new papers today. Tap to check them out.`,
            sound: true,
            data: { screen: "trending" },
          },
          trigger: null,
        });

        // Mark today as notified
        await AsyncStorage.setItem(LAST_NOTIFIED_KEY, today);
        console.log(`Notification sent for ${today} (${todaysPapers.length} papers).`);
      } else {
        console.log(`Already notified for ${today}. Skipping.`);
      }
    } else {
      console.log(`No papers found for ${today} yet.`);
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
