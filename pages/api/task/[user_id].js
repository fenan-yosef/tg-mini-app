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
                const { task_id, updateFields } = req.body; // Expect task_id and updateFields in the body

                if (!task_id) {
                    return res.status(400).json({ message: "Task ID is required for updating." });
                }

                // Prepare update data
                const updatedData = {
                    ...updateFields, // Fields to update (e.g., leftHours, onPause, etc.)
                    updatedAt: new Date() // Add updatedAt timestamp
                };

                const updateResult = await db.collection("tasks").updateOne(
                    { task_id: task_id, user_id: Number(user_id) }, // Match by user_id and task_id
                    { $set: updatedData }
                );

                if (updateResult.matchedCount === 0) {
                    res.status(404).json({ message: "Task not found or does not belong to the user." });
                } else {
                    res.status(200).json({ message: "Task updated successfully", updatedData });
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
