import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// Initialize simpleGit with the directory containing your repository
const git = simpleGit();

// Path to your JSON file
const path = "./pages/data.json";

// List of pre-generated 49 commits
const commitMessages = [
  " Initial setup",
  " Added authentication module",
  " Fixed login bug",
  " Improved UI for dashboard",
  " Added user profile feature",
  " Refactored API calls",
  " Updated dependencies",
  " Fixed navbar responsiveness",
  " Added logout functionality",
  " Optimized database queries",
  " Implemented dark mode",
  " Improved error handling",
  " Bug fix in settings page",
  " Added search functionality",
  " UI enhancements",
  " Added real-time notifications",
  " Improved security measures",
  " Updated readme documentation",
  " Fixed mobile layout issues",
  " Added unit tests",
  " Refactored backend code",
  " Implemented caching",
  " Performance improvements",
  " Added forgot password feature",
  " Fixed session timeout issue",
  " UI improvements for settings page",
  " Improved accessibility",
  " Fixed minor bugs",
  " Added onboarding tutorial",
  " Improved file upload functionality",
  " Security patch update",
  " Added email verification",
  " Fixed form validation issues",
  " Optimized front-end performance",
  " Bug fixes in notifications",
  " Improved analytics dashboard",
  " Refactored Redux store",
  " Updated API documentation",
  " Added 2FA authentication",
  "  Fixed UI glitches",
  " Database schema optimization",
  " Improved search algorithm",
  " Implemented new caching strategy",
  " Fixed logout redirection",
  " Bug fix in profile page",
  " Improved image compression",
  " Updated user roles management",
  " Improved backend logging",
  " Final bug fixes and improvements",
];

// Function to create a single commit
const createCommit = async (commitDate, commitMessage) => {
  const data = {
    timestamp: commitDate,
    message: commitMessage,
  };

  try {
    await new Promise((resolve, reject) => {
      jsonfile.writeFile(path, data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await git.add([path]);
    await git.commit(commitMessage, { "--date": commitDate });
    console.log(`Created commit: "${commitMessage}" on ${commitDate}`);
  } catch (error) {
    console.error(`Error creating commit on ${commitDate}:`, error);
    throw error;
  }
};

// Function to send commits on specific dates while skipping random days
const sendCommits = async () => {
  let startDate = moment("2025-01-23");
  let endDate = moment("2025-01-30");
  let currentDate = startDate.clone();
  let commitIndex = 0;

  try {
    while (
      currentDate.isSameOrBefore(endDate) &&
      commitIndex < commitMessages.length
    ) {
      const dateString = currentDate.format("YYYY-MM-DD");

      console.log(`Creating commit for ${dateString}`);
      await createCommit(dateString, commitMessages[commitIndex]);

      commitIndex++;

      // Push after each commit
      await git.push("origin", "main");
      console.log(`Pushed commit ${commitIndex} for ${dateString}`);

      // Randomly skip 1 to 3 days
      const skipDays = Math.floor(Math.random() * 1) + 1;
      currentDate.add(skipDays, "days");
    }

    console.log("All commits sent successfully!");
  } catch (error) {
    console.error("Error in commit process:", error);
  }
};

// Execute script
sendCommits();
