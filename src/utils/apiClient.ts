const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData(endpoint: string) {
    try {
        console.log(`📡 Fetching: ${API_URL}/${endpoint}`);
        const response = await fetch(`${API_URL}/${endpoint}`);

        if (!response.ok) {
            throw new Error(`❌ Error al obtener ${endpoint}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error en fetchData:", error);
        throw error;
    }
}

export async function login(credentials: { email: string; password: string }) {
    try {
        console.log(`📡 Haciendo login en: ${API_URL}/auth/login`);
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error(`❌ Error en login: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error en login:", error);
        throw error;
    }
}
