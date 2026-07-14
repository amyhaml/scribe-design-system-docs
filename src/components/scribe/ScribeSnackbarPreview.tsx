/**
 * Docs preview for `@media-platforms/snackbar` (`SnackbarWithProps`).
 * Replace with a full port when the Snackbar component page ships.
 */
export function ScribeSnackbarPreview({ message }: { message: string }) {
  return (
    <div
      className="scribe-snackbar-preview inline-flex max-w-md items-center rounded-lg px-4 py-3 text-sm font-semibold shadow-lg"
      role="status"
    >
      {message}
    </div>
  );
}
