/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://62.169.23.81:8080/';
const normalizeUrl = (url: string) => url.replace(/\/+$/, '');
const API_BASE = normalizeUrl(API_BASE_URL);

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const cleanEndpoint = endpoint.replace(/^\//, '');
  const fullUrl = `${API_BASE}/${cleanEndpoint}`;
  const response = await fetch(fullUrl, options);
  return response;
};

export interface License {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  organizationIssued: string;
  date: string | null;
  dateOfExpiry: string | null;
  expiryReminder?: string;
  active: boolean;
  fileURLs: string[];
  [key: string]: any;
}

type LicenseStore = {
  items: Record<string, License[]>;
  setItems: (section: string, items: License[]) => void;

  fetchItems: (
      section: string,
      params?: Record<string, any>
  ) => Promise<License[]>;
  fetchItemById: (
      section: string,
      id: string,
      params?: Record<string, any>
  ) => Promise<License>;
  createItem: (
      section: string,
      item: Omit<License, "id" | "createdAt" | "updatedAt">,
      params?: Record<string, any>
  ) => Promise<License>;
  updateItem: (
      section: string,
      item: License,
      params?: Record<string, any>
  ) => Promise<void>;
  deleteItem: (
      section: string,
      id: string,
      params?: Record<string, any>
  ) => Promise<void>;

  uploadFile: (section: string, id: string, files: File[]) => Promise<License>;
  removeFile: (
      section: string,
      id: string,
      fileName: string
  ) => Promise<string>;
};

// const getAuthHeaders = (): HeadersInit => {
//   const token = localStorage.getItem("token_matx");
//   if (!token) throw new Error("Token not found");
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };

const buildQuery = (params?: Record<string, any>) => {
  if (!params) return "";
  return "?" + new URLSearchParams(params as Record<string, string>).toString();
};

export const useLicenseStore = create<LicenseStore>((set, get) => ({
  items: {},

  setItems: (section, items) =>
      set((state) => ({ items: { ...state.items, [section]: items } })),

  fetchItems: async (section, params) => {
    const query = buildQuery(params);
    const res = await apiCall(`api/${section}/license${query}`); // Используем apiCall

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
          `Failed to fetch items (${res.status}): ${text || res.statusText}`
      );
    }

    const text = await res.text();
    if (!text.trim()) return [];

    let data: License[];
    try {
      const parsed = JSON.parse(text);
      data = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      throw new Error(`Invalid JSON in response: ${text}`);
    }

    set((state) => ({ items: { ...state.items, [section]: data } }));
    return data;
  },

  fetchItemById: async (section, id, params) => {
    const query = buildQuery(params);
    const res = await apiCall(`api/${section}/license/${id}${query}`); // Используем apiCall

    if (!res.ok) throw new Error(`Failed to fetch item: ${res.statusText}`);

    const data: License = await res.json();

    set((state) => {
      const items = state.items[section] ?? [];
      const idx = items.findIndex((i) => i.id === data.id);
      const newItems =
          idx === -1
              ? [...items, data]
              : items.map((i) => (i.id === data.id ? data : i));
      return { items: { ...state.items, [section]: newItems } };
    });

    return data;
  },

  createItem: async (section, item, params) => {
    const query = buildQuery(params);
    const res = await apiCall(`api/${section}/license${query}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create item: ${text || res.statusText}`);
    }

    const data: License = await res.json();

    set((state) => ({
      items: {
        ...state.items,
        [section]: [...(state.items[section] ?? []), data],
      },
    }));

    return data;
  },

  updateItem: async (section, item, params) => {
    const query = buildQuery(params);
    const res = await apiCall(`api/${section}/license/${item.id}${query}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!res.ok) throw new Error(`Failed to update item: ${res.statusText}`);
    await get().fetchItems(section, params);
  },

  deleteItem: async (section, id, params) => {
    const query = buildQuery(params);
    const res = await apiCall(`api/${section}/license/${id}${query}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`Failed to delete item: ${res.statusText}`);

    let data: any = null;
    if (res.status !== 204) {
      data = await res.json();
    }

    if (data?.message) toast.success(data.message);

    await get().fetchItems(section, params);
  },

  uploadFile: async (section: string, id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await apiCall(`api/${section}/license/${id}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      toast.warn(text);
      throw new Error(text);
    }

    const updatedLicense: License = await res.json();

    useLicenseStore.setState((state) => {
      const items = state.items[section] ?? [];
      const idx = items.findIndex((i) => i.id === updatedLicense.id);
      const newItems =
          idx === -1
              ? [...items, updatedLicense]
              : items.map((i) => (i.id === updatedLicense.id ? updatedLicense : i));
      return { items: { ...state.items, [section]: newItems } };
    });

    return updatedLicense;
  },

  removeFile: async (section, id, fileName) => {
    const res = await apiCall(`api/${section}/licenses/${id}/${fileName}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to remove file");
    }

    set((state) => {
      const sectionItems = state.items[section] || [];
      const updatedItems = sectionItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            fileURLs: item.fileURLs.filter((f: string) => f !== fileName),
          };
        }
        return item;
      });
      return { items: { ...state.items, [section]: updatedItems } };
    });

    return "File removed";
  },
}));