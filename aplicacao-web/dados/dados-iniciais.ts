import type { Usuario } from '../modelos/usuario';
import type { Secao } from '../modelos/secao';
import type { Patrulha } from '../modelos/patrulha';
import type { CategoriaMaterial } from '../modelos/categoria-material';
import type { Localizacao } from '../modelos/localizacao';
import type { Material } from '../modelos/material';
import type { ComponenteMaterial } from '../modelos/componente-material';
import type { Atividade } from '../modelos/atividade';
import type { ItemAtividade } from '../modelos/item-atividade';
import type { Movimentacao } from '../modelos/movimentacao';
import type { Manutencao } from '../modelos/manutencao';
import type { NecessidadeCompra } from '../modelos/necessidade-compra';

const agora = new Date();

function dataRelativa(dias: number): string {
  const data = new Date(agora);
  data.setDate(data.getDate() + dias);
  return data.toISOString();
}

export const usuariosIniciais: Usuario[] = [
  { id: 'usuario-escotista', nomeCompleto: 'Marina Oliveira', numeroRegistro: '000001', pin: '1234', perfil: 'escotista', secaoId: 'secao-diretoria', patrulhaId: null, situacao: 'ativo', dataCadastro: dataRelativa(-180), ultimoAcesso: null },
  { id: 'usuario-jovem-1', nomeCompleto: 'Lucas Almeida', numeroRegistro: '100001', pin: '1111', perfil: 'jovem_beneficiario', secaoId: 'secao-escoteira', patrulhaId: 'patrulha-lobo', situacao: 'ativo', dataCadastro: dataRelativa(-120), ultimoAcesso: null },
  { id: 'usuario-jovem-2', nomeCompleto: 'Beatriz Santos', numeroRegistro: '100002', pin: '2222', perfil: 'jovem_beneficiario', secaoId: 'secao-senior', patrulhaId: 'patrulha-aguia', situacao: 'ativo', dataCadastro: dataRelativa(-90), ultimoAcesso: null },
  { id: 'usuario-jovem-inativo', nomeCompleto: 'Rafael Lima', numeroRegistro: '100003', pin: '3333', perfil: 'jovem_beneficiario', secaoId: 'secao-lobinho', patrulhaId: 'patrulha-jaguar', situacao: 'inativo', dataCadastro: dataRelativa(-80), ultimoAcesso: null }
];

export const secoesIniciais: Secao[] = [
  { id: 'secao-lobinho', nome: 'Alcatéia', ramo: 'lobinho', situacao: 'ativa' },
  { id: 'secao-escoteira', nome: 'Tropa Escoteira', ramo: 'escoteiro', situacao: 'ativa' },
  { id: 'secao-senior', nome: 'Tropa Sênior', ramo: 'senior', situacao: 'ativa' },
  { id: 'secao-pioneiro', nome: 'Clã Pioneiro', ramo: 'pioneiro', situacao: 'ativa' },
  { id: 'secao-diretoria', nome: 'Diretoria', ramo: 'diretoria', situacao: 'ativa' }
];

export const patrulhasIniciais: Patrulha[] = [
  { id: 'patrulha-jaguar', nome: 'Matilha Jaguar', secaoId: 'secao-lobinho', situacao: 'ativa' },
  { id: 'patrulha-lobo', nome: 'Patrulha Lobo', secaoId: 'secao-escoteira', situacao: 'ativa' },
  { id: 'patrulha-aguia', nome: 'Patrulha Águia', secaoId: 'secao-senior', situacao: 'ativa' },
  { id: 'patrulha-caminho', nome: 'Equipe Caminho', secaoId: 'secao-pioneiro', situacao: 'ativa' }
];

export const categoriasIniciais: CategoriaMaterial[] = [
  { id: 'categoria-barracas', nome: 'Barracas e acampamento', descricao: 'Abrigos e materiais de campo.', situacao: 'ativa' },
  { id: 'categoria-cozinha', nome: 'Cozinha', descricao: 'Utensílios e equipamentos de cozinha.', situacao: 'ativa' },
  { id: 'categoria-ferramentas', nome: 'Ferramentas', descricao: 'Ferramentas de campo com controle de uso.', situacao: 'ativa' },
  { id: 'categoria-cordas', nome: 'Cordas e pioneirias', descricao: 'Cordas usadas em nós, amarras e construções.', situacao: 'ativa' },
  { id: 'categoria-mobiliario', nome: 'Mobiliário', descricao: 'Mesas, bancos e mobiliário.', situacao: 'ativa' },
  { id: 'categoria-escritorio', nome: 'Escritório', descricao: 'Materiais administrativos.', situacao: 'ativa' },
  { id: 'categoria-limpeza', nome: 'Limpeza', descricao: 'Materiais para limpeza.', situacao: 'ativa' },
  { id: 'categoria-primeiros-socorros', nome: 'Primeiros socorros', descricao: 'Materiais de atendimento inicial.', situacao: 'ativa' },
  { id: 'categoria-eletronicos', nome: 'Equipamentos eletrônicos', descricao: 'Lanternas e equipamentos elétricos.', situacao: 'ativa' },
  { id: 'categoria-cerimonia', nome: 'Cerimônia', descricao: 'Materiais usados em cerimônias.', situacao: 'ativa' }
];

export const localizacoesIniciais: Localizacao[] = [
  { id: 'local-deposito', nome: 'Depósito principal', descricao: 'Depósito central da sede.', situacao: 'ativa' },
  { id: 'local-armario-tropa', nome: 'Armário da Tropa Escoteira', descricao: 'Armário identificado da tropa.', situacao: 'ativa' },
  { id: 'local-cozinha', nome: 'Cozinha', descricao: 'Armários da cozinha da sede.', situacao: 'ativa' },
  { id: 'local-cla', nome: 'Sala do Clã', descricao: 'Sala de reunião do Clã.', situacao: 'ativa' },
  { id: 'local-prateleira-a', nome: 'Prateleira A', descricao: 'Prateleira do depósito principal.', situacao: 'ativa' }
];

export const materiaisIniciais: Material[] = [
  { id: 'material-barraca-iglu', codigoPatrimonio: 'BAR-001', nome: 'Barraca Iglu 4 pessoas', descricao: 'Barracas de uso geral da tropa.', tipo: 'duravel', categoriaId: 'categoria-barracas', secaoId: 'secao-escoteira', localizacaoId: 'local-deposito', quantidadeTotal: 4, quantidadeMinimaDesejada: 6, unidadeMedida: 'unidade', estado: 'bom', origem: 'compra', valorUnitario: 620, dataAquisicao: dataRelativa(-400), controlaComponentes: true, capacidadePessoas: 4, comprimentoMetros: null, restricaoUso: null, observacoes: 'Conferir estacas antes de cada saída.', caminhoImagem: null, dataCadastro: dataRelativa(-400) },
  { id: 'material-barraca-canadense', codigoPatrimonio: 'BAR-002', nome: 'Barraca Canadense 6 pessoas', descricao: 'Barracas maiores para acampamentos longos.', tipo: 'duravel', categoriaId: 'categoria-barracas', secaoId: null, localizacaoId: 'local-deposito', quantidadeTotal: 2, quantidadeMinimaDesejada: 3, unidadeMedida: 'unidade', estado: 'aguardando_secagem', origem: 'doacao', valorUnitario: 850, dataAquisicao: dataRelativa(-600), controlaComponentes: true, capacidadePessoas: 6, comprimentoMetros: null, restricaoUso: null, observacoes: 'Uma unidade retornou molhada.', caminhoImagem: null, dataCadastro: dataRelativa(-600) },
  { id: 'material-cozinha', codigoPatrimonio: 'COZ-001', nome: 'Conjunto de cozinha de campo', descricao: 'Panelas, conchas e utensílios para patrulha.', tipo: 'duravel', categoriaId: 'categoria-cozinha', secaoId: 'secao-escoteira', localizacaoId: 'local-cozinha', quantidadeTotal: 2, quantidadeMinimaDesejada: 2, unidadeMedida: 'conjunto', estado: 'incompleto', origem: 'compra', valorUnitario: 310, dataAquisicao: dataRelativa(-280), controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: null, restricaoUso: null, observacoes: 'Um conjunto está sem concha.', caminhoImagem: null, dataCadastro: dataRelativa(-280) },
  { id: 'material-cordas', codigoPatrimonio: 'PIO-001', nome: 'Corda de pioneiria', descricao: 'Cordas sisal para construções.', tipo: 'duravel', categoriaId: 'categoria-cordas', secaoId: 'secao-escoteira', localizacaoId: 'local-armario-tropa', quantidadeTotal: 12, quantidadeMinimaDesejada: 10, unidadeMedida: 'rolo', estado: 'bom', origem: 'emenda', valorUnitario: 95, dataAquisicao: dataRelativa(-150), controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: 20, restricaoUso: null, observacoes: 'Manter secas e enroladas.', caminhoImagem: null, dataCadastro: dataRelativa(-150) },
  { id: 'material-facao', codigoPatrimonio: 'FER-001', nome: 'Facão de campo', descricao: 'Ferramenta para manejo supervisionado.', tipo: 'duravel', categoriaId: 'categoria-ferramentas', secaoId: null, localizacaoId: 'local-deposito', quantidadeTotal: 4, quantidadeMinimaDesejada: 4, unidadeMedida: 'unidade', estado: 'em_manutencao', origem: 'compra', valorUnitario: 120, dataAquisicao: dataRelativa(-500), controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: null, restricaoUso: 'Uso somente com autorização e supervisão de escotista.', observacoes: 'Um facão aguarda troca do cabo.', caminhoImagem: null, dataCadastro: dataRelativa(-500) },
  { id: 'material-lanternas', codigoPatrimonio: 'ELE-001', nome: 'Lanterna recarregável', descricao: 'Lanternas de apoio noturno.', tipo: 'duravel', categoriaId: 'categoria-eletronicos', secaoId: null, localizacaoId: 'local-prateleira-a', quantidadeTotal: 8, quantidadeMinimaDesejada: 12, unidadeMedida: 'unidade', estado: 'danificado', origem: 'doacao', valorUnitario: 75, dataAquisicao: dataRelativa(-200), controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: null, restricaoUso: null, observacoes: 'Duas unidades não mantêm carga.', caminhoImagem: null, dataCadastro: dataRelativa(-200) },
  { id: 'material-caixas', codigoPatrimonio: 'ACM-001', nome: 'Caixa térmica', descricao: 'Caixas para conservação de alimentos.', tipo: 'duravel', categoriaId: 'categoria-barracas', secaoId: null, localizacaoId: 'local-deposito', quantidadeTotal: 3, quantidadeMinimaDesejada: 3, unidadeMedida: 'unidade', estado: 'bom', origem: 'doacao', valorUnitario: 180, dataAquisicao: dataRelativa(-190), controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: null, restricaoUso: null, observacoes: '', caminhoImagem: null, dataCadastro: dataRelativa(-190) },
  { id: 'material-primeiros-socorros', codigoPatrimonio: 'PSO-001', nome: 'Maleta de primeiros socorros', descricao: 'Materiais básicos de primeiros socorros.', tipo: 'consumivel', categoriaId: 'categoria-primeiros-socorros', secaoId: null, localizacaoId: 'local-deposito', quantidadeTotal: 2, quantidadeMinimaDesejada: 2, unidadeMedida: 'maleta', estado: 'bom', origem: 'compra', valorUnitario: 240, dataAquisicao: dataRelativa(-70), controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: null, restricaoUso: 'Uso por adulto capacitado.', observacoes: 'Verificar validade mensalmente.', caminhoImagem: null, dataCadastro: dataRelativa(-70) },
  { id: 'material-cerimonia', codigoPatrimonio: 'CER-001', nome: 'Conjunto de bandeiras', descricao: 'Bandeiras e talabartes para cerimônia.', tipo: 'duravel', categoriaId: 'categoria-cerimonia', secaoId: null, localizacaoId: 'local-cla', quantidadeTotal: 1, quantidadeMinimaDesejada: 1, unidadeMedida: 'conjunto', estado: 'bom', origem: 'doacao', valorUnitario: null, dataAquisicao: null, controlaComponentes: false, capacidadePessoas: null, comprimentoMetros: null, restricaoUso: null, observacoes: 'Guardar dobrado e protegido.', caminhoImagem: null, dataCadastro: dataRelativa(-300) }
];

