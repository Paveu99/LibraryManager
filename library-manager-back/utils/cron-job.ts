import cron from "node-cron";

export const startCronJobs = () => {
    cron.schedule("0 0 * * *", () => {
        console.log("Cron job: Checking overdue books...");
    });

    cron.schedule("* * * * *", () => {
        console.log("Test cron job: Running every minute...");
    });

    console.log("Cron jobs initialized.");
};
