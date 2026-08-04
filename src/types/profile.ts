// Type para los datos del perfil
export type ProfileData = {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: "ADMIN" | "WAITER" | "KITCHEN";
    age: number;
    schedule: "MORNING" | "EVENING" | "FULL";
    createdAt: string;
}