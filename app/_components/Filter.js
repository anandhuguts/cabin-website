"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const capacity = searchparams.get("capacity") || "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchparams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("large")}
      >
        4&mdash;5
      </button>
    </div>
  );
}

export default Filter;
