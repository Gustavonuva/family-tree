import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { handleAddSubFolder } from "../handlers/folderHandlers"; 

const AddSubFolderModal = ({
  showModal,
  setShowModal,
  setTreeData,
  setError,
  parentFolderId,
}) => {
  const [newFolderName, setNewFolderName] = useState("");

  // Fecha o modal e limpa o estado do novo nome da pasta
  const handleCloseModal = () => {
    setShowModal(false);
    setNewFolderName("");
  };

  // Manipula a adição de uma nova subpasta
  const handleAddSubFolderModal = async () => {
    try {
      const token = localStorage.getItem("token");

      // Verifica se o token está presente antes de prosseguir
      if (!token) {
        console.error("Token not found. User not authenticated.");
        return;
      }

      // Chama a função para adicionar subpasta
      await handleAddSubFolder(
        newFolderName,
        parentFolderId,
        setTreeData,
        setShowModal,
        setError
      );

      // Recarrega a página após a adição da subpasta (considere alternativas)
      window.location.reload();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding subfolder:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Subpasta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewFolderName">
            <Form.Label>Nome da nova pasta:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da nova pasta"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleAddSubFolderModal}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubFolderModal;
