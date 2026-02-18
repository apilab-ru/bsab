export interface Res {
  name: string;
  img: string;
}

const RES_META_COUNT: Partial<Record<string, number>> = {
  Armadillo: 5,
  Bat: 5,
  Bee: 5,
  BonePowder: 10,
  Book: 3,
  Copper: 10,
  Crystal: 10,
  GoldAccessory: 3,
  GoldIngot: 3,
  HermitCrab: 10,
  Honey: 10,
  Iron: 10,
  Medicine: 5,
  Myrrh: 30,
  Oil: 10,
  Parchment: 10,
  Rock: 20,
  Rope: 10,
  Scorpion: 10,
  Silkworm: 5,
  Snow: 20,
  TileCoal: 10,
  Water: 30,
  Steak: 3,
  FunnyPollen: 3,
  Cosmetics: 3,
  Lumber: 10,
  JungleLog: 20,
  Rubber: 30,
  Mud: 30,
  Frog: 10,
  Snail: 10,
  Glass: 5,
  CactusFlower: 10,
  GlassBottle: 5,
  Salt: 20,
  Battery: 3,
  Grass: 30,
  Fish: 10,
  LimePowder: 10,
  Coral: 5,
  Limestone: 10,
  Leather: 10,
  Milk: 10,
  GearWheel: 3,
  Tool: 10,
  Fabric: 10,
  Slate: 10,
  Shoes: 5,
  CopperIngot: 5,
  CopperWire: 3,
  Dye: 10,
  Papyrus: 10,
  Flaone: 5,
  Silk: 10,
  SilkwormCocoon: 10,
  Pottery: 10,
  Luminator: 10,
  Cloth: 5,
  Soap: 5,
  Nocslin: 30,
  RegenerativePotion: 5,
  BatPotion: 10,
  Sack: 10,
  Log: 20,
  Grain: 10,
  Syrup: 30,
  Dirt: 30,
  Mushroom: 10,
  StoneBrick: 10,
  Coraljewelry: 3,
  Bone: 10,
  Rabbit: 5,
  Nickel: 10,
  Bread: 5,
  Pasta: 3,
  Beeswax: 10,
  RawMeat: 10,
  Halite: 10,
  IronIngot: 3,
  GrainPowder: 10,
  Cake: 3,
  Candles: 5,
  Jewel: 5,
  Wine: 3,
  Cheese: 5,
  Icecream: 3,
  GrilledMeat: 20,
  Monkfish: 10,
  Sand: 20,
  ThornLog: 11,
  Sandrock: 20,
  SilkDress: 3,
  Dumbbell: 3,
  Obsidian: 10,
  FunnyFlower: 3,
  Gum: 3,
  Gold: 5,
  Ash: 10,
  Sulfur: 10,
  Beer: 5,
  Perfume: 3,
  Glasshandicraft: 3,
}

export const ALL_RES_LIST = [];

export function getResourceIcon(resource: string): string {
  return `/assets/resources/${resource}Object.png`
}

