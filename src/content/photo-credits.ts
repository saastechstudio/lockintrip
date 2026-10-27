/**
 * Crédits des photos tierces (Wikimedia Commons). Les licences CC BY et CC BY-SA imposent
 * de citer l'auteur, la licence et la source : cette liste alimente la page /credits-photos.
 */
export type PhotoCredit = { file: string; title: string; author: string; license: string; licenseUrl: string | null; source: string };

export const photoCredits: PhotoCredit[] = [
  { file: "/images/phuket/rawai-plage.jpg", title: "Phuket - Rawai Beach 11", author: "ADwarf", license: "Public domain", licenseUrl: null, source: "https://commons.wikimedia.org/wiki/File:Phuket_-_Rawai_Beach_11.jpg" },
  { file: "/images/phuket/rawai-longtail.jpg", title: "Rawai beach (3)", author: "Wolfgang Holzem", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Rawai_beach_(3).jpg" },
  { file: "/images/phuket/rawai-bateaux.jpg", title: "Rawai beach (20)", author: "Wolfgang Holzem", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Rawai_beach_(20).jpg" },
  { file: "/images/phuket/nai-harn-coucher.jpg", title: "Phuket - Nai Harn Beach 021", author: "ADwarf", license: "Public domain", licenseUrl: null, source: "https://commons.wikimedia.org/wiki/File:Phuket_-_Nai_Harn_Beach_021.jpg" },
  { file: "/images/phuket/nai-harn-soir.jpg", title: "Phuket - Nai Harn Beach 022", author: "ADwarf", license: "Public domain", licenseUrl: null, source: "https://commons.wikimedia.org/wiki/File:Phuket_-_Nai_Harn_Beach_022.jpg" },
  { file: "/images/phuket/nai-harn-silhouettes.jpg", title: "Phuket - Nai Harn Beach 020", author: "ADwarf", license: "Public domain", licenseUrl: null, source: "https://commons.wikimedia.org/wiki/File:Phuket_-_Nai_Harn_Beach_020.jpg" },
  { file: "/images/phuket/promthep.jpg", title: "Laem Phromthep in Phuket (5733622568)", author: "edwin.11", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Laem_Phromthep_in_Phuket_(5733622568).jpg" },
  { file: "/images/phuket/ya-nui.jpg", title: "Ya Nui beach", author: "Christophe95", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Ya_Nui_beach.jpg" },
  { file: "/images/phuket/phang-nga-longtail.jpg", title: "Karst landscape of Phang Nga Bay, Thailand", author: "Vyacheslav Argenberg", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Karst_landscape_of_Phang_Nga_Bay,_Thailand.jpg" },
  { file: "/images/phuket/phang-nga-rocher.jpg", title: "Emerald lagoon in Phang Nga Bay, Thailand", author: "Vyacheslav Argenberg", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Emerald_lagoon_in_Phang_Nga_Bay,_Thailand.jpg" },
  { file: "/images/phuket/phang-nga-james-bond.jpg", title: "Ko Tapu (James Bond) Island in Phang Nga Bay, Thailand", author: "Vyacheslav Argenberg", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.fr", source: "https://commons.wikimedia.org/wiki/File:Ko_Tapu_(James_Bond)_Island_in_Phang_Nga_Bay,_Thailand.jpg" },
];
