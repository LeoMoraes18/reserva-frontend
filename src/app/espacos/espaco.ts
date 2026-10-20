export interface Espaco {
  id: string;
  nome: string;
  descricao: string;
  capacidade: number;
  ativo: boolean;
}

export interface EspacoRequest {
  nome: string;
  descricao: string;
  capacidade: number;
}
