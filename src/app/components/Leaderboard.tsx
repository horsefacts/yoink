export default function Leaderboard({
    leaderboard,
  }: {
    leaderboard: [string, number][];
  }) {
    return (
      <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-32">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-2 text-gray-600 text-sm sm:px-4 sm:py-2 sm:text-base">
                  Rank
                </th>
                <th className="border border-gray-300 px-2 py-2 text-gray-600 text-sm sm:px-4 sm:py-2 sm:text-base">
                  User
                </th>
                <th className="border border-gray-300 px-2 py-2 text-gray-600 text-sm sm:px-4 sm:py-2 sm:text-base">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(0, 10).map(([user, score], index) => (
                <tr key={user}>
                  <td className="border border-gray-300 px-2 py-2 text-sm sm:px-4 sm:py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-sm sm:px-4 sm:py-2">{user}</td>
                  <td className="border border-gray-300 px-2 py-2 text-sm sm:px-4 sm:py-2">{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
