/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Item } from "../types/item.interface";
import { toast } from "react-toastify";

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
    item: Item,
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

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token_matx");
  if (!token) throw new Error("Token not found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

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

    const res = await fetch(`/api/${section}${query}`, {
      // headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to fetch items (${res.status}): ${text || res.statusText}`
      );
    }

    // Если пустой ответ (например, 204 No Content) — вернём пустой массив
    const text = await res.text();
    if (!text.trim()) {
      return [];
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      if (err) {
        throw new Error(`Invalid JSON in response: ${text}`);
      }
    }

    const itemsArray: Item[] = Array.isArray(data) ? data : [data];

    set((state) => {
      const currentData = state.items[section];
      if (JSON.stringify(currentData) === JSON.stringify(itemsArray)) {
        return state;
      }
      return {
        items: {
          ...state.items,
          [section]: itemsArray,
        },
      };
    });

    return itemsArray;
  },

  fetchItemById: async (section, id, params) => {
    const query = buildQuery(params);

    const res = await fetch(`/api/${section}/${id}${query}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch item by id: ${res.statusText}`);
    }

    const data: Item = await res.json();

    set((state) => {
      const items = state.items[section] ?? [];
      const idx = items.findIndex((i) => i.id === data.id);

      let newItems: Item[];
      if (idx === -1) {
        newItems = [...items, data];
      } else {
        newItems = [...items];
        newItems[idx] = data;
      }

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

    const res = await fetch(`/api/${section}${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeaders(), // если используешь авторизацию
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      throw new Error(`Failed to create item: ${res.statusText}`);
    }

    await get().fetchItems(section, params);
  },

  updateItem: async (section, item, params) => {
    const query = buildQuery(params);

    const res = await fetch(`/api/${section}/${item.id}${query}`, {
      method: "PUT",
      // headers: getAuthHeaders(),
      headers: {
        // ...getAuthHeaders(),
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

    const res = await fetch(`/api/${section}/${id}${query}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.message) {
      toast.success(data.message);
    }

    if (!res.ok) {
      throw new Error(`Failed to delete item: ${res.statusText}`);
    }

    await get().fetchItems(section, params);
  },

  uploadFile: async (section: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/${section}`, {
      method: "POST",
      body: formData,
      // headers: getAuthHeaders(), // если нужна авторизация
    });

    const data = await res.text();

    if (!res.ok) {
      toast.warn(data);
    } else {
      toast.success(data);
    }

    return data;
  },

  removeFile: async (section: string) => {
    const res = await fetch(`/api/${section}`, {
      method: "DELETE",
      // headers: getAuthHeaders(), // если нужна авторизация
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to remove file");
    }

    return "File removed";
  },
}));
