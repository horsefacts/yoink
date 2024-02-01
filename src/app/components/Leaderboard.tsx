export default function Leaderboard({
    leaderboard,
  }: {
    leaderboard: [string, number][];
  }) {
    return (
      <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-32">
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="overflow-x-auto text-xl">
          <table className="w-full text-center border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                  Rank
                </th>
                <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                  User
                </th>
                <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(0, 100).map(([user, score], index) => (
                <tr key={user}>
                  <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2"><a className="hover:underline hover:text-red-500" href={`https://warpcast.com/${ user.startsWith("FID #") ? '' : user}`} target="_blank">{user}</a></td>
                  <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2">{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
