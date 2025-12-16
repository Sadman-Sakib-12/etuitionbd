const MyApplicationModal = ({ editingTuition, setEditingTuition, handleUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Tuition</h2>

        <label className="block mb-2">
          Qualifications:
          <input
            type="text"
            value={editingTuition.qualifications}
            onChange={e =>
              setEditingTuition({ ...editingTuition, qualifications: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
        </label>

        <label className="block mb-2">
          Experience:
          <input
            type="text"
            value={editingTuition.experience}
            onChange={e =>
              setEditingTuition({ ...editingTuition, experience: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
        </label>

        <label className="block mb-4">
          Expected Salary:
          <input
            type="text"
            value={editingTuition.expectedSalary}
            onChange={e =>
              setEditingTuition({ ...editingTuition, expectedSalary: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingTuition(null)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            disabled={!editingTuition}
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  )
}

export default MyApplicationModal
