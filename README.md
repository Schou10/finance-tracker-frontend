# Finacne Tracker Frontend

## Overview

Finance Tracker is a React-based web application that allows users to track their financial transactions, set savings goals, and manage their budgets efficiently. This frontend interacts with a backend server and the Plaid API to fetch real-time banking data.

## Features

- User authentication (signup/login/logout)

- Secure Plaid integration to link bank accounts

- Display account balances and recent transactions

- Set financial goals and track progress

## Tech Stack

- Frontend Framework: React (Vite)

- State Management: Context API

- UI Styling: CSS Modules

- Routing: React Router

- API Requests: Axios

- Data Visualization: Progress bars for goal tracking

## Deployment

### Links

This is where you can find the links to my server Which is set up using the cloud

- Find the webpage, click [here](https://finance-tracker.zanity.net/)!
- This is the link to the www webpage, click [here](https://www.finance-tracker.zanity.net)!
- Find the link to the API server, click [here](https://api.finance-tracker.zanity.net)!

## Figma

I used figma to create generate the starting design for my ui to get this page looking the way I wanted.
Find the link to my Figma[here](https://www.figma.com/design/UOZYVbrEtfqz6V8YgwkXtr/Final-Project-Design?node-id=0-1&node-type=canvas&t=RxcdCgLVIIDVXoUR-0)!

## API Endpoints

- POST /signup → Register a new user

- POST /login → Authenticate user

- GET /accounts/sync → Fetch user bank accounts

- GET /transactions/sync → Fetch recent transactions

- PATCH /goals/:id/save → Save funds to a goa

## Backend

Find the link to my Backend [here](https://www.github.com/Schou10/finance-tracker-backend)!

## Testing/Reviewing

To test the banking integration:

1. Click "Connect Bank" Select "Plaid Test Bank" when prompted to choose a bank
2. Use phone number: 415-555-0011 found at the bottom of the screen in sandbox mode
3. Use verification code: 123456 found at the bottom of the screen in sandbox mode
4. Select add new bank account or default bank option
5. Use username: user_good
6. Use password: pass_good
7. If asked for a verification code: 1234
8. If asked for a phone number: 415-555-0011 found at the bottom of the screen in sandbox mode
