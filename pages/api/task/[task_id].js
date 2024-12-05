import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("task_manager");

        const { task_id } = req.query;

        switch (req.method) {
            case "GET":
                // Fetch a task by task_id
                const task = await db.collection("tasks").findOne({ task_id: task_id });
                if (!task) {
                    res.status(404).json({ message: "Task not found" });
                } else {
                    res.status(200).json(task);
                }
                break;

            case "PUT":
                // Update a task by task_id
                const updateData = req.body;

                // Add updatedAt field
                updateData.updatedAt = new Date();

                const result = await db.collection("tasks").updateOne(
                    { task_id: task_id },
                    { $set: updateData }
                );

                if (result.matchedCount === 0) {
                    res.status(404).json({ message: "Task not found" });
                } else {
                    res.status(200).json({ message: "Task updated successfully" });
                }
                break;

            default:
                res.setHeader("Allow", ["GET", "PUT"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
