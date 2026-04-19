import { Spinner } from "flowbite-react";

export function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner aria-label="Default status example" />
    </div>
  );
}
