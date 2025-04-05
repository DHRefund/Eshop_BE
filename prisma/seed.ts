import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  //   Xóa dữ liệu cũ nếu cần thiết
  //   await prisma.user.deleteMany({
  //     where: {
  //       email: {
  //         in: ['user@example.com', 'admin@example.com'],
  //       },
  //     },
  //   });

  // Tạo user thông thường
  const regularUser = await prisma.user.create({
    data: {
      name: 'Người dùng',
      email: 'user@gmail.com',
      password: await bcrypt.hash('123456', saltRounds),
      role: 'USER',
    },
  });
  // Tạo user thông thường
  const regularUser2 = await prisma.user.create({
    data: {
      name: 'Người dùng 2',
      email: 'namtran@gmail.com',
      password: await bcrypt.hash('123456', saltRounds),
      role: 'USER',
    },
  });

  console.log('Đã tạo user thông thường:', regularUser);

  // Tạo user admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Quản trị viên',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('123456', saltRounds),
      role: 'ADMIN',
    },
  });
  // Tạo user admin
  const adminUser2 = await prisma.user.create({
    data: {
      name: 'Quản trị viên 2',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', saltRounds),
      role: 'ADMIN',
    },
  });

  console.log('Đã tạo user admin:', adminUser);
}

main()
  .catch((e) => {
    console.error('Lỗi khi tạo seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
