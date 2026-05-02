import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle } from "lucide-react";
import { dashboardService, timePeriods } from "../../services/dashboardService";
import Filter from "../../components/Filter";
import "./Dashboard.css";

const PINK = "#FF2056";

function AnimatedValue({ value }) {
  const [shown, setShown] = useState(value);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    setVis(false);
    const t = setTimeout(() => {
      setShown(value);
      setVis(true);
    }, 160);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <span className={`animated-value ${vis ? "animated-value-visible" : "animated-value-hidden"}`}>
      {shown}
    </span>
  );
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, orders, alerts] = await Promise.all([
          dashboardService.getDashboardData(selectedPeriod),
          dashboardService.getRecentOrders(),
          dashboardService.getLowStockAlerts(),
        ]);
        setDashboardData(data);
        setRecentOrders(orders);
        setLowStockAlerts(alerts);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchData();
  }, [selectedPeriod]);

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <main className="dashboard-main">
          {/* Filter row */}
          <div className="dashboard-filter-row">
            <Filter
              value={selectedPeriod}
              options={timePeriods}
              onChange={setSelectedPeriod}
              align="right"
            />
          </div>

          {/* Stat Cards */}
          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-label">Total Revenue</div>
              <div className="dashboard-stat-value">
                <AnimatedValue value={dashboardData.stats.totalRevenue} />
              </div>
            </div>
            <div className="dashboard-stat-card-orders">
              <div className="dashboard-stat-label">Orders</div>
              <div className="dashboard-stat-value-orders">
                <AnimatedValue value={dashboardData.stats.orders} />
              </div>
            </div>
            <div className="dashboard-stat-card-stock">
              <div className="dashboard-stat-label">Low Stock Alerts</div>
              <div className="dashboard-stat-value-stock">
                <AnimatedValue value={dashboardData.stats.lowStock} />
              </div>
            </div>
            <div className="dashboard-stat-card-products">
              <div className="dashboard-stat-label">Products Sold</div>
              <div className="dashboard-stat-value-products">
                <AnimatedValue value={dashboardData.stats.productsSold} />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="dashboard-charts-row">
            <div className="dashboard-chart-card">
              <h3 className="dashboard-chart-title">Sales overview</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={dashboardData.sales}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#aaa" }} /><YAxis tick={{ fontSize: 11, fill: "#aaa" }} width={45} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" connectNulls={true} stroke={PINK} strokeWidth={2} dot={{ r: 4, fill: "#fff", stroke: PINK, strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="dashboard-chart-card">
              <h3 className="dashboard-chart-title">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={dashboardData.revenue} barSize={28}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#aaa" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#aaa" }} width={45} />
                  <Tooltip />
                  <Bar dataKey="value" fill={PINK} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="dashboard-bottom-row">
            <div className="dashboard-orders-card">
              <h3 className="dashboard-orders-title">Recent Orders</h3>
              <div className="dashboard-orders-list">
                {recentOrders.map((o) => (
                  <div key={o.id} className="dashboard-order-item">
                    <div>
                      <div className="dashboard-order-id">{o.id}</div>
                      <div className="dashboard-order-product">{o.product}</div>
                    </div>
                    <div>
                      <div className="dashboard-order-amount">{o.amount}</div>
                      <div className="dashboard-order-time">{o.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-alerts-card">
              <h3 className="dashboard-alerts-title">
                <AlertTriangle size={16} color="#f5a623" /> Low Stock Alerts
              </h3>
              <div className="dashboard-alerts-list">
                {lowStockAlerts.map((item) => (
                  <div key={item.sku} className="dashboard-alert-item">
                    <div>
                      <div className="dashboard-alert-name">{item.name}</div>
                      <div className="dashboard-alert-sku">{item.sku}</div>
                    </div>
                    <span className="dashboard-alert-left">{item.left} Left</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}