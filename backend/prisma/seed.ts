import 'dotenv/config';
import { PrismaClient } from '../generated/prisma';
import bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const saltRounds = 10;

    const vehicleData = [
        {
            id: 1,
            name: 'Toyota Almaz',
            status: 'ACTIVE',
            fuel_level: 75.5,
            odometer: 1456.7,
            latitude: -7.7956,
            longitude: 110.3695,
            speed: 73.5,
        },
        {
            id: 2,
            name: 'Honda CRV',
            status: 'ACTIVE',
            fuel_level: 85.0,
            odometer: 2500.5,
            latitude: -7.8001,
            longitude: 110.3750,
            speed: 68.2,
        },
        {
            id: 3,
            name: 'Mitsubishi Xpander',
            status: 'INACTIVE',
            fuel_level: 30.2,
            odometer: 5000.0,
            latitude: -7.7890,
            longitude: 110.3550,
            speed: 0.0,
        },
        {
            id: 4,
            name: 'Suzuki Ertiga',
            status: 'ACTIVE',
            fuel_level: 60.0,
            odometer: 1200.3,
            latitude: -7.7925,
            longitude: 110.3600,
            speed: 55.0,
        },
        {
            id: 5,
            name: 'Nissan Magnite',
            status: 'ACTIVE',
            fuel_level: 90.1,
            odometer: 800.9,
            latitude: -7.8050,
            longitude: 110.3800,
            speed: 78.9,
        },
        {
            id: 6,
            name: 'Daihatsu Xenia',
            status: 'INACTIVE',
            fuel_level: 15.7,
            odometer: 7000.1,
            latitude: -7.8100,
            longitude: 110.3400,
            speed: 0.0,
        },
        {
            id: 7,
            name: 'Hyundai Creta',
            status: 'ACTIVE',
            fuel_level: 55.0,
            odometer: 3200.4,
            latitude: -7.7800,
            longitude: 110.3700,
            speed: 62.1,
        },
        {
            id: 8,
            name: 'Wuling Alvez',
            status: 'ACTIVE',
            fuel_level: 70.3,
            odometer: 900.2,
            latitude: -7.7990,
            longitude: 110.3650,
            speed: 70.0,
        },
        {
            id: 9,
            name: 'Mazda CX-5',
            status: 'INACTIVE',
            fuel_level: 25.8,
            odometer: 4500.6,
            latitude: -7.8030,
            longitude: 110.3670,
            speed: 0.0,
        },
        {
            id: 10,
            name: 'Mercedes-Benz GLC',
            status: 'ACTIVE',
            fuel_level: 95.0,
            odometer: 1100.7,
            latitude: -7.7970,
            longitude: 110.3710,
            speed: 85.5,
        }
    ];

    const userData = [
        {
            username: "admin123",
            password: "admin123",
            email: "admin@gmail.com"
        },
        {
            username: "indonesia",
            password: "indonesia1",
            email: "indonesia@example.com"
        },
    ];

    for (const vehicle of vehicleData) {
        await prisma.vehicle.upsert({
            where: { id: vehicle.id },
            update: {
                name: vehicle.name,
                status: vehicle.status,
                fuel_level: vehicle.fuel_level,
                odometer: vehicle.odometer,
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
                speed: vehicle.speed,
            },
            create: {
                id: vehicle.id,
                name: vehicle.name,
                status: vehicle.status,
                fuel_level: vehicle.fuel_level,
                odometer: vehicle.odometer,
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
                speed: vehicle.speed,
            },
        });
    }

    for (const user of userData) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                username: user.username,
                password: hashedPassword,
            },
            create: {
                username: user.username,
                password: hashedPassword,
                email: user.email,
            }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });