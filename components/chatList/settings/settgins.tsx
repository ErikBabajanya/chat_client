import Content from "./content/content";
import Header from "./header/header";

export default function Settings() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute w-full bg-surface-color z-10">
        <Header />
      </div>
      <div className="w-full h-full overflow-x-auto">
        <Content />
      </div>
    </div>
  );
}
