import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ScribeDatePickerPort, ScribeDateTimeCalendarPort } from "@/components/scribe";

function DatepickerDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-date-picker-demo-frame">{children}</div>
    </div>
  );
}

function DemoState({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="scribe-date-picker-demo-row">
      <div className="scribe-date-picker-demo-label">{label}</div>
      {children}
    </div>
  );
}

function DatepickerStatesDemo() {
  return (
    <DatepickerDemoFrame>
      <div className="scribe-date-picker-demo-stack">
        <DemoState label="Empty">
          <ScribeDatePickerPort label="Date" name="date-empty" />
        </DemoState>
        <DemoState label="Selected">
          <ScribeDatePickerPort
            label="Publish date"
            date={new Date("2026-06-26T12:00:00")}
            formattedDate="06/26/2026"
            name="date-selected"
          />
        </DemoState>
        <DemoState label="Error">
          <ScribeDatePickerPort
            label="Start date"
            errorMessage="Enter a valid date."
            name="date-error"
          />
        </DemoState>
      </div>
    </DatepickerDemoFrame>
  );
}

export const datepickerDemos = {
  calendar: (
    <DatepickerDemoFrame>
      <div className="scribe-date-picker-calendar-demo">
        <ScribeDateTimeCalendarPort />
      </div>
    </DatepickerDemoFrame>
  ),
  states: <DatepickerStatesDemo />,
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/DatePicker/DatePicker.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/DatePicker/DatePicker.types.ts
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/FieldsetHeading/FieldsetHeading.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/IconButton/IconButton.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        DatePicker field and DateTimePicker calendar from production Scribe source
      </Badge>
    </div>
  ),
};
