export default {
  methods: {
    priorityText(priority) {
      try {
        switch (priority) {
          case 1:
            return "Low";
          case 2:
            return "High";
          case 3:
            return "Very High";
          default:
            return "None";
        }
      } catch (error) {
        console.log(error);
      }
    },

    // returns a relevant class name for styling.
    priorityClass(priority) {
      switch (priority) {
        case 1:
          return "low";
        case 2:
          return "high";
        case 3:
          return "very-high";
        default:
          return "none";
      }
    }
  }
};
