# Contact Manager App
This ia react-native application that will allow users to add, view, edit, and manage contacts with search, validation and accessibility . The performance optimization techniques have been implemented.

# Features
- Contact list with search functionality
- Add/Edit contact forms with validation
- Contact details with avatar and notes
- Favorites toggle, call, and message actions
- Accessibility compliance
- Performance optimizations with FlatList
- Persistent storage using AsyncStorage

# Project Structure
ContactManagerApp/
├── src/
│ ├── components/
│ │ └── common/ # Reusable UI components (CustomInput, CustomButton, LoadingSpinner, ContactListItem)
│ ├── data/ # Contact data model and validation functions
│ ├── screens/ # Screens (ContactList, AddContact, ContactDetails)
│ ├── styles/ # Global styles (colors, spacing, fonts, shared styles)
│ └── utils/ # Context provider (ContactContext with AsyncStorage)
├── android/ # Native Android project files
├── ios/ # Native iOS project files
├── App.js # Entry point of the app with navigation
├── index.js # Registers the app component
├── package.json # Dependencies and scripts
└── README.md # Project documentation

## Setup Instructions
1) Setup the gitHub Repository
2) Initialize and Install Dependencies
3) Install navigation libraries
4) Setup project structure
5) Create and code all the files including all necessary functionalities and styles.
4) Build and run the app

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android ```