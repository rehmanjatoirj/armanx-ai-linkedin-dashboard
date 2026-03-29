import { Bell, Menu, Search, Sparkles } from 'lucide-react';

export default function Navbar({ runAIWorkflow, setIsSidebarOpen }) {
  return (
    <header className="topbar-shell">
      <div className="topbar-search-group">
        <button
          type="button"
          className="icon-button mobile-nav-trigger"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <label className="search-shell">
          <Search size={18} />
          <input type="text" placeholder="Search analytics, leads, workflows..." />
        </label>
      </div>

      <div className="topbar-actions">
        <button type="button" className="workflow-button" onClick={runAIWorkflow}>
          <Sparkles size={17} />
          <span>Run AI Workflow</span>
        </button>

        <button type="button" className="icon-button notification-button" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot">3</span>
        </button>

        <div className="profile-pill">
          <div className="profile-avatar">AX</div>
          <div>
            <strong>ArmanX AI</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
