import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

import {
  SCRIBE_SNACKBAR_STATUS,
  ScribeAssetBarPort,
  ScribeCardPort,
  ScribeCheckboxPort,
  ScribeChipPort,
  ScribeDatePickerPort,
  ScribeDialogPort,
  ScribeDropzonePort,
  ScribeFieldPort,
  ScribeFilterRelatedPreviewPort,
  ScribeNavPort,
  ScribePopoverMenuPort,
  ScribeRadioInputPort,
  ScribeSnackbarPort,
  ScribeTabbedLayoutPort,
  ScribeTableActionPort,
  ScribeTablePort,
  ScribeTogglePort,
  ScribeTreeMenuPort,
  ScribeToolkitValidationErrorMessage,
  ToolkitButton,
  type ScribeCardItemPort,
  type ScribeTableColumnPort,
  type ScribeTableRowPort,
  type ScribeTreeNodePort,
} from "@/components/scribe";
import { DOCS_NAV_ENTRIES } from "@/lib/docs/navigation";
import { cn } from "@/lib/utils";

type ComponentOverviewGroup = {
  title: string;
  slugs: string[];
};

export const componentOverviewGroups: ComponentOverviewGroup[] = [
  {
    title: "Navigation & Structure",
    slugs: ["app-bar", "asset-bar", "tabbed-layout", "menu", "tree-menu"],
  },
  {
    title: "Inputs & Controls",
    slugs: [
      "button",
      "field",
      "filter",
      "checkbox",
      "radio-input",
      "switch",
      "datepicker",
      "dropzone",
    ],
  },
  {
    title: "Feedback & Overlays",
    slugs: ["alert-bar", "snackbar", "dialog", "tooltip"],
  },
  {
    title: "Content & Data",
    slugs: ["card", "chip", "table"],
  },
];

const componentEntryBySlug = new Map(DOCS_NAV_ENTRIES.map((entry) => [entry.id, entry]));

function PreviewScale({
  children,
  className,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <div
      className={cn("shrink-0", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      {children}
    </div>
  );
}

const tableColumns: ScribeTableColumnPort[] = [
  { label: "Quality", name: "quality" },
  { label: "Size", name: "size" },
  { label: "Actions", name: "actions" },
];

const tableRows: ScribeTableRowPort[] = [
  {
    id: "original",
    content: {
      actions: <ScribeTableActionPort>Download</ScribeTableActionPort>,
      quality: "Original",
      size: "400 mb | 1920 x 1080",
    },
  },
  {
    id: "1080p",
    content: {
      actions: <ScribeTableActionPort>Download</ScribeTableActionPort>,
      quality: "1080p",
      size: "300 mb | 1920 x 1080",
    },
  },
];

const cityImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1f3344"/>
      <stop offset=".55" stop-color="#2c464d"/>
      <stop offset="1" stop-color="#11181c"/>
    </linearGradient>
    <linearGradient id="window" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6c05c"/>
      <stop offset="1" stop-color="#85c3a9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#sky)"/>
  <g opacity=".95" fill="#283b42">
    <rect x="55" y="175" width="120" height="225"/>
    <rect x="205" y="105" width="165" height="295"/>
    <rect x="405" y="145" width="130" height="255"/>
    <rect x="570" y="80" width="170" height="320"/>
  </g>
  <g fill="url(#window)" opacity=".85">
    <path d="M80 205h20v8H80zm38 0h20v8h-20zm38 0h20v8h-20zM80 238h20v8H80zm38 0h20v8h-20zm38 0h20v8h-20zM230 135h24v9h-24zm45 0h24v9h-24zm45 0h24v9h-24zM230 177h24v9h-24zm45 0h24v9h-24zm45 0h24v9h-24zM430 175h22v8h-22zm40 0h22v8h-22zm40 0h22v8h-22zM600 115h24v10h-24zm45 0h24v10h-24zm45 0h24v10h-24zM600 162h24v10h-24zm45 0h24v10h-24zm45 0h24v10h-24z"/>
  </g>
  <rect y="330" width="800" height="70" fill="#11181c" opacity=".7"/>
</svg>`);

const cardItem: ScribeCardItemPort = {
  author: "Author Name",
  authorPhoto:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#252525"/><circle cx="20" cy="15" r="8" fill="#f6c05c"/><path d="M7 40c2-10 9-15 13-15s11 5 13 15z" fill="#ed4738"/></svg>`),
  date: "Oct 10, 2024 @ 01:07 PM",
  id: "overview-card",
  image: cityImage,
  metadata: ["US", "Metadata"],
  secondaryMetadata: ["Metadata"],
  title: "Title text",
};

const treeData: ScribeTreeNodePort[] = [
  {
    label: "Label",
    value: "label-parent",
    children: [
      { label: "Label", value: "label-child-1" },
      { label: "Label", value: "label-child-2" },
    ],
  },
  { label: "Label", value: "label-2" },
  { label: "Label", value: "label-3" },
];

function OverviewTooltipPreview() {
  return (
    <div className="scribe-tooltip-demo-frame scribe-tooltip-overview-preview">
      <span className="scribe-tooltip-overview-bubble">Tooltip text</span>
    </div>
  );
}

