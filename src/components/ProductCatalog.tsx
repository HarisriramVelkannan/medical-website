import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check, 
  ThermometerSnowflake, 
  Info, 
  ArrowUpDown, 
  ShieldAlert, 
  Sparkles,
  Repeat
} from 'lucide-react';
import { Medicine, MedicineCategory, CartItem } from '../types/pharmacy';

interface ProductCatalogProps {
  medicines: Medicine[];
  cart: CartItem[];
  selectedCategory: MedicineCategory;
  onSelectCategory: (category: MedicineCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddToCart: (medicine: Medicine) => void;
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onOpenDrugDetail: (medicine: Medicine) => void;
  onOpenGenericFinderWithDrug?: (drugName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  medicines,
  cart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onUpdateQuantity,
  onOpenDrugDetail,
  onOpenGenericFinderWithDrug,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'rx-only' | 'otc-only' | 'cold-chain'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');

  const categoriesList: { id: MedicineCategory; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'prescription', label: 'Prescription (Rx)' },
    { id: 'chronic-care', label: 'Chronic & Cardiac Care' },
    { id: 'otc-pain', label: 'Pain & Acidity' },
    { id: 'devices', label: 'Diagnostic Devices' },
    { id: 'first-aid', label: 'First Aid & Surgical' },
    { id: 'baby-mom', label: 'Baby & Child Care' },
    { id: 'vitamins', label: 'Vitamins & Wellness' },
  ];

  // Filtering & Sorting Logic
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      // Category match
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }

      // Filter type
      if (filterType === 'rx-only' && !med.requiresPrescription) return false;
      if (filterType === 'otc-only' && med.requiresPrescription) return false;
      if (filterType === 'cold-chain' && !med.coldStorageRequired) return false;

      // Search match (name, genericName, manufacturer, uses, categoryLabel)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = med.name.toLowerCase().includes(q);
        const matchesGeneric = med.genericName.toLowerCase().includes(q);
        const matchesMfr = med.manufacturer.toLowerCase().includes(q);
        const matchesUses = med.uses.some((u) => u.toLowerCase().includes(q));
        const matchesCat = med.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesGeneric && !matchesMfr && !matchesUses && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // featured / default
    });
  }, [medicines, selectedCategory, filterType, searchQuery, sortBy]);

  const getCartQuantity = (medicineId: string): number => {
    const found = cart.find((item) => item.medicine.id === medicineId);
    return found ? found.quantity : 0;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" id="catalog-section">
      {/* Catalog Title and Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Pharmacy Inventory &amp; Medical Supplies
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>FDA &amp; Licensed Formulations</span>
            <span aria-hidden="true">·</span>
            <span>Batch &amp; Expiry Verified</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-700 font-medium">{filteredMedicines.length} products available</span>
          </div>
        </div>

        {/* Sort & Prescriptions filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter segment */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('rx-only')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'rx-only' ? 'bg-white text-teal-800 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Rx Required
            </button>
            <button
              onClick={() => setFilterType('otc-only')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'otc-only' ? 'bg-white text-emerald-800 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              OTC (No Rx)
            </button>
            <button
              onClick={() => setFilterType('cold-chain')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'cold-chain' ? 'bg-white text-cyan-800 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Cold-Chain ❄️
            </button>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer text-slate-800 font-medium"
            >
              <option value="featured">Featured / Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 border-b border-slate-100">
        {categoriesList.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* If search query has results or no results */}
      {searchQuery && (
        <div className="flex items-center justify-between py-3 text-xs text-slate-600">
          <div>
            Showing search results for <span className="font-semibold text-slate-900">"{searchQuery}"</span>
          </div>
          <button
            onClick={() => onSearchChange('')}
            className="text-teal-700 hover:underline cursor-pointer font-medium"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredMedicines.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 mt-6 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No medicines matched your query</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Try searching by the generic salt name (e.g. Paracetamol, Metformin, Atorvastatin) or contact our 24/7 pharmacist on duty to request a special order.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                setFilterType('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {filteredMedicines.map((medicine) => {
            const qty = getCartQuantity(medicine.id);

            return (
              <div
                key={medicine.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Card Top: Image + Quick Badges */}
                <div className="relative bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center h-44 overflow-hidden">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="max-h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Cold chain or Rx indicators in quiet unboxed styling */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {medicine.requiresPrescription ? (
                      <span className="text-[10px] font-bold tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                        Rx Required
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        OTC Drug
                      </span>
                    )}

                    {medicine.coldStorageRequired && (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-cyan-800 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded">
                        <ThermometerSnowflake className="w-3 h-3" />
                        2°C - 8°C
                      </span>
                    )}
                  </div>

                  {/* Stock status */}
                  <div className="absolute top-2.5 right-2.5">
                    {medicine.inStock ? (
                      <span className="text-[10px] font-medium text-emerald-700 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded border border-slate-200">
                        In Stock ({medicine.stockCount})
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-amber-700 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200">
                        Restocking Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Medicine Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Metadata line: Pack size & dosage form */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span>{medicine.dosageForm}</span>
                      <span aria-hidden="true">·</span>
                      <span>{medicine.strength}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{medicine.packSize}</span>
                    </div>

                    {/* Brand Drug Title */}
                    <h3 className="font-bold text-sm text-slate-900 mt-1 leading-snug line-clamp-1 group-hover:text-teal-700 transition-colors">
                      {medicine.name}
                    </h3>

                    {/* Active Salt Composition (Crucial in pharmacies!) */}
                    <p className="text-xs text-teal-800 font-mono mt-0.5 line-clamp-1 bg-teal-50/60 px-1.5 py-0.5 rounded border border-teal-100">
                      {medicine.genericName}
                    </p>

                    {/* Manufacturer & Use preview */}
                    <div className="text-[11px] text-slate-500 mt-1.5 line-clamp-1">
                      <span>By {medicine.manufacturer}</span>
                    </div>

                    {/* Generic Savings Hint if linked */}
                    {medicine.savingsVsBrand && (
                      <button
                        onClick={() => onOpenGenericFinderWithDrug && onOpenGenericFinderWithDrug(medicine.name)}
                        className="mt-2 w-full text-left flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1 font-medium">
                          <Repeat className="w-3 h-3 text-emerald-600" />
                          Generic substitute exists
                        </span>
                        <span className="font-bold">Save {medicine.savingsVsBrand}%</span>
                      </button>
                    )}
                  </div>

                  {/* Pricing and Cart / Detail Actions */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-slate-900 font-mono">
                          ${medicine.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-mono">
                          ${medicine.mrp.toFixed(2)}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600">
                          {medicine.discountPercent}% OFF
                        </span>
                      </div>

                      {/* Info Button for clinical facts */}
                      <button
                        onClick={() => onOpenDrugDetail(medicine)}
                        className="text-xs text-slate-500 hover:text-teal-700 flex items-center gap-0.5 font-medium cursor-pointer"
                        title="View Drug Factsheet & Precautions"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Facts</span>
                      </button>
                    </div>

                    {/* Add to Cart Control */}
                    {qty === 0 ? (
                      <button
                        onClick={() => onAddToCart(medicine)}
                        disabled={!medicine.inStock}
                        className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          medicine.inStock
                            ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{medicine.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-teal-50 border border-teal-300 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(medicine.id, qty - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded bg-white text-teal-800 hover:bg-teal-100 shadow-2xs font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono text-teal-900">
                          {qty} in Cart
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(medicine.id, qty + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded bg-white text-teal-800 hover:bg-teal-100 shadow-2xs font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
