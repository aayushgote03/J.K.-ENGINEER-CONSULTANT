export function getindiantime(date: Date): Date {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + 30);
    newDate.setHours(newDate.getHours() + 5);
    console.log(newDate, "FSfs")
    return newDate;
  }