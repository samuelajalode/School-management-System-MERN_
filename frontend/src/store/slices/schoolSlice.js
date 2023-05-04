import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    classes: [],
    courses: [],
    dormitories: [],
    scholarships: [],
    campuses: [],
    sections: [],
    feesTypes: [],
    staff: [],
    departments: [],
    divisions: [],
    yearGroup: [],
    academicYear: {},
    notifications: [],
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setDormitories: (state, action) => {
      state.dormitories = action.payload;
    },
    setScholarships: (state, action) => {
      state.scholarships = action.payload;
    },
    setCampuses: (state, action) => {
      state.campuses = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    setfeesType: (state, action) => {
      state.feesTypes = action.payload;
    },
    setAcademicYear: (state, action) => {
      state.academicYear = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setDivisions: (state, action) => {
      state.divisions = action.payload;
    },
    setYeargroup: (state, action) => {
      state.yearGroup = action.payload;
    },
  },
});

export const {
  setAcademicYear,
  setClasses,
  setCourses,
  setDormitories,
  setScholarships,
  setCampuses,
  setDepartments,
  setSections,
  setfeesType,
  setDivisions,
  setStaff,
  setYeargroup,
  setNotifications,
} = schoolSlice.actions;

export const selectClasses = (state) => state.school.classes;
export const selectCourses = (state) => state.school.courses;
export const selectDormitories = (state) => state.school.dormitories;
export const selectScholarship = (state) => state.school.scholarships;
export const selectCampuses = (state) => state.school.campuses;
export const selectSection = (state) => state.school.sections;
export const selectFees = (state) => state.school.feesTypes;
export const selectacademicYear = (state) => state.school.academicYear;
export const selectStaff = (state) => state.school.staff;
export const selectDepartments = (state) => state.school.departments;
export const selectDivisions = (state) => state.school.divisions;
export const selectYearGroup = (state) => state.school.yearGroup;
export const selectNotifications = (state) => state.school.notifications;

export default schoolSlice.reducer;
