# Reservations Calendar View

## Overview
A custom calendar view has been added to the Reservations collection in PayloadCMS to display all reservations in an interactive calendar format.

## Features

### Calendar View
- **Multiple Views**: Switch between Month, Week, Day, and Agenda views
- **Color-Coded Status**: 
  - 🟢 Green: Confirmed reservations
  - 🟡 Yellow: Pending reservations
  - 🔴 Red: Cancelled reservations
- **Interactive Events**: Click on any reservation to navigate to its detail page
- **Tooltips**: Hover over events to see reservation details and special requests
- **Navigation**: Browse through different dates using the calendar controls
- **Responsive Design**: Clean, modern interface with proper spacing and styling

### Display Information
- Customer name
- Number of guests
- Reservation status
- Total count of reservations
- Branch/location information (in tooltip)
- Special requests (in tooltip)

## Installation

The following packages were installed:
```bash
pnpm add react-big-calendar date-fns
pnpm add -D @types/react-big-calendar
```

## File Structure

```
be/src/collections/Reservations/
├── index.ts                          # Collection configuration
└── components/
    ├── CalendarView.tsx              # Main calendar component
    └── calendar-styles.css           # Calendar styling
```

## How It Works

1. **Collection Configuration** (`index.ts`):
   - Added `beforeList` component to display the calendar above the table view
   - Uses PayloadCMS 3.x component path syntax

2. **Calendar Component** (`CalendarView.tsx`):
   - Fetches all reservations from the API
   - Transforms data into calendar events
   - Uses `react-big-calendar` for the calendar UI
   - Implements color coding based on reservation status
   - Provides interactive event selection

3. **Styling** (`calendar-styles.css`):
   - Imports base styles from react-big-calendar
   - Custom styles for buttons, events, and toolbar
   - Maintains consistency with PayloadCMS admin theme

## Usage

1. Navigate to the Reservations collection in the admin panel
2. The calendar view appears above the table list
3. Use the toolbar to:
   - Switch between Month/Week/Day/Agenda views
   - Navigate to previous/next time periods
   - Jump to today
4. Click on any event to open the reservation details
5. The standard table view remains available below the calendar

## API Endpoint

The calendar fetches data from:
```
GET /api/reservations?limit=1000
```

## Customization

### Changing Event Duration
Default event duration is 2 hours. To modify:
```typescript
const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours
```

### Modifying Status Colors
Update the `eventStyleGetter` function:
```typescript
switch (status) {
  case 'Confirmed': backgroundColor = '#10b981'; break;
  case 'Pending': backgroundColor = '#f59e0b'; break;
  case 'Cancelled': backgroundColor = '#ef4444'; break;
}
```

### Adjusting Calendar Height
Modify the height in the return statement:
```typescript
<div style={{ height: '600px', ... }}>
```

## Notes

- The calendar displays all reservations (limit: 1000)
- Events are automatically sorted by date
- The component is a client-side React component ('use client')
- Import map was generated for PayloadCMS to recognize the component

## Troubleshooting

If the calendar doesn't appear:
1. Regenerate the import map: `pnpm payload generate:importmap`
2. Restart the development server
3. Clear your browser cache
4. Check the browser console for errors

## Future Enhancements

Possible improvements:
- Drag-and-drop to reschedule reservations
- Filter by branch/tenant
- Filter by status
- Create new reservation by clicking on the calendar
- Display capacity warnings (overbooking)
- Export calendar to iCal format
