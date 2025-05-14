// pages/pricing.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import PackageCard from '../components/PackageCard';
import { packagesData as data } from '../dummyContent.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Filter, SortAsc, SortDesc, Package, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function PricingPage() {
  const { categories, packages } = data;
  const router = useRouter();
  const { categoryId, subcategoryId } = router.query;

  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [displayedPackages, setDisplayedPackages] = useState(packages);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (subcategoryId) {
      const subCatId = parseInt(subcategoryId);
      setActiveSubcategory(subCatId);
      setFilteredPackages(packages.filter(pkg => pkg.categoryId === subCatId));

      // Find parent category
      for (const category of categories) {
        if (category.hasSubcategories) {
          const found = category.subcategories.find(sub => sub.id === subCatId);
          if (found) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    } else if (categoryId) {
      const catId = parseInt(categoryId);
      setActiveCategory(catId);
      setActiveSubcategory(null);

      // Find category
      const category = categories.find(cat => cat.id === catId);

      if (category) {
        if (category.hasSubcategories) {
          // Get all packages from all subcategories
          const subCategoryIds = category.subcategories.map(sub => sub.id);
          setFilteredPackages(packages.filter(pkg => subCategoryIds.includes(pkg.categoryId)));
        } else {
          // Direct category
          setFilteredPackages(packages.filter(pkg => pkg.categoryId === catId));
        }
      }
    } else {
      // No filter, show all packages
      setFilteredPackages(packages);
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  }, [categoryId, subcategoryId, categories, packages]);

  // Apply sorting whenever filteredPackages or sortBy changes
  useEffect(() => {
    let sorted = [...filteredPackages];

    switch (sortBy) {
      case 'price-low-high':
        sorted = sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.match(/\d+(\.\d+)?/)[0]);
          const priceB = parseFloat(b.price.match(/\d+(\.\d+)?/)[0]);
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        sorted = sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.match(/\d+(\.\d+)?/)[0]);
          const priceB = parseFloat(b.price.match(/\d+(\.\d+)?/)[0]);
          return priceB - priceA;
        });
        break;
      case 'latest':
        sorted = sorted.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        sorted = sorted.sort((a, b) => a.id - b.id);
        break;
      default:
        sorted = sorted.sort((a, b) => a.id - b.id);
    }

    setDisplayedPackages(sorted);
  }, [filteredPackages, sortBy]);

  // Find active category/subcategory names
  const getActiveCategoryName = () => {
    if (activeCategory) {
      const category = categories.find(cat => cat.id === activeCategory);
      return category ? category.name : 'All Categories';
    }
    return 'All Categories';
  };

  const getActiveSubcategoryName = () => {
    if (activeSubcategory && activeCategory) {
      const category = categories.find(cat => cat.id === activeCategory);
      if (category && category.hasSubcategories) {
        const subcategory = category.subcategories.find(sub => sub.id === activeSubcategory);
        return subcategory ? subcategory.name : '';
      }
    }
    return '';
  };

  const getHeaderTitle = () => {
    if (activeSubcategory) {
      return getActiveSubcategoryName();
    } else if (activeCategory) {
      return getActiveCategoryName();
    }
    return 'All Design Packages';
  };

  const getHeaderDescription = () => {
    const categoryName = getActiveCategoryName();
    const subcategoryName = getActiveSubcategoryName();

    if (activeSubcategory) {
      return `Choose a ${categoryName} - ${subcategoryName} package and place the order online. Your ${categoryName} will be ready within the time frame you choose!`;
    } else if (activeCategory) {
      return `Choose a ${categoryName} package and place the order online. Your ${categoryName} will be ready within the time frame you choose!`;
    } else {
      return 'Choose a design package and place the order online. Your design will be ready within the time frame you choose! We will email you the final design.';
    }
  };

  return (
    <>
      <Head>
        <title>Design Packages & Pricing | Professional Design Solutions</title>
        <meta name="description" content="Browse our professional design packages tailored to your specific needs with competitive pricing and fast turnaround times." />
      </Head>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto pt-16 pb-10 px-4"> 
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - takes 1/4 of screen on large screens */}
            <div className="lg:col-span-1">
              <Sidebar 
                categories={categories} 
                activeCategory={activeCategory}
                activeSubcategory={activeSubcategory}
              />
            </div>

            {/* Package Cards - takes 3/4 of screen on large screens */}
            <div className="lg:col-span-3">
              {/* Page header with breadcrumbs */}
              <div className="mb-8">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className=" ">Home</span>
                  
                  {activeCategory && (
                    <>
                      <ChevronRight size={16} className="mx-1" />
                      <span className="">{getActiveCategoryName()}</span>
                    </>
                  )}
                  {activeSubcategory && (
                    <>
                      <ChevronRight size={16} className="mx-1" />
                      <span className="text-purple-600">{getActiveSubcategoryName()}</span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{getHeaderTitle()}</h1>
                {/* <p className="text-gray-600">{getHeaderDescription()}</p> */}
              </div>

             {displayedPackages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {displayedPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      title={pkg.title}
                      subtitle={pkg.subtitle}
                      price={pkg.price}
                      image={pkg.image}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-2 border-purple-100">
                  <Package size={48} className="text-purple-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No packages found</h3>
                  <p className="text-gray-500">We couldn't find any packages matching your criteria.</p>
                </div>
              )}
              
              {/* Pagination - can be added if needed */}
              {displayedPackages.length > 12 && (
                <div className="flex justify-center mt-10">
                  <nav className="inline-flex rounded-lg shadow-sm">
                    <button className="px-4 py-2 bg-white border border-purple-200 rounded-l-lg text-purple-600 hover:bg-purple-50">Previous</button>
                    <button className="px-4 py-2 bg-purple-600 border border-purple-600 text-white">1</button>
                    <button className="px-4 py-2 bg-white border border-purple-200 text-purple-600 hover:bg-purple-50">2</button>
                    <button className="px-4 py-2 bg-white border border-purple-200 text-purple-600 hover:bg-purple-50">3</button>
                    <button className="px-4 py-2 bg-white border border-purple-200 rounded-r-lg text-purple-600 hover:bg-purple-50">Next</button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}