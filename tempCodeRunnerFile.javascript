{new Date(sc.start_time).toLocaleDateString("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})}{" "}
||{" "}
{new Date(sc.start_time).toLocaleTimeString("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // biar format 24 jam
}).replace(":", ".")}
