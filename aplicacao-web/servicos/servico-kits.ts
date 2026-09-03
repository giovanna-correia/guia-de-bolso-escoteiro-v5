import type { Kit } from '../modelos/kit';
import { listarItensDoKit } from '../repositorios/repositorio-kits';
import { calcularQuantidadeDisponivel } from './servico-disponibilidade';

export interface ResumoKit {
  quantidadeItens: number;
  itensAtendidos: number;
  percentual: number;
  completo: boolean;
}

export function calcularResumoKit(kit: Kit): ResumoKit {
  const itens = listarItensDoKit(kit.id);
  const itensAtendidos = itens.filter((item) => calcularQuantidadeDisponivel(item.materialId) >= item.quantidadeNecessaria).length;
  const percentual = itens.length === 0 ? 0 : Math.round((itensAtendidos / itens.length) * 100);
  return { quantidadeItens: itens.length, itensAtendidos, percentual, completo: itens.length > 0 && itensAtendidos === itens.length };
}
