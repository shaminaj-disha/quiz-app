export function Footer() {
  return (
    <footer className="w-full h-[40px] py-3 px-4 bg-primary border-t flex items-center justify-center">
      <p className="text-sm text-primary-foreground text-center">
        ©{new Date().getFullYear()} Quiz App
      </p>
    </footer>
  );
}
