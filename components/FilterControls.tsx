interface FilterControlsProps {
  highTrustOnly: boolean;
  hideLowTrust: boolean;
  onHighTrustChange: (value: boolean) => void;
  onHideLowTrustChange: (value: boolean) => void;
}

export default function FilterControls({
  highTrustOnly,
  hideLowTrust,
  onHighTrustChange,
  onHideLowTrustChange,
}: FilterControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={highTrustOnly}
            onChange={(e) => onHighTrustChange(e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">
            High Trust Only (≥70)
          </span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hideLowTrust}
            onChange={(e) => onHideLowTrustChange(e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Hide Low Trust (&lt;40)
          </span>
        </label>
      </div>
    </div>
  );
}
