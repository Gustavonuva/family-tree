import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import styles from "./Login.module.css"; // Importe os estilos do módulo CSS

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://7dev-code-test.lcc7.online/api/v1/token",
        {
          username,
          password,
        }
      );

      // Salva o token no localStorage
      localStorage.setItem("token", response.data.access);

      // Chama a função login após o token ser salvo
      login();
    } catch (error) {
      console.error("Erro durante o login:", error);
      // Lide com erros de login, exiba mensagens de erro, etc.
    }
  };

  useEffect(() => {
    // Obtenha o token do localStorage
    const token = localStorage.getItem("token");

    // Verifique se o token está presente
    if (token) {
      login(); // Chama a função login se houver um token
    } else {
      console.log("Token não encontrado. Usuário não autenticado.");
    }
  }, [login]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <h2 className="d-flex justify-content-center">Login</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </div>
        <button className={styles.button} onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
