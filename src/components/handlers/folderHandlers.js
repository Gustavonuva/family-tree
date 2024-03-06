import axios from "axios";

export const handleCreateFolder = async (
  newFolderName,
  parentFolderId,
  setTreeData,
  setLoading,
  setShowModal,
  setError
) => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://7dev-code-test.lcc7.online/api/v1/directories",
      {
        name: newFolderName,
        parent: parentFolderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const createdFolder = response.data;
    setTreeData((prevData) => [...prevData, createdFolder]);
    setShowModal(false);
    setError(null);
  } catch (error) {
    setError("Erro ao criar a pasta. Por favor, tente novamente mais tarde.");
    console.error("Error creating folder:", error);
  } finally {
    setLoading(false);
  }
};

export const handleDeleteFolder = async (
  folderId,
  setTreeData,
  treeData,
  setError
) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://7dev-code-test.lcc7.online/api/v1/directory/${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Atualiza os dados após excluir a pasta
    const updatedTreeData = treeData.filter((folder) => folder.id !== folderId);
    setTreeData(updatedTreeData);
  } catch (error) {
    setError("Erro ao excluir pasta. Por favor, tente novamente mais tarde.");
    console.error("Error deleting folder:", error);
  }
};

export const handleRenameFolder = async (
  selectedFolderId,
  renameFolderName,
  setTreeData,
  setLoading,
  setShowRenameModal,
  setError,
  treeData
) => {
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
    const updatedTreeData = treeData.map((folder) => {
      if (folder.id === selectedFolderId) {
        return {
          ...folder,
          name: renameFolderName,
        };
      }
      return folder;
    });

    setTreeData(updatedTreeData);
    setError(null); // Limpar qualquer erro anterior
    setShowRenameModal(false); // Fechar o modal após renomear
  } catch (error) {
    setError("Erro ao renomear pasta. Por favor, tente novamente mais tarde.");
    console.error("Error renaming folder:", error);
  } finally {
    setLoading(false);
  }
};

export const handleAddSubFolder = async (
  newFolderName,
  parentFolderId,
  setTreeData,
  setShowModal
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://7dev-code-test.lcc7.online/api/v1/directories",
      {
        name: newFolderName,
        parent: parentFolderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const createdFolder = response.data;

    setTreeData((prevData) => [...prevData, createdFolder]);

    setShowModal(false);
  } catch (error) {
    console.error("Error creating subfolder:", error);
  }
};
