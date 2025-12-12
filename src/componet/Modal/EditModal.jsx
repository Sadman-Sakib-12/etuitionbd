import React from 'react'

const EditModal = ({ editingTuition, setEditingTuition, handleUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Tuition</h2>

        <label className="block mb-2">
          Subject:
          <input
            type="text"
            value={editingTuition.subject}
            onChange={e => setEditingTuition({ ...editingTuition, subject: e.target.value })}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Class:
          <input
            type="text"
            value={editingTuition.class}
            onChange={e => setEditingTuition({ ...editingTuition, class: e.target.value })}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Location:
          <input
            type="text"
            value={editingTuition.location}
            onChange={e => setEditingTuition({ ...editingTuition, location: e.target.value })}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <label className="block mb-4">
          Budget:
          <input
            type="number"
            value={editingTuition.budget}
            onChange={e => setEditingTuition({ ...editingTuition, budget: e.target.value })}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingTuition(null)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
