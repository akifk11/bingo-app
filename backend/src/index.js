import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Temel bir test route'u
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bingo Backend is running' });
});

// Socket.io Bağlantı Yönetimi
io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı:', socket.id);

  socket.on('join_game', (gameId) => {
    socket.join(gameId);
    console.log(`Kullanıcı ${socket.id}, ${gameId} odasına katıldı`);
  });

  socket.on('draw_number', (data) => {
    // data: { gameId: string, number: number }
    io.to(data.gameId).emit('number_drawn', data.number);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

export { io, prisma };
