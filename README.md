# 🎱 Real-Time Bingo App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

Modern, hızlı ve çok dilli bir gerçek zamanlı Tombala (Bingo) uygulaması. Arkadaşlarınızla online oynayın veya bilgisayara karşı kendinizi test edin!

---

## ✨ Özellikler

- 🌐 **Online Mod:** Gerçek zamanlı oda oluşturma ve katılma (Socket.io).
- 🏠 **Offline Mod:** İnternet bağlantısı olmadan bilgisayara karşı antrenman.
- 🌍 **Çok Dilli Destek:** 6 farklı dil (TR, EN, DE, IT, RU, ES).
- ⚡ **Hızlı Performans:** Redis destekli anlık veri akışı.
- 🛡️ **Güvenli:** Prisma ORM ve PostgreSQL (Neon.tech) ile sağlam veri yönetimi.
- 🎨 **Modern Tasarım:** Tailwind CSS ile şık ve karanlık tema (Dark Mode).

---

## 🛠️ Teknoloji Yığını

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Validation:** [Zod](https://zod.dev/)
- **i18n:** [i18next](https://www.i18next.com/)
- **Client:** [Socket.io-client](https://socket.io/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework:** [Express](https://expressjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://neon.tech/) & [Redis](https://redis.io/)
- **Real-time:** [Socket.io](https://socket.io/)

---

## 🚀 Başlangıç

### Gereksinimler
- Node.js (v18+)
- Docker (Redis için)
- Neon.tech hesabı (veya herhangi bir PostgreSQL)

### Kurulum

1. **Depoyu klonlayın:**
   ```bash
   git clone <repo-url>
   cd bingo-app
   ```

2. **Backend kurulumu:**
   ```bash
   cd backend
   npm install
   # .env dosyanızı DATABASE_URL ve REDIS_URL ile yapılandırın
   npx prisma migrate dev
   npm run dev
   ```

3. **Frontend kurulumu:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 📁 Klasör Yapısı

```text
bingo-app/
├── frontend/          # Next.js Uygulaması
│   ├── src/app/       # Sayfalar ve Layout
│   ├── src/store/     # Zustand Store'ları
│   └── src/i18n/      # Dil dosyaları
├── backend/           # Node.js Sunucusu
│   ├── src/           # Kaynak kodlar
│   ├── prisma/        # Veri tabanı şemaları
│   └── nodemon.json   # Geliştirme konfigürasyonu
└── LICENSE            # Lisans bilgileri
```

---

## 📄 Lisans

Bu proje **Mehmet Akif Kiraz** tarafından geliştirilmiştir. Sadece kişisel, eğitimsel ve ticari olmayan amaçlarla kullanılabilir. Ticari kullanım yasaktır. Detaylar için `LICENSE` dosyasına göz atın.

---

## 🤝 İletişim

Sorularınız veya geri bildirimleriniz için iletişime geçebilirsiniz!

---
⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
