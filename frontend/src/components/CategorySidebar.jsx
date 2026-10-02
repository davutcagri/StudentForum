import { useEffect } from 'react'
import { useCategoryStore } from '../store/categoryStore'
import { getCategoryColor } from '../constants/categories'

export function CategorySidebar({ selected, onSelect }) {
  const { categories, load } = useCategoryStore()

  useEffect(() => { load() }, [load])

  const items = [{ id: 'all', name: 'All' }, ...categories]

  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</p>
      <ul className="space-y-0.5">
        {items.map(cat => {
          const { dotColor } = getCategoryColor(cat.name)
          const isSelected = selected === cat.name
          return (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  isSelected
                    ? 'bg-primary text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white opacity-80' : dotColor}`} />
                {cat.name}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
