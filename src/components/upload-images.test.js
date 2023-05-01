import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UploadImages from "./upload-images";
import UploadService from "../services/upload-files.service";
import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";
jest.mock("../services/upload-files.service");
import "@testing-library/jest-dom/extend-expect";
global.URL.createObjectURL = jest.fn(() => "https://example.com/image.jpg");

describe("UploadImages component", () => {
  beforeEach(() => {
    UploadService.getFiles.mockResolvedValueOnce({
      data: {
        images: [],
      },
    });
  });

  it("renders the component without crashing", () => {
    render(<UploadImages />);
    expect(screen.getByText("List of Images")).toBeInTheDocument();
  });

  it("check the upload button is disabled", async () => {
    render(<UploadImages />);
    const button = screen.getByTestId("upload");
    expect(button).toHaveClass("Mui-disabled");
  });

  it("enables the upload button when file is selected", async () => {
    render(<UploadImages />);
    const button = screen.getByTestId("upload");
    expect(button).toHaveClass("Mui-disabled");
    const file = new File(["hello"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("upload-button");
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => {
      expect(button).not.toHaveClass("Mui-disabled");
    });
  });

  it("displays the progress bar when uploading a file", async () => {
    render(<UploadImages />);
    const file = new File(["hello"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("upload-button");
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("displays the uploaded image in the list of images", async () => {
    UploadService.upload.mockResolvedValueOnce({
      data: {
        message: "Image uploaded successfully",
      },
    });
    UploadService.getFiles.mockResolvedValueOnce({
      data: {
        images: ["test.png"],
      },
    });
    render(<UploadImages />);
    const file = new File(["hello"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("upload-button");
    fireEvent.change(input, { target: { files: [file] } });
    const button = screen.getByText("Upload");
    fireEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText("Image uploaded successfully")
      ).toBeInTheDocument();
    });
  });
});
