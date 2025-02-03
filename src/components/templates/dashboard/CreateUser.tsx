"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Title from "@/components/shared/Title";

type UserData = {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
  roleId: string;
  gender?: string;
  dob?: string;
  emergencyContact?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  primaryCarePhysician?: string;
};

const CreateUser = () => {
  const t = useTranslations("CreateUser");
  const router = useRouter();

  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<UserData>();

  // Obtiene el rol seleccionado en tiempo real
  const selectedRole = watch("roleId");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/roles`;
        console.log("📡 Fetching roles from:", apiUrl);

        const response = await fetch(apiUrl, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("🔄 Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Error al obtener roles: ${response.status} ${response.statusText}`);
        }

        const rolesData = await response.json();
        console.log("📋 Roles obtenidos:", rolesData);

        setRoles(rolesData);
      } catch (error) {
        console.error("❌ Error cargando roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró token de autenticación");
      return;
    }

    setIsSubmitting(true);

    const userData = {
      name: data.name,
      lastName: data.lastName || null,
      email: data.email,
      password: data.password,
      address: data.address?.trim() || null,
      phone: data.phone?.trim() || null,
      roleId: data.roleId,
      gender: selectedRole === roles.find(role => role.name === "Patient")?.id ? data.gender || null : null,
      dob: selectedRole === roles.find(role => role.name === "Patient")?.id ? data.dob || null : null,
      emergencyContact: selectedRole === roles.find(role => role.name === "Patient")?.id ? data.emergencyContact || null : null,
      insuranceProvider: selectedRole === roles.find(role => role.name === "Patient")?.id ? data.insuranceProvider || null : null,
      insurancePolicyNumber: selectedRole === roles.find(role => role.name === "Patient")?.id ? data.insurancePolicyNumber || null : null,
      primaryCarePhysician: selectedRole === roles.find(role => role.name === "Patient")?.id ? data.primaryCarePhysician || null : null,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }

      alert("Usuario creado con éxito ✅");
      reset();
      router.push("/dashboard/user-settings");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al crear el usuario ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <Title text={t("title")} />
      <div className="bg-zinc-100 rounded-xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block font-bold">{t("name")}</label>
            <input {...register("name", { required: "El nombre es obligatorio" })} className="border-gray-300 rounded-lg w-full p-2" type="text" disabled={isSubmitting} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Rol */}
          <div>
            <label className="block font-bold">{t("role")}</label>
            <select {...register("roleId", { required: "El rol es obligatorio" })} className="border-gray-300 rounded-lg w-full p-2" disabled={isSubmitting}>
              <option value="">Seleccionar rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && <p className="text-red-500 text-sm">{errors.roleId.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold">{t("email")}</label>
            <input {...register("email", { required: "El email es obligatorio" })} className="border-gray-300 rounded-lg w-full p-2" type="email" disabled={isSubmitting} />
          </div>

          {/* Password */}
          <div>
            <label className="block font-bold">{t("password")}</label>
            <input {...register("password", { required: "La contraseña es obligatoria" })} className="border-gray-300 rounded-lg w-full p-2" type="password" disabled={isSubmitting} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-bold">{t("confirmPassword")}</label>
            <input {...register("confirmPassword", { required: "Confirma tu contraseña" })} className="border-gray-300 rounded-lg w-full p-2" type="password" disabled={isSubmitting} />
          </div>

          {/* Campos adicionales solo si es paciente */}
          {selectedRole === roles.find(role => role.name === "Patient")?.id && (
            <>
              <div>
                <label className="block font-bold">Género</label>
                <select {...register("gender")} className="border-gray-300 rounded-lg w-full p-2">
                  <option value="">Seleccionar género</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </>
          )}

          {/* Botón de Enviar */}
          <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded-lg w-full disabled:opacity-50" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear usuario"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
