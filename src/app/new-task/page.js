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
  const [taskType, setTaskType] = useState('task')
  const [meetingDate, setMeetingDate] = useState("")


  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill out all required fields.");
      return;
    }
    if ((taskType === 'task' && (!dueDate || !estimatedHours)) ||
      (taskType == 'meeting') && !meetingDate) {
      alert("Please fill out all required fields.");
      return;
    }
    const tg = window.Telegram.WebApp;

    tg.ready();
    const now = new Date();

    const user = tg.initDataUnsafe?.user;

    const user_id = user?.id || "defaultUserId";

    const newTask = {
      title,
      taskType,
      user_id,
      description,
      setDate: now,
      leftHours: parseInt(estimatedHours),
      onPause: false,
      deleted: false,
      createdAt: { $date: { $numberLong: now.getTime().toString() } },
      updatedAt: { $date: { $numberLong: now.getTime().toString() } },
    };

    if (taskType === 'task') {
      newTask.dueDate = dueDate;
      newTask.estimatedHours = parseInt(estimatedHours);
      newTask.priority = selectedPriority;
    } else if (taskType === 'meeting') {
      newTask.meetingDate = meetingDate;
    }

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
        setMeetingDate('')
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

  const [isFocused, setIsFocused] = useState(false)


  return (
    <div className="mb-24">
      {/* Header */}
      <div className="p-4 flex">
        <NavLink styles="font-light" href="/" icon="faHome" label="Cancel" />
        <div className="flex align-middle m-auto pr-6">
          <p className="text-center font-bold">New Task</p>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={() => setTaskType('task')}
          className={`px-4 py-2 ${taskType === 'task' ? 'bg-[#4987de] text-white shadow-lg shadow-inner shadow-black' : 'bg-gray-200 text-gray-700 '} rounded-l-xl`}
        >
          Task
        </button>
        <button
          onClick={() => setTaskType('meeting')}
          className={`px-4 py-2 ${taskType === 'meeting' ? 'bg-[#4987de] text-white shadow-lg shadow-inner shadow-black' : 'bg-gray-200 text-gray-700'} rounded-r-xl`}
        >
          Meeting
        </button>
      </div>

      {/* Body */}
      <div className="px-4">
        <ThinText label={"Title"} />
        <CustomInput
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ThinText label={"Description"} />
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-2 rounded-lg bg-[#1e2a38] text-white transition duration-300 ${isFocused || description
            ? 'border-2 border-[#e0f569]'
            : 'border border-transparent'
            } focus:outline-none`}
        />

        {/* Task specific fields*/}
        {
          taskType == 'task' && (
            <>
              <div className="flex justify-center align-middle ">
                <div className="m-2 min-w-36">
                  <ThinText label={"Due Date"} />
                  <CustomInput
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="m-2">
                  <ThinText label={"Estimate Task"} />
                  <CustomInput
                    type="number"
                    placeholder="HH"
                    min="0"
                    max="99"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                  />
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
            </>)
        }

        {/* Meeting-Specific Fields */}
        {taskType === 'meeting' && (
          <div className="m-2">
            <ThinText label="Meeting Date" />
            <CustomInput
              type="datetime-local"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
          </div>
        )}

        {/* submit */}
        <div className="flex justify-center">
          <button
            className="bg-[#e0f569] text-black font-bold py-3 px-6 rounded-2xl shadow-md"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {taskType == 'task' ? isSubmitting ? "Creating Task..." : "Create Task" : isSubmitting ? "Setting up Meeting..." : "Create Meeting"}
          </button>
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

function CustomInput({ type = "text", placeholder = "", additionalStyles = "", value, onChange, ...rest }) {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg bg-[#1e2a38] text-white transition duration-300 ${isFocused || value
        ? 'border-2 border-[#e0f569]'
        : 'border border-transparent'
        } focus:outline-none`}
      {...rest}
    />
  );
}
