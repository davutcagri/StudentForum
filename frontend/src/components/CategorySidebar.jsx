import { CATEGORIES } from '../constants/categories'

export function CategorySidebar({ selected, onSelect }) {
  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</p>
      <ul className="space-y-0.5">
        {CATEGORIES.map(cat => (
          <li key={cat.name}>
            <button
              onClick={() => onSelect(cat.name)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                selected === cat.name
                  ? 'bg-primary text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${selected === cat.name ? 'bg-white opacity-80' : cat.dotColor}`} />
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 bg-primary rounded-xl p-4 text-white">
        <p className="font-bold text-sm">3,204 students</p>
        <p className="text-xs mt-1 opacity-90 leading-relaxed">
          are already sharing notes, events, and campus life here.
        </p>
      </div>
    </aside>
  )
}
