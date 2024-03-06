import React, { useState } from "react";
import { FaEdit, FaFolder, FaFolderPlus, FaTrashAlt } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import AddSubFolderModal from "../../modals/AddSubFolderModal";
import "./TreeNode.css";

const TreeNode = ({
  node,
  handleDeleteFolder,
  handleRenameFolder,
  handleCreateFolder,
}) => {
  const [childVisible, setChildVisibility] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const hasChild = node.children && node.children.length > 0;

  const handleAddSubfolder = (newFolderName) => {
    handleCreateFolder(newFolderName, node.id); // Passa o ID atual como o ID do pai
  };

  return (
    <li className="tree-node">
      <div onClick={() => setChildVisibility(!childVisible)}>
        {hasChild && (
          <div className={`tree-toggler ${childVisible ? "active" : ""}`}></div>
        )}
        <div className="col tree-head">
          <FaFolder className="m-1" />
          {node.name}
          <Dropdown className="tree-dropdown-toggle">
            <Dropdown.Toggle
              variant="none"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowAddModal(true)}>
                <FaFolderPlus className="mr-2" /> Adicionar SubPasta
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDeleteFolder(node.id)}>
                <FaTrashAlt className="mr-2" /> Excluir Pasta
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleRenameFolder(node.id)}>
                <FaEdit className="mr-2" /> Renomear Pasta
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="tree-content">
          <ul className="tree-list-ul">
            {node.children.map((child) => (
              <ul key={child.id} className="">
                <TreeNode
                  key={child.id}
                  node={child}
                  handleDeleteFolder={handleDeleteFolder}
                  handleRenameFolder={handleRenameFolder}
                  handleCreateFolder={handleCreateFolder}
                />
              </ul>
            ))}
          </ul>
        </div>
      )}

      <AddSubFolderModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        handleAddSubfolder={handleAddSubfolder}
        parentFolderId={node.id}
      />
    </li>
  );
};

export default TreeNode;
