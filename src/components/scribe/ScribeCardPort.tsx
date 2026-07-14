import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { Fragment } from "react";
import { Image, MoreVertical } from "react-feather";

export type ScribeCardItemPort = {
  author?: string;
  authorPhoto?: string;
  date?: string;
  description?: string;
  icon?: ReactNode;
  id: string;
  image?: string;
  metadata?: ReactNode[];
  secondaryMetadata?: ReactNode[];
  status?: string;
  title: string;
};

export type ScribeCardMenuItemPort = {
  id: string | number;
  label?: ReactNode;
};

export type ScribeCardPortProps = {
  getMenuItems?: () => ScribeCardMenuItemPort[];
  handleSelect?: (event: MouseEvent<HTMLElement>, item: ScribeCardItemPort) => void;
  isLazyLoading?: boolean;
  isListView?: boolean;
  isSelected?: boolean;
  item: ScribeCardItemPort;
  onClick?: (item: ScribeCardItemPort) => void;
  showDescription?: boolean;
  showThumbnail?: boolean;
};

export function ScribeStatusIndicatorPort({
  backgroundColor,
  border,
  children,
  color,
}: {
  backgroundColor?: string;
  border?: string;
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="scribe-card-port-status-indicator scribe-card-port-meta"
      style={{
        "--scribe-card-status-background": backgroundColor,
        "--scribe-card-status-border": border,
        "--scribe-card-status-color": color,
      } as CSSProperties}
    >
      {children}
    </span>
  );
}

function ScribeSeparatorPort() {
  return <div className="scribe-card-port-separator" aria-hidden />;
}

function ScribeAvatarPort({
  displayName,
  photo,
}: {
  displayName?: string;
  photo?: string;
}) {
  if (photo) {
    return (
      <img
        alt={displayName}
        className="scribe-card-port-avatar-photo"
        height="28"
        src={photo}
        width="28"
      />
    );
  }

  const [firstName = "", lastName = ""] = (displayName ?? "").split(" ");

  return (
    <div className="scribe-card-port-avatar-initials">
      <span className="scribe-card-port-meta">
        {firstName.charAt(0)}
        {lastName.charAt(0)}
      </span>
    </div>
  );
}

function ScribeCardImagePort({
  alt = "",
  id,
  image,
  isLazyLoading = false,
  isListView = false,
}: {
  alt?: string;
  id: string;
  image?: string;
  isLazyLoading?: boolean;
  isListView?: boolean;
}) {
  return (
    <div
      className="scribe-card-port-image-wrapper"
      data-list-view={isListView ? "true" : undefined}
      data-wrapper-id={id}
    >
      {image ? (
        <img
          alt={alt}
          className="scribe-card-port-image"
          data-list-view={isListView ? "true" : undefined}
          data-testid="card-image"
          loading={isLazyLoading ? "lazy" : "eager"}
          src={image}
        />
      ) : (
        <div className="scribe-card-port-no-image">
          <Image size="2rem" />
        </div>
      )}
    </div>
  );
}

