import axios from "./axios";
import {
  setClasses,
  setCourses,
  setDormitories,
  setCampuses,
  setSections,
  setfeesType,
  setAcademicYear,
  setStaff,
  setDivisions,
  setDepartments,
  setYeargroup,
  setScholarships,
} from "./slices/schoolSlice";
import store from "./index";
import { LoginString } from "./localStorage";
import { loggin, logout } from "./slices/userSlice";

export const callData = () => {
  axios.get("/classes").then((res) => {
    store.dispatch(setClasses(res?.data));
  });
  axios.get("/sections").then((res) => {
    store.dispatch(setSections(res?.data));
  });
  axios.get("/courses").then((res) => {
    store.dispatch(setCourses(res?.data));
  });
  axios.get("/scholarships").then((res) => {
    store.dispatch(setScholarships(res?.data));
  });
  axios.get("/campuses").then((res) => {
    store.dispatch(setCampuses(res?.data));
  });
  axios.get("/dormitories").then((res) => {
    store.dispatch(setDormitories(res?.data));
  });
  axios.get("/departments").then((res) => {
    store.dispatch(setDepartments(res?.data));
  });
  axios.get("/divisions").then((res) => {
    store.dispatch(setDivisions(res?.data));
  });
  axios.get("/fees/types").then((res) => {
    store.dispatch(setfeesType(res?.data));
  });
  axios.get("/yeargroup").then((res) => {
    store.dispatch(setYeargroup(res?.data));
  });
  axios.get("/academicyear/admin").then((res) => {
    store.dispatch(setAcademicYear(res?.data));
  });
  axios.get("/teachers").then((res) => {
    store.dispatch(setStaff(res?.data));
  });
};

export const handleAutoLogin = () => {
  store.dispatch(
    loggin({
      userID: localStorage.getItem(LoginString?.ID || ""),
      id: localStorage.getItem(LoginString?.ID || ""),
      photoUrl: localStorage.getItem(LoginString?.PhotoURL || ""),
      email: localStorage.getItem(LoginString?.EMAIL || ""),
      name: localStorage.getItem(LoginString?.NAME || ""),
      role: localStorage.getItem(LoginString?.USERROLE || ""),
      lastName: localStorage.getItem(LoginString?.LASTNAME || ""),
      middleName: localStorage.getItem(LoginString?.middleName || ""),
    })
  );
  callData();
};

export const doUploadImage = async (dataUrl) => {
  axios.post("/upload", { dataUrl });
};

export const handleLogin = (user) => {
  store.dispatch(
    loggin({
      userID: user?.userID,
      id: user?.userID,
      name: user?.name,
      email: user?.email,
      photoUrl: user?.profileUrl,
      role: user?.role,
      lastName: user?.surname,
      middleName: user?.middleName,
    })
  );
  localStorage.setItem(LoginString.ID, user?.userID);
  localStorage.setItem(LoginString.PhotoURL, user?.profileUrl);
  localStorage.setItem(LoginString.NAME, user?.name);
  localStorage.setItem(LoginString.EMAIL, user?.email);
  localStorage.setItem(LoginString.USERROLE, user?.role);
  localStorage.setItem(LoginString.LASTNAME, user?.surname);
  localStorage.setItem(LoginString.MIDNAME, user?.middleName);
  callData();
};

export const initFunc = () => {
  if (localStorage.getItem(LoginString.ID)) {
    // store.dispatch(setLoading(true));
    handleAutoLogin();
    // store.dispatch(setLoading(false));
  } else {
    store.dispatch(logout());
  }
};
