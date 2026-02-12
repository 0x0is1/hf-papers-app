import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Notifications from "expo-notifications";
import papersApi from "@/services/papersApi";

const DAILY_PAPER_TASK = "DAILY_PAPER_FETCH_TASK";

TaskManager.defineTask(DAILY_PAPER_TASK, async () => {
  try {
    console.log("Running daily paper task...");

    const today = new Date().toISOString().slice(0, 10);
    const res = await papersApi.getDailyPapers(today);

    if (res.papers.length > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Papers Published",
          body: `${res.papers.length} new papers today. Tap to check them out.`,
          sound: true,
          data: { screen: "trending" },
        },
        trigger: null,
      });
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

  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    DAILY_PAPER_TASK
  );

  if (!isRegistered) {
    await BackgroundTask.registerTaskAsync(DAILY_PAPER_TASK, {
      minimumInterval: 60 * 24, // once per day
    });

    console.log("Daily paper task registered.");
  }
}
