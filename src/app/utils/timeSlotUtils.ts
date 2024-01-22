export function generateTimeSlots(startTime: string, endTime: string, interval: number) {
    const timeSlots = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
        const endTimeSlot = addMinutes(currentTime, interval);
        const timeSlot = `${currentTime} - ${endTimeSlot}`;
        timeSlots.push(timeSlot);

        currentTime = endTimeSlot;
    }

    return timeSlots;
}

export function addMinutes(time: string, minutes: number) {
    const [hours, minutesInHour] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutesInHour + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(
        2,
        '0'
    )}`;
}

export function generateAvailableTimeSlots(startTime: string, endTime: string, bookedTimeSlots: string[], interval: number) {
    const allTimeSlots = generateTimeSlots(startTime, endTime, interval);
    const availableTimeSlots = allTimeSlots.filter(
        (slot) => !bookedTimeSlots.includes(slot)
    );
    return availableTimeSlots;
}

export function bookTimeSlot(bookedTimeSlots: string[] | null, selectedTimeSlot: string) {
   if (!bookedTimeSlots) {
     bookedTimeSlots = [];
   }
   bookedTimeSlots.push(selectedTimeSlot);
   return bookedTimeSlots;
}
  
