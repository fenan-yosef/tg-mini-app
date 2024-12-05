import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("task_manager");

        switch (req.method) {
            case "POST":
                const task = {
                    ...req.body,
                    task_id: uuidv4(), // Add a unique task_id
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                await db.collection("tasks").insertOne(task);
                res.status(201).json({ message: "Task added successfully" });
                break;
            case "GET":
                const tasks = await db.collection("tasks").find({}).toArray();
                res.status(200).json(tasks);
                break;
            case "DELETE":
                const { task_id } = req.body; // Get task_id from the request body
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
                res.setHeader("Allow", ["GET", "POST"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

