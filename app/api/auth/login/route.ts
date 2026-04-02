// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Buscar usuario en base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // 2. Comparar la contraseña con el hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // 3. Crear el Token (JWT)
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" } // Dura 1 día
    );

    // 4. Crear la respuesta y guardar la cookie
    const response = NextResponse.json({
      message: "Login exitoso",
      user: { name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true, // No accesible desde JS del navegador (seguridad)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 1 día en segundos
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}