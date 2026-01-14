import connectToDatabase from '@/lib/mongodb';
import Location from '@/models/Location';

export const dynamic = 'force-dynamic';

export default async function ShowPage() {
  await connectToDatabase();
  const locations = await Location.find().sort({ timestamp: -1 }).lean();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Localizações Salvas</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Agent</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((loc: any) => (
                <tr key={loc._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(loc.timestamp).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loc.latitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loc.longitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a href={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`} target="_blank" rel="noopener noreferrer">
                      Ver no Maps
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={loc.userAgent}>
                    {loc.userAgent}
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Nenhuma localização salva ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
