import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs' // Usamos bcryptjs para encriptar la contraseña

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando inyección de usuario administrador...')

  // 1. Encriptamos la contraseña por seguridad (nunca se guarda en texto plano)
  const hashedPassword = await bcrypt.hash('Guadalupe2026', 10)

  // 2. Inyectamos (o actualizamos) el usuario en la base de datos
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@guadalupe.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@guadalupe.com',
      password: hashedPassword,
      name: 'Admin Guadalupe',
      role: 'ADMIN', // Asumiendo que tu esquema tiene este campo. Si te da error, bórralo.
    },
  })

  console.log('¡Magia completada! 🪄')
  console.log('Usuario creado:', adminUser.email)
}

main()
  .catch((e) => {
    console.error('Error al inyectar el usuario:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })