"use client";
import { useLocale, useTranslations } from "next-intl";
import logo from "@/assets/nav.png";
import userImg from "@/assets/user.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBell, FaGlobe } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  //TODO: añadir la traducción
  const t = useTranslations("Auth");
  const router = useRouter();
  const currentLocale = useLocale();
  const pathname = usePathname();

  interface IUser {
    email: string;
    img: string;
    role: string;
    name: string;
  }

  const [user, setUser] = useState<IUser | null>(null);
  const [dropdownOpend, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpend);
  };

  useEffect(() => {
    // Recuperar usuario del localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parsear y guardar en el estado
    }
  }, []);

  const handleLogout = () => {
    //TODO: Implementación logica de token
    console.log("Cerrando sesión, eliminando token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Limpiar el estado del usuario
    setDropdownOpen(false); // Cerrar el menú
    router.push(`/`);
  };

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    // Utiliza el pathname obtenido con usePathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };


  return (
    <header className="top-0 bg-white shadow-md py-3 px-6 border-b border-gray-300">
      <div className="flex justify-between items-center">
        {/* Inicio Logo */}
        <div className="flex items-center">
          <Image src={logo} alt="ehr Logo" width={50} height={50} />
        </div>
        {/* Fin Logo */}

        {/* Inicio idiomas */}
        <div className="flex items-center space-x-6">
          <button className=" flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            
            {/* <span>{currentLocale === "en" ? "English" : "Español"}</span> */}
          </button>
          <FaGlobe className="text-lg" />
          <select
        value={currentLocale}
        onChange={handleLocaleChange}
        className="p-2 border rounded"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>

          {/* Fin idiomas */}

          {/* Inicio Notificaciones */}
          {/* <div className="relative">
            <FaBell className="text-lg text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div> */}
          {/* Fin Notificaciones */}

          {/* Inicio desplegable usuario */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              <Image
                src={userImg}
                alt="Usuario"
                width={35}
                height={35}
                className="rounded-full"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-start text-gray-500">{user?.role}</p>
              </div>
            </button>

            {/* inicio menu desplegable */}

            {dropdownOpend && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-900 hover:text-white rounded-t-lg"
                >
                  <span className="flex items-center justify-between">
                  {t("logout")} <RiLogoutBoxRLine className="text-md" />
                  </span>
                </button>
              </div>
            )}
            {/* fin menu desplegable */}
          </div>
          {/* Fin desplegable usuario */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
