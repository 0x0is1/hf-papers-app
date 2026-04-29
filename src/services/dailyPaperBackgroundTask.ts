import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import papersApi from "@/services/papersApi";

const DAILY_PAPER_TASK = "DAILY_PAPER_FETCH_TASK";
const LAST_NOTIFIED_KEY = "@last_notified_date_test_4";

export const saveBgLog = async (msg: string) => {
  console.log(msg);
  try {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
    const prev = await AsyncStorage.getItem('@bg_logs');
    const logsArray = prev ? JSON.parse(prev) : [];
    logsArray.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
    await AsyncStorage.setItem('@bg_logs', JSON.stringify(logsArray.slice(0, 30)));
  } catch {}
};

export const executeDailyPaperTask = async () => {
  try {
    await saveBgLog("Task started.");
    const recentPapers = await papersApi.getRecentPapers(50);
    if (!recentPapers || recentPapers.length === 0) {
      await saveBgLog("No recent papers fetched.");
      return BackgroundTask.BackgroundTaskResult.Success;
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
      await saveBgLog(`Notification sent for ${latestDate} (${papersForLatestDate.length} papers).`);
    } else {
      await saveBgLog(`Already notified for ${latestDate}. Skipping.`);
    }

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error: any) {
    await saveBgLog(`Background task failed: ${error.message || error}`);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
};

TaskManager.defineTask(DAILY_PAPER_TASK, executeDailyPaperTask);

export async function registerDailyPaperTask() {
  const status = await BackgroundTask.getStatusAsync();

  if (status === BackgroundTask.BackgroundTaskStatus.Restricted) {
    await saveBgLog("Background tasks are restricted.");
    return;
  }

  await BackgroundTask.registerTaskAsync(DAILY_PAPER_TASK, {
    minimumInterval: 60, // 1 minute (though OS enforces 15m)
  });

  await saveBgLog("Daily paper task registered with 1m interval.");
}
