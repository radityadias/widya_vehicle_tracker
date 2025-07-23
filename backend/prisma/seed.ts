import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');
    const vehicle1 = await prisma.vehicle.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Truck Alpha',
            status: 'ACTIVE',
            fuel_level: 75.5,
            odometer: 123456.7,
            latitude: -7.7956,
            longtitude: 110.3695,
            speed: 60.5,
        },
    });

    const vehicle2 = await prisma.vehicle.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Car Beta',
            status: 'INACTIVE',
            fuel_level: 20.0,
            odometer: 98765.4,
            latitude: -7.8013,
            longtitude: 110.3644,
            speed: 90.0,
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