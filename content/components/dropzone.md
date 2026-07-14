---
title: Dropzone
description: Dropzones let users upload files and show the status of the upload.
route: /components/dropzone
category: components
breadcrumbs:
  - label: Components
  - label: Dropzone
toc:
  - id: overview
    label: Overview
  - id: image
    label: Image
  - id: video
    label: Video
  - id: uploading
    label: Uploading
  - id: error
    label: Error
  - id: code
    label: Code
---

## Overview

Dropzones give users a clear place to add files through drag and drop, device browsing, or supported source links. They are used when a workflow needs to collect an image, video, or other media asset and communicate what happens after the file is selected.

This page covers image and video upload states, plus the processing and failed-upload states that can appear while Scribe handles the selected file.

## Image

Image dropzones accept image files and can include a Getty link field when Getty upload is available.

<!-- demo -->

## Video

Video dropzones accept supported video files from the user's device.

<!-- demo -->

## Uploading

Uploading states keep users informed while Scribe processes the selected file.

<!-- demo -->

## Error

Error states explain that an upload failed and give users a retry action.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeDropzonePort } from "@/components/scribe";

// Source: Scribe/src/components/shared/CreationZone/index.tsx
// Source: Scribe/src/components/shared/CreationZone/FileInput.tsx
// Source: Scribe/src/components/shared/CreationZone/shared.ts
// Source: Scribe/src/components/shared/AssetPreview.tsx
// Source: Scribe/packages/toolkit/src/components/Button/Button.tsx
// Source: Scribe/packages/toolkit/src/components/Loading/Loading.tsx

<ScribeDropzonePort
  variant="image"
  isDismissable
  isGettySearchEnabled
  heading="Drag & drop files here or upload from Getty"
  disclaimers={[
    "Maximum file size is 6 MB in png, jpg, jpeg, gif formats",
    "Minimum width 320px | Minimum height 125px",
    "Maximum width 12000px | Maximum height 12000px",
  ]}
/>

<ScribeDropzonePort variant="uploading" progressLabel="50% completed" />
```