export const componentesIniciais: ComponenteMaterial[] = [
  { id: 'componente-1', materialId: 'material-barraca-iglu', nome: 'Sobreteto', quantidadeEsperada: 4, quantidadeEncontrada: 4, estado: 'bom', observacoes: '' },
  { id: 'componente-2', materialId: 'material-barraca-iglu', nome: 'Conjunto de varetas', quantidadeEsperada: 4, quantidadeEncontrada: 4, estado: 'bom', observacoes: '' },
  { id: 'componente-3', materialId: 'material-barraca-iglu', nome: 'Conjunto de estacas', quantidadeEsperada: 4, quantidadeEncontrada: 4, estado: 'bom', observacoes: '' },
  { id: 'componente-4', materialId: 'material-barraca-iglu', nome: 'Cordas', quantidadeEsperada: 4, quantidadeEncontrada: 4, estado: 'bom', observacoes: '' },
  { id: 'componente-5', materialId: 'material-barraca-iglu', nome: 'Bolsa de transporte', quantidadeEsperada: 4, quantidadeEncontrada: 4, estado: 'bom', observacoes: '' }
];

export const atividadesIniciais: Atividade[] = [
  { id: 'atividade-planejamento', nome: 'Acampamento de Primavera', tipo: 'acampamento', local: 'Campo Escola', dataSaida: dataRelativa(30), dataRetorno: dataRelativa(32), secaoId: 'secao-escoteira', quantidadeJovens: 24, quantidadeAdultos: 5, responsavelId: 'usuario-escotista', situacao: 'planejamento', observacoes: 'Planejamento inicial de carga.', dataCadastro: dataRelativa(-5) },
  { id: 'atividade-reservada', nome: 'Jornada da Tropa Sênior', tipo: 'jornada', local: 'Trilha do Ipê', dataSaida: dataRelativa(14), dataRetorno: dataRelativa(15), secaoId: 'secao-senior', quantidadeJovens: 12, quantidadeAdultos: 3, responsavelId: 'usuario-escotista', situacao: 'reservada', observacoes: 'Materiais já reservados.', dataCadastro: dataRelativa(-10) },
  { id: 'atividade-devolucao', nome: 'Acantonamento da Tropa', tipo: 'acantonamento', local: 'Sede do Grupo', dataSaida: dataRelativa(-3), dataRetorno: dataRelativa(-1), secaoId: 'secao-escoteira', quantidadeJovens: 20, quantidadeAdultos: 4, responsavelId: 'usuario-escotista', situacao: 'aguardando_devolucao', observacoes: 'Aguardando inspeção dos materiais.', dataCadastro: dataRelativa(-20) }
];

