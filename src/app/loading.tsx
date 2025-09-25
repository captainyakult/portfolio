export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-surface rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-t-4 border-primary rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-text-secondary mt-4">Loading...</p>
      </div>
    </div>
  )
}