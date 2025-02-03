"use client";
import DataTable from "@/components/shared/DataTable";
import Title from "@/components/shared/Title";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

// Define la interfaz que represente a una institución (usuario con rol Institution)
interface Institution {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  email: string;
  // otros campos si los requieres...
}

const InstitutionSettings = () => {
  const t = useTranslations("InstitutionSettings");
  const [data, setData] = useState<Institution[]>([]);

  // Define las columnas que quieres mostrar en la tabla.
  // Por ejemplo: Nombre, Dirección, Teléfono y Email.
  const columns = [
    { header: t("name"), accessor: "name" },
    { header: t("address"), accessor: "address" },
    { header: t("phone"), accessor: "phone" },
    { header: t("email"), accessor: "email" },
  ];

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        const roleParam = "Institution";
        const token = localStorage.getItem("token");


console.log("📌 Token obtenido:", token); // Agregar este log

        // Envía el parámetro role como query parameter a la URL de la API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/role/${encodeURIComponent(roleParam)}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch institutions");
        }
        const institutions = await response.json();

        // Formatea la data para que coincida con los accesores de la tabla
        const formattedData = institutions.map((inst: any) => ({
          name: inst.name,
          address: inst.address || "-",
          phone: inst.phone || "-",
          email: inst.email,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    loadInstitutions();
  }, []);

  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between items-center">
        <Title text={t("title")} />
        <Link
          href={`./location-settings/create-location`}
          className="mr-10 underline"
        >
          {t("btn-create")}
        </Link>
      </div>

      <DataTable columns={columns} data={data} type="tb3" />
    </div>
  );
};

export default InstitutionSettings;
