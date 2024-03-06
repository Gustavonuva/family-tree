import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const CreateFolderModal = ({
  showModal,
  setShowModal,
  setTreeData,
  setLoading,
  setError,
}) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const handleCreateFolder = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://7dev-code-test.lcc7.online/api/v1/directories",
        {
          name: newFolderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdFolder = response.data;
      setTreeData((prevData) => [...prevData, createdFolder]);
      setNewFolderName("");
      setShowModal(false);
      setError(null);
    } catch (error) {
      setError("Erro ao criar a pasta. Por favor, tente novamente mais tarde.");
      console.error("Error creating folder:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Pasta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFolderName">
            <Form.Label>Nome da Pasta:</Form.Label>
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
        <Button variant="primary" onClick={handleCreateFolder}>
          Criar Pasta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateFolderModal;
