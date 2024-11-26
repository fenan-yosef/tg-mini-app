export default function ProjectsPage() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">My Projects</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded shadow-lg">
            <h2 className="text-xl">6 In Progress</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded shadow-lg">
            <h2 className="text-xl">2 On Pause</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded shadow-lg">
            <h2 className="text-xl">13 Completed</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded shadow-lg">
            <h2 className="text-xl">9 Upcoming</h2>
          </div>
        </div>
      </div>
    );
  }
  