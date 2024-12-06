import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        console.log('here')
        const client = await clientPromise;
        const db = client.db("task_manager");

        const { user_id } = req.query; // Extract user_id from query params

        switch (req.method) {
            case "GET":
                // Fetch tasks by user_id
                const tasks = await db.collection("tasks").find({ user_id: Number(user_id), deleted: false }).toArray();
                // console.log(tasks)
                if (!tasks.length) {
                    res.status(404).json({ message: "No tasks found for this user" });
                } else {
                    res.status(200).json(tasks);
                }
                break;

            case "PUT":
                // Update a task by task_id (if needed)
                const { task_id } = req.body; // Ensure task_id is included in the body
                const updateData = req.body;

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
