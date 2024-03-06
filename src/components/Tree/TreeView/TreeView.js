import React from "react";
import TreeNode from "../TreeNode/TreeNode";

const TreeView = ({
  data,
  handleDeleteFolder,
  handleRenameFolder,
  handleCreateFolder,
}) => {
  if (!data || data.length === 0) {
    return <div>Nenhum dado disponível.</div>;
  }

  // Função para adicionar a propriedade filhos as pastas raiz
  const addChildrenProperty = (nodes) => {
    const nodeMap = new Map();

    // Mapeia todos  pelo id
    nodes.forEach((node) => {
      nodeMap.set(node.id, { ...node, children: [] });
    });

    // Adiciona os filhos a pasta raiz pais correspondentes
    nodes.forEach((node) => {
      const parent = nodeMap.get(node.parent);
      if (parent) {
        parent.children.push(nodeMap.get(node.id));
      }
    });

    // Retorna apenas as pastas pais
    return Array.from(nodeMap.values()).filter((node) => !node.parent);
  };

  // Aplica a formatação da árvore, adicionando a propriedade 'children' aos nós
  const formattedData = addChildrenProperty(data);

  return (
    <div>
      <ul className="tree-list">
        {formattedData.map((tree) => (
          <TreeNode
            key={tree.id}
            node={tree}
            handleDeleteFolder={handleDeleteFolder}
            handleRenameFolder={handleRenameFolder}
            handleCreateFolder={handleCreateFolder}
          />
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
