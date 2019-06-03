import {
  format,
  distanceInWordsToNow,
  isBefore,
  differenceInHours
} from "date-fns";

export default {
  methods: {
    longDate(date) {
      if (date) {
        return format(date, "dddd Do of MMMM [at] HH:mm");
      } else {
        return "No Date";
      }
    },

    shortDay(date) {
      if (date) {
        return format(date, "DD/MM/YY");
      } else {
        return "No Date";
      }
    },

    time(date) {
      if (date) {
        return format(date, "HH:mm");
      } else {
        return "No Time";
      }
    },

    isDue(date) {
      return isBefore(date, new Date());
    },

    timeLeft(date) {
      return distanceInWordsToNow(date);
    },

    howSoon(date) {
      if (this.isDue(date)) {
        return "due";
      } else {
        const hours = differenceInHours(date, new Date());
        switch (true) {
          case hours <= 6:
            return "very-soon";
          case hours <= 24:
            return "soon";
          default:
            return "not-soon";
        }
      }
    }
  }
};
