import React, { useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';
import {
  itensAcampamento,
  textoIntroducaoAcampamento,
} from '../dados/acampamento';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  verdeEscuro: '#4C4328',
  verdeClaro: '#F6FAF3',
  verdeBarra: '#CCD5C4',
  borda: '#D8D8D8',
  placeholder: '#A8A8A8',
  sombra: '#000000',
  perigo: '#9B2E2E',
  branco: '#FFFFFF',
  cinzaIcone: '#9A9A9A',
};

const TAMANHOS = {
  margemHorizontal: 22,
  larguraMaximaConteudo: 330,
  alturaItem: 78,
  raioItem: 3,
};

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function criarId(nome) {
  const base = normalizarTexto(nome).replace(/[^a-z0-9]+/g, '-');
  return `${base || 'item'}-${Date.now()}`;
}

function ModalBase({ children, visivel }) {
  return (
    <Modal transparent visible={visivel} animationType="fade">
      <View style={estilos.fundoModal}>
        <View style={estilos.cartaoModal}>{children}</View>
      </View>
    </Modal>
  );
}

export default function TelaAcampamento({ navigation }) {
  const [itens, setItens] = useState(itensAcampamento);
  const [itensMarcados, setItensMarcados] = useState({});
  const [busca, setBusca] = useState('');
  const [nomeNovoItem, setNomeNovoItem] = useState('');
  const [erroNovoItem, setErroNovoItem] = useState('');
  const [modalAdicionarVisivel, setModalAdicionarVisivel] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  const itensFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca);

    if (!termo) {
      return itens;
    }

    return itens.filter((item) => normalizarTexto(item.nome).includes(termo));
  }, [busca, itens]);

  function alternarItem(id) {
    setItensMarcados((marcadosAtuais) => ({
      ...marcadosAtuais,
      [id]: !marcadosAtuais[id],
    }));
  }

  function adicionarItem() {
    const nome = nomeNovoItem.trim();

    if (!nome) {
      setErroNovoItem('Por favor, escreva algum item.');
      return;
    }

    setItens((itensAtuais) => [...itensAtuais, { id: criarId(nome), nome }]);
    setNomeNovoItem('');
    setErroNovoItem('');
    setModalAdicionarVisivel(false);
  }

  function excluirItem() {
    if (!itemParaExcluir) {
      return;
    }

    setItens((itensAtuais) =>
      itensAtuais.filter((item) => item.id !== itemParaExcluir.id)
    );
    setItensMarcados((marcadosAtuais) => {
      const proximosMarcados = { ...marcadosAtuais };
      delete proximosMarcados[itemParaExcluir.id];
      return proximosMarcados;
    });
    setItemParaExcluir(null);
  }

  function cancelarAdicao() {
    setNomeNovoItem('');
    setErroNovoItem('');
    setModalAdicionarVisivel(false);
  }

  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável da checklist de acampamento. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.tituloSessao}>Acampamento está chegando?</Text>

          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoAcampamento}
          </Text>

          {/* Linha com texto de apoio e botão para adicionar item. */}
          <View style={estilos.linhaAdicionar}>
            <Text style={estilos.textoAdicionar}>
              Caso não encontre o que deseja, pode adicionar
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={estilos.botaoAdicionar}
              onPress={() => setModalAdicionarVisivel(true)}
              accessibilityLabel="Adicionar item"
            >
              <Feather name="plus" size={22} color={CORES.branco} />
            </TouchableOpacity>
          </View>

          {/* Campo de pesquisa dos itens da mochila. */}
          <TextInput
            style={estilos.campoBusca}
            value={busca}
            onChangeText={setBusca}
            placeholder="Pesquisar item"
            placeholderTextColor={CORES.placeholder}
          />

          {/* Botão que desmarca todos os checkboxes. */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={estilos.botaoResetar}
            onPress={() => setItensMarcados({})}
          >
            <Feather name="rotate-ccw" size={15} color={CORES.verde} />
            <Text style={estilos.textoResetar}>Resetar itens escolhidos</Text>
          </TouchableOpacity>

          {/* Lista dos itens filtrados da mochila. */}
          <View style={estilos.listaItens}>
            {itensFiltrados.map((item) => (
              <View key={item.id} style={estilos.cartaoItem}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={estilos.botaoExcluirItem}
                  onPress={() => setItemParaExcluir(item)}
                  accessibilityLabel={`Excluir ${item.nome}`}
                >
                  <Feather name="x" size={12} color={CORES.branco} />
                </TouchableOpacity>

                <Text
                  style={[
                    estilos.nomeItem,
                    itensMarcados[item.id] ? estilos.nomeItemMarcado : null,
                  ]}
                >
                  {item.nome}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.75}
                  style={[
                    estilos.checkbox,
                    itensMarcados[item.id] ? estilos.checkboxMarcado : null,
                  ]}
                  onPress={() => alternarItem(item.id)}
                  accessibilityLabel={`Marcar ${item.nome}`}
                >
                  {itensMarcados[item.id] ? (
                    <Feather name="check" size={16} color={CORES.branco} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}

            {itensFiltrados.length === 0 ? (
              <Text style={estilos.textoListaVazia}>
                Nenhum item encontrado.
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>

      {/* Modal de cadastro de novo item. */}
      <ModalBase visivel={modalAdicionarVisivel}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={estilos.botaoFecharModal}
          onPress={cancelarAdicao}
          accessibilityLabel="Fechar"
        >
          <Feather name="x" size={22} color={CORES.branco} />
        </TouchableOpacity>

        <Text style={estilos.tituloModal}>Adicionar item à mochila</Text>

        <TextInput
          style={estilos.campoModal}
          value={nomeNovoItem}
          onChangeText={(texto) => {
            setNomeNovoItem(texto);
            setErroNovoItem('');
          }}
          placeholder="Nome do item"
          placeholderTextColor={CORES.placeholder}
          autoFocus
        />

        {erroNovoItem ? (
          <Text style={estilos.textoErroModal}>{erroNovoItem}</Text>
        ) : null}

        <View style={estilos.acoesModal}>
          <TouchableOpacity
            activeOpacity={0.84}
            style={[estilos.botaoModal, estilos.botaoVoltar]}
            onPress={cancelarAdicao}
          >
            <Feather name="chevron-left" size={18} color={CORES.branco} />
            <Text style={estilos.textoBotaoModal}>VOLTAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.84}
            style={[estilos.botaoModal, estilos.botaoConfirmar]}
            onPress={adicionarItem}
          >
            <Feather name="check" size={16} color={CORES.branco} />
            <Text style={estilos.textoBotaoModal}>ADICIONAR</Text>
          </TouchableOpacity>
        </View>
      </ModalBase>

      {/* Modal de confirmação para excluir item. */}
      <ModalBase visivel={!!itemParaExcluir}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={estilos.botaoFecharModal}
          onPress={() => setItemParaExcluir(null)}
          accessibilityLabel="Fechar"
        >
          <Feather name="x" size={22} color={CORES.branco} />
        </TouchableOpacity>

        <Text style={estilos.tituloModal}>
          Confirma que deseja excluir permanentemente o registro da lista de
          acampamento?
        </Text>

        <View style={estilos.acoesModal}>
          <TouchableOpacity
            activeOpacity={0.84}
            style={[estilos.botaoModal, estilos.botaoVoltar]}
            onPress={() => setItemParaExcluir(null)}
          >
            <Feather name="chevron-left" size={18} color={CORES.branco} />
            <Text style={estilos.textoBotaoModal}>VOLTAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.84}
            style={[estilos.botaoModal, estilos.botaoDeletar]}
            onPress={excluirItem}
          >
            <Feather name="trash-2" size={15} color={CORES.branco} />
            <Text style={estilos.textoBotaoModal}>DELETAR</Text>
          </TouchableOpacity>
        </View>
      </ModalBase>
    </View>
  );
}

const estilos = StyleSheet.create({
  // Estrutura principal da tela.
  tela: {
    flex: 1,
    width: '100%',
    backgroundColor: CORES.fundo,
    overflow: 'hidden',
  },
  areaRolavel: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoRolavel: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 23,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },

  // Textos iniciais.
  tituloSessao: {
    marginBottom: 25,
    fontFamily: FONTES.titulo,
    fontSize: 22,
    lineHeight: 27,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    marginBottom: 17,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 15,
    lineHeight: 19,
    color: CORES.titulo,
  },

  // Bloco de adicionar item.
  linhaAdicionar: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  textoAdicionar: {
    flex: 1,
    paddingRight: 12,
    fontFamily: FONTES.corpo,
    fontSize: 15,
    lineHeight: 19,
    color: CORES.titulo,
  },
  botaoAdicionar: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.verde,
    borderRadius: 4,
  },

  // Pesquisa e reset.
  campoBusca: {
    width: '100%',
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 11,
    fontFamily: FONTES.corpo,
    fontSize: 15,
    color: CORES.texto,
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
  },
  botaoResetar: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 5,
  },
  textoResetar: {
    marginLeft: 6,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.verde,
  },

  // Lista de itens da mochila.
  listaItens: {
    width: '100%',
  },
  cartaoItem: {
    width: '100%',
    minHeight: TAMANHOS.alturaItem,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    paddingHorizontal: 20,
    backgroundColor: CORES.verdeClaro,
    borderRadius: TAMANHOS.raioItem,
    shadowColor: CORES.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoExcluirItem: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.cinzaIcone,
    borderRadius: 7,
  },
  nomeItem: {
    flex: 1,
    paddingRight: 14,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 16,
    lineHeight: 20,
    color: CORES.titulo,
  },
  nomeItemMarcado: {
    color: CORES.placeholder,
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.fundo,
    borderWidth: 2,
    borderColor: CORES.borda,
    borderRadius: 2,
  },
  checkboxMarcado: {
    backgroundColor: CORES.verde,
    borderColor: CORES.verde,
  },
  textoListaVazia: {
    marginTop: 12,
    fontFamily: FONTES.corpo,
    fontSize: 14,
    lineHeight: 18,
    color: CORES.placeholder,
    textAlign: 'center',
  },

  // Estrutura dos modais.
  fundoModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },
  cartaoModal: {
    width: '100%',
    maxWidth: 330,
    minHeight: 214,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingTop: 42,
    paddingBottom: 18,
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
    shadowColor: CORES.sombra,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },
  botaoFecharModal: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.cinzaIcone,
    borderRadius: 13,
  },
  tituloModal: {
    marginBottom: 30,
    fontFamily: FONTES.titulo,
    fontSize: 23,
    lineHeight: 28,
    color: '#000000',
    textAlign: 'center',
  },

  // Campo e validação do modal de adicionar.
  campoModal: {
    width: '100%',
    height: 48,
    marginBottom: 7,
    paddingHorizontal: 11,
    fontFamily: FONTES.corpo,
    fontSize: 15,
    color: CORES.texto,
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
  },
  textoErroModal: {
    marginBottom: 10,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.perigo,
  },

  // Botões dos modais.
  acoesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoModal: {
    width: '48%',
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  botaoVoltar: {
    backgroundColor: CORES.verdeEscuro,
  },
  botaoConfirmar: {
    backgroundColor: CORES.verde,
  },
  botaoDeletar: {
    backgroundColor: CORES.perigo,
  },
  textoBotaoModal: {
    marginLeft: 5,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 14,
    lineHeight: 18,
    color: CORES.branco,
  },
});
