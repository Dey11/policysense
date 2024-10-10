import { atom } from "recoil";

export const langState = atom({
  key: "langState",
  default: {
    language: "English",
  },
});
