const bosses = [
  {
    id: "crystalguardian",
    name: "Crystal Guardian",
    difficulty: "Medium",
    location: "Crystal Caverns",
    health: 2500,
    rewards: ["Crystal Sword", "Guardian Shield", "500 Gold"],
    description:
      "A majestic creature made of pure crystal that guards the ancient caverns.",
    strategy:
      "Focus on hitting the crystal weak points when they glow. Avoid the ground slam attack by staying mobile.",
    image:
      "https://via.placeholder.com/400x300/9f7aea/ffffff?text=Crystal+Guardian",
    weaknesses: ["Fire Magic", "Blunt Weapons"],
    resistances: ["Ice Magic", "Lightning"],
  },
  {
    id: "mantislords",
    name: "Mantis Lords",
    difficulty: "Hard",
    location: "Mantis Village",
    health: 1800,
    rewards: ["Mantis Claw", "Respect of Mantis Tribe", "Ancient Mask"],
    description:
      "Three elite mantis warriors who test worthy challengers in ritualistic combat.",
    strategy:
      "Learn their attack patterns. Focus on one at a time. Use dash to avoid their coordinated attacks.",
    image:
      "https://via.placeholder.com/400x300/e53e3e/ffffff?text=Mantis+Lords",
    weaknesses: ["Nail Arts", "Quick Strikes"],
    resistances: ["Spell Damage"],
  },
  {
    id: "shadowbeast",
    name: "Shadow Beast",
    difficulty: "Easy",
    location: "Dark Forest",
    health: 1200,
    rewards: ["Shadow Cloak", "Dark Essence", "200 Gold"],
    description:
      "A creature born from concentrated darkness, lurking in the deepest shadows.",
    strategy:
      "Use light-based attacks. Stay in illuminated areas to prevent its stealth attacks.",
    image:
      "https://via.placeholder.com/400x300/4a5568/ffffff?text=Shadow+Beast",
    weaknesses: ["Light Magic", "Holy Weapons"],
    resistances: ["Dark Magic", "Physical Attacks in Darkness"],
  },
  {
    id: "flamedragón",
    name: "Flame Dragon",
    difficulty: "Very Hard",
    location: "Volcano Peak",
    health: 5000,
    rewards: ["Dragon Scale Armor", "Flame Breath Spell", "1000 Gold"],
    description:
      "An ancient dragon whose breath can melt stone and whose scales deflect most weapons.",
    strategy:
      "Target the wings to ground it. Use ice magic when its mouth glows red to prevent flame breath.",
    image:
      "https://via.placeholder.com/400x300/f56565/ffffff?text=Flame+Dragon",
    weaknesses: ["Ice Magic", "Dragon-slaying Weapons"],
    resistances: ["Fire Magic", "Physical Attacks"],
  },
  {
    id: "voidknight",
    name: "Void Knight",
    difficulty: "Very Hard",
    location: "Void Realm",
    health: 3500,
    rewards: ["Void Blade", "Knight's Honor", "Void Crystal"],
    description:
      "A fallen paladin consumed by void energy, wielding corrupted holy magic.",
    strategy:
      "Interrupt his void channeling attacks. Use pure magic to counter his corruption.",
    image: "https://via.placeholder.com/400x300/805ad5/ffffff?text=Void+Knight",
    weaknesses: ["Pure Magic", "Holy Relics"],
    resistances: ["Void Magic", "Dark Attacks"],
  },
  {
    id: "icequeen",
    name: "Ice Queen",
    difficulty: "Hard",
    location: "Frozen Palace",
    health: 2800,
    rewards: ["Ice Crown", "Frost Magic", "Crystal Key"],
    description:
      "The ruler of the eternal winter realm, commanding ice and snow with absolute authority.",
    strategy:
      "Break her ice armor first. Avoid the freeze AOE by staying warm near fire sources.",
    image: "https://via.placeholder.com/400x300/63b3ed/ffffff?text=Ice+Queen",
    weaknesses: ["Fire Magic", "Heat-based Attacks"],
    resistances: ["Ice Magic", "Cold Damage"],
  },
];

module.exports = bosses;
