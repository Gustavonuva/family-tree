import React, { useEffect, useState } from "react";
import TreeView from "../../components/Tree/TreeView/TreeView";
import { Dropdown, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFolderPlus } from "react-icons/fa";
import RenameFolderModal from "../modals/RenameFolderModal";
import CreateFolderModal from "../modals/CreateFolderModal";
import AddSubFolderModal from "../modals/AddSubFolderModal";
import {
  handleDeleteFolder,
  handleCreateFolder,
  handleAddSubFolder,
} from "../handlers/folderHandlers";
import axios from "axios";
import "./TreeList.css";

const TreeList = () => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [renameFolderName, setRenameFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [parentFolderId, setParentFolderId] = useState("");
  const [showAddSubFolderModal, setShowAddSubFolderModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado. Usuário não autenticado.");
      return;
    }

    fetchData(token);
  }, []);

  const handleDelete = async (folderId) => {
    try {
      await handleDeleteFolder(folderId, setTreeData, treeData, setError);
    } catch (error) {
      setError("Erro ao excluir pasta. Por favor, tente novamente mais tarde.");
      console.error("Error deleting folder:", error);
    }
  };

  const fetchData = async (token) => {
    try {
      setLoading(true);

      if (!token) {
        setError("Token não encontrado. Usuário não autenticado.");
        return;
      }

      const response = await axios.get(
        "https://7dev-code-test.lcc7.online/api/v1/directories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedData = response.data;
      setTreeData(formattedData);
      setError(null);
    } catch (error) {
      setError(
        "Erro ao buscar os diretórios. Por favor, tente novamente mais tarde."
      );
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Abre o modal para adicionar uma nova pasta
  const handleShowCreateModal = () => setShowCreateModal(true);

  // Abre o modal para renomear uma pasta
  const handleShowRenameModal = (folderId) => {
    setSelectedFolderId(folderId);
    setShowRenameModal(true);
  };

  // Abre o modal para adicionar uma subpasta
  const handleOpenAddSubFolderModal = (parentFolderId) => {
    setParentFolderId(parentFolderId);
    setShowAddSubFolderModal(true);
  };

  // Abre o modal para adicionar uma subpasta
  const handleShowAddModal = () => setShowAddModal(true);

  return (
    <>
      <CreateFolderModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        setTreeData={setTreeData}
        setLoading={setLoading}
        setError={setError}
        handleCreateFolder={handleCreateFolder}
      />
      <RenameFolderModal
        showModal={showRenameModal}
        setShowModal={setShowRenameModal}
        selectedFolderId={selectedFolderId}
        renameFolderName={renameFolderName}
        setRenameFolderName={setRenameFolderName}
        setTreeData={setTreeData}
        setLoading={setLoading}
        setError={setError}
      />
      <AddSubFolderModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        handleAddSubFolder={handleAddSubFolder}
        setError={setError}
        parentFolderId={parentFolderId}
        setLoading={setLoading}
        isSubFolder={true}
      />

      <div className="container ">
        <div>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : error ? (
            <div>Erro: {error}</div>
          ) : (
            <TreeView
              data={treeData}
              handleDeleteFolder={handleDelete}
              handleRenameFolder={handleShowRenameModal}
              handleCreateFolder={handleShowAddModal}
              handleOpenAddSubFolderModal={handleOpenAddSubFolderModal} // Adicione esta prop
            />
          )}
        </div>
      </div>
      <Dropdown className="dropdown-button ">
        <Dropdown.Toggle variant="primary">Opções</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShowCreateModal}>
            <FaFolderPlus className="mr-2" /> Adicionar Pasta
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <style jsx>{`
        .add-button {
          gap: 5px;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default TreeList;
