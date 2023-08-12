import CarsList from "../../components/user/cars/CarsList";
import SearchBox from "../../components/user/searchbox";

export default function Cars() {
  return (
    <main>
      <SearchBox withBorder={false} />
      <CarsList />
    </main>
  );
}
