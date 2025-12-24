import { DatePicker__UNSTABLE as DatePicker  } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original'
import { useState } from 'react';
import ErrorWindow from './CalenderError';
import ContentWindow from './CalendarEntry';
import { CALENDAR_CONTENT } from './calendarContent';


export default function XMasCalendar({initialDate, onClose}) {
    const [selectedDate, setSelectedDate] = useState(
        toDate(initialDate ?? new Date())
    )
    const [showError, setShowError] = useState(false);
    const [showContent, setShowContent] = useState(false);

  return (
    <ThemeProvider theme={original}>
    <div className="xmas-calendar-window">
      <DatePicker
        date={selectedDate}
        onAccept={(date) => {
          const validDate = toDate(date);

          if (!isValidXMasDate(date)) {
            // Show error popup
            setShowError(true);
            return;
          }
          // if valid
          setSelectedDate(validDate);
          setShowContent(true);
        }}
        onCancel={onClose}
        />
        {showError && (
            <ErrorWindow
            title={"InvalidDateError"}
            message={"Please select a date between 1st and 27th December!"}
            onClose={() => setShowError(false) }
            />
        )}
        {showContent && (() => {
            const day = selectedDate.getDate();
            const content = CALENDAR_CONTENT[day];

            if (!content) {
                return (
                <ErrorWindow
                    title="NoContent"
                    message="No song for this day 🎄"
                    onClose={() => setShowContent(false)}
                />
                );
            }
            
            return (
                <ContentWindow
                onClose={() => setShowContent(false)}
                {... content}
                />
            );
        })()}
    </div>
    </ThemeProvider>
  );
}

function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}

function isValidXMasDate(value) {
  const date = toDate(value);

  if (isNaN(date.getTime())) return false;

  const isDecember = date.getMonth() === 11; // 0-based
  const isBefore25th = date.getDate() <= 27;
  const is2025 = date.getFullYear() === 2025;

  return isDecember && isBefore25th && is2025;
}

