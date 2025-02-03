"use client";
import Title from "@/components/shared/Title";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLE_ID_INSTITUTION = "336f0829-b4a2-480c-897e-794108f03a2f"; // UUID del rol Institution

type UserData = {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
};

const CreateInstitution = () => {
  const t = useTranslations("CreateInstitution");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el loader y deshabilitar el botón

  const {
    register,
    handleSubmit,
    reset, // Para limpiar los campos después de enviar el formulario
    formState: { errors },
  } = useForm<UserData>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No se encontró token de autenticación");
      return;
    }

    setIsSubmitting(true); // Activar loader y deshabilitar botón

    const transformedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address?.trim() || null,
      phone: data.phone?.trim() || null,
      roleId: ROLE_ID_INSTITUTION,
    };

    try {


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la institución");
      }

      alert("Institución creada con éxito ✅");
      reset(); // Limpiar los campos después del éxito
      router.push("/dashboard/user-settings"); // Redirigir al listado
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al crear la institución ❌");
    } finally {
      setIsSubmitting(false); // Desactivar loader y habilitar el botón
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <Title text={t("title")} />
      <div className="bg-zinc-100 rounded-xl mb-10 p-6">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <br />
          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-black font-bold">{t("name")}</label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="border-gray-300 rounded-xl w-full py-2 px-4 text-black"
              type="text"
              placeholder={t("name")}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-black font-bold">{t("email")}</label>
            <input
              {...register("email", { required: "El correo es obligatorio" })}
              className="border-gray-300 rounded-xl w-full py-2 px-4 text-black"
              type="email"
              placeholder={t("email")}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Contraseña con botón de mostrar/ocultar */}
          <div className="mb-6 relative">
            <label className="block text-black font-bold">{t("password")}</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                })}
                className="border-gray-300 rounded-xl w-full py-2 px-4 text-black pr-10"
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={togglePasswordVisibility}
                disabled={isSubmitting}
              >
                {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Dirección */}
          <div className="mb-6">
            <label className="block text-black font-bold">{t("address")}</label>
            <input
              {...register("address")}
              className="border-gray-300 rounded-xl w-full py-2 px-4 text-black"
              type="text"
              placeholder={t("address")}
              disabled={isSubmitting}
            />
          </div>

          {/* Teléfono */}
          <div className="mb-6">
            <label className="block text-black font-bold">{t("phone")}</label>
            <input
              {...register("phone")}
              className="border-gray-300 rounded-xl w-full py-2 px-4 text-black"
              type="text"
              placeholder={t("phone")}
              disabled={isSubmitting}
            />
          </div>

          {/* Botón de enviar con loader */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={`shadow bg-[#441893] hover:bg-[#5821bf] text-white font-bold py-2 px-4 rounded-full w-48 transition-all duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : t("CreateInstitution")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInstitution;
