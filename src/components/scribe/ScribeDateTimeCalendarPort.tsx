import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { StyledEngineProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import type { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import { Clock, X } from "react-feather";
import type { ReactNode } from "react";

export interface ScribeDateTimeCalendarPortProps {
  label?: string;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
}

export interface ScribeScheduleDateTimeFieldPortProps {
  label: string;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
}

const pickerActionBarButtonSx = {
  textTransform: "uppercase" as const,
  fontSize: "0.8125rem",
  fontWeight: 500,
  minWidth: "auto",
  letterSpacing: "0.04em",
};

/**
 * Source-truth port of `PublishSchedulePickerActionBar` from
 * `Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx`.
 */
function ScribePublishSchedulePickerActionBarPort({
  onAccept,
  onClear,
  onCancel,
  onSetToday,
  actions: _actions,
  sx: sxFromSlot,
  ...rest
}: PickersActionBarProps) {
  return (
    <DialogActions
      {...rest}
      sx={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          gap: 1,
          width: "100%",
          boxSizing: "border-box",
          borderTop: "1px solid var(--divider, #e4e4e7)",
          px: 2,
          py: 1,
        },
        ...(sxFromSlot ? (Array.isArray(sxFromSlot) ? sxFromSlot : [sxFromSlot]) : []),
      ]}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <MuiButton
          color="inherit"
          disableElevation
          startIcon={<X size={18} strokeWidth={2} aria-hidden />}
          sx={{
            ...pickerActionBarButtonSx,
            color: "var(--text)",
          }}
          type="button"
          onClick={onClear}
        >
          Clear
        </MuiButton>
        <MuiButton
          color="inherit"
          disableElevation
          startIcon={<Clock size={18} strokeWidth={2} aria-hidden />}
          sx={{
            ...pickerActionBarButtonSx,
            color: "var(--text)",
          }}
          type="button"
          onClick={onSetToday}
        >
          Now
        </MuiButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <MuiButton
          color="inherit"
          disableElevation
          sx={{
            ...pickerActionBarButtonSx,
            color: "var(--text)",
          }}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </MuiButton>
        <MuiButton
          color="inherit"
          disableElevation
          sx={{
            ...pickerActionBarButtonSx,
            color: "var(--focus-color)",
            fontWeight: 600,
          }}
          type="button"
          onClick={onAccept}
        >
          Apply
        </MuiButton>
      </Box>
    </DialogActions>
  );
}

/**
 * Source-truth port of `DigitalClockSectionItem` from
 * `Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx`.
 */
function ScribeDigitalClockSectionItemPort(
  props: { children: unknown; role: string; disableRipple?: boolean } & Record<string, unknown>,
) {
  const { children, disableRipple: _disableRipple, ...optionProps } = props;
  let updatedProps = optionProps;

  if (children === "AM" || children === "PM") {
    updatedProps = {
      ...optionProps,
      role: "radio",
    };
  }

  const { className, ...domProps } = updatedProps;
  const optionClassName = ["scribe-date-time-calendar-port-clock-item", className]
    .filter(Boolean)
    .join(" ");

  return (
    <li {...domProps} className={optionClassName}>
      {children as ReactNode}
    </li>
  );
}

const calendarSlotProps = {
  textField: {
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": {
        border: "none",
        boxShadow: "none",
      },
    },
    variant: "standard" as const,
  },
};

const scheduleFieldSlotProps = {
  textField: {
    ...calendarSlotProps.textField,
    InputLabelProps: {
      shrink: true,
    },
  },
};

const calendarEachMinuteTimeSteps = {
  hours: 1,
  minutes: 1,
};

const scribeDateTimeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f3b032",
      light: "#f9d187",
      dark: "#a26900",
      contrastText: "#000000",
    },
  },
  typography: {
    allVariants: {
      lineHeight: 1.4,
    },
    body1: {
      color: "var(--text)",
      lineHeight: 1.4,
    },
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontSize: 14,
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "var(--text)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "var(--label-font-size)",
        },
      },
    },
  },
});

export const scribeScheduleDatePickerProps = {
  slotProps: calendarSlotProps,
  slots: {
    actionBar: ScribePublishSchedulePickerActionBarPort,
    digitalClockSectionItem: ScribeDigitalClockSectionItemPort,
  },
  timeSteps: calendarEachMinuteTimeSteps,
} satisfies Partial<DateTimePickerProps<Date>>;

/**
 * Source-backed DateTimePicker demo path from
 * `Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx`.
 */
export function ScribeDateTimeCalendarPort({
  label = "Publish Date",
  onChange = () => {},
  value = new Date("2026-06-27T00:00:00"),
}: ScribeDateTimeCalendarPortProps) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={scribeDateTimeTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="scribe-date-time-calendar-port">
            <DateTimePicker
              {...scribeScheduleDatePickerProps}
              desktopModeMediaQuery="@media (min-width: 0px)"
              label={label}
              value={value}
              open
              closeOnSelect={false}
              minutesStep={1}
              onChange={onChange}
              slotProps={{
                ...calendarSlotProps,
                popper: {
                  disablePortal: true,
                  placement: "bottom-start",
                },
              }}
            />
          </div>
        </LocalizationProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}

/**
 * Closed-field DateTimePicker path from
 * `Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx`.
 */
export function ScribeScheduleDateTimeFieldPort({
  label,
  onChange = () => {},
  value = null,
}: ScribeScheduleDateTimeFieldPortProps) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={scribeDateTimeTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="scribe-date-time-calendar-port scribe-schedule-date-time-field-port">
            <DateTimePicker
              {...scribeScheduleDatePickerProps}
              closeOnSelect={false}
              desktopModeMediaQuery="@media (min-width: 0px)"
              label={label}
              minutesStep={1}
              onChange={onChange}
              slotProps={scheduleFieldSlotProps}
              value={value}
            />
          </div>
        </LocalizationProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
