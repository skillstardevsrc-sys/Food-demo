export const PRODUCTS = [
  {
    id: "serum-01",
    name: "Luminous Vitamin C Serum",
    highlight: "Luminous Radiance",
    subtitle: "Brightening & Hydrating • 50ml",
    series: "Botanical Elixir Series No. 01",
    price: 68,
    oldPrice: 85,
    discountTag: "SAVE 20%",
    image: "/assets/images/serum.png",
    description: "Formulated with cold-pressed bio-active vitamin C, organic seabuckthorn berry, and wild rosehip oil to deeply nourish, repair skin barrier, and impart an effortless warm golden glow.",
    specs: [
      { label: "98% Hydration", sub: "24-Hour Lock", icon: "fa-droplet" },
      { label: "15% Active Vit C", sub: "Cold-Stabilized", icon: "fa-sun" },
      { label: "100% Organic", sub: "Clean Certified", icon: "fa-leaf" }
    ]
  },
  {
    id: "cream-02",
    name: "Velvet Silk Moisture Cream",
    highlight: "Velvet Silk Touch",
    subtitle: "Firming & Nourishing • 60g",
    series: "Botanical Elixir Series No. 02",
    price: 82,
    oldPrice: 98,
    discountTag: "SAVE 16%",
    image: "/assets/images/cream.png",
    description: "A rich, cloud-whipped moisturizer infused with copper peptides, ceramides, and orange blossom butter for intense barrier restoration and supple texture.",
    specs: [
      { label: "72H Barrier Lock", sub: "Deep Hydration", icon: "fa-droplet" },
      { label: "Triple Peptides", sub: "Firming Matrix", icon: "fa-shield-halved" },
      { label: "Derm Approved", sub: "Sensitive Safe", icon: "fa-circle-check" }
    ]
  },
  {
    id: "oil-03",
    name: "Botanical Elixir Radiance Oil",
    highlight: "Botanical Amber Glow",
    subtitle: "Smoothing & Restorative • 30ml",
    series: "Botanical Elixir Series No. 03",
    price: 74,
    oldPrice: 90,
    discountTag: "SAVE 18%",
    image: "/assets/images/oil.png",
    description: "An ultra-lightweight golden elixir combining cold-pressed bakuchiol, marula oil, and warm citrus lipids to lock in hydration without clogging pores.",
    specs: [
      { label: "Cellular Renewal", sub: "Rapid Smoothing", icon: "fa-sparkles" },
      { label: "0.5% Bakuchiol", sub: "Retinol Alternative", icon: "fa-seedling" },
      { label: "Non-Comedogenic", sub: "Zero Clog", icon: "fa-feather" }
    ]
  }
];

export const THEMES = [
  { id: "sunset", label: "Sunset Cream & Orange", swatchClass: "sunset" },
  { id: "peach", label: "Peach Blossom & Coral", swatchClass: "peach" },
  { id: "amber", label: "Honey Amber & Espresso", swatchClass: "amber" }
];
