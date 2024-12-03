# 🌟 Send Money App

**Description**: A sleek mobile app designed to handle **transactions**, **smooth interactions**, and **responsive design**. The app features custom UI components, a beautiful theme, and handles all business logic through reusable hooks, utility functions, and clear type definitions.



https://github.com/user-attachments/assets/aee5a79d-fcdc-4c4b-b5d4-df7d4d92a915



## 🚀 Features

- **🔲 Custom UI Components**: Buttons, headers, and avatars to enhance the user experience.
- **💸 Transaction Management**: Send, view, and track transactions.
- **📱 Navigation**: Seamless screen transitions using React Navigation.
- **🎨 Custom Themes**: Material Design-based theme with custom fonts.
- **📢 Toast**: Toast messages for quick feedback to users.
- **⏳ Splash Screen**: A smooth splash screen during app load.
- **💡 Responsive Design**: Automatic layout adjustments for different screen sizes using custom hooks.

## ⚙️ Tech Stack

- **React Native**: Build native apps for iOS & Android.
- **Expo**: Simplified development environment.
- **React Navigation**: Smooth screen transitions.
- **React Native Paper**: Material Design components.
- **React Native Toast**: Quick and customizable toast messages.
- **Expo Font**: Custom font loading.

## 🛠 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/firasabdelaziz.git
   ```

2. Install dependencies:
   ```bash
   cd Send Money App
   npm install
   ```

3. Install Expo CLI:
   ```bash
   npm install -g expo-cli
   ```

4. Run the app:
   ```bash
   expo start
   ```

   Open the app on your device using Expo Go or in an emulator.

## 📂 Folder Structure

- **/assets**: Images & fonts.
- **/components**: Reusable UI components (e.g., buttons, headers).
- **/styles**: Theme & styling.
- **/navigation**: App navigation setup.
- **/hooks**: Reusable logic hooks (e.g., `useKeyboard`, `useMoneyTransfer`, `useNormalize`).
- **/screens**: Screens for app functionality (e.g., Send Money, Transaction Success).
- **/utils**: Helper functions for app logic.
- **/types**: Type definitions for components, screens, and business logic.

## 📲 Screens

### 💰 Send Money Screen
Initiate transactions by entering the amount.

### ✅ Transaction Success Screen
Displays successful transaction details—amount, fees, total.

## 🧩 Hooks

### 🖱 `useKeyboard`
Manages keyboard visibility and behavior to ensure smooth interactions in forms.

### 💸 `useMoneyTransfer`
Handles the logic for transferring money, including fee calculation and validation.

### 📏 `useNormalize`
Provides responsive design support by normalizing values across different screen sizes.

## 💡 Utility Functions

Helper functions for common tasks such as fee calculation other logic-heavy operations.

## 📑 Types

The **types** folder contains TypeScript type definitions for various parts of the app, ensuring type safety and code clarity.

### 📝 Example Types

- **Transaction**: Defines the structure of a transaction (e.g., amount, type, timestamp).
  
By using these type definitions, the app ensures that the code remains consistent and robust.

## 💡 Development Insights

- **Custom UI Components**: `CustomButton`, `CustomHeader`, and `UserAvatar` ensure consistent, reusable UI elements.
- **Theme**: A personalized Material Design theme for a modern feel.
- **Navigation**: React Navigation handles smooth transitions between app screens.
- **Toast**: Provides users with instant feedback using easy-to-display toast messages.
- **Fonts**: Custom fonts loaded with `expo-font` for a rich user experience.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch for your feature/fix
3. Commit changes
4. Push to your branch
5. Open a Pull Request

## 📜 License

MIT License – see [LICENSE](LICENSE) for more details.
