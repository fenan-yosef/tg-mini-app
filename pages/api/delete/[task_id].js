import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("task_manager");

        const { task_id } = req.query; // Extract task_id from the URL

        switch (req.method) {
            case "DELETE":
                if (!task_id) {
                    return res.status(400).json({ error: "Task ID is required" });
                }
                const deleteResult = await db.collection("tasks").deleteOne({ task_id });
                if (deleteResult.deletedCount === 0) {
                    return res.status(404).json({ error: "Task not found" });
                }
                res.status(200).json({ message: "Task deleted successfully" });
                break;
            default:
                res.setHeader("Allow", ["DELETE"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
