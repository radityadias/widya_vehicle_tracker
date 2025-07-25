# widya_vehicle_tracker

## Fitur

- Daftar Kendaraan
- Pencarian (Client-Side Rendering)
- Tampilan Detail Kendaraan
- Autentikasi (JWT)
- Dashboard
- UI Responsif

## Tumpukan Teknologi

- **Frontend:**
    - React
    - TypeScript
    - Zustand
    - React Router DOM
    - Tailwind CSS
- **Backend:**
    - Express.js
    - TypeScript
    - Prisma
    - PostgreSQL
    - JWT
    - Bcrypt
    - CORS
    - Dotenv

## Instruksi

Ikuti petunjuk dibawah untuk menjalankan program ini

### Prasyarat

- Node.js & npm
- PostgreSQL

### Setup Backend

1.  Kloning repositori:
    ```bash
    git clone https://github.com/radityadias/widya_vehicle_tracker.git
    cd widya_vehicle_tracker
    ```
2.  masuk ke folder backend:
    ```bash
    cd backend
    ```
3.  Install dependensi backend:
    ```bash
    npm install
    ```
4.  Buat dan konfigurasi file `.env`:
    ``` bash
    cp .env.template .env
    ```
    ```env
    DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/vehicle_tracker_db?schema=public"
    JWT_SECRET="kunci_jwt_yang_sangat_rahasia_dan_panjang_buat_secara_acak_untuk_keamanan"
    ```
5.  Generate Prisma Client dan migrasi:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init_schema
    ```
6.  Isi database dengan data dari seeder:
    ```bash
    npm run seed
    ```

### Setup Frontend

1.  masuk ke folder frontend:
    ```bash
    cd ../frontend
    ```
2.  Install dependensi frontend:
    ```bash
    npm install
    npm install zustand
    ```

## Cara Run Aplikasi

1.  Mulai Server Backend:
    ```bash
    cd backend
    npm run dev
    ```
2.  Mulai Server Pengembangan Frontend:
    ```bash
    cd frontend
    npm run dev
    ```
3.  Akses Aplikasi:
    * Buka browser web Anda: `http://localhost:5173/` atau akses link yang muncul di terminal frontend kalian
    * Login dengan user yang ada di seeder

## Endpoint API

- `POST /auth/login`
- `GET /vehicles`
- `GET /vehicles/:id`