export enum PokemonType {
  ACIER = "Acier",
  COMBAT = "Combat",
  DRAGON = "Dragon",
  EAU = "Eau",
  ELECTRIK = "Électrik",
  FEE = "Fée",
  FEU = "Feu",
  GLACE = "Glace",
  INSECTE = "Insecte",
  NORMAL = "Normal",
  PLANTE = "Plante",
  POISON = "Poison",
  PSY = "Psy",
  ROCHE = "Roche",
  SOL = "Sol",
  SPECTRE = "Spectre",
  TENEBRES = "Ténèbres",
  VOL = "Vol",
}

const typeColors: Record<PokemonType, string> = {
  [PokemonType.ACIER]: "#60A2B9",
  [PokemonType.COMBAT]: "#FF8100",
  [PokemonType.DRAGON]: "#4F60E2",
  [PokemonType.EAU]: "#2481EF",
  [PokemonType.ELECTRIK]: "#FAC100",
  [PokemonType.FEE]: "#EF70EF",
  [PokemonType.FEU]: "#E72324",
  [PokemonType.GLACE]: "#3DD9FF",
  [PokemonType.INSECTE]: "#92A212",
  [PokemonType.NORMAL]: "#A0A2A0",
  [PokemonType.PLANTE]: "#3DA224",
  [PokemonType.POISON]: "#923FCC",
  [PokemonType.PSY]: "#EF3F7A",
  [PokemonType.ROCHE]: "#B0AA82",
  [PokemonType.SOL]: "#92501B",
  [PokemonType.SPECTRE]: "#703F70",
  [PokemonType.TENEBRES]: "#4F3F3D",
  [PokemonType.VOL]: "#82BAEF",
};

function normalizeTypeName(type: string): string {
  return type
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getColorForType(type: string): string {
  const normalized = normalizeTypeName(type);

  const entry = Object.entries(PokemonType).find(
    ([_, value]) =>
      normalizeTypeName(value) === normalized ||
      normalizeTypeName(_) === normalized
  );

  if (!entry) return "#A8A8A8";

  const enumValue = entry[1] as PokemonType;
  return typeColors[enumValue];
}