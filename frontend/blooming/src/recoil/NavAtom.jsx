import { atom, selector } from "recoil";

export const navState = atom({
  key: "navState",
  default: "",
});

export const localStorageNavState = selector({
  key: "localStorageNavState",
  get: ({ get }) => {
    const storedTab = localStorage.getItem("activeTab") || get(navState);
    return storedTab;
  },
  set: ({ set }, newValue) => {
    localStorage.setItem("activeTab", newValue);
    set(navState, newValue);
  },
});
