# LynkHub

LynkHub is a chat app where people can talk to each other in real time. You can chat privately, in groups, and get notifications when new messages arrive.

## Features
- **Chat in Real Time**: Send and receive messages instantly.
- **Group Chats**: Create groups and chat with multiple people.
- **Login and Signup**: Secure login and signup with tokens.
- **Notifications**: Get alerts for new messages.

## Tools Used
### Frontend:
- **React**: Makes the app interactive.
- **Bootstrap**: For a clean and modern design.

### Backend:
- **Node.js**: Runs the server.
- **Express**: Helps manage routes and APIs.
- **MongoDB**: Stores user, message, and chat data.
- **Socket.IO**: Handles real-time chats.

## How to Use the App Locally

### Before You Start
- Install **Node.js** (v21.4.0).
- Install **MongoDB** or use MongoDB Atlas (online version).

### Steps
1. **Download the Project**:
   ```bash
   git clone https://github.com/Divy63/LynkHub.git
   cd LynkHub
   ```
2. **Backend Setup**

  1. **Go to Backend Folder**
     ```bash
     cd backend
     ```
  2. **Install Dependencies**
     ```bash
     npm install
     ```
  3. **Create a file called .env if not already present**
     ```env
     PORT=10000
     MONGO_URI=mongodb+srv://divyp630:Divy%406303@cluster0.shy3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=lynkhub
     NODE_ENV=production
     ```
  4. **Start the Server**
     ```bash
     npm start
     ```
3. **Frontend Setup**
  1. **Go to Frontend Folder**
     ```bash
     cd ../frontend
     ```
  2. **Install Dependencies**
     ```bash
     npm install
     ```
  3. **Start the Server**
     ```bash
     npm start
     ```
4. **Open the App**
   ```bash
   http://localhost:10000
   ```
## License
This project is free to use under the MIT License.

## Contact
GitHub: https://github.com/Divy63/
Email: divyp630@gmail.com
