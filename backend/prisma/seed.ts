import 'dotenv/config';
import { PrismaClient } from '../generated/prisma'
import bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');
    const saltRounds = 10

    const vehicleData = [
        {
            id: 1,
            name: 'Toyota Almaz',
            status: 'ACTIVE',
            fuel_level: 75.5,
            odometer: 1456.7,
            latitude: -7.7956,
            longtitude: 120.3695,
            speed: 73.5,
        },
        {
            id: 2,
            name: 'Toyota Yaris',
            status: 'INACTIVE',
            fuel_level: 43.0,
            odometer: 9865.4,
            latitude: -7.8013,
            longtitude: 110.3644,
            speed: 80.0,
        }
    ]

    const userData = [
        {
            username: "admin123",
            password: "indonesia1",
            email: "indonesia1@gmail.com"
        }
    ]

    for (const vehicle of vehicleData) {
        await prisma.vehicle.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: vehicle.name,
                status: vehicle.status,
                fuel_level: vehicle.fuel_level,
                odometer: vehicle.odometer,
                latitude: vehicle.latitude,
                longtitude: vehicle.longtitude,
                speed: vehicle.speed,
            },
        });

        console.log(vehicle);
    }

    for (const user of userData) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        await prisma.user.upsert({
            where: { id: 1 },
            update: {
                password: hashedPassword,
            },
            create: {
                username: user.username,
                password: hashedPassword,
                email: user.email,
            }
        })
        console.log(user);
    }

    console.log('Seeding Complete');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });