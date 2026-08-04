// Importamos zod
import { z } from "zod";

// Schema para el formulario de login
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address format." })
    .toLowerCase(), 
    
  password: z.string()
    .min(1, { message: "Password is required." }) 
});

// Schema para el formulario de forgot password
export const forgotPasswordSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address format." }),
});

// Schema para el input del token de verificación
export const tokenSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address format." }),
  token: z.string()
    .trim()
    .length(6, { message: "The verification code must be 6 digits long." })
    .regex(/^\d+$/, { message: "The verification code must contain only numbers." }),
});

// Schema para validar el reset password
export const resetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    token: z.string().min(6, "Invalid token"),
    password: z
      .string()
      .min(1, "Password is required") 
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    repeatPassword: z
      .string()
      .min(1, "Confirm password is required")
  })
  .refine((data) => {
    // Si cualquiera de los dos está vacío, no disparamos el "don't match" 
    if (!data.password || !data.repeatPassword) return true;
    
    // Si ambos tienen contenido, validamos que sean iguales
    return data.password === data.repeatPassword;
  }, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
  });