---
id: getting-started
title: Getting Started
sidebar_position: 1
---

# Getting Started

## Project Overview

CryptoPrice is a real-time cryptocurrency price tracking application, providing users with up-to-date information on various cryptocurrencies.

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Git

## Installation and Setup

### Web App Setup

1.  Clone the repository:

   ```bash
   git clone https://github.com/suchithh/CryptoPrice.git
   cd CryptoPrice
   cd web-app
   ```
2.  Install dependencies:

   ```bash
   npm install # or yarn install
   ```
3.  Run the development server:

   ```bash
   npm run dev
   ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Docusaurus

This project uses Docusaurus to generate its documentation. Here's how to run the Docusaurus development server:

1.  Navigate to the `docs` directory:

   ```bash
   cd docs
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3.  Start the Docusaurus development server:

   ```bash
   npx docusaurus start
   ```

This will start a local server with live reloading, allowing you to preview and edit the documentation.

### Running on Mobile

To run the application on your mobile device:

1.  Ensure your mobile device and computer are on the same network.
2.  Find your computer's local IP address.
3.  Replace `localhost` with your computer's IP address in the browser on your mobile device (e.g., `http://192.168.1.100:3000`).
4.  Open the address in your mobile browser.
