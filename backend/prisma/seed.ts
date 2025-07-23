import 'dotenv/config';
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');
    const vehicle1 = await prisma.vehicle.upsert({
        where: { id: 1 },
        update: {
            name: 'Toyota Almaz',
            status: 'ACTIVE',
            fuel_level: 75.5,
            odometer: 1456.7,
            latitude: -7.7956,
            longtitude: 120.3695,
            speed: 73.5,
        },
        create: {
            name: 'Toyota Almaz',
            status: 'ACTIVE',
            fuel_level: 75.5,
            odometer: 123456.7,
            latitude: -7.7956,
            longtitude: 110.3695,
            speed: 66.5,
        },
    });

    const vehicle2 = await prisma.vehicle.upsert({
        where: { id: 2 },
        update: {
            name: 'Toyota Yaris',
            status: 'INACTIVE',
            fuel_level: 63.0,
            odometer: 5345.4,
            latitude: -7.8013,
            longtitude: 50.1532,
            speed: 90.0,
        },
        create: {
            name: 'Toyota Yaris',
            status: 'INACTIVE',
            fuel_level: 43.0,
            odometer: 9865.4,
            latitude: -7.8013,
            longtitude: 110.3644,
            speed: 80.0,
        },
    });

    console.log('Seeding complete.');
    console.log({ vehicle1, vehicle2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });