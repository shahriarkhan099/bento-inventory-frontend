
export const sortByCreatedAt = (eventList: { createdAt: string }[]) => {
  eventList.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
