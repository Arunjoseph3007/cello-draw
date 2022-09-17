import { useState } from "react";

export default function SaveModal({ visible, setVisible, handleSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //$ UI
  return (
    <>
      <input
        readOnly
        defaultChecked={visible}
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <h3 className="font-bold text-2xl">Save Your Project</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>

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
              onChange={(e) => setName(e.target.value)}
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

          <div className="modal-action">
            <label
              onClick={() => handleSave(name, description)}
              className="btn btn-success"
            >
              save
            </label>
            <label onClick={() => setVisible(false)} className="btn btn-error">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
