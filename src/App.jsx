import { useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";

export default function App() {
  const [perfis, setPerfis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarPerfis() {
      const { data, error } = await supabase
        .from("perfis")
        .select("id, nome, email, bio, created_at");

      if (error) {
        setErro(error.message);
      } else {
        setPerfis(data || []);
      }

      setCarregando(false);
    }

    buscarPerfis();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🌟 Perfis do Agosto Dourado</h1>

      <p>
        Dados carregados diretamente do Supabase.
      </p>

      {carregando && <p>Carregando dados da nuvem...</p>}

      {erro && (
        <p style={{ color: "red" }}>
          Erro: {erro}
        </p>
      )}

      {!carregando && !erro && (
        <div>
          {perfis.map((perfil) => (
            <div
              key={perfil.id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{perfil.nome}</h2>

              <p>
                <strong>E-mail:</strong> {perfil.email}
              </p>

              {perfil.bio && (
                <p>
                  <strong>Bio:</strong> {perfil.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}