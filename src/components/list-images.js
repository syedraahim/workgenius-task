import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default class ListImages extends Component {
  render() {
    return (
      <div className="mg20">
        <Typography variant="h6" className="list-header">
          List of Images
        </Typography>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {this.props.imageInfos.length
            ? this.props.imageInfos.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={
                      require(`../../backend/uploads/${image}?w=164&h=164&fit=crop&auto=format`)
                        .default
                    }
                    srcSet={
                      require(`../../backend/uploads/${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`)
                        .default
                    }
                    alt={'image'}
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
