import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout exitoso" });
  
  // Esta es la clave: ordenamos borrar la cookie
  response.cookies.delete("auth_token");
  
  return response;
}