/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Item } from "../types/item.interface";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://62.169.23.81:8080/";
const normalizeUrl = (url: string) => url.replace(/\/+$/, "");
const API_BASE = normalizeUrl(API_BASE_URL);

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const fullUrl = `${API_BASE}/${cleanEndpoint}`;
  const response = await fetch(fullUrl, options);
  return response;
};

type SidebarState = {
  items: Record<string, Item[]>;
  setItems: (section: string, items: Item[]) => void;
  fetchItems: (
    section: string,
    params?: Record<string, any>
  ) => Promise<Item[]>;
  fetchItemById: (
    section: string,
    id: string,
    params?: Record<string, any>
  ) => Promise<Item>;
  createItem: (
    section: string,
    item: Omit<Item, "id">,
    params?: Record<string, any>
  ) => Promise<void>;
  updateItem: (
    section: string,
    id: string,
    item: Partial<Item>, // или Omit<Item, "id">
    params?: Record<string, any>
  ) => Promise<void>;
  deleteItem: (
    section: string,
    id: string,
    params?: Record<string, any>
  ) => Promise<void>;
  uploadFile: (section: string, file: File) => Promise<string>;
  removeFile: (section: string) => Promise<string>;
};

// const getAuthHeaders = (): HeadersInit => {
//   const token = localStorage.getItem("token_sane_erp");
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

export const useDynamicFetchStore = create<SidebarState>((set, get) => ({
  items: {},

  setItems: (section, items) =>
    set((state) => ({
      items: {
        ...state.items,
        [section]: items,
      },
    })),

  fetchItems: async (section, params) => {
    const query = buildQuery(params);

    const res = await apiCall(`api/${section}${query}`);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to fetch items (${res.status}): ${text || res.statusText}`
      );
    }

    const text = await res.text();
    if (!text.trim()) return [];

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON in response: ${text}`);
    }

    const itemsArray: Item[] = Array.isArray(data) ? data : [data];

    set((state) => ({
      items: {
        ...state.items,
        [section]: itemsArray,
      },
    }));

    return itemsArray;
  },

  fetchItemById: async (section, id, params) => {
    const query = buildQuery(params);

    const res = await apiCall(`api/${section}/${id}${query}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch item by id: ${res.statusText}`);
    }

    const data: Item = await res.json();

    set((state) => {
      const items = state.items[section] ?? [];
      const idx = items.findIndex((i) => i.id === data.id);

      const newItems =
        idx === -1
          ? [...items, data]
          : items.map((i, index) => (index === idx ? data : i));

      return {
        items: {
          ...state.items,
          [section]: newItems,
        },
      };
    });

    return data;
  },

  createItem: async (section, item, params) => {
    const query = buildQuery(params);

    const res = await apiCall(`api/${section}${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error(`Failed to create item: ${res.statusText}`);
    }

    await get().fetchItems(section, params);
  },

  updateItem: async (section, id, item, params) => {
    const query = buildQuery(params);

    const res = await apiCall(`api/${section}/${id}${query}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error(`Failed to update item: ${res.statusText}`);
    }

    await get().fetchItems(section, params);
  },

  deleteItem: async (section, id, params) => {
    const query = buildQuery(params);

    const res = await apiCall(`api/${section}/${id}${query}`, {
      method: "DELETE",
      // headers: getAuthHeaders(),
    });

    if (res.ok) {
      if (res.status === 204) {
        toast.success("Item deleted successfully");
      } else {
        const data = await res.json().catch(() => null);
        if (data?.message) toast.success(data.message);
      }
    } else {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to delete item (${res.status}): ${text || res.statusText}`
      );
    }

    await get().fetchItems(section, params);
  },

  uploadFile: async (section, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiCall(`api/${section}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.text();

    if (!res.ok) {
      toast.warn(data);
    } else {
      toast.success(data);
    }

    return data;
  },

  removeFile: async (section) => {
    const res = await apiCall(`api/${section}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to remove file");
    }

    return "File removed";
  },
}));
