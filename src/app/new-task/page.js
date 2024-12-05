'use client'
import { useState } from "react";
import NavLink from "../components/NavLink";



export default function TasksPage() {

  const priorities = [
    { label: "Urgent", value: "urgent" },
    { label: "Normal", value: "normal" },
    { label: "Low", value: "low" },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (!title || !description || !dueDate || !estimatedHours) {
      alert("Please fill out all required fields.");
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      estimatedHours: parseInt(estimatedHours),
      priority: selectedPriority,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/add_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        alert("Task created successfully!");
        // Reset form fields
        setTitle("");
        setDescription("");
        setDueDate("");
        setEstimatedHours("");
        setSelectedPriority("normal");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to create task"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="">
      {/* Header */}
      <div className="p-4 flex">
        <NavLink styles="font-light" href="/" icon="faHome" label="Cancel" />
        <div className="flex align-middle m-auto pr-6">
          <p className="text-center font-bold">New Task</p>
        </div>
      </div>

      {/* Body */}
      <div className=" px-4">

        <ThinText label={"Title"} />
        <CustomInput type="text" placeholder="Enter your name" />

        <ThinText label={"Description"} />
        {/* <CustomInput type="text" placeholder="" additionalStyles="min-h-48" /> */}
        <textarea
          placeholder=""
          className={`bg-[#1e2a38] min-h-48 text-white ml-1 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-blue-900 `}
        />

        {/* Time */}
        <div className="flex justify-center align-middle ">

          <div className="m-2 ">
            <ThinText label={"Due Date"} />
            <CustomInput type="date" placeholder="" />
          </div>

          <div className="m-2 ">
            <ThinText label={'Estimate Task'} />
            <CustomInput type="number" placeholder="HH" additionalStyles="" min="0" max="99" />
          </div>

        </div>

        {/* Priority */}
        <div className="m-2">
          <ThinText label={"Priority"} />
          <div className="flex items-center gap-2 mt-2 bg-[#1e2a38]">
            {priorities.map((priority) => (
              <button
                key={priority.value}
                onClick={() => setSelectedPriority(priority.value)}
                className={`flex-1 text-white px-4 py-2 rounded-lg ${selectedPriority === priority.value
                  ? "bg-[#4987de]"
                  : "bg-[#1e2a38]"
                  } focus:outline-none transition duration-300`}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>


      </div>
    </div >
  );
}

function ThinText({ label }) {
  return (
    <div>
      <p className="font-thin text-sm pt-4 pb-1 px-1">{label}</p>
    </div>
  );
}

function CustomInput({ type = "text", placeholder = "", additionalStyles = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-[#1e2a38] text-white w-full min-h-16 px-3 mb-4 pt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-blue-900 ${additionalStyles}`}
    />
  );
}
