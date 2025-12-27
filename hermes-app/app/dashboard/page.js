'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardPage() {
  const [bens, setBens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBens() {
      setLoading(true);
      const { data, error } = await supabase
        .from('bens_patrimoniais')
        .select(`
          id,
          numero_patrimonio,
          descricao,
          status,
          unidades ( sigla ),
          perfis ( nome_completo )
        `);

      if (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } else {
        setBens(data);
      }
      setLoading(false);
    }

    fetchBens();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', color: 'var(--primary-color)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px', marginBottom: '24px' }}>
        Dashboard de Patrimônio
      </h1>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro ao carregar os dados: {error}</p>}

      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Nº Patrimônio</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Descrição</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Unidade</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {bens.map((bem) => (
              <tr key={bem.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{bem.numero_patrimonio}</td>
                <td style={{ padding: '12px' }}>{bem.descricao}</td>
                <td style={{ padding: '12px' }}>{bem.status}</td>
                <td style={{ padding: '12px' }}>{bem.unidades?.sigla || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{bem.perfis?.nome_completo || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
