"use client";
import { fetchData } from "@/utils/apiClient";
import DataTable from "@/components/shared/DataTable";
import Title from "@/components/shared/Title";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Reporting = () => {
  const t = useTranslations("Reporting");
  const [data, setData] = useState([]);
  const columns = [
    { header: "Fecha", accessor: "date" },
    { header: "Locación", accessor: "location" },
    { header: "Total Pagado", accessor: "total-amount-paid" },
    { header: "Total Vehiculos", accessor: "total-vehicles" },
  ];
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locations = await fetchData("reporting");
        setData(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    loadLocations();
  }, []);
  return (
    <div className="p-4 lg:p-8">
      <Title text={t("title")} />
      <DataTable columns={columns} data={data} type="tb2"/>
    </div>
  );
};

export default Reporting;
