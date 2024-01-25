
export function getRemainingHours(deliveryDate: Date) {
  const currentDate = new Date(); 
  const timeDifference = deliveryDate.getTime() - currentDate.getTime();
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  return hours;
}