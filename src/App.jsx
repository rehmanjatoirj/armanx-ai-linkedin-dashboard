import { useMemo, useState, useEffect } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Download, Globe, TrendingDown, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSkeleton from './components/LoadingSkeleton';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { dashboardData } from './data/dashboardData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days'];
const leadFilters = ['All', 'New', 'Contacted', 'Converted'];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#5d7594',
        usePointStyle: true,
        boxWidth: 10,
        font: { family: 'Manrope', weight: '700', size: 12 },
      },
    },
    tooltip: {
      backgroundColor: '#08162d',
      borderColor: 'rgba(77, 160, 255, 0.16)',
      borderWidth: 1,
      titleColor: '#f7fbff',
      bodyColor: '#d9e7f8',
      padding: 12,
      cornerRadius: 12,
      titleFont: { family: 'Manrope', weight: '800' },
      bodyFont: { family: 'Manrope', weight: '600' },
    },
  },
  scales: {
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: { color: '#6981a1', font: { family: 'Manrope', weight: '700' } },
    },
    y: {
      border: { display: false },
      grid: { color: 'rgba(123, 149, 181, 0.14)' },
      ticks: { color: '#6981a1', font: { family: 'Manrope', weight: '700' } },
    },
  },
};

const statusClassMap = {
  Running: 'running',
  Completed: 'completed',
  Failed: 'failed',
  New: 'new',
  Contacted: 'contacted',
  Converted: 'converted',
};

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [leadFilter, setLeadFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsState, setSettingsState] = useState({
    autoDm: true,
    autoConnect: true,
    postScheduler: false,
    leadScraping: true,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredLeads = useMemo(() => {
    if (leadFilter === 'All') return dashboardData.leads;
    return dashboardData.leads.filter((lead) => lead.status === leadFilter);
  }, [leadFilter]);

  const runAIWorkflow = () => {
    toast.success('AI workflow launched successfully for ArmanX AI.');
  };

  const toggleSetting = (key) => {
    setSettingsState((current) => ({ ...current, [key]: !current[key] }));
  };

  const impressionsData = {
    labels: dashboardData.contentAnalytics.weeklyImpressions.map((item) => item.week),
    datasets: [
      {
        label: 'Post impressions',
        data: dashboardData.contentAnalytics.weeklyImpressions.map((item) => item.impressions),
        backgroundColor: [
          'rgba(10, 102, 194, 0.72)',
          'rgba(10, 102, 194, 0.75)',
          'rgba(10, 102, 194, 0.78)',
          'rgba(10, 102, 194, 0.82)',
          'rgba(10, 102, 194, 0.84)',
          'rgba(10, 102, 194, 0.86)',
          'rgba(10, 102, 194, 0.9)',
          'rgba(61, 154, 252, 0.98)',
        ],
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const engagementData = {
    labels: dashboardData.contentAnalytics.weeklyImpressions.map((item) => item.week),
    datasets: [
      {
        label: 'Engagement rate',
        data: dashboardData.contentAnalytics.engagementRate,
        borderColor: '#0A66C2',
        backgroundColor: 'rgba(10, 102, 194, 0.16)',
        fill: true,
        tension: 0.34,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const automationBreakdownData = {
    labels: dashboardData.automationActivity.breakdown.map((item) => item.label),
    datasets: [
      {
        data: dashboardData.automationActivity.breakdown.map((item) => item.value),
        backgroundColor: ['#0A66C2', '#2E8FFF', '#7EC8FF', '#C6E4FF'],
        borderWidth: 0,
      },
    ],
  };

  const industriesData = {
    labels: dashboardData.audienceInsights.industries.map((item) => item.label),
    datasets: [
      {
        data: dashboardData.audienceInsights.industries.map((item) => item.value),
        backgroundColor: ['#0A66C2', '#2A88F1', '#54A9FF', '#89C7FF', '#C9E5FF'],
        borderWidth: 0,
      },
    ],
  };

  const countriesData = {
    labels: dashboardData.audienceInsights.countries.map((item) => item.label),
    datasets: [
      {
        label: 'Followers by country',
        data: dashboardData.audienceInsights.countries.map((item) => item.value),
        backgroundColor: ['#0A66C2', '#2A88F1', '#54A9FF', '#73BCFF', '#97D1FF', '#CBE6FF'],
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const growthData = {
    labels: dashboardData.audienceInsights.growthLabels,
    datasets: [
      {
        label: 'Connection growth',
        data: dashboardData.audienceInsights.growth,
        borderColor: '#0A66C2',
        backgroundColor: 'rgba(10, 102, 194, 0.18)',
        fill: true,
        tension: 0.34,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="app-frame">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        companyInfo={dashboardData.companyInfo}
      />

      <main className="main-shell">
        <Navbar runAIWorkflow={runAIWorkflow} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="page-stack">
          {activeSection === 'overview' && (
            <section className="section-stack">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Dashboard Overview</p>
                  <h2>LinkedIn AI Automation Analytics</h2>
                  <p className="section-copy">
                    Live operational snapshot for ArmanX AI&apos;s LinkedIn growth, content performance, and automation output.
                  </p>
                </div>
                <div className="filter-row">
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      className={`pill-button ${dateRange === range ? 'active' : ''}`}
                      onClick={() => setDateRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="stats-grid">
                {dashboardData.overview.metrics.map((metric) => {
                  const TrendIcon = metric.direction === 'up' ? TrendingUp : TrendingDown;
                  return (
                    <article key={metric.title} className="panel stat-panel">
                      <div className="panel-topline">
                        <span>{metric.title}</span>
                        <div className={`metric-trend ${metric.direction}`}>
                          <TrendIcon size={14} />
                          {metric.change}
                        </div>
                      </div>
                      <h3>{metric.value}</h3>
                      <p>{metric.note}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {activeSection === 'content-analytics' && (
            <section className="section-stack">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Content Analytics</p>
                  <h2>Performance trends and top posts</h2>
                </div>
              </div>

              <div className="panel-grid two-up">
                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Weekly Post Impressions</h3>
                      <p>Last 8 weeks of content reach.</p>
                    </div>
                  </div>
                  <div className="chart-box">
                    <Bar
                      data={impressionsData}
                      options={{
                        ...chartOptions,
                        plugins: { ...chartOptions.plugins, legend: { display: false } },
                      }}
                    />
                  </div>
                </article>

                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Engagement Rate Over Time</h3>
                      <p>Likes and comments combined into engagement rate.</p>
                    </div>
                  </div>
                  <div className="chart-box">
                    <Line
                      data={engagementData}
                      options={{
                        ...chartOptions,
                        scales: {
                          ...chartOptions.scales,
                          y: {
                            ...chartOptions.scales.y,
                            ticks: {
                              ...chartOptions.scales.y.ticks,
                              callback: (value) => `${value}%`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </article>
              </div>

              <article className="panel">
                <div className="panel-header">
                  <div>
                    <h3>Top 3 Performing Posts</h3>
                    <p>Best-performing posts by reach and engagement.</p>
                  </div>
                </div>
                <div className="top-posts">
                  {dashboardData.contentAnalytics.topPosts.map((post, index) => (
                    <div key={post.title} className="post-item">
                      <div className="post-rank">0{index + 1}</div>
                      <div className="post-copy">
                        <h4>{post.title}</h4>
                        <p>
                          {post.impressions.toLocaleString()} impressions • {post.likes.toLocaleString()} likes • {post.comments} comments
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}

          {activeSection === 'ai-automation' && (
            <section className="section-stack">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">AI Automation Activity</p>
                  <h2>Workflow performance and task health</h2>
                </div>
              </div>

              <div className="panel-grid two-up">
                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Recent Automation Tasks</h3>
                      <p>Outbound actions and workflow execution status.</p>
                    </div>
                  </div>
                  <div className="task-list">
                    {dashboardData.automationActivity.tasks.map((task) => (
                      <div key={task.name} className="task-item">
                        <div>
                          <h4>{task.name}</h4>
                          <p>{task.detail}</p>
                        </div>
                        <span className={`status-pill ${statusClassMap[task.status]}`}>{task.status}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Automation Type Breakdown</h3>
                      <p>Share of connection, messaging, scraping, and workflows.</p>
                    </div>
                  </div>
                  <div className="chart-box donut-box">
                    <Doughnut
                      data={automationBreakdownData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '68%',
                        plugins: chartOptions.plugins,
                      }}
                    />
                  </div>
                </article>
              </div>
            </section>
          )}

          {activeSection === 'lead-generation' && (
            <section className="section-stack">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Lead Generation</p>
                  <h2>Qualified prospects captured by AI workflows</h2>
                </div>
                <button type="button" className="ghost-button">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>

              <article className="panel">
                <div className="toolbar-row">
                  {leadFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={`pill-button ${leadFilter === filter ? 'active' : ''}`}
                      onClick={() => setLeadFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="table-shell">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td>{lead.name}</td>
                          <td>{lead.company}</td>
                          <td>{lead.title}</td>
                          <td>
                            <span className={`status-pill ${statusClassMap[lead.status]}`}>{lead.status}</span>
                          </td>
                          <td>{lead.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </section>
          )}

          {activeSection === 'audience-insights' && (
            <section className="section-stack">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Audience Insights</p>
                  <h2>Follower composition and connection growth</h2>
                </div>
              </div>

              <div className="panel-grid audience-grid">
                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Followers by Industry</h3>
                      <p>Core audience segments around the ArmanX AI brand.</p>
                    </div>
                  </div>
                  <div className="chart-box">
                    <Pie data={industriesData} options={{ responsive: true, maintainAspectRatio: false, plugins: chartOptions.plugins }} />
                  </div>
                </article>

                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Top Countries</h3>
                      <p>Leading LinkedIn follower markets.</p>
                    </div>
                  </div>
                  <div className="chart-box">
                    <Bar
                      data={countriesData}
                      options={{
                        ...chartOptions,
                        indexAxis: 'y',
                        plugins: { ...chartOptions.plugins, legend: { display: false } },
                      }}
                    />
                  </div>
                </article>

                <article className="panel panel-span">
                  <div className="panel-header">
                    <div>
                      <h3>Connection Growth</h3>
                      <p>Six-month network expansion trend for LinkedIn connections.</p>
                    </div>
                  </div>
                  <div className="chart-box">
                    <Line data={growthData} options={chartOptions} />
                  </div>
                </article>
              </div>
            </section>
          )}

          {activeSection === 'settings' && (
            <section className="section-stack">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Settings &amp; Profile</p>
                  <h2>Account controls and company information</h2>
                </div>
              </div>

              <div className="panel-grid settings-grid">
                <article className="panel">
                  <div className="company-card-head">
                    <div className="company-mark">AX</div>
                    <div>
                      <h3>{dashboardData.companyInfo.name}</h3>
                      <p>{dashboardData.companyInfo.tagline}</p>
                    </div>
                  </div>

                  <div className="info-list">
                    <div>
                      <span>Website</span>
                      <strong>{dashboardData.companyInfo.website}</strong>
                    </div>
                    <div>
                      <span>Email</span>
                      <strong>{dashboardData.companyInfo.email}</strong>
                    </div>
                    <div>
                      <span>Phone</span>
                      <strong>{dashboardData.companyInfo.phone}</strong>
                    </div>
                    <div>
                      <span>LinkedIn Account</span>
                      <strong>{dashboardData.companyInfo.linkedin}</strong>
                    </div>
                    <div>
                      <span>Social Presence</span>
                      <strong>{dashboardData.companyInfo.social.join(', ')}</strong>
                    </div>
                  </div>
                </article>

                <article className="panel">
                  <div className="panel-header">
                    <div>
                      <h3>Automation Controls</h3>
                      <p>Manage live LinkedIn automation features.</p>
                    </div>
                    <Globe size={18} />
                  </div>

                  <div className="toggle-list">
                    <ToggleRow
                      title="Enable Auto-DM"
                      active={settingsState.autoDm}
                      onToggle={() => toggleSetting('autoDm')}
                    />
                    <ToggleRow
                      title="Enable Auto-Connect"
                      active={settingsState.autoConnect}
                      onToggle={() => toggleSetting('autoConnect')}
                    />
                    <ToggleRow
                      title="Enable Post Scheduler"
                      active={settingsState.postScheduler}
                      onToggle={() => toggleSetting('postScheduler')}
                    />
                    <ToggleRow
                      title="Enable Lead Scraping"
                      active={settingsState.leadScraping}
                      onToggle={() => toggleSetting('leadScraping')}
                    />
                  </div>
                </article>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function ToggleRow({ title, active, onToggle }) {
  return (
    <div className="toggle-row">
      <div>
        <h4>{title}</h4>
        <p>{active ? 'Currently active' : 'Currently paused'}</p>
      </div>
      <button type="button" className={`toggle-switch ${active ? 'on' : ''}`} onClick={onToggle} aria-pressed={active}>
        <span />
      </button>
    </div>
  );
}

export default App;
