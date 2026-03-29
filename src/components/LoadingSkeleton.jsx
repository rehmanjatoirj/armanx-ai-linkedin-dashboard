export default function LoadingSkeleton() {
  return (
    <div className="skeleton-page">
      <div className="skeleton-sidebar">
        <div className="skeleton skeleton-brand" />
        <div className="skeleton-nav-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton skeleton-nav-item" />
          ))}
        </div>
      </div>

      <div className="skeleton-main">
        <div className="skeleton skeleton-topbar" />
        <div className="skeleton-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton skeleton-card" />
          ))}
        </div>
        <div className="skeleton-panels">
          <div className="skeleton skeleton-panel" />
          <div className="skeleton skeleton-panel" />
        </div>
      </div>
    </div>
  );
}
