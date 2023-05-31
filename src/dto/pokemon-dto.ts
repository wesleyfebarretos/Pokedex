export interface Pokemon {
  id: number;
  name: string;
  types: Type[];
  sprites: { front_default: string };
}

interface Type {
  type: { name: string };
}
