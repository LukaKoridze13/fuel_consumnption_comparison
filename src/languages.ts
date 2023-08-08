const languages: Languages = {
  ge: {
    changeTheme: "შეცვალე ფერები",
    chooseYear: "აირჩიე წელი",
    chooseManufacturer: "აირჩიე მწარმოებელი",
    chooseModel: "აირჩიე მოდელი",
    chooseOptions: "აირჩიე ოფციები",
    noOptionsMessage: "ვერაფერი მოიძებნა",
    averageInCity: "წვა ქალაქში 100კმ-ზე",
    averageOnHighway: "წვა ავტობანზე 100კმ-ზე",
    averageGeneral: "წვა 100კმ-ზე",
    costPer1000km: "ხარჯი 1000კმ-ზე",
    liters: "ლიტრი",
    currency: { name: "₾არი", value: 1 },
  },
  eng: {
    changeTheme: "Change theme",
    chooseYear: "Choose year",
    chooseManufacturer: "Choose manufacturer",
    chooseModel: "Choose model",
    chooseOptions: "Choose options",
    noOptionsMessage: "Nothing found",
    averageInCity: "L/100km in city",
    averageOnHighway: "L/100km on highway",
    averageGeneral: "L/100km",
    costPer1000km: "Cost per 1000km",
    liters: "Liters",
    currency: { name: "$", value: 0.38 },

  },
};

type Languages = {
  [key: string]: {
    changeTheme: string;
    chooseYear: string;
    chooseManufacturer: string;
    chooseModel: string;
    chooseOptions: string;
    noOptionsMessage: string;
    averageInCity: string;
    averageOnHighway: string;
    averageGeneral: string;
    costPer1000km: string;
    liters: string;
    currency: { name: string; value: number };
  };
};

export default languages;
