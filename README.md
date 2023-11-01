# File Management with Preview

A versatile and user-friendly file management system built with React, Next.js and TypeScript that allows for single and multiple file uploading with a preview feature. It allows you to select files and preview them, returning an array of selected files. You can provide custom design and override classes for your file component.

Checkout the live demo on, <br />
[![codesandbox.io](https://codesandbox.io/favicon.ico)](https://codesandbox.io/p/sandbox/cranky-breeze-r4hht7?file=%2Fsrc%2Fmain.js)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Square View](#square-view)
  - [Horizontal Long Square View](#horizontal-long-square-view)
  - [Circular View](#circular-view)
  - [Over-ride CSS](#over-ride-css)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Features

- **Single File Upload:** Users can upload or change a single file.
- **Multiple File Management:** Easily manage multiple files.
- **File Preview:** Provides a preview of uploaded files (e.g., images, videos, gifs).
- **Responsive Design:** Ensures a seamless experience on various devices.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- A [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```
> npm install -D sass
```

### Installation

To use this library, you can install it via npm:

```
> npm install @canopassoftware/vue-file-upload
```

Make sure to check the library's documentation for any additional setup or configuration steps.

## Usage

To manage and preview files with this library, follow these steps:

### Import the library into your file

```js
// for CommonJS
const { SingleFileUpload, MultipleFileUpload } = require('@canopassoftware/vue-file-upload')

OR
// for esModules
import { SingleFileUpload, MultipleFileUpload } from '@canopassoftware/vue-file-upload'
```

Now, you can use that imported component with adding your custom UI for file uploading. Here are some examples of how to use the imported component:

### Single File Upload Management

```js
import Image from "next/image";
import React, { useState } from "react";
import SingleFileUpload from "./singleFile";

export default function App() {
  const [fileData, setPreviewFileData] = useState(
    {} as {
      previewType: string;
      previewUrl: string | ArrayBuffer | null;
      previewName: string;
      isDragging: boolean;
      isLoading: boolean;
    }
  );

  const getPreviewFileData = (file: any) => {
    setPreviewFileData(file);
  };

  const [uploadingStatus, setUploadingData] = useState(false);

  const isUploading = (flag: boolean) => {
    setUploadingData(flag);

    if (flag) {
      setTimeout(() => {
        setUploadingData(!flag);
      }, 5000);
    }
  };

  const [getFile, setFileData] = useState({});

  const getFileData = (file: any) => {
    setFileData(file);
  };
}
```

### Description

- In the below html code we provided default design for file management, you can modify this design according to your requirements.
- The `getPreview` prop containing `file` object with keys `previewType`, `previewUrl`, `previewName`, and `isDragging` for showing preview. like,

```sh
file: {
  previewType: 'video',
  previewUrl: 'data:image/jpeg;base64,/9j/D1AAAACRsdW1pAAAD...',
  previewName: 'a152148640581.62d918f12a0b4.mp4',
  isDragging: false
}
```

- previewType: - Type of the preview. like, file is image or video
- previewUrl: - URL of the file preview
- previewName: - Preview file name
- isDragging: - You will get it true when you dragging the file on your design

- You need to manage it by calling a function and get value of that object in variable as we have defined above by using `getPreviewFileData()`.

```html
return (
    <main className="flex min-h-screen flex-col justify-between p-5">
      <SingleFileUpload
        getPreview={getPreviewFileData}
        getFileObj={getFileData}
        isUploading={isUploading}
        uploadingStatus={uploadingStatus}
        uploadBtn={"Save"}
        progressBtn={"Saving..."}
      >
        <div className="m-5">
          <div className="flex items-center justify-center">
            {!fileData || !fileData.previewUrl ? (
              <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-10">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-center">
                {fileData.previewType != "video" ? (
                  <Image
                    className="object-contain rounded-2xl w-72 h-56"
                    src={fileData.previewUrl as string}
                    height={224}
                    width={300}
                    alt="image"
                  />
                ) : (
                  <video
                    autoPlay
                    loop
                    className="h-64 w-72 object-contain rounded-2xl"
                  >
                    <source
                      src={fileData.previewUrl as string}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            )}
          </div>
          <p className="flex items-center justify-center text-center">
            {fileData ? fileData.previewName : ""}
          </p>
        </div>
      </SingleFileUpload>
    </main>
  );
```

<img src="./src/assets/images/single-file-uploading.gif"/>

- Also, you can over-ride all the classes for changing the UI as per your requirement.

## Examples

We are providing some examples with design. so, you can easily take it and use it in your project.

### Over-ride CSS

For over-riding the design of default buttons, you can over-ride it's CSS by class name. <br>
For example., <br>

- Over-ride CSS of remove file button you can add it like,

```css
.remove-btn {
  color: white;
  background-color: red;
  font-size: 25px;
  padding: 5px;
}
```

- Over-ride CSS of submit/upload file button you can add it like,

```css
.upload-btn {
  color: white;
  background-color: rgb(51, 65, 85);
  font-size: 25px;
  padding: 5px 10px;
}
```

## Contributing

We welcome contributions from the community. To contribute to this project, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your fork.
- Submit a pull request with a clear description of your changes.
- Please ensure your code follows the project's coding standards and includes appropriate documentation.

## License

This project is licensed under the MIT.

## Contact Information

If you have questions or need support, you can reach out to us at GitHub Profile.
