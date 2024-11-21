import axios from "axios";

class HttpService {
  constructor() {
    if (!HttpService.instance) {
      const apiUrl = process.env.REACT_APP_BASE_API_URL;
      const token = localStorage.getItem("token") ?? "";
      this.axiosInstance = axios.create({
        baseURL: apiUrl,
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      this.axiosInstance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("authToken");
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      HttpService.instance = this;
    }

    return HttpService.instance;
  }

  async createCompany(companyData) {
    const response = await this.axiosInstance.post("Companies", companyData);
    return response.data;
  }

  async fetchCompanies(pageIndex = 0, pageSize = 6) {
    const response = await this.axiosInstance.get(
      `Companies?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
    return response.data; // Başarı durumunda veriyi döndür
  }

  async fetchCompaniesBySearch(pageIndex = 0, pageSize = 6, search) {
    const dynamicQuery = {
      sort: [
        {
          field: "name",
          dir: "asc",
        },
      ],
      filter: {
        field: "name",
        operator: "contains",
        value: search,
        logic: "or",
      },
    };
    const response = await this.axiosInstance.post(
      `Companies/GetList/ByDynamic?PageIndex=${pageIndex}&PageSize=${pageSize}`,
      dynamicQuery
    );
    return response.data; // Başarı durumunda veriyi döndür
  }

  async fetchCompaniesBySector(pageIndex = 0, pageSize = 6, sector) {
    const dynamicQuery = {
      sort: [
        {
          field: "name",
          dir: "asc",
        },
      ],
      filter: {
        field: "businessSector",
        operator: "eq",
        value: sector,
        logic: "or",
      },
    };
    const response = await this.axiosInstance.post(
      `Companies/GetList/ByDynamic?PageIndex=${pageIndex}&PageSize=${pageSize}`,
      dynamicQuery
    );
    return response.data; // Başarı durumunda veriyi döndür
  }

  async getUserProfile() {
    const response = await this.axiosInstance.get("Users/GetFromAuth");
    return response.data;
  }

  async updateUserProfile(userData) {
    const response = await this.axiosInstance.put("Users/FromAuth", userData);
    return response.data;
  }

  async getCompanyProfile() {
    try {
      const response = await this.axiosInstance.get("Companies/FromAuth");
      return response.data;
    } catch (e) {}
  }

  async updateCompanyProfile(updatedCompany) {
    const response = await this.axiosInstance.put(
      "Companies/FromAuth",
      updatedCompany
    );
    return response.data;
  }

  async getCompanyById(companyId) {
    const response = await this.axiosInstance.get(`Companies/${companyId}`);
    return response.data;
  }

  async sendEmail(emailObj) {
    try {
      const response = await this.axiosInstance.post("Contact", {
        ...emailObj,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

// Singleton örneği oluştur
const instance = new HttpService();
Object.freeze(instance); // Singleton deseni için dondur

export default instance;
