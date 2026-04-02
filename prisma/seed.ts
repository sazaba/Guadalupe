// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1. Encriptar la contraseña (nunca guardes texto plano)
  const hashedPassword = await bcrypt.hash('Medellin2026!', 10)

  // 2. Crear el usuario (o actualizarlo si ya existe el correo)
  const user = await prisma.user.upsert({
    where: { email: 'transcendent@admin.com' },
    update: {}, // Si existe, no hace nada
    create: {
      email: 'transcendent@admin.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN', // Asumiendo que definimos el Enum ADMIN en el schema
    },
  })

  console.log('✅ Usuario creado exitosamente:', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })