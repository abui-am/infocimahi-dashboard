import { prisma } from '../src/server/db';

async function main() {
  const id = 'infocimahi1033b600ty1ydho';
  await prisma.organization.upsert({
    where: {
      id,
    },
    create: {
      id,
      email: 'contact@infocimahi.co',
      name: 'INFOCIMAHI',
      image: '',
      facebook_url: 'https://www.facebook.com/infocimahi/',
      facebook_count: 37000,
      instagram_url: 'https://www.instagram.com/infocimahi.co/',
      instagram_count: 227000,
      twitter_url: 'https://twitter.com/infocimahico',
      twitter_count: 4000,
      youtube_url: 'https://www.youtube.com/channel/UCjF0_3pHDR6HmBb_q4nEeKw',
      youtube_count: 1000,
    },
    update: {},
  });

  await prisma.role.upsert({
    where: {
      idName: 'superadmin',
    },
    create: {
      idName: 'superadmin',
      name: 'Super Admin',
    },
    update: {
      idName: 'superadmin',
      name: 'Super Amin',
    },
  });

  await prisma.role.upsert({
    where: {
      idName: 'admin',
    },
    create: {
      idName: 'admin',
      name: 'Admin',
    },
    update: {
      idName: 'admin',
      name: 'Admin',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
