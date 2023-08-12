export function getTodayDate() {
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
  const currentYear = today.getFullYear();

  return `${currentYear}-${currentMonth}-${currentDate}`;
}

export function getCurrentMonth() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  return String(currentMonth).padStart(2, "0");
}

export function getCurrentYear() {
  const today = new Date();
  const currentYear = today.getFullYear();

  return currentYear;
}

export function getCurrentDateTime() {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentDateTime.getDate()).padStart(2, "0");
  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function generateTimeSlots() {
  const timeSlots = [];

  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const time = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  return timeSlots;
}

export const timeSlots = generateTimeSlots();
