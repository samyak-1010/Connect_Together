import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const initialState = {
  signupData: null,
  rollnumber: getLocalStorageItem("rollnumber",null),
  grade: getLocalStorageItem("grade",null),
  userId: null,
  loading: false,
  token: getLocalStorageItem("token", null),
};


const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {                                                  
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setRollNumber(state,value){
      state.rollnumber=value.payload;
    },
    setGrade(state,value){
      state.grade=value.payload;
    },
    setUserId(state,value){
      state.userId=value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken ,setUserId,setGrade, setRollNumber} = authSlice.actions;

export default authSlice.reducer;