const previewBySlug: Record<string, ReactNode> = {
  "alert-bar": (
    <PreviewScale scale={0.9}>
      <div className="w-72">
        <ScribeToolkitValidationErrorMessage id="overview-alert" error="Alert text" />
      </div>
    </PreviewScale>
  ),
  "app-bar": (
    <PreviewScale className="w-[42rem]" scale={0.48}>
      <ScribeNavPort activeListing="Home Page" workspaceLabel="Feeds" tenantLabel="Oprah Daily US" />
    </PreviewScale>
  ),
  "asset-bar": (
    <PreviewScale className="w-[44rem]" scale={0.42}>
      <ScribeAssetBarPort
        title="Add Images"
        buttons={
          <div className="flex items-center gap-4">
            <ToolkitButton type="button" background="transparent" border color="var(--text)">
              Cancel
            </ToolkitButton>
            <ToolkitButton type="button">Save</ToolkitButton>
          </div>
        }
      />
    </PreviewScale>
  ),
  button: <ToolkitButton type="button">Button text</ToolkitButton>,
  card: (
    <PreviewScale className="w-[18rem]" scale={0.72}>
      <ScribeCardPort item={cardItem} showThumbnail getMenuItems={() => []} />
    </PreviewScale>
  ),
  checkbox: (
    <ScribeCheckboxPort
      id="overview-checkbox"
      isChecked
      label="Label"
      name="overview-checkbox"
    />
  ),
  chip: <ScribeChipPort label="Chip text" />,
  datepicker: (
    <PreviewScale className="w-72" scale={0.86}>
      <ScribeDatePickerPort label="Publish date" name="overview-date" date="2026-07-15" />
    </PreviewScale>
  ),
  dialog: (
    <PreviewScale scale={0.76}>
      <ScribeDialogPort
        compactMode
        buttons={[
          { background: "transparent", label: "No" },
          { label: "Yes" },
        ]}
      >
        <p>You have unsaved changes, would you like to save before leaving?</p>
      </ScribeDialogPort>
    </PreviewScale>
  ),
  dropzone: (
    <PreviewScale className="w-[40rem]" scale={0.38}>
      <ScribeDropzonePort
        variant="image"
        isDismissable
        isGettySearchEnabled
        disclaimers={[
          "Maximum file size is 6 MB in png, jpg, jpeg, gif formats",
          "Minimum width 320px | Minimum height 125px",
        ]}
      />
    </PreviewScale>
  ),
  field: (
    <PreviewScale className="w-72" scale={0.9}>
      <ScribeFieldPort name="overview-field" label="Label" value="Label" isFocused />
    </PreviewScale>
  ),
  filter: (
    <PreviewScale className="w-80" scale={0.8}>
      <ScribeFilterRelatedPreviewPort />
    </PreviewScale>
  ),
  menu: (
    <PreviewScale scale={0.86}>
      <ScribePopoverMenuPort
        items={[
          { id: "content", label: "Content" },
          { id: "products", label: "Products" },
          { id: "videos", label: "Videos" },
          { id: "images", label: "Images" },
        ]}
      />
    </PreviewScale>
  ),
  "radio-input": (
    <ScribeRadioInputPort
      checked
      defaultValue="label"
      id="overview-radio"
      label="Label"
      name="overview-radio"
    />
  ),
  snackbar: (
    <ScribeSnackbarPort message="Snackbar text" status={SCRIBE_SNACKBAR_STATUS.success} />
  ),
  switch: (
    <ScribeTogglePort
      id="overview-switch"
      isChecked
      labelOff="OFF"
      labelOn="ON"
      name="overview-switch"
    />
  ),
  table: (
    <PreviewScale className="w-[34rem]" scale={0.48}>
      <ScribeTablePort columns={tableColumns} data={tableRows} />
    </PreviewScale>
  ),
  "tabbed-layout": (
    <PreviewScale className="w-[30rem]" scale={0.7}>
      <ScribeTabbedLayoutPort
        activeTab={0}
        isActiveTabEnabled
        tabs={[
          { label: "Content", content: <span>Content tab panel</span> },
          { label: "Images", content: <span>Images tab panel</span> },
          { label: "Redirects", content: <span>Redirects tab panel</span> },
        ]}
        uniqueId="overview-tabs"
      />
    </PreviewScale>
  ),
  tooltip: <OverviewTooltipPreview />,
  "tree-menu": (
    <PreviewScale scale={0.6}>
      <ScribeTreeMenuPort data={treeData} expandedValues={["label-parent"]} selectedValues={["label-child-1"]} />
    </PreviewScale>
  ),
};

function ComponentPreviewTile({ slug }: { slug: string }) {
  const entry = componentEntryBySlug.get(slug);
  if (!entry) return null;

  const preview = previewBySlug[slug] ?? (
    <div className="rounded-md border bg-white px-4 py-3 text-sm text-muted-foreground">
      {entry.label}
    </div>
  );

  return (
    <article className="component-overview-tile group relative min-w-0">
      <div
        className={cn(
          "flex aspect-[16/10] min-h-[11rem] items-center justify-center rounded-2xl bg-muted/40 p-8 transition-colors group-hover:bg-muted",
          "overflow-hidden",
        )}
        data-overview-preview={slug}
        aria-hidden
      >
        <div className="scribe-app-css-vars pointer-events-none flex h-full w-full items-center justify-center">
          {preview}
        </div>
      </div>
      <p className="component-overview-tile-label mt-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
        {entry.label}
      </p>
      <Link
        to="/components/$slug"
        params={{ slug: entry.id }}
        className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Open ${entry.label}`}
      />
    </article>
  );
}

export function ComponentOverviewGrid() {
  return (
    <div className="space-y-14">
      {componentOverviewGroups.map((group, index) => (
        <section
          key={group.title}
          className={cn(index > 0 && "border-t pt-12")}
          aria-labelledby={`overview-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        >
          <h2
            id={`overview-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="mb-5 text-xl font-semibold tracking-tight text-foreground"
          >
            {group.title}
          </h2>
          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {group.slugs.map((slug) => (
              <ComponentPreviewTile key={slug} slug={slug} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
