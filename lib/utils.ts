import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(timeDifference / 1000);

  // Define time intervals
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit and calculate the quantity
  if (seconds < minute) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (seconds < month) {
    const days = Math.floor(seconds / day);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (seconds < week) {
    const weeks = Math.floor(seconds / week);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    const years = Math.floor(seconds / year);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
};

export const formatAndDivideNumber = (inputNumber: number): string => {
  let result: string;

  if (inputNumber >= 1000000) {
    result = (inputNumber / 1000000).toFixed(1);
  } else if (inputNumber >= 1000) {
    result = (inputNumber / 1000).toFixed(1);
  } else {
    result = inputNumber.toString();
  }

  if (result.endsWith(".00")) {
    // Remove trailing '.00' if present
    result = result.slice(0, -3);
  }

  result += inputNumber >= 1000 ? "K" : inputNumber >= 1000000 ? "M" : "";

  return result;
};

// get the js date object as a parameter and return a joined date (just a month and year)
export const getJoinedDate = (date: Date): string => {
  // Extract the month (JavaScript months are 0-based) and the year from the date
  const month: string = date.toLocaleString("default", { month: "long" }); // Adding 1 to make it 1-indexed
  const year: number = date.getFullYear();

  // Format the month and year, and join them as a string
  const formattedDate: string = `${month} ${year}`;

  return formattedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = queryString.parse(params);

  currentUrl[key] = value;

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true } // We don't need any Null value
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = queryString.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true } // We don't need any Null value
  );
};
