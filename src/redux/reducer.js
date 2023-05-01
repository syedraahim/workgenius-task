import {
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    GET_FILES_SUCCESS,
    GET_FILES_FAILURE,
  } from "./actions/uploadImages";
  
  const initialState = {
    files: [],
    uploadMessage: "",
    errorMessage: "",
  };
  
  export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_FILE_SUCCESS:
        return {
          ...state,
          uploadMessage: action.payload.message,
          errorMessage: "",
        };
      case UPLOAD_FILE_FAILURE:
        return {
          ...state,
          uploadMessage: "",
          errorMessage: action.payload,
        };
      case GET_FILES_SUCCESS:
        return {
          ...state,
          images: action.payload,
          errorMessage: "",
        };
      case GET_FILES_FAILURE:
        return {
          ...state,
          files: [],
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  