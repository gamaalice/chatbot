# Virtual Assistant (WhatsApp Bot)

## Project Description
The Chatbot is an automated WhatsApp virtual assistant developed for Ease Engenharia.
It provides fast, consistent, and professional customer service by presenting information about the company, its services, advantages, and contact options.
The bot also records all interactions as leads in a local SQLite database and can optionally integrate with external CRMs such as HubSpot, Pipedrive, Notion, or Airtable.

## Technologies Used
Node.js — runtime environment
whatsapp-web.js — WhatsApp Web automation
qrcode-terminal — QR Code rendering in the terminal
better-sqlite3 — local SQLite database
axios — HTTP client for CRM integrations
JavaScript (ES6+)

## Project Logic
### 1. Message Capture and Processing
The bot receives every incoming message and extracts relevant information such as the sender’s name, phone number, and message content.
All text is normalized (accents removed, lowercase conversion) to ensure consistent interpretation.

### 2. Automatic Lead Registration
Each interaction is stored in the SQLite database, including:
- Contact name
- Phone number
- Message content
- imestamp
- If configured, the same data can also be forwarded to an external CRM.

### 3. Command Identification
The bot analyzes the normalized message and determines the appropriate response:
- Greetings or “menu” → sends the main menu
- Numeric options (1–5) → sends predefined responses
- Any other input → triggers a fallback instructing the user to type “menu”

### 4. Typing Simulation
Before sending each response, the bot simulates typing to create a more natural and human-like interaction.

### 5. Organized Response Structure
All responses are stored in a centralized object, making the system easy to maintain, expand, and customize.

## How to Run the Project
### 1. Install Dependencies
npm install
### 2. Start the Bot
node chatbot.js
### 3. Connect to WhatsApp
- A QR Code will appear in the terminal
- Open WhatsApp on your phone
- Navigate to: Settings → Linked Devices → Link a Device
- Scan the QR Code displayed in the terminal

Once authenticated, the bot will be active and ready to operate.
