# Documentação do Projeto

Este é um guia de documentação para o projeto Family-tree, que é uma aplicação web para gerenciamento de pastas e subpastas.

## Conteúdo

- [Introdução](#introdução)
- [Instalação](#instalação)
- [Uso](#uso)
- [Componentes](#componentes)
- [Funções de Manipulação de Pastas](#funções-de-manipulação-de-pastas)

## Introdução

O projeto TreeList é uma aplicação web desenvolvida em React.js que permite aos usuários visualizar, criar, renomear e excluir pastas e subpastas. Ele foi criado com o objetivo de oferecer uma interface simples e intuitiva para gerenciar hierarquias de diretórios.

## Instalação

Para instalar e executar o projeto localmente, siga estas etapas:

1. Clone o repositório do GitHub:

   ```bash
   git clone https://github.com/Gustavonuva/family-tree.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd family-tree
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie a aplicação:

   ```bash
   npm start
   ```

## Uso

Após a instalação e inicialização da aplicação, você pode acessá-la em seu navegador. A interface permitirá visualizar, criar, renomear e excluir pastas e subpastas.

### Componentes

#### TreeList

Este componente é responsável por exibir a lista de árvores.

##### Props

- **Nenhum**

##### Uso

```jsx
<TreeList />
```

##### Descrição

O componente TreeList é utilizado para exibir a lista de árvores, permitindo a visualização, criação, exclusão e renomeação de pastas.

#### TreeNode

Este componente representa um nó da árvore.

##### Props

- **node**: Objeto contendo os dados do nó da árvore.
- **handleDeleteFolder**: Função para lidar com a exclusão de uma pasta.
- **handleRenameFolder**: Função para lidar com a renomeação de uma pasta.
- **handleCreateFolder**: Função para lidar com a criação de uma nova pasta.

##### Uso

```jsx
<TreeNode
  node={nodeData}
  handleDeleteFolder={handleDeleteFolder}
  handleRenameFolder={handleRenameFolder}
  handleCreateFolder={handleCreateFolder}
/>
```

##### Descrição

O componente TreeNode representa um nó da árvore exibida na TreeView. Ele exibe o nome da pasta, ícones para ações (excluir, renomear) e possibilita a adição de subpastas.

#### TreeView

Este componente representa a visualização da árvore de pastas.

##### Props

- **data**: Array contendo os dados das pastas a serem exibidas na árvore.
- **handleDeleteFolder**: Função para lidar com a exclusão de uma pasta.
- **handleRenameFolder**: Função para lidar com a renomeação de uma pasta.
- **handleCreateFolder**: Função para lidar com a criação de uma nova pasta.

##### Uso

```jsx
<TreeView
  data={treeData}
  handleDeleteFolder={handleDeleteFolder}
  handleRenameFolder={handleRenameFolder}
  handleCreateFolder={handleCreateFolder}
/>
```

##### Descrição

O componente TreeView exibe a visualização da árvore de pastas. Ele itera sobre os dados fornecidos e renderiza cada nó usando o componente TreeNode.

#### CreateFolderModal

Este componente exibe um modal para criar uma nova pasta.

##### Props

- **showModal**: Estado que controla a exibição do modal.
- **setShowModal**: Função para alterar o estado de exibição do modal.
- **setTreeData**: Função para atualizar os dados da árvore após a criação da pasta.
- **setLoading**: Função para alterar o estado de carregamento.
- **setError**: Função para definir mensagens de erro.

##### Uso

```jsx
<CreateFolderModal
  showModal={showCreateModal}
  setShowModal={setShowCreateModal}
  setTreeData={setTreeData}
  setLoading={setLoading}
  setError={setError}
/>
```

##### Descrição

O componente CreateFolderModal exibe um modal para o usuário inserir o nome da nova pasta e cria-la.

#### RenameFolderModal

Este componente exibe um modal para renomear uma pasta existente.

##### Props

- **showModal**: Estado que controla a exibição do modal.
- **setShowModal**: Função para alterar o estado de exibição do modal.
- **selectedFolderId**: ID da pasta a ser renomeada.
- **renameFolderName**: Estado que armazena o novo nome da pasta.
- **setRenameFolderName**: Função para alterar o estado do novo nome da pasta.
- **setTreeData**: Função para atualizar os dados da árvore após a renomeação da pasta.
- **setLoading**: Função para alterar o estado de carregamento.
- **treeData**: Dados da árvore de pastas.
- **setError**: Função para definir mensagens de erro.

##### Uso

```jsx
<RenameFolderModal
  showModal={showRenameModal}
  setShowModal={setShowRenameModal}
  selectedFolderId={selectedFolderId}
  renameFolderName={renameFolderName}
  setRenameFolderName={setRenameFolderName}
  setTreeData={setTreeData}
  setLoading={setLoading}
  treeData={treeData}
  setError={setError}
/>
```

##### Descrição

O componente RenameFolderModal exibe um modal para o usuário renomear uma pasta existente.

#### AddSubFolderModal

Este componente exibe um modal para adicionar uma subpasta à pasta existente.

##### Props

- **showModal**: Estado que controla a exibição do modal.
- **setShowModal**: Função para alterar o estado de exibição do modal.
- **handleAddSubFolder**: Função para lidar com a adição de uma subpasta.
- **parentFolderId**: ID da pasta pai da subpasta a ser adicionada.

##### Uso

```jsx
<AddSubFolderModal
  showModal={showAddModal}
  setShowModal={setShowAddModal}
  handleAddSubFolder={handleAddSubfolder}
  parentFolderId={node.id}
/>
```

##### Descrição

O componente AddSubFolderModal exibe um modal para o usuário adicionar uma subpasta à pasta existente.

### Funções de Manipulação de Pastas

Estas funções

são responsáveis por lidar com operações relacionadas à criação, exclusão e renomeação de pastas.

- **handleCreateFolder**: Cria uma nova pasta.
- **handleDeleteFolder**: Exclui uma pasta existente.
- **handleRenameFolder**: Renomeia uma pasta existente.
- **handleAddSubFolder**: Adiciona uma subpasta à pasta existente.
