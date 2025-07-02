import { unstable_noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
unstable_noStore();
async function CabinList({ filter }) {
  const cabins = await getCabins();
  let displayCabins;
  if (filter === "all") {
    displayCabins = cabins;
  }
  if (filter === "small") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "large") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4);
  }

  console.log(cabins);
  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
