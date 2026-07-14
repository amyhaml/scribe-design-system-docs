import * as React from "react";
import { AlertTriangle, Loader, Upload, X } from "react-feather";

import { ToolkitButton } from "./ToolkitButton";

type DropzoneVariant = "image" | "video" | "uploading" | "error";

export interface ScribeDropzonePortProps {
  variant: DropzoneVariant;
  heading?: string;
  disclaimers?: string[];
  fileUploadButtonLabel?: string;
  gettyLabel?: string;
  isDismissable?: boolean;
  isGettySearchEnabled?: boolean;
  onBrowseDevice?: () => void;
  onCancelUpload?: () => void;
  onClose?: () => void;
  onRetry?: () => void;
  progressLabel?: string;
}

function ScribeDropzoneCloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      aria-label="Close"
      className="scribe-dropzone-port-close-button"
      type="button"
      onClick={onClick}
    >
      <X stroke="var(--text-light)" size={24} />
    </button>
  );
}

function ScribeDropzoneGettyField({ label = "Paste Getty link..." }: { label?: string }) {
  return (
    <div className="scribe-dropzone-port-form-wrapper">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="scribe-dropzone-port-getty-wrapper">
          <div className="scribe-dropzone-port-input-wrapper" data-label-action-anchor="true">
            <label
              className="scribe-dropzone-port-textarea-label empty"
              htmlFor="scribe-dropzone-getty"
            >
              {label}
            </label>
            <textarea
              aria-label={label}
              className="scribe-dropzone-port-textarea"
              id="scribe-dropzone-getty"
              rows={1}
            />
          </div>
          <button aria-label="Upload" className="scribe-dropzone-port-upload-button" type="submit">
            <Upload aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}

function ScribeDropzoneFileInput({
  disclaimers,
  fileUploadButtonLabel = "Browse Device",
  gettyLabel,
  heading,
  isGettySearchEnabled,
  onBrowseDevice,
  variant,
}: {
  disclaimers: string[];
  fileUploadButtonLabel?: string;
  gettyLabel?: string;
  heading: string;
  isGettySearchEnabled?: boolean;
  onBrowseDevice?: () => void;
  variant: "image" | "video";
}) {
  return (
    <div className="scribe-dropzone-port-droppable-area">
      <div className="scribe-dropzone-port-file-input-wrapper" data-testid="file-input-wrapper">
        <input
          aria-label="Drag and drop"
          className="scribe-dropzone-port-file-input"
          data-testid="file-input"
          type="file"
          onChange={() => {}}
        />
      </div>
      <figcaption className="scribe-dropzone-port-message">{heading}</figcaption>
      <div className="scribe-dropzone-port-disclaimers">
        {disclaimers.map((disclaimer) => (
          <label className="scribe-dropzone-port-disclaimer" key={disclaimer}>
            {disclaimer}
          </label>
        ))}
      </div>
      <div className="scribe-dropzone-port-button-wrapper">
        <ToolkitButton type="button" onClick={onBrowseDevice}>
          {fileUploadButtonLabel}
        </ToolkitButton>
      </div>
      {variant === "image" && isGettySearchEnabled ? (
        <ScribeDropzoneGettyField label={gettyLabel} />
      ) : null}
    </div>
  );
}

function ScribeDropzoneLoading({
  onCancelUpload,
  progressLabel,
}: {
  onCancelUpload?: () => void;
  progressLabel?: string;
}) {
  return (
    <div className="scribe-dropzone-port-asset-state">
      <div className="scribe-dropzone-port-loading-wrapper">
        <Loader
          className="scribe-dropzone-port-loading-icon"
          color="var(--text-light)"
          data-testid="loading-icon"
          size="3rem"
        />
      </div>
      <h3>Processing Your File</h3>
      <label className="scribe-dropzone-port-state-message">
        Leave this page open while we add your asset
        {progressLabel ? (
          <>
            <br />
            {progressLabel}
          </>
        ) : null}
      </label>
      <ToolkitButton type="button" onClick={onCancelUpload}>
        Cancel Upload
      </ToolkitButton>
    </div>
  );
}

function ScribeDropzoneError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="scribe-dropzone-port-asset-state" data-state="error">
      <AlertTriangle size="3rem" color="var(--error)" />
      <h3>Upload failed</h3>
      <label className="scribe-dropzone-port-state-message">
        An error occurred while uploading.
        <br />
        Try uploading a different file if this continues.
      </label>
      <ToolkitButton type="button" onClick={onRetry}>
        Try Again
      </ToolkitButton>
    </div>
  );
}

export function ScribeDropzonePort({
  disclaimers,
  fileUploadButtonLabel,
  gettyLabel,
  heading,
  isDismissable = false,
  isGettySearchEnabled = false,
  onBrowseDevice,
  onCancelUpload,
  onClose,
  onRetry,
  progressLabel,
  variant,
}: ScribeDropzonePortProps) {
  const resolvedHeading =
    heading ??
    (variant === "image" && isGettySearchEnabled
      ? "Drag & drop files here or upload from Getty"
      : "Drag and drop files here or browse your device.");
  const resolvedDisclaimers =
    disclaimers ??
    (variant === "video" ? ["Supported file formats: mp4, ogg, mpeg"] : []);

  return (
    <div
      className="scribe-dropzone-port-creation-container"
      data-state={variant}
      data-dismissible={isDismissable ? "true" : undefined}
    >
      {isDismissable ? (
        <div className="scribe-dropzone-port-zone-header">
          <ScribeDropzoneCloseButton onClick={onClose} />
        </div>
      ) : null}
      {variant === "image" || variant === "video" ? (
        <ScribeDropzoneFileInput
          disclaimers={resolvedDisclaimers}
          fileUploadButtonLabel={fileUploadButtonLabel}
          gettyLabel={gettyLabel}
          heading={resolvedHeading}
          isGettySearchEnabled={isGettySearchEnabled}
          onBrowseDevice={onBrowseDevice}
          variant={variant}
        />
      ) : null}
      {variant === "uploading" ? (
        <ScribeDropzoneLoading onCancelUpload={onCancelUpload} progressLabel={progressLabel} />
      ) : null}
      {variant === "error" ? <ScribeDropzoneError onRetry={onRetry} /> : null}
    </div>
  );
}
