import { format, formatDistanceToNow, parseISO } from "date-fns";

export const formatDate = (dateString) => {
  const parsedDate = parseISO(dateString);

  const formattedDate = format(parsedDate, " dd MMM yyyy");
  // h:mm a
  const dateAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return dateAgo;
};
