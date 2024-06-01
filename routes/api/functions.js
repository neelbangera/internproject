function getCurrentSemesterAndYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    let currentSemester;
    if (currentMonth < 5) {
      currentSemester = "Spring";
    } else if (currentMonth < 8) {
      currentSemester = "Summer";
    } else {
      currentSemester = "Fall";
    } 
    return { currentSemester, currentYear };
}
function isPastSemester(semester, year) {
    const { currentSemester, currentYear } = getCurrentSemesterAndYear();
    if (year < currentYear) {
      return true;
    } else if (year === currentYear) {
      const semesterOrder = { "Spring": 1, "Summer": 2, "Fall": 3 };
      return semesterOrder[semester] < semesterOrder[currentSemester];
    }
    return false;
}
