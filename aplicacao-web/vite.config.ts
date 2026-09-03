import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pastaProjeto = fileURLToPath(new URL('.', import.meta.url));

const paginas = [
  'index.html',
  'paginas/autenticacao/login/index.html',
  'paginas/jovem/inicio/index.html',
  'paginas/jovem/nos-listagem/index.html',
  'paginas/jovem/no-detalhes/index.html',
  'paginas/jovem/amarras/index.html',
  'paginas/jovem/leis/index.html',
  'paginas/jovem/acampamento/index.html',
  'paginas/jovem/bussola/index.html',
  'paginas/jovem/morse/index.html',
  'paginas/jovem/sobre/index.html',
  'paginas/administracao/painel/index.html',
  'paginas/administracao/membros-listagem/index.html',
  'paginas/administracao/membro-formulario/index.html',
  'paginas/administracao/membro-detalhes/index.html',
  'paginas/administracao/materiais-listagem/index.html',
  'paginas/administracao/material-formulario/index.html',
  'paginas/administracao/material-detalhes/index.html',
  'paginas/administracao/kits-listagem/index.html',
  'paginas/administracao/kit-formulario/index.html',
  'paginas/administracao/kit-detalhes/index.html',
  'paginas/administracao/atividades-listagem/index.html',
  'paginas/administracao/atividade-formulario/index.html',
  'paginas/administracao/atividade-detalhes/index.html',
  'paginas/administracao/atividade-devolucao/index.html',
  'paginas/administracao/conferencias-listagem/index.html',
  'paginas/administracao/conferencia-execucao/index.html',
  'paginas/administracao/conferencia-resultado/index.html',
  'paginas/administracao/manutencoes-listagem/index.html',
  'paginas/administracao/manutencao-detalhes/index.html',
  'paginas/administracao/necessidades-listagem/index.html',
  'paginas/administracao/necessidade-formulario/index.html',
  'paginas/administracao/necessidade-detalhes/index.html'
];

export default defineConfig({
  base: './',
  publicDir: 'publico',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        paginas.map((pagina) => [pagina.replace(/[^a-z0-9]+/gi, '-'), resolve(pastaProjeto, pagina)])
      )
    }
  }
});
