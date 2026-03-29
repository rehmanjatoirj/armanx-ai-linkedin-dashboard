import { BarChart3, Bot, Home, PieChart, Settings, Users, X } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'content-analytics', label: 'Content Analytics', icon: BarChart3 },
  { id: 'ai-automation', label: 'AI Automation', icon: Bot },
  { id: 'lead-generation', label: 'Lead Generation', icon: Users },
  { id: 'audience-insights', label: 'Audience Insights', icon: PieChart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen, companyInfo }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)} />

      <aside className={`sidebar-shell ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-lockup">
            <div className="brand-badge">AX</div>
            <div>
              <h1>ArmanX AI</h1>
              <p>{companyInfo.tagline}</p>
            </div>
          </div>

          <button type="button" className="sidebar-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-panel">
          <p className="sidebar-panel-label">Services</p>
          <div className="sidebar-tags">
            {companyInfo.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
