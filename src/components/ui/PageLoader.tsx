export function PageLoader() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-steel-700" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-frost-400 border-r-frost-400/40" />
        <div className="absolute inset-2 animate-pulse-glow rounded-full bg-frost-500/20" />
      </div>
    </div>
  );
}
