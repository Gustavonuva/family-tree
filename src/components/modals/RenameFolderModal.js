import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const RenameFolderModal = ({
  showModal,
  setShowModal,
  selectedFolderId,
  renameFolderName,
  setRenameFolderName,
  setTreeData,
  setLoading,
  treeData,
  setError,
}) => {
  useEffect(() => {
    if (showModal) {
      setRenameFolderName(""); // Limpa o campo de renomeação ao abrir o modal
    }
  }, [showModal, setRenameFolderName]);
  const handleRenameFolder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.patch(
        `https://7dev-code-test.lcc7.online/api/v1/directory/${selectedFolderId}`,
        {
          name: renameFolderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza os dados após renomear a pasta
      // Chama a função setTreeData para atualizar os dados do diretório
      setTreeData((prevData) =>
        prevData.map((folder) =>
          folder.id === selectedFolderId
            ? { ...folder, name: renameFolderName }
            : folder
        )
      );

      setError(null); // Limpar qualquer erro anterior
      setShowModal(false); // Fechar o modal após renomear
    } catch (error) {
      setError(
        "Erro ao renomear pasta. Por favor, tente novamente mais tarde."
      );
      console.error("Error renaming folder:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRenameFolderName(""); // Limpa o campo de renomeação
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Renomear Pasta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRenameFolderName">
            <Form.Label>Novo Nome:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o novo nome da pasta"
              value={renameFolderName}
              onChange={(e) => setRenameFolderName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleRenameFolder}>
          Renomear Pasta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameFolderModal;
