export const fmtMSS = (seconds: number) => {
  return new Date(seconds).toISOString().substring(15, 15 + 4);
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Morning";
  }

  if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  }

  return "Evening";
};

export function formatTime(time: string) {
  // Split the time string into its components
  const parts = time.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = Math.floor(parseFloat(parts[2])); // Remove milliseconds

  // Format the time string to "H:MM"
  if (hours === 0) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}

export function formatDuration(duration: string) {
  // Розділення рядка на частини
  const [hours, minutes, seconds] = duration.split(':');
  const formattedHours = parseInt(hours, 10);
  const formattedMinutes = parseInt(minutes, 10);
  const formattedSeconds = parseFloat(seconds);

  // Форматування результату
  let result = '';

  if (formattedHours > 0) {
    result += `${formattedHours} hr `;
  }

  if (formattedMinutes > 0 || (formattedHours > 0 && formattedSeconds > 0)) {
    result += `${formattedMinutes} min `;
  }

  if (formattedSeconds > 0 && formattedHours === 0) {
    result += `${Math.floor(formattedSeconds)} sec`;
  }

  return result.trim();
}

export const searchFilterTags = [
  {link: "", label: "All"},
  {link: "/tracks", label: "Songs"},
  {link: "/albums", label: "Albums"},
  {link: "/artists", label: "Artists"},
  {link: "/playlists", label: "Playlists"},
];
