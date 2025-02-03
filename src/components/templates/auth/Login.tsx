"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/hand.png";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { login } from "@/utils/apiClient";

const Login = () => {
  const t = useTranslations("Auth");
  const currentLocale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname(); // Obtener la ruta actual sin el dominio

  // Función para cambiar el idioma. Se navega a la ruta raíz con el nuevo locale.
  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    // Si la página actual depende del locale en la ruta, se puede redirigir preservando la ruta
    // Por ejemplo, si la ruta es "/[locale]/login" se puede hacer:
    const pathWithoutLocale = pathname.replace(/^\/(es|en)/, "");
    
    // Redirigir manteniendo la ruta actual pero con el nuevo idioma
    router.push(`/${newLocale}${pathWithoutLocale}`);

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password });
      console.log("✅ Usuario autenticado:", userData);

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));

      // Redirigir al dashboard
      router.push(`/${currentLocale}/dashboard/user-settings`);
  } catch (error) {
      setError("Error en el login. Verifica tus credenciales.");
  }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header con selector de idioma */}
      

      {/* Contenido principal */}
      <div className="flex flex-1">
        
        {/* Panel izquierdo (solo en pantallas grandes) */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-b from-primary to-secondary flex-col justify-center items-center text-white p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-black text-2xl font-bold px-4 py-2 rounded-md">
              <Image src={logo} width={150} height={150} alt="login" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">{t("welcome")}</h1>
          <p className="text-center text-lg max-w-md">{t("description")}</p>
        </div>

        {/* Panel derecho (formulario de login) */}
        <div className="lg:bg-gradient-to-r lg:from-white lg:to-white bg-gradient-to-b from-primary to-secondary flex-1 flex flex-col lg:justify-center justify-around items-center lg:p-8 p-4">
        <header className="p-8 flex justify-end">
        <select
          value={currentLocale}
          onChange={handleLocaleChange}
          className="p-2 border rounded"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </header>
          <div className="lg:hidden">
            <Image src={logo} width={120} height={120} alt="White Logo" />
          </div>
          <div className="w-full max-w-md bg-white lg:p-0 p-8 rounded-2xl">
            <h2 className="lg:text-2xl text-lg font-bold text-center mb-4 uppercase">
              {t("login")}
            </h2>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <span className="absolute left-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <path
                        strokeLinejoin="round"
                        d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                      ></path>
                      <circle cx={12} cy={7} r={3}></circle>
                    </g>
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email")}
                  className="outline-none ml-8 w-[90%]"
                  required
                />
              </div>

              <div className="relative w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                <span className="absolute left-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="11" width="16" height="11" rx="2" ry="2"></rect>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("password")}
                  className="outline-none ml-8 w-[90%]"
                  required
                />
              </div>
              {/* <p className="text-center text-gray-600 mt-4">
                <a href="#" className="text-primary underline">
                  {t("forgot password")}
                </a>
              </p> */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {t("login")}
              </button>
            </form>
            {/* <p className="text-center text-gray-600 mt-4">
              <Link href="/" className="text-primary underline">
                {t("user_registration")}
              </Link>
            </p> */}
          </div>
          <div className="lg:hidden text-center">
            <h1 className="text-xl font-bold mb-4 text-white">{t("welcome")}</h1>
            <p className="text-sm max-w-md text-white font-medium">
              {t("description_mobile")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