export const itensAtividadesIniciais: ItemAtividade[] = [
  { id: 'item-atividade-1', atividadeId: 'atividade-planejamento', materialId: 'material-barraca-iglu', quantidadeSolicitada: 4, quantidadeRetirada: 0, quantidadeDevolvida: 0, situacao: 'planejado' },
  { id: 'item-atividade-2', atividadeId: 'atividade-reservada', materialId: 'material-lanternas', quantidadeSolicitada: 4, quantidadeRetirada: 0, quantidadeDevolvida: 0, situacao: 'reservado' },
  { id: 'item-atividade-3', atividadeId: 'atividade-devolucao', materialId: 'material-barraca-canadense', quantidadeSolicitada: 1, quantidadeRetirada: 1, quantidadeDevolvida: 0, situacao: 'retirado' }
];

export const movimentacoesIniciais: Movimentacao[] = [
  { id: 'movimentacao-1', materialId: 'material-lanternas', atividadeId: 'atividade-reservada', tipo: 'reserva', quantidade: 4, responsavelId: 'usuario-escotista', data: dataRelativa(-2), estadoRegistrado: 'danificado', observacoes: 'Reserva para a Jornada.' },
  { id: 'movimentacao-2', materialId: 'material-barraca-canadense', atividadeId: 'atividade-devolucao', tipo: 'retirada', quantidade: 1, responsavelId: 'usuario-escotista', data: dataRelativa(-3), estadoRegistrado: 'bom', observacoes: 'Retirada para acantonamento.' }
];

export const manutencoesIniciais: Manutencao[] = [
  { id: 'manutencao-secagem', materialId: 'material-barraca-canadense', atividadeId: 'atividade-devolucao', tipo: 'secagem', descricaoProblema: 'Barraca devolvida molhada e precisa secar antes do armazenamento.', responsavelId: 'usuario-escotista', dataAbertura: dataRelativa(-1), dataConclusao: null, custoEstimado: null, custoReal: null, situacao: 'pendente', resultado: null, observacoes: 'Abrir e ventilar na sede.' },
  { id: 'manutencao-facao', materialId: 'material-facao', atividadeId: null, tipo: 'conserto', descricaoProblema: 'Cabo com folga; ferramenta bloqueada para uso.', responsavelId: null, dataAbertura: dataRelativa(-7), dataConclusao: null, custoEstimado: 45, custoReal: null, situacao: 'pendente', resultado: null, observacoes: 'Solicitar avaliação de profissional.' }
];

export const necessidadesIniciais: NecessidadeCompra[] = [
  { id: 'necessidade-barracas', materialId: 'material-barraca-iglu', nomeMaterial: 'Barraca Iglu 4 pessoas', secaoId: 'secao-escoteira', quantidadeAtual: 4, quantidadeDesejada: 8, quantidadeComprar: 4, valorUnitarioEstimado: 650, prioridade: 'urgente', justificativa: 'Garantir abrigo suficiente para todos os jovens nos acampamentos.', fonteRecurso: 'emenda', situacao: 'em_analise', dataCadastro: dataRelativa(-10) },
  { id: 'necessidade-lanternas', materialId: 'material-lanternas', nomeMaterial: 'Lanterna recarregável', secaoId: 'secao-senior', quantidadeAtual: 8, quantidadeDesejada: 12, quantidadeComprar: 4, valorUnitarioEstimado: 80, prioridade: 'media', justificativa: 'Reforçar a iluminação segura em atividades noturnas.', fonteRecurso: 'recurso_proprio', situacao: 'identificada', dataCadastro: dataRelativa(-5) }
];