export const RES_LIST: Res[] = [
  {
    "img": "/assets/resources/ArmadilloObject.png",
    "name": "Armadillo"
  },
  {
    "img": "/assets/resources/AshObject.png",
    "name": "Ash"
  },
  {
    "img": "/assets/resources/BatJuiceObject.png",
    "name": "BatJuice"
  },
  {
    "img": "/assets/resources/BatObject.png",
    "name": "Bat"
  },
  {
    "img": "/assets/resources/BatPotionObject.png",
    "name": "BatPotion"
  },
  {
    "img": "/assets/resources/BatteryObject.png",
    "name": "Battery"
  },
  {
    "img": "/assets/resources/BattleChipObject.png",
    "name": "BattleChip"
  },
  {
    "img": "/assets/resources/BeeObject.png",
    "name": "Bee"
  },
  {
    "img": "/assets/resources/BeerObject.png",
    "name": "Beer"
  },
  {
    "img": "/assets/resources/BeeswaxObject.png",
    "name": "Beeswax"
  },
  {
    "img": "/assets/resources/BerryObject.png",
    "name": "Berry"
  },
  {
    "img": "/assets/resources/BlackPowderObject.png",
    "name": "BlackPowder"
  },
  {
    "img": "/assets/resources/BoneObject.png",
    "name": "Bone"
  },
  {
    "img": "/assets/resources/BonePowderObject.png",
    "name": "BonePowder"
  },
  {
    "img": "/assets/resources/BookObject.png",
    "name": "Book"
  },
  {
    "img": "/assets/resources/BranchObject.png",
    "name": "Branch"
  },
  {
    "img": "/assets/resources/BreadObject.png",
    "name": "Bread"
  },
  {
    "img": "/assets/resources/CactusFlowerObject.png",
    "name": "CactusFlower"
  },
  {
    "img": "/assets/resources/CakeObject.png",
    "name": "Cake"
  },
  {
    "img": "/assets/resources/CandlesObject.png",
    "name": "Candles"
  },
  {
    "img": "/assets/resources/Chair.png",
    "name": "Chair"
  },
  {
    "img": "/assets/resources/CharacterChipObject.png",
    "name": "CharacterChip"
  },
  {
    "img": "/assets/resources/CharcoalObject.png",
    "name": "Charcoal"
  },
  {
    "img": "/assets/resources/CheeseObject.png",
    "name": "Cheese"
  },
  {
    "img": "/assets/resources/ClothObject.png",
    "name": "Cloth"
  },
  {
    "img": "/assets/resources/CopperIngotObject.png",
    "name": "CopperIngot"
  },
  {
    "img": "/assets/resources/CopperObject.png",
    "name": "Copper"
  },
  {
    "img": "/assets/resources/CopperWireObject.png",
    "name": "CopperWire"
  },
  {
    "img": "/assets/resources/CoraljewelryObject.png",
    "name": "Coraljewelry"
  },
  {
    "img": "/assets/resources/CoralObject.png",
    "name": "Coral"
  },
  {
    "img": "/assets/resources/CosmeticsObject.png",
    "name": "Cosmetics"
  },
  {
    "img": "/assets/resources/CrystalObject.png",
    "name": "Crystal"
  },
  {
    "img": "/assets/resources/DirtObject.png",
    "name": "Dirt"
  },
  {
    "img": "/assets/resources/DrinkingBottleObject.png",
    "name": "DrinkingBottle"
  },
  {
    "img": "/assets/resources/DumbbellObject.png",
    "name": "Dumbbell"
  },
  {
    "img": "/assets/resources/DyeObject.png",
    "name": "Dye"
  },
  {
    "img": "/assets/resources/EngineObject.png",
    "name": "Engine"
  },
  {
    "img": "/assets/resources/FabricObject.png",
    "name": "Fabric"
  },
  {
    "img": "/assets/resources/FishObject.png",
    "name": "Fish"
  },
  {
    "img": "/assets/resources/FlaoneObject.png",
    "name": "Flaone"
  },
  {
    "img": "/assets/resources/FlowerObject.png",
    "name": "Flower"
  },
  {
    "img": "/assets/resources/FlowerPlantObject.png",
    "name": "FlowerPlant"
  },
  {
    "img": "/assets/resources/FrogObject.png",
    "name": "Frog"
  },
  {
    "img": "/assets/resources/FunnyFlowerObject.png",
    "name": "FunnyFlower"
  },
  {
    "img": "/assets/resources/FunnyPollenObject.png",
    "name": "FunnyPollen"
  },
  {
    "img": "/assets/resources/GearWheelObject.png",
    "name": "GearWheel"
  },
  {
    "img": "/assets/resources/GlassBottleObject.png",
    "name": "GlassBottle"
  },
  {
    "img": "/assets/resources/GlasshandicraftObject.png",
    "name": "Glasshandicraft"
  },
  {
    "img": "/assets/resources/GlassObject.png",
    "name": "Glass"
  },
  {
    "img": "/assets/resources/GoldAccessoryObject.png",
    "name": "GoldAccessory"
  },
  {
    "img": "/assets/resources/GoldIngotObject.png",
    "name": "GoldIngot"
  },
  {
    "img": "/assets/resources/GoldObject.png",
    "name": "Gold"
  },
  {
    "img": "/assets/resources/GrainObject.png",
    "name": "Grain"
  },
  {
    "img": "/assets/resources/GrainPowderObject.png",
    "name": "GrainPowder"
  },
  {
    "img": "/assets/resources/GrilledFishObject.png",
    "name": "GrilledFish"
  },
  {
    "img": "/assets/resources/GrilledMeatObject.png",
    "name": "GrilledMeat"
  },
  {
    "img": "/assets/resources/GrilledMushroomObject.png",
    "name": "GrilledMushroom"
  },
  {
    "img": "/assets/resources/HaliteObject.png",
    "name": "Halite"
  },
  {
    "img": "/assets/resources/HermitCrabObject.png",
    "name": "HermitCrab"
  },
  {
    "img": "/assets/resources/HoneyObject.png",
    "name": "Honey"
  },
  {
    "img": "/assets/resources/IcecreamObject.png",
    "name": "Icecream"
  },
  {
    "img": "/assets/resources/IronIngotObject.png",
    "name": "IronIngot"
  },
  {
    "img": "/assets/resources/IronObject.png",
    "name": "Iron"
  },
  {
    "img": "/assets/resources/IronPlateObject.png",
    "name": "IronPlate"
  },
  {
    "img": "/assets/resources/JewelObject.png",
    "name": "Jewel"
  },
  {
    "img": "/assets/resources/JungleLogObject.png",
    "name": "JungleLog"
  },
  {
    "img": "/assets/resources/LeatherObject.png",
    "name": "Leather"
  },
  {
    "img": "/assets/resources/LimePowderObject.png",
    "name": "LimePowder"
  },
  {
    "img": "/assets/resources/LimestoneObject.png",
    "name": "Limestone"
  },
  {
    "img": "/assets/resources/LogObject.png",
    "name": "Log"
  },
  {
    "img": "/assets/resources/LumberObject.png",
    "name": "Lumber"
  },
  {
    "img": "/assets/resources/LuminatorObject.png",
    "name": "Luminator"
  },
  {
    "img": "/assets/resources/MedicineObject.png",
    "name": "Medicine"
  },
  {
    "img": "/assets/resources/MilkObject.png",
    "name": "Milk"
  },
  {
    "img": "/assets/resources/MineSpiderObject.png",
    "name": "MineSpider"
  },
  {
    "img": "/assets/resources/MoneyObject.png",
    "name": "Money"
  },
  {
    "img": "/assets/resources/MonkfishObject.png",
    "name": "Monkfish"
  },
  {
    "img": "/assets/resources/MudObject.png",
    "name": "Mud"
  },
  {
    "img": "/assets/resources/MushroomObject.png",
    "name": "Mushroom"
  },
  {
    "img": "/assets/resources/MyrrhObject.png",
    "name": "Myrrh"
  },
  {
    "img": "/assets/resources/NickelObject.png",
    "name": "Nickel"
  },
  {
    "img": "/assets/resources/NiterObject.png",
    "name": "Niter"
  },
  {
    "img": "/assets/resources/NocslinObject.png",
    "name": "Nocslin"
  },
  {
    "img": "/assets/resources/ObsidianObject.png",
    "name": "Obsidian"
  },
  {
    "img": "/assets/resources/OilObject.png",
    "name": "Oil"
  },
  {
    "img": "/assets/resources/PapyrusObject.png",
    "name": "Papyrus"
  },
  {
    "img": "/assets/resources/ParchmentObject.png",
    "name": "Parchment"
  },
  {
    "img": "/assets/resources/PastaObject.png",
    "name": "Pasta"
  },
  {
    "img": "/assets/resources/PerfumeObject.png",
    "name": "Perfume"
  },
  {
    "img": "/assets/resources/PubIcon.png",
    "name": "PubIcon"
  },
  {
    "img": "/assets/resources/RabbitObject.png",
    "name": "Rabbit"
  },
  {
    "img": "/assets/resources/RawMeatObject.png",
    "name": "RawMeat"
  },
  {
    "img": "/assets/resources/RegenerativePotionObject.png",
    "name": "RegenerativePotion"
  },
  {
    "img": "/assets/resources/RockObject.png",
    "name": "Rock"
  },
  {
    "img": "/assets/resources/RopeObject.png",
    "name": "Rope"
  },
  {
    "img": "/assets/resources/RubberObject.png",
    "name": "Rubber"
  },
  {
    "img": "/assets/resources/SackObject.png",
    "name": "Sack"
  },
  {
    "img": "/assets/resources/SaltObject.png",
    "name": "Salt"
  },
  {
    "img": "/assets/resources/SandrockObject.png",
    "name": "Sandrock"
  },
  {
    "img": "/assets/resources/ScorpionObject.png",
    "name": "Scorpion"
  },
  {
    "img": "/assets/resources/SilkDressObject.png",
    "name": "SilkDress"
  },
  {
    "img": "/assets/resources/SilkObject.png",
    "name": "Silk"
  },
  {
    "img": "/assets/resources/SilkwormCocoonObject.png",
    "name": "SilkwormCocoon"
  },
  {
    "img": "/assets/resources/SilkwormObject.png",
    "name": "Silkworm"
  },
  {
    "img": "/assets/resources/SlateObject.png",
    "name": "Slate"
  },
  {
    "img": "/assets/resources/SlimeObject.png",
    "name": "Slime"
  },
  {
    "img": "/assets/resources/SnailObject.png",
    "name": "Snail"
  },
  {
    "img": "/assets/resources/SnowObject.png",
    "name": "Snow"
  },
  {
    "img": "/assets/resources/SoapObject.png",
    "name": "Soap"
  },
  {
    "img": "/assets/resources/SpiderCorn.png",
    "name": "SpiderCorn"
  },
  {
    "img": "/assets/resources/SpiderWebObject.png",
    "name": "SpiderWeb"
  },
  {
    "img": "/assets/resources/SteakObject.png",
    "name": "Steak"
  },
  {
    "img": "/assets/resources/StoneBrickObject.png",
    "name": "StoneBrick"
  },
  {
    "img": "/assets/resources/SulfurObject.png",
    "name": "Sulfur"
  },
  {
    "img": "/assets/resources/SyrupObject.png",
    "name": "Syrup"
  },
  {
    "img": "/assets/resources/ThornLogObject.png",
    "name": "ThornLog"
  },
  {
    "img": "/assets/resources/TileCoalObject.png",
    "name": "TileCoal"
  },
  {
    "img": "/assets/resources/ToolObject.png",
    "name": "Tool"
  },
  {
    "img": "/assets/resources/WaterObject.png",
    "name": "Water"
  },
  {
    "img": "/assets/resources/WattObject.png",
    "name": "Watt"
  },
  {
    "img": "/assets/resources/WineObject.png",
    "name": "Wine"
  }
];