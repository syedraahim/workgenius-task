import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography, Button, withStyles } from "@material-ui/core";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import UploadService from "../services/upload-files.service";
import ListImages from "./list-images";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      progress: 0,
      message: "",
      isError: false,
      imageInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      console.log(response.data.images);
      this.setState({
        imageInfos: response.data.images,
      });
    });
  }

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: "",
    });
  }

  upload() {
    this.setState({
      progress: 0,
    });

    UploadService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
          isError: false,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          imageInfos: files.data,
        });
      })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: undefined,
          isError: true,
        });
      });
  }

  render() {
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
      isError,
    } = this.state;

    return (
      <div className="mg20">
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            data-testid="upload-button"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={this.selectFile}
          />
          <Button className="btn-choose" variant="outlined" component="span">
            Choose Image
          </Button>
        </label>
        <div className="file-name">{currentFile ? currentFile.name : null}</div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!currentFile}
          onClick={this.upload}
          data-testid="upload"
        >
          Upload
        </Button>

        {currentFile && (
          <Box className="my20" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}

        {previewImage && (
          <div>
            <img className="preview my20" src={previewImage} alt="" />
          </div>
        )}

        {message && (
          <Typography
            variant="subtitle2"
            className={`upload-message ${isError ? "error" : ""}`}
          >
            {message}
          </Typography>
        )}
        {/* <ListImages imageInfos={this.state.imageInfos} /> */}
        <Typography variant="h6" className="list-header">
          List of Images
        </Typography>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {imageInfos.length
            ? imageInfos.map((image, index) => (
                <ImageListItem key={image}>
                  <img
                    src={
                      require(`../../backend/uploads/${image}?w=164&h=164&fit=crop&auto=format`)
                        .default
                    }
                    srcSet={
                      require(`../../backend/uploads/${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`)
                        .default
                    }
                    alt={image}
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            : null}
        </ImageList>
      </div>
    );
  }
}
