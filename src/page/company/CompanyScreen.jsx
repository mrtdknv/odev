import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CompanyCard from "../../components/companycard/CompanyCard";
import HttpService from "../../services/HttpService";
import FilterSearch from "../../components/filters/FilterSeearch";
import Filters from "../../components/filters/Filters";

function CompanyScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState({
    items: [],
    size: 0,
    index: 0,
    count: 0,
    pages: 0,
    hasPrevious: false,
    hasNext: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const sectors = [
    "Danışmanlık",
    "Eğitim",
    "Eğlence",
    "Emlak",
    "Enerji",
    "Finans",
    "Hukuk Hizmetleri",
    "İnşaat",
    "Pazarlama",
    "Perakende",
    "Sağlık",
    "Taşımacılık",
    "Teknoloji",
    "Telekomünikasyon",
    "Üretim",
    "Yazılım",
    "Yiyecek ve İçecek"
  ];

  const fetchCompanies = async (page) => {
    try {
      const result = await HttpService.fetchCompanies(page, 6);
      setCompanies(result);
    } catch (err) {
      setError(err.message || "An error occurred while fetching companies");
    }
  };

  const fetchCompaniesBySearch = async (search) => {
    const response = await HttpService.fetchCompaniesBySearch(0, 6, search);
    setCompanies(response);
  };

  const fetchCompaniesBySector = async (sector) => {
    const response = await HttpService.fetchCompaniesBySector(0, 6, sector);
    setCompanies(response);
  };

  useEffect(() => {
    fetchCompanies(currentPage).catch();
  }, [dispatch, currentPage]);

  const handleNext = () => {
    if (companies.hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (companies.hasPrevious) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value === "") {
      fetchCompanies(currentPage).catch();
    }
    if (value.trim() !== "") {
      fetchCompaniesBySearch(value).catch();
    }
  };

  const handleSectorChange = (value) => {
    setSelectedSector(value);
    if (value.trim() === "") {
      fetchCompanies(currentPage).catch();
      return;
    }
    fetchCompaniesBySector(value).catch();
  };

  const renderPageNumbers = () => {
    const pages = Array.from({ length: companies.pages }, (_, i) => i);
    return pages.map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`relative w-5 h-5 md:w-10 md:h-10 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase ${
          currentPage === page
            ? "bg-primary text-white"
            : "text-gray-900 hover:bg-gray-900/10"
        }`}
        type="button"
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {page + 1}
        </span>
      </button>
    ));
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-between m-8 w-full max-w-6xl">
        <Filters
          value={selectedSector}
          onChange={(event) => handleSectorChange(event.target.value)}
          options={sectors}
          placeholder={t("selectsector")}
        />
        <FilterSearch
          value={searchQuery}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder={t("searchforcompany")}
        />
      </div>
      {/* Şirket Kartları */}
      <div className="grid grid-cols-1 ml- mr-6 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-6xl justify-items-center">
        {companies.items.map((company, index) => (
          <CompanyCard key={index} company={company} loading={loading} />
        ))}
      </div>

      {/* Sayfalandırma */}
      <div className="flex justify-center gap-4">
        <button
          disabled={!companies.hasPrevious}
          onClick={handlePrevious}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 font-sans text-xs font-bold text-center text-red-800 uppercase align-middle transition-all rounded-full select-none hover:bg-red-900/10 active:bg-red-800/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          {t("PreviousPage")}
        </button>

        <div className="flex items-center gap-2">{renderPageNumbers()}</div>

        <button
          disabled={!companies.hasNext}
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 font-sans text-xs font-bold text-center text-red-800 uppercase align-middle transition-all rounded-full select-none hover:bg-red-900/10 active:bg-red-800/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          {t("nextpage")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CompanyScreen;
