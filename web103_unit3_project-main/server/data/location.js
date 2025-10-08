// Export constant defining all available location IDs
export const LOCATION_IDS = {
  ARCANE_ATRIUM: "arcane_atrium",
  SILENT_SANCTUARY: "silent_sanctuary",
  GOLEM_GARAGE: "golem_garage",
  DESERT_OASIS: "desert_oasis",
};

// ✅ 添加完整的 locations 数组
export const LOCATIONS = [
  {
    id: LOCATION_IDS.ARCANE_ATRIUM,
    name: "Arcane Atrium",
    description: "A mystical gathering place filled with magical energy",
    address: "123 Magic Lane",
    city: "Arcane City",
    state: "CA",
    zip: "90001",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2c0?w=800&q=80",
  },
  {
    id: LOCATION_IDS.SILENT_SANCTUARY,
    name: "Silent Sanctuary",
    description: "A peaceful retreat for meditation and reflection",
    address: "456 Quiet Road",
    city: "Peace Town",
    state: "CA",
    zip: "90002",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
  },
  {
    id: LOCATION_IDS.GOLEM_GARAGE,
    name: "Golem Garage",
    description: "Workshop for constructing and repairing magical automatons",
    address: "789 Tech Street",
    city: "Innovation City",
    state: "CA",
    zip: "90003",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    id: LOCATION_IDS.DESERT_OASIS,
    name: "Desert Oasis",
    description: "A hidden paradise in the endless sands",
    address: "321 Sand Dune Drive",
    city: "Oasis Town",
    state: "CA",
    zip: "90004",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
  },
];
