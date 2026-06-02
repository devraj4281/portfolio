export const POSTS = [
  {
    slug: "building-realtime-chat-socketio",
    title: "Building a Real-Time Chat App with Socket.io",
    date: "2026-05-10",
    readTime: "8 min read",
    tags: ["Node.js", "Socket.io", "React"],
    excerpt:
      "A deep dive into architecting a scalable real-time chat system — covering WebSocket rooms, typing indicators, read receipts, and JWT-secured sessions.",
    content: `## Why Socket.io?

Socket.io abstracts over raw WebSockets and provides automatic reconnection, namespaces, and rooms out of the box — exactly what a chat app needs.

## Setting Up the Server

\`\`\`javascript
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user_joined", { socketId: socket.id });
  });

  socket.on("send_message", ({ roomId, message }) => {
    io.to(roomId).emit("receive_message", message);
  });

  socket.on("typing", ({ roomId, userId }) => {
    socket.to(roomId).emit("user_typing", { userId });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(4000);
\`\`\`

## React Client Hook

\`\`\`typescript
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(roomId: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    });

    socketRef.current.emit("join_room", roomId);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  return socketRef.current;
}
\`\`\`

## Typing Indicators

The trick is to debounce the typing emit so you're not flooding the server on every keystroke:

\`\`\`typescript
import { useCallback, useRef } from "react";

export function useTypingIndicator(socket: Socket, roomId: string, userId: string) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onKeyDown = useCallback(() => {
    socket.emit("typing", { roomId, userId });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      socket.emit("stop_typing", { roomId, userId });
    }, 1500);
  }, [socket, roomId, userId]);

  return { onKeyDown };
}
\`\`\`

## Key Takeaways

- Use **rooms** to scope messages — never broadcast to all clients globally.
- **JWT middleware** on the Socket.io server protects every connection before any event is processed.
- Store messages in MongoDB with a \`readBy\` array updated via acknowledgements for read receipts.
- Optimistic UI updates (append locally before server confirmation) make the chat feel instant.
`,
  },
  {
    slug: "typescript-generics-practical-guide",
    title: "TypeScript Generics: A Practical Guide",
    date: "2026-04-22",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript"],
    excerpt:
      "Generics are the most powerful feature of TypeScript's type system. Learn how to write flexible, reusable, type-safe code without sacrificing developer experience.",
    content: `## What Are Generics?

Generics let you write functions and classes that work with **any type** while still preserving full type safety.

\`\`\`typescript
// Without generics — loses type information
function identity(value: any): any {
  return value;
}

// With generics — type is preserved
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);       // type: number
const str = identity("hello");  // type: string
\`\`\`

## Generic Constraints

Use \`extends\` to restrict what types are allowed:

\`\`\`typescript
interface HasId {
  id: string | number;
}

function findById<T extends HasId>(items: T[], id: T["id"]): T | undefined {
  return items.find((item) => item.id === id);
}
\`\`\`

## Generic Utility Types

TypeScript ships with built-in generic utilities you should know:

\`\`\`typescript
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

// Pick only what you need
type UserPreview = Pick<User, "id" | "name">;

// Make all fields optional for PATCH requests
type UpdateUser = Partial<User>;

// Make all fields required
type StrictUser = Required<User>;

// Map all values to a new type
type UserFlags = Record<keyof User, boolean>;
\`\`\`

## Real-World: A Typed API Client

\`\`\`typescript
async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(\`/api/\${endpoint}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

// Usage — fully typed, no casting needed
const user = await fetchApi<User>("users/1");
const posts = await fetchApi<Post[]>("posts");
\`\`\`

## Key Takeaways

- Generics = **reusable** functions with **specific** types at call time.
- Always constrain with \`extends\` when you need to access properties.
- Lean on built-in utility types (\`Pick\`, \`Partial\`, \`Record\`, \`Omit\`) before writing your own.
`,
  },
  {
    slug: "mern-stack-deployment-guide",
    title: "Deploying a MERN Stack App on Render & Vercel",
    date: "2026-03-15",
    readTime: "5 min read",
    tags: ["MERN", "DevOps", "Vercel", "Render"],
    excerpt:
      "A step-by-step guide to deploying a production-ready MERN stack app — Express API on Render, React frontend on Vercel, MongoDB Atlas in the cloud.",
    content: `## Architecture Overview

- **Frontend**: React (Vite) → deployed on **Vercel**
- **Backend**: Express.js → deployed on **Render**
- **Database**: MongoDB Atlas (free tier)

## Step 1 — Prepare the Express Server

Make sure your server binds to the right port:

\`\`\`javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

Add your environment variables to Render's dashboard:

\`\`\`bash
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
JWT_SECRET=your_super_secret_key
CLIENT_URL=https://your-app.vercel.app
\`\`\`

## Step 2 — CORS Configuration

\`\`\`javascript
import cors from "cors";

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
\`\`\`

## Step 3 — Deploy Frontend to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# From your React project root
vercel

# Set environment variable
vercel env add VITE_API_URL
# → https://your-backend.onrender.com/api
\`\`\`

## Step 4 — MongoDB Atlas

1. Create a free M0 cluster on [cloud.mongodb.com](https://cloud.mongodb.com)
2. Whitelist **0.0.0.0/0** (all IPs) so Render can connect
3. Copy the connection string into your Render env vars

## Common Gotchas

- Render free tier **spins down** after 15 min of inactivity — add a cron ping or upgrade.
- Always use \`VITE_\` prefix for env vars in Vite projects, otherwise they won't be exposed to the browser.
- Set \`credentials: true\` on both CORS config and the client's \`fetch\`/\`axios\` calls for cookie-based auth.
`,
  },
];