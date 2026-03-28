import { useState } from "react";
import { ChevronDown, Bug, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FlippableBook } from "./FlippableBook";
import { SinglePageFlipBook } from "./SinglePageFlipBook";
import { InfiniteScrollCarousel } from "./InfiniteScrollCarousel";
import { ProductPhotographyCarousel } from "./ProductPhotographyCarousel";

interface CategoryDropdownGalleryProps {
  categorizedImages: Record<string, string[]>;
  projectTitle: string;
}

export function CategoryDropdownGallery({
  categorizedImages,
  projectTitle,
}: CategoryDropdownGalleryProps) {
  const [openCategories, setOpenCategories] = useState<
    Set<string>
  >(new Set());
  const [fullyOpenCategories, setFullyOpenCategories] =
    useState<Set<string>>(new Set());
  const [brandBookUnlocked, setBrandBookUnlocked] =
    useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordError, setShowPasswordError] =
    useState(false);

  // The password - NOTE: This is NOT secure, see explanation below
  const BRAND_BOOK_PASSWORD = "brandbook2024";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === BRAND_BOOK_PASSWORD) {
      setBrandBookUnlocked(true);
      setShowPasswordError(false);
      setPasswordInput("");
    } else {
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    }
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (prev.has(categoryName)) {
        // Close this category
        newSet.delete(categoryName);
        // Remove from fully open as well
        setFullyOpenCategories((prevFully) => {
          const newFullySet = new Set(prevFully);
          newFullySet.delete(categoryName);
          return newFullySet;
        });
      } else {
        // Open this category
        newSet.add(categoryName);
        // Delay marking as fully open to allow accordion animation to complete
        setTimeout(() => {
          setFullyOpenCategories((prevFully) => {
            const newFullySet = new Set(prevFully);
            newFullySet.add(categoryName);
            return newFullySet;
          });
        }, 300); // Match the transition duration
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-0">
      {Object.entries(categorizedImages).map(
        ([categoryName, images], categoryIndex) => {
          const isOpen = openCategories.has(categoryName);
          const isFirst = categoryIndex === 0;
          const isCatalog =
            categoryName.toLowerCase() === "catalog";
          const isBrandBook =
            categoryName.toLowerCase() === "brand book";
          const isUXUI = categoryName.toLowerCase() === "ux/ui";
          const isCorporate =
            categoryName.toLowerCase() === "corporate";

          return (
            <div
              key={categoryName}
              className="border-b border-neutral-200"
            >
              {/* Category Header - Clickable */}
              <button
                onClick={() => toggleCategory(categoryName)}
                className={`w-full flex items-center justify-between text-left hover:opacity-60 transition-opacity ${
                  isFirst ? "pt-0 pb-6" : "py-6"
                }`}
              >
                <h2 className="text-[16px] font-bold text-neutral-900 leading-none">
                  {categoryName}
                </h2>
                <ChevronDown
                  size={18}
                  className={`text-neutral-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Images - Collapsible */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen
                    ? `${isCatalog || isBrandBook ? "3000px" : images.length * 1000 + "px"}`
                    : "0px",
                }}
              >
                <div className="pb-6 space-y-0">
                  {isCatalog ? (
                    <FlippableBook
                      pageCount={46}
                      width={1446}
                      height={2253}
                      pageImages={images}
                    />
                  ) : isBrandBook ? (
                    brandBookUnlocked ? (
                      <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                        <Bug size={48} className="mb-4" />
                        <p className="text-[16px] font-bold">Squashing some bugs — be right back!</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                        <Lock size={48} className="mb-4" />
                        <p className="text-[16px] font-bold">Enter the password to access this section.</p>
                        <form onSubmit={handlePasswordSubmit} className="mt-4">
                          <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="border border-neutral-300 px-4 py-2 rounded mr-2"
                            placeholder="Password"
                          />
                          <button
                            type="submit"
                            className="bg-neutral-800 text-white px-4 py-2 rounded"
                          >
                            Unlock
                          </button>
                        </form>
                        {showPasswordError && (
                          <p className="text-red-500 mt-2">Incorrect password</p>
                        )}
                      </div>
                    )
                  ) : isUXUI ? (
                    <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                      <Bug size={48} className="mb-4" />
                      <p className="text-[16px] font-bold">
                        Squashing some bugs — be right back!
                      </p>
                    </div>
                  ) : categoryName.toLowerCase() ===
                    "marketing" ? (
                    <InfiniteScrollCarousel
                      images={images}
                      projectTitle={projectTitle}
                      categoryName={categoryName}
                      isFullyOpen={fullyOpenCategories.has(
                        categoryName,
                      )}
                    />
                  ) : categoryName.toLowerCase() ===
                    "product photography" ? (
                    <ProductPhotographyCarousel
                      images={images}
                      projectTitle={projectTitle}
                      categoryName={categoryName}
                      isFullyOpen={fullyOpenCategories.has(
                        categoryName,
                      )}
                    />
                  ) : isCorporate ? (
                    <div className="grid grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="w-full bg-neutral-100 overflow-hidden aspect-video"
                        >
                          <ImageWithFallback
                            src={image}
                            alt={`${projectTitle} - ${categoryName} - Image ${
                              index + 1
                            }`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    images.map((image, index) => (
                      <div
                        key={index}
                        className="w-full bg-neutral-100 overflow-hidden"
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${projectTitle} - ${categoryName} - Image ${
                            index + 1
                          }`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}