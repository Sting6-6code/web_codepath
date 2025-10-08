const formatTime = (time) => {
  if (!time) return "";

  // 假设时间格式为 "HH:MM" 或 "HH:MM:SS"
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${ampm}`;
};

const formatRemainingTime = (remaining) => {
  if (!remaining) return "";

  // Convert to number if it's a string
  const remainingMs =
    typeof remaining === "string" ? parseFloat(remaining) : remaining;

  // Check if it's a valid number
  if (typeof remainingMs === "number" && !isNaN(remainingMs)) {
    // Check if event has passed (negative remaining time)
    if (remainingMs < 0) {
      const absDays = Math.floor(Math.abs(remainingMs) / (24 * 60 * 60 * 1000));
      if (absDays === 0) {
        return "Event passed today";
      } else if (absDays === 1) {
        return "Event passed yesterday";
      } else {
        return `Event passed ${absDays} days ago`;
      }
    }

    // Event is upcoming
    const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
        hours !== 1 ? "s" : ""
      } remaining`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} remaining`;
    } else {
      return "Less than 1 hour remaining";
    }
  }

  return remaining;
};

const formatNegativeTimeRemaining = (remaining, eventId) => {
  const element = document.getElementById(`remaining-${eventId}`);

  if (element && remaining && remaining.includes("remaining")) {
    element.style.color = "green";
  } else if (element) {
    element.style.color = "red";
    element.textContent = "Event has passed";
  }
};

export default {
  formatTime,
  formatRemainingTime,
  formatNegativeTimeRemaining,
};
