import { listarItensAtividades } from '../repositorios/repositorio-atividades';
import { listarItensKits } from '../repositorios/repositorio-kits';
import { listarManutencoes } from '../repositorios/repositorio-manutencoes';
import { buscarMaterialPorId } from '../repositorios/repositorio-materiais';

export function calcularQuantidadeDisponivel(materialId: string): number {
  const material = buscarMaterialPorId(materialId);
  if (!material) return 0;
  if (['baixado', 'danificado', 'aguardando_secagem', 'aguardando_limpeza'].includes(material.estado)) return 0;

  const itens = listarItensAtividades();
  const reservada = itens
    .filter((item) => item.materialId === materialId && item.situacao === 'reservado')
    .reduce((total, item) => total + item.quantidadeSolicitada, 0);
  const retirada = itens
    .filter((item) => item.materialId === materialId && ['retirado', 'pendente'].includes(item.situacao))
    .reduce((total, item) => total + item.quantidadeRetirada - item.quantidadeDevolvida, 0);
  const manutencaoAberta = listarManutencoes().some((manutencao) => manutencao.materialId === materialId && ['pendente', 'em_andamento'].includes(manutencao.situacao));
  const emManutencao = manutencaoAberta ? 1 : 0;
  return Math.max(0, material.quantidadeTotal - reservada - retirada - emManutencao);
}

export function calcularDisponibilidadeItemKit(kitId: string): boolean {
  const itens = listarItensKits().filter((item) => item.kitId === kitId);
  return itens.length > 0 && itens.every((item) => calcularQuantidadeDisponivel(item.materialId) >= item.quantidadeNecessaria);
}
