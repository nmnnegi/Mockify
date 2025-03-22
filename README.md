# Mockify

<div align="center">
  <img src="public/assets/svg/logo.png" alt="Mockify Logo" width="200" />
  <h3>Ace your tech interviews with AI-powered mock interviews</h3>
</div>

## 📖 About

Mockify is an AI-powered mock interview platform designed to help developers prepare for technical interviews. The platform creates custom interview experiences tailored to your experience level, tech stack, and target job role.

### Key Features

- **AI-Generated Interviews**: Create custom mock interviews based on your specific requirements
- **Personalized Experience**: Tailor interviews to your tech stack, experience level, and target roles
- **Realistic Scenarios**: Practice with questions that simulate real technical interviews
- **Feedback & Analysis**: Receive detailed feedback on your performance to improve your skills

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Authentication**: Clerk.js
- **Backend**: Firebase (Firestore)
- **UI Components**: Radix UI, shadcn/ui
- **Routing**: React Router
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Icons**: Lucide Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mockify.git
   cd mockify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore database
3. Configure Firebase Authentication
4. Add Firebase security rules:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 🌐 Deployment

1. Build the project:
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or feedback, please reach out to us at support@mockify.com.

---

<div align="center">
  <p>Made with ❤️ for tech interview preparation</p>
</div>
