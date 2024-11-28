import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("task_manager");

        switch (req.method) {
            case "GET":
                const tasks = await db.collection("tasks").find({}).toArray();
                res.status(200).json(tasks);
                break;
            case "POST":
                const task = req.body;
                await db.collection("tasks").insertOne(task);
                res.status(201).json({ message: "Task added successfully" });
                break;
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
