import axios from 'axios';

// Mocking the 'friend's app' data structure and FTC Scout integration
export const fetchFtcScoutData = async (teamNumber) => {
  try {
    // In a real scenario, we'd use ftcscout.org API if available or scrapers
    // Mocking high-level team metrics
    return {
      team: teamNumber,
      rank: 12,
      matches: [
        { id: 1, score: 180, auto: 40, teleop: 100, endgame: 40, result: 'W', date: '2023-11-01' },
        { id: 2, score: 145, auto: 20, teleop: 90, endgame: 35, result: 'L', date: '2023-11-02' },
        { id: 3, score: 210, auto: 60, teleop: 110, endgame: 40, result: 'W', date: '2023-11-08' },
        { id: 4, score: 90, auto: 10, teleop: 50, endgame: 30, result: 'L', date: '2023-11-09' },
      ]
    };
  } catch (err) {
    console.error("Fetch error", err);
    return null;
  }
};

export const fetchFriendsAppData = async () => {
    // Simulating external app API call
    return [
        { week: 1, bestScore: 210, worstScore: 90, avgScore: 156, notes: "Improved grabber design" },
        { week: 2, bestScore: 245, worstScore: 120, avgScore: 180, notes: "Autonomous coding fixed" }
    ];
};
