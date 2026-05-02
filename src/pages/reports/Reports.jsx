import { useState, useRef, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar,
} from "recharts";
import { ChevronDown, Download, CheckCircle, FileText, Table, File } from "lucide-react";
import { reportsService, PERIODS, PINK, ORANGE, BLUE, TEAL, PURPLE, RED, PIE_COLORS_SALES, PIE_COLORS_PROFIT, PIE_COLORS_PRODUCTS } from "../../services/reportsService";
import "./Reports.css";
import Filter from "../../components/Filter";
import Toast from "../../components/Toast";

function useOutside(ref, cb) {
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb, ref]);
}

function AnimatedValue({ value }) {
  const [shown, setShown] = useState(value);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    setVis(false);
    const t = setTimeout(() => { setShown(value); setVis(true); }, 160);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <span className={`reports-stat-value-animated ${vis ? "reports-stat-value-visible" : "reports-stat-value-hidden"}`}>
      {shown}
    </span>
  );
}

function StatCard({ label, value, border, color }) {
  return (
    <div className="reports-stat-card" style={{ border: `1.5px solid ${border}` }}>
      <div className="reports-stat-label">{label}</div>
      <div className="reports-stat-value" style={{ color }}>
        <AnimatedValue value={value} />
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="reports-chart-tooltip">
      <div className="reports-tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="reports-tooltip-item" style={{ color: p.stroke || p.fill }}>
          {p.name}: {Number(p.value).toLocaleString()} EGP
        </div>
      ))}
    </div>
  );
}

function PieLegend({ data, colors }) {
  return (
    <div className="reports-pie-legend">
      {data.map((d, i) => (
        <div key={i} className="reports-legend-item">
          <span className="reports-legend-dot" style={{ background: colors[i % colors.length] }} />
          <span>{d.value}% {d.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState("Last 6 Months");
  const [reportType, setReportType] = useState("Sales");const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [exportFmt, setExportFmt] = useState(null);
  const [toast, setToast] = useState(null);
  const exportRef = useRef(null);
  useOutside(exportRef, () => setExportOpen(false));

  const cfg = reportsService.getReportData(reportType, period);
  const cards = cfg.cards ?? [];
  const rawChart = cfg.chartData ?? [];
  const isBar = reportType === "Products";

const handleExport = (fmt) => {
    setExportFmt(fmt);
    setExportOpen(false);
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
      setToast({ message:  `Report exported successfully as ${fmt}!`, type: "success" });  // object
      setTimeout(() => {
        setExportDone(false);
        setExportFmt(null);
        setToast(null);
      }, 3000);
    }, 1800);
  };


  let exportBtnClass = "reports-export-btn-normal";
  if (exportDone) exportBtnClass = "reports-export-btn-done";
  if (exporting) exportBtnClass = "reports-export-btn-exporting";

  return (
    <div className="reports-container">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <div className="reports-header">
        <div className="reports-title-section">
          <div className="reports-title-wrapper">
            <Filter
              value={`${reportType} Reports`}
              options={["Sales Reports", "Profit Reports", "Products Reports"]}
              onChange={(v) => setReportType(v.replace(" Reports", ""))}
              align="left"
            />
          </div>
          <div className="reports-subtitle">Analytics & insights</div>
        </div>

        <div className="reports-actions">
          <Filter
            value={period}
            options={PERIODS}
            onChange={setPeriod}
            align="right"
          />

          {/* Export button */}
          <div ref={exportRef} style={{ position: "relative" }}>
            <button
              onClick={() => !exporting && setExportOpen(o => !o)}
              className={`reports-export-btn ${exportBtnClass}`}
              style={{ cursor: exporting ? "wait" : "pointer" }}
            >
              {exportDone
                ? <><CheckCircle size={15} /> Exported!</>
                : exporting
                  ? "Exporting…"
                  : <><Download size={15} /> Export</>}
            </button>
            {exportOpen && (
              <div className="reports-export-menu">
                {[{ l: "PDF", icon: FileText }, { l: "Excel", icon: Table }, { l: "CSV", icon: File }].map(({ l, icon: Icon }) => (
                  <button key={l} onClick={() => handleExport(l)} className="reports-export-option">
                    <Icon size={15} color={PINK} /> {l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="reports-stats-grid">
        {cards.map((c, i) => (
          <StatCard key={i} label={c.label} value={c.value} border={c.border} color={c.color} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="reports-charts-row">
        {/* Line/Bar Chart */}
        <div className="reports-chart-card">
          <h3 className="reports-chart-title">{cfg.chartTitle}</h3>
          <div className="reports-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              {isBar ? (
                <BarChart data={rawChart}>
                  <XAxis dataKey="l" tick={{ fontSize: 11, fill: "#aaa" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#aaa" }} /><Tooltip content={<ChartTooltip />} />
                  {cfg.lineKeys.map((k, i) => (
                    <Bar key={i} dataKey={k.key} fill={k.color} name={k.name} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              ) : (
                <LineChart data={rawChart}>
                  <XAxis dataKey="l" tick={{ fontSize: 11, fill: "#aaa" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#aaa" }} />
                  <Tooltip content={<ChartTooltip />} />
                  {cfg.lineKeys.map((k, i) => (
                    <Line key={i} type="monotone" dataKey={k.key} stroke={k.color} strokeWidth={2} name={k.name} />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="reports-chart-pie">
          <h3 className="reports-chart-title">{cfg.pieTitle}</h3>
          <div className="reports-pie-container">
            <div className="reports-pie-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cfg.pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" labelLine={false}>
                    {cfg.pieData.map((_, idx) => (
                      <Cell key={idx} fill={(cfg.pieColors || [])[idx % (cfg.pieColors || []).length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <PieLegend data={cfg.pieData} colors={cfg.pieColors} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              {cfg.tableHeaders.map((h, i) => (
                <th key={i} style={{ textAlign: i === 0 ? "center" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cfg.tableRows.map((row, ri) => (
              <tr key={ri}>
                <td>
                  <span className="reports-rank-badge">{ri + 1}</span>
                </td>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}