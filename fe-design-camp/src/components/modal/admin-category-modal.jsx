export default function AdminCategoryModal({
  closeModal,
  title,
  category,
  setCategory,
}) {
  return (
    <div className="absolute inset-0 z-[99] mx-auto my-auto h-[230px] w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <label
          className="btn-sm btn-circle btn absolute -right-2 -top-2"
          onClick={() => {
            closeModal(false);
            setCategory("");
          }}
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mb-8 w-full">
          <label className="label">
            <span className="label-text">Nama category</span>
          </label>
          <input
            type="text"
            placeholder="Tulis disini..."
            className="input-bordered input w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn-error btn-sm btn text-white"
            onClick={() => {
              closeModal(false);
              setCategory("");
            }}
          >
            Cancel
          </button>
          <button className="btn-success btn-sm btn text-white">Yes</button>
        </div>
      </div>
    </div>
  );
}
