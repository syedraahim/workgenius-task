import UploadService from "../../services/upload-files.service";

export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";
export const GET_FILES_SUCCESS = "GET_FILES_SUCCESS";
export const GET_FILES_FAILURE = "GET_FILES_FAILURE";

export const uploadImage = (file) => async (dispatch) => {
  try {
    const response = await UploadService.upload(file, (event) => {
      console.log(Math.round((100 * event.loaded) / event.total));
    });
    dispatch({
      type: UPLOAD_FILE_SUCCESS,
      payload: response.data,
    });
    dispatch(getImages());
  } catch (error) {
    dispatch({
      type: UPLOAD_FILE_FAILURE,
      payload: error.message,
    });
  }
};

export const getImages = () => async (dispatch) => {
  console.log('get')
  try {
    const response = await UploadService.getImages();
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: response.data.images,
    });
  } catch (error) {
    dispatch({
      type: GET_FILES_FAILURE,
      payload: error.message,
    });
  }
};
