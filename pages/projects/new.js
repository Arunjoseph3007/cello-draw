import axios from "axios";
import { useState } from "react";

export default function NewProjects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState(null);

  //@ Chnage handler
  const handleChange = (e) => {
    if (e.target.validity.valid) {
      setErr(null);
    } else {
      setErr("Enter valid input");
    }
    setName(e.target.value);
  };

  //@ submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (err) return;

    try {
      const response = await axios.post("/api/projects/new", {
        name,
        description,
      });

      const project = response.data;

      console.log(project);
    } catch (error) {
      setErr(error);
    }
  };

  //$ UI
  return (
    <form onSubmit={handleSubmit} className="max-w-[1000px] w-full mx-auto p-5">
      <h1 className="capitalize text-4xl font-semibold">new project</h1>

      {/* //@ Name */}
      <div className="flex flex-col gap-3 my-3">
        <label htmlFor="name">Name *</label>
        <input
          placeholder="Name of the project"
          className="input rounded-md bg-gray-600 invalid:border-red-600"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          pattern="[a-zA-Z0-9_-]*"
        />
      </div>

      {/* //@ Description */}
      <div className="flex flex-col gap-3 my-3">
        <label htmlFor="description">
          Descirption <span className="text-xs">(optional)</span>
        </label>
        <textarea
          rows={20}
          placeholder="A short description"
          className="input h-36 rounded-md bg-gray-600 invalid:border-red-600"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* //@ Error */}
      {err && <p className="text-error text-sm my-3">*{err}</p>}

      {/* //@ Submit */}
      <button type="submit" className="btn btn-primary mx-auto">
        Create
      </button>
    </form>
  );
}
