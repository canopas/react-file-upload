# File Management with Preview - Fully Customized

A versatile and user-friendly file management system built with React, Next.js and TypeScript that allows for single and multiple file uploading with a preview feature. It allows you to select files and preview them, returning an array of selected files. It allows customizing design by overriding the style classes.

<img src="./gifs/full.gif"/>

Checkout the live demo on, codesandbox <br />
[![codesandbox.io](https://codesandbox.io/favicon.ico)](https://codesandbox.io/p/sandbox/cranky-breeze-r4hht7?file=%2Fsrc%2Fmain.js)

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Examples](#examples)
  - [Canvas View](#canvas-view)
  - [Square View](#square-view)
  - [Horizontal Long Square View](#horizontal-long-square-view)
  - [Circular View](#circular-view)
  - [Over-ride CSS](#over-ride-css)
- [Properties and Events](#properties-and-events)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

---

## Features

- **Single File Upload:** Users can upload or change a single file.
- **Multiple File Management:** Easily manage multiple files.
- **File Preview:** Provides a preview of uploaded files (e.g., images, videos, gifs).
- **Responsive Design:** Ensures a seamless experience on various devices.
- **Fully customized:** Customize file upload UI as per your requirements

---

## Getting Started

Follow below instructions to configure this package into your project.

### Prerequisites

Before you begin, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) - v20.x
- React with Next.js
- sass

### Installation

Using npm:

```
npm install @canopassoftware/react-file-upload
```

Using yarn:

```
yarn add @canopassoftware/react-file-upload
```

---

## Examples

We are providing some examples with design. so, you can easily use it in your project.

### Canvas View

[view code](./examples/CanvasView.vue)

<img src="./gifs/canvas-view.gif"/>

### Square View

[view code](./examples/SquareView.vue)

<img src="./gifs/square-view.gif"/>

### Horizontal Long Square View

[view code](./examples/LongSquareView.vue)

<img src="./gifs/long-square-view.gif"/>

### Circular View

[view code](./examples/RoundView.vue)

<img src="./gifs/round-view.gif"/>

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

---

## Properties and Events

### props

- **callback="handleFileUploading"**

  - `required`
  - **Description:** Add your upload callback function while receive the selected file/files

- **uploadedFile="setPreviewFileData"** - For single file component

  - `required`
  - Uploaded file object with below format,
    ```
    {
      fileType: string,
      fileUrl: string,
      fileName: string
    }
    ```

- **uploadedFiles="setPreviewFilesData"** - For multiple file component

  - `required`
  - Uploaded files array with below format,
    ```
    [
      {
        fileType: string,
        fileUrl: string,
        fileName: string
      }
    ]
    ```

- **uploadBtnText="'Upload'"**

  - **default** : Upload
  - Text for save or upload file button

- **progressBtnText="'Uploading...'"**

  - **default** : Uploading...
  - Text for the progress bar, showing file uploading under the process

- **removeBtnText="'Uploading...'"**

  - **default** : x
  - Text for remove file button

- **accept="'image/jpg, image/jpeg, image/png, video/mp4, audio/mp3, application/zip'"**

  - Validation for file type. By default it will select all the type of file.

- **(filetype)Preview="'(file location)'"**
  - **default** : Default file icons as per file types
  - Set path for your customized icon if needed

---

## Usage

To manage and preview files with this library, follow these steps:

### Import the library into your file

```js
// using CommonJS
const { SingleFileUpload, MultipleFileUpload } = require("@canopassoftware/react-file-upload");

OR
// using esModules
import { SingleFileUpload, MultipleFileUpload } from "@canopassoftware/react-file-upload";
```

### Creating custom UI with file preview

- You can customize file uploading UI in inner part of component.
- The `file` containing `file` object with following keys, we will use this object to show preview.

  ```js
  file = file: {
    previewType: 'video', // type of the preview. like, file is image or video
    previewUrl: 'data:image/jpeg;base64,/9j/D1AAAACRsdW1pAAAD...', // URL of the file preview
    previewName: 'a152148640581.62d918f12a0b4.mp4', // preview file name
    isDragging: false // you will get it `true` when you dragging the file on design
  }
  ```

### Single File Upload Management

```js
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { SingleFileUpload } from '@canopassoftware/react-file-upload';

export default function App() {
  const [previewFileData, setPreviewFileData] = useState(
    {} as {
      previewType: string;
      previewUrl: string | ArrayBuffer | null;
      previewName: string;
      isDragging: boolean;
    }
  );

  // callback function
  const handleFileUploading = async (file: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPreviewFileData({
      previewType: "image",
      previewUrl: "https://picsum.photos/300/224",
      previewName: file.name,
      isDragging: false,
    });
  };
```

```html
  return (
    <main className="min-h-screen flex flex-col justify-between p-5">
      <SingleFileUpload
        uploadedFile={setPreviewFileData}
        callback={handleFileUploading}
        uploadBtn={"Save"}
        progressBtn={"Saving..."}
      >
      <!-- write a code to manage file design or use code from examples -->
      </SingleFileUpload>
    </main>
  );
}
```

### Multiple File Upload Management

```js
"use client";

import Image from "next/image";
import React from "react";
import MultipleFileUpload from "@canopassoftware/react-file-upload";
import { StaticImageData } from "next/image";

export default function App() {
  const uploadedFiles = [] as Array<{
    fileType: string;
    fileUrl: string | StaticImageData;
    fileName: string;
  }>;

  // callback function
  const handleFilesUploading = async (files: any) => {
    const uploadedFiles = [];

    for (var i = 0; i < files.length; i++) {
      uploadedFiles.push({
        fileType: "image",
        fileUrl: images[i],
        fileName: files[i].name,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return uploadedFiles;
  };
```

```html
return (
    <main className="min-h-screen flex flex-col justify-between p-5 dark:bg-black">
      <MultipleFileUpload
        accept=""
        uploadedFiles={uploadedFiles}
        callback={handleFilesUploading}
        uploadBtn={"Save"}
        progressBtn={"Saving..."}
      >
        {(file: any) => (
          <!-- write a code to manage file design or use code from examples -->
        )}
      </MultipleFileUpload>
    </main>
  );
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

This project is licensed under the [MIT](https://github.com/canopas/vue-file-upload/blob/main/LICENSE).

## Contact Information

Vue file upload is owned and maintained by the [Canopas team](https://canopas.com/). You can reach out them on Github at [canopas](https://github.com/canopas) for questions or need support.
