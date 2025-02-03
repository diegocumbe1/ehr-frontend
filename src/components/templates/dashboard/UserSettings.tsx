"use client";
import { fetchData } from "@/utils/apiClient";
import DataTable from "@/components/shared/DataTable";
import Title from "@/components/shared/Title";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
interface User {
  id: string;
  name: string;
  lastName: string;
  phone: string | null;
  // ...otros campos
  role: {
    id: string;
    name: string;
    description: string;
  } | null;
}


const UserSettings = () => {
  const t = useTranslations("UserSettings");
  const [data, setData] = useState([]);
  const columns = [
    { header: `${t("Name")}`, accessor: "name" },
    { header:`${t("Last Name")}`, accessor: "lastName" },
    { header:`${t("Phone")}`, accessor: "phone" },
    { header:`${t("Role")}`, accessor: (row: User) => row.role ? row.role.name : "-" },
  ];
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locations = await fetchData("users");

        console.log('aqui suers , users',locations)
        setData(locations);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadLocations();
  }, []);
  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between items-center">
        <Title text={t("title")} />
        <Link href={`./user-settings/create-user`} className="mr-10 underline">
        {t("create-user")}
        </Link>
      </div>
      <DataTable columns={columns} data={data} type="tb3" />
    </div>
  );
};

export default UserSettings;
