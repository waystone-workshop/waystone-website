const download = document.getElementById("windows-download");
fetch("./config.json").then(response => {
  if (!response.ok) throw new Error("No download configuration");
  return response.json();
}).then(config => {
  if (!config.windowsDownloadUrl) return;
  const url = new URL(config.windowsDownloadUrl);
  if (url.protocol !== "https:") return;
  download.href = url.href;
  download.hidden = false;
  document.getElementById("installer-pending").hidden = true;
}).catch(() => { /* Keep the honest coming-soon state if downloads aren't configured. */ });
