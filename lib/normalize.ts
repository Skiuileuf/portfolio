export const NormalizeUnicodeString = (e:string) => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");