function ScribeMoreOptionsMenuPort({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  return (
    <div className="scribe-card-port-toolbar-wrapper">
      <button
        aria-expanded={false}
        aria-haspopup="menu"
        aria-label="More options"
        className="scribe-card-port-svg-button"
        data-testid="more-options"
        disabled={disabled}
        type="button"
      >
        <MoreVertical />
      </button>
    </div>
  );
}

function ScribeLinkWrapperPort({
  children,
  onClick,
  title,
}: {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  title: string;
}) {
  return (
    <a aria-label={`${title} thumbnail image`} href="#" onClick={onClick}>
      {children}
    </a>
  );
}

/**
 * Source-truth port of `Scribe/src/components/shared/Card/index.tsx`.
 *
 * Docs-only difference: router navigation, auth-gated action menus, i18n, locks,
 * loaders, form inputs, and custom render slots are omitted for closed-state docs
 * demos. Visible card structure, CardImage, metadata, status, avatar, separator,
 * selection outline, and More Options button styling are preserved in CSS.
 */
export function ScribeCardPort({
  getMenuItems,
  handleSelect,
  isLazyLoading = false,
  isListView = false,
  isSelected = false,
  item,
  onClick,
  showDescription = false,
  showThumbnail = true,
}: ScribeCardPortProps) {
  const {
    author = "",
    authorPhoto,
    date = "",
    description = "",
    id,
    image = "",
    metadata = [],
    secondaryMetadata = [],
    title,
  } = item;

  const filteredMetadata = metadata.filter(Boolean);
  const filteredSecondaryMetadata = secondaryMetadata.filter(Boolean);

  const onCardClick = (event: MouseEvent<HTMLElement>) => {
    if (onClick) {
      event.preventDefault();
      onClick(item);
      return;
    }

    if (handleSelect) {
      handleSelect(event, item);
    }
  };

  const onAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;
    event.preventDefault();
    event.stopPropagation();
    onClick(item);
  };

  const secondaryMetadataItems = [
    author && (
      <Fragment key="author">
        {isListView ? <ScribeAvatarPort displayName={author} photo={authorPhoto} /> : null}
        <p className="scribe-card-port-ellipsis-text">{author}</p>
      </Fragment>
    ),
    date && (
      <time className="scribe-card-port-ellipsis-time" dateTime={date} data-testid="last-updated-date" key="date">
        {date}
      </time>
    ),
  ].filter(Boolean);

  return (
    <article
      className={`scribe-card-port-article${handleSelect ? " disable-text-selection" : ""}`}
      data-list-view={isListView ? "true" : undefined}
      data-selected={isSelected ? "true" : undefined}
      data-testid="card-article"
      id={id}
      onClick={onCardClick}
    >
      {showThumbnail ? (
        <ScribeLinkWrapperPort title={title} onClick={onAnchorClick}>
          <ScribeCardImagePort
            alt={title}
            id={id}
            image={image}
            isLazyLoading={isLazyLoading}
            isListView={isListView}
          />
        </ScribeLinkWrapperPort>
      ) : null}
      <div className="scribe-card-port-info" data-list-view={isListView ? "true" : undefined}>
        {getMenuItems ? (
          <div className="scribe-card-port-action-menu" onClick={(event) => event.stopPropagation()}>
            <ScribeMoreOptionsMenuPort disabled={getMenuItems().length === 0} />
          </div>
        ) : null}
        <span
          className="scribe-card-port-metadata scribe-card-port-meta"
          data-list-view={isListView ? "true" : undefined}
          data-testid="card-metadata"
        >
          {filteredMetadata.map((data, index) => (
            <Fragment key={index}>
              {data}
              {index !== filteredMetadata.length - 1 ? <ScribeSeparatorPort /> : null}
            </Fragment>
          ))}
        </span>
        <div className="scribe-card-port-title-wrapper">
          <div className="scribe-card-port-link-wrapper">
            <ScribeLinkWrapperPort title={title} onClick={onAnchorClick}>
              <h2
                aria-label={title}
                className="scribe-card-port-title"
                data-list-view={isListView ? "true" : undefined}
                data-testid="card-title"
                tabIndex={0}
              >
                {title}
              </h2>
            </ScribeLinkWrapperPort>
          </div>
        </div>
        {showDescription ? <h4 className="scribe-card-port-description">{description}</h4> : null}
        <span
          className="scribe-card-port-secondary-metadata scribe-card-port-metadata scribe-card-port-meta"
          data-list-view={isListView ? "true" : undefined}
        >
          <div
            className="scribe-card-port-author-date-container"
            data-list-view={isListView ? "true" : undefined}
          >
            {secondaryMetadataItems.map((data, index) => (
              <Fragment key={index}>
                {data}
                {isListView && index !== secondaryMetadataItems.length - 1 ? (
                  <ScribeSeparatorPort />
                ) : null}
              </Fragment>
            ))}
          </div>
          {filteredSecondaryMetadata.length > 0 ? (
            <>
              {isListView ? <ScribeSeparatorPort /> : null}
              <div className="scribe-card-port-row">
                {filteredSecondaryMetadata.map((data, index) => (
                  <Fragment key={index}>
                    <div>{data}</div>
                    {index !== filteredSecondaryMetadata.length - 1 ? <ScribeSeparatorPort /> : null}
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
        </span>
      </div>
    </article>
  );
}
