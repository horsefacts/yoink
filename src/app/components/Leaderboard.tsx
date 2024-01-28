export default function Leaderboard({
  leaderboard,
}: {
  leaderboard: [string, number][];
}) {
  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <div className="overflow-x-auto px-32">
        <table className="min-w-full p-16 text-center border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">
                Rank
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">
                User
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 10).map(([user, score], index) => (
              <tr key={user}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user}</td>
                <td className="border border-gray-300 px-4 py-2">{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
