# 🧠 Synapse – AI-Powered Study Partner Matching App

Synapse is a real-time web application that intelligently connects students based on subject similarity and emotional state, enabling collaborative learning through chat and video interaction.

---

## 🚀 Features

* 🔍 **Smart Matching System** – Connects students based on subject and emotion
* 🎭 **Role-Based Interaction** – Assigns users as **Mentor** (Motivated) or **Learner** (Confused)
* 💬 **Real-Time Chat** – Instant messaging using Socket.io
* 🎥 **Video Calling** – Peer-to-peer video communication using WebRTC
* 🎛️ **Media Controls** – Mute/unmute audio and toggle video
* ⚡ **Fast & Responsive UI** – Built with React

---

## 🛠 Tech Stack

### Frontend

* React.js
* CSS

### Backend

* Node.js
* Express.js
* Socket.io

### Real-Time & Communication

* WebSockets (Socket.io)
* WebRTC (Peer-to-Peer Video Calling)

---

## 📁 Project Structure

```
client/   → Frontend (React application)
server/   → Backend (Node.js + Socket.io server)
```

---

## ⚙️ How It Works

1. User enters **name, subject, and emotion**
2. Backend matches users with similar subjects
3. A **mentor-learner pair** is created
4. Users join a common **room**
5. They can:

   * Chat in real-time 💬
   * Start a video call 🎥

---

## 🧪 Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Abiramasree/synapse-study-partner.git
```

---

### 2️⃣ Install dependencies

#### 📌 Client

```
cd client
npm install
npm start
```

#### 📌 Server

```
cd server
npm install
node index.js
```

---

## 🌐 Configuration

Update the socket connection in `App.js`:

```
const socket = io("http://localhost:5000");
```

---

## 💡 Future Improvements

* 🔐 User Authentication (Login/Signup)
* 🤖 AI-based smarter matching
* 👥 Group study rooms
* 📹 Screen sharing
* 🌍 Deployment (Render / Vercel)

---

## 👩‍💻 Author

**Abiramasree K**
B.Tech CSE Student

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
