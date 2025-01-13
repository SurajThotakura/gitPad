import { CounterDisplay } from "@/components/ui/CounterDisplay";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";

export const NavWrapper = () => {
  return (
    <div className="flex flex-row justify-between px-4 py-2 items-center border-b-2 fixed top-0 left-0 w-svw bg-stone-100 dark:bg-stone-950 z-10">
      <div className="text-xl font-bold">
        GitPad<span className="text-green-500 text-2xl">.</span>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <CounterDisplay />
        <ThemeSwitch />
      </div>
    </div>
  );
};
