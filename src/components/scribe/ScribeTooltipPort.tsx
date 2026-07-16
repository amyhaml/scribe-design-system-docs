import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";

export interface ScribeTooltipPortProps extends React.ComponentProps<typeof ReactTooltip> {
  hasInfo?: boolean;
  fullWidth?: boolean;
  hideShadow?: boolean;
  hideArrow?: boolean;
}

const SCRIBE_ELEVATION_MAIN =
  "0px 1px 3px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 0px 2px rgba(0, 0, 0, 0.05)";

const ScribeStyledTooltipPort = styled(ReactTooltip)<ScribeTooltipPortProps>`
  && {
    background-color: var(--balloon-tooltip-background);
    border-radius: var(--border-radius);
    padding: var(--spacing-xs) !important;
    color: var(--balloon-tooltip-text);
    font-size: var(--label-font-size);
    text-transform: ${({ hasInfo }) => (hasInfo ? "none" : "capitalize")};
  }

  ${({ fullWidth }) =>
    !fullWidth &&
    `
      && {
        max-width: 11.125rem;
      }
    `};

  ${({ hideShadow }) =>
    !hideShadow &&
    `
      && {
        box-shadow: ${SCRIBE_ELEVATION_MAIN};
      }
    `};

  &&:before,
  &&:after {
    ${({ hideArrow }) =>
      hideArrow &&
      `
        display: none;
      `};
  }
`;

/**
 * Source port: Scribe/packages/toolkit/src/components/Tooltip/Tooltip.tsx
 */
export function ScribeTooltipPort(props: ScribeTooltipPortProps) {
  return <ScribeStyledTooltipPort {...props} effect="solid" />;
}
