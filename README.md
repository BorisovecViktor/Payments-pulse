# Welcome to Payments pulse app

Payments Pulse is a real-time monitoring app for tracking the health and performance of your payment systems. It provides instant insights into transaction flows, detects issues, and ensures uninterrupted payment operations.

## Clone app

Clone app from repository - run `git clone using SSH or HTTPS link`

## Run steps

In the project directory run:

### `npm install`

Install node modules

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### App functionality

- You can change amount of merchants in virtualize table using generateMerchants(count) function with argument - count: number (src/mocks/handlers)

- Switch between accounts using dropdown (merchants table data doesn't change because using mock data)

- Change refresh interval for merchants table data updates

- Use transactions filters

- See warning icon if merchant has fails >= MAX_FAILS (by default - 90)

- Toggle transactions list for selected merchant (open/close)

- Use Helper panel for information

### Helper panel (need to implement dynamic functionality)

Some important dynamic information about app (Status summary, Alerts, Metrics Legend, etc)
