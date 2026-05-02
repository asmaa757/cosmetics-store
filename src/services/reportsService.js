// ── Brand colors ──────────────────────────────────────────────
export const PINK = "#FF2056";
export const GREEN = "#22c55e";
export const ORANGE = "#F5A623";
export const BLUE = "#5BA4CF";
export const TEAL = "#2ec4b6";
export const PURPLE = "#9b59b6";
export const RED = "#ef4444";

export const PIE_COLORS_SALES = [PINK, BLUE, ORANGE];
export const PIE_COLORS_PROFIT = [PINK, BLUE, ORANGE, TEAL];
export const PIE_COLORS_PRODUCTS = [GREEN, ORANGE, RED];

export const PERIODS = ["Last Month", "Last 3 Months", "Last 6 Months", "This Year"];

const REPORTS = {
  Sales: {
    cards: {
      "Last Month": [
        { label: "Total Revenue", value: "67,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Expenses", value: "40,500 EGP", border: ORANGE, color: ORANGE },
        { label: "Orders", value: "412", border: TEAL, color: TEAL },
        { label: "Profit", value: "26,500 EGP", border: PURPLE, color: PURPLE },
      ],
      "Last 3 Months": [
        { label: "Total Revenue", value: "183,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Expenses", value: "113,000 EGP", border: ORANGE, color: ORANGE },
        { label: "Orders", value: "895", border: TEAL, color: TEAL },
        { label: "Profit", value: "70,000 EGP", border: PURPLE, color: PURPLE },
      ],
      "Last 6 Months": [
        { label: "Total Revenue", value: "320,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Expenses", value: "200,000 EGP", border: ORANGE, color: ORANGE },
        { label: "Orders", value: "1,580", border: TEAL, color: TEAL },
        { label: "Profit", value: "120,000 EGP", border: PURPLE, color: PURPLE },
      ],
      "This Year": [
        { label: "Total Revenue", value: "784,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Expenses", value: "482,000 EGP", border: ORANGE, color: ORANGE },
        { label: "Orders", value: "3,920", border: TEAL, color: TEAL },
        { label: "Profit", value: "302,000 EGP", border: PURPLE, color: PURPLE },
      ],
    },
    chartTitle: "Sales Overview",
    chartData: {
      "Last Month": [{ l: "Week 1", v: 15000 }, { l: "Week 2", v: 18000 }, { l: "Week 3", v: 17000 }, { l: "Week 4", v: 17000 }],
      "Last 3 Months": [{ l: "April", v: 61000 }, { l: "May", v: 55000 }, { l: "June", v: 67000 }],
      "Last 6 Months": [{ l: "Jan", v: 45000 }, { l: "Feb", v: 52000 }, { l: "Mar", v: 48000 }, { l: "Apr", v: 61000 }, { l: "May", v: 55000 }, { l: "Jun", v: 67000 }],
      "This Year": [{ l: "Jan", v: 45000 }, { l: "Feb", v: 52000 }, { l: "Mar", v: 48000 }, { l: "Apr", v: 61000 }, { l: "May", v: 55000 }, { l: "Jun", v: 67000 }, { l: "Jul", v: 72000 }, { l: "Aug", v: 68000 }, { l: "Sep", v: 75000 }, { l: "Oct", v: 71000 }, { l: "Nov", v: 80000 }, { l: "Dec", v: 90000 }],
    },
    lineKeys: [{ key: "v", color: PINK, name: "Sales" }],
    pieTitle: "Sales by Category",
    pieData: {
        "Last Month": [{ name: "Makeup", value: 55 }, { name: "Skincare", value: 35 }, { name: "Haircare", value: 15 }],
        "Last 3 Months": [{ name: "Makeup", value: 58 }, { name: "Skincare", value: 32 }, { name: "Haircare", value: 16 }],
        "Last 6 Months": [{ name: "Makeup", value: 60 }, { name: "Skincare", value: 30 }, { name: "Haircare", value: 17 }],
        "This Year": [{ name: "Makeup", value: 62 }, { name: "Skincare", value: 28 }, { name: "Haircare", value: 18 }],
    },
    pieColors: PIE_COLORS_SALES,
    tableTitle: "Top Selling Products",
    tableHeaders: ["Rank", "Product", "Units Sold", "Revenue"],
    tableRows: [
      ["Rose Gold Lipstick", "342 Units", "23,940 EGP"],
      ["Hydration Serum", "298 Units", "13,450 EGP"],
      ["Eye Shadow Palette", "267 Units", "13,839 EGP"],
      ["Africana Leave In", "245 Units", "8,543 EGP"],
      ["Anti-Aging Serum", "198 Units", "12,500 EGP"],
    ],
  },
  Profit: {
    cards: {
      "Last Month": [
        { label: "Total Revenue", value: "67,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Total Expenses", value: "40,500 EGP", border: ORANGE, color: ORANGE },
        { label: "Net Profit", value: "26,500 EGP", border: PURPLE, color: PURPLE },{ label: "Profit Margin", value: "39.6%", border: GREEN, color: GREEN },
      ],
      "Last 3 Months": [
        { label: "Total Revenue", value: "183,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Total Expenses", value: "113,000 EGP", border: ORANGE, color: ORANGE },
        { label: "Net Profit", value: "70,000 EGP", border: PURPLE, color: PURPLE },
        { label: "Profit Margin", value: "38.3%", border: GREEN, color: GREEN },
      ],
      "Last 6 Months": [
        { label: "Total Revenue", value: "320,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Total Expenses", value: "200,000 EGP", border: ORANGE, color: ORANGE },
        { label: "Net Profit", value: "120,000 EGP", border: PURPLE, color: PURPLE },
        { label: "Profit Margin", value: "37.5%", border: GREEN, color: GREEN },
      ],
      "This Year": [
        { label: "Total Revenue", value: "784,000 EGP", border: "#d0d0d0", color: "#222" },
        { label: "Total Expenses", value: "482,000 EGP", border: ORANGE, color: ORANGE },
        { label: "Net Profit", value: "302,000 EGP", border: PURPLE, color: PURPLE },
        { label: "Profit Margin", value: "38.5%", border: GREEN, color: GREEN },
      ],
    },
    chartTitle: "Revenue vs Expenses",
    chartData: {
      "Last Month": [{ l: "Week 1", v: 15000, e: 9000 }, { l: "Week 2", v: 18000, e: 11000 }, { l: "Week 3", v: 17000, e: 10500 }, { l: "Week 4", v: 17000, e: 10000 }],
      "Last 3 Months": [{ l: "April", v: 61000, e: 38000 }, { l: "May", v: 55000, e: 34000 }, { l: "June", v: 67000, e: 41000 }],
      "Last 6 Months": [{ l: "Jan", v: 45000, e: 28000 }, { l: "Feb", v: 52000, e: 32000 }, { l: "Mar", v: 48000, e: 30000 }, { l: "Apr", v: 61000, e: 38000 }, { l: "May", v: 55000, e: 34000 }, { l: "Jun", v: 67000, e: 41000 }],
      "This Year": [{ l: "Jan", v: 45000, e: 28000 }, { l: "Feb", v: 52000, e: 32000 }, { l: "Mar", v: 48000, e: 30000 }, { l: "Apr", v: 61000, e: 38000 }, { l: "May", v: 55000, e: 34000 }, { l: "Jun", v: 67000, e: 41000 }, { l: "Jul", v: 72000, e: 44000 }, { l: "Aug", v: 68000, e: 42000 }, { l: "Sep", v: 75000, e: 46000 }, { l: "Oct", v: 71000, e: 43000 }, { l: "Nov", v: 80000, e: 49000 }, { l: "Dec", v: 90000, e: 55000 }],
    },
    lineKeys: [{ key: "v", color: PINK, name: "Revenue" }, { key: "e", color: ORANGE, name: "Expenses" }],
    pieTitle: "Expense Breakdown",
    pieData: {
        "Last Month": [{ name: "Operations", value: 48 }, { name: "Marketing", value: 28 }, { name: "Shipping", value: 14 }, { name: "Other", value: 20 }],
        "Last 3 Months": [{ name: "Operations", value: 46 }, { name: "Marketing", value: 29 }, { name: "Shipping", value: 15 }, { name: "Other", value: 21 }],
        "Last 6 Months": [{ name: "Operations", value: 45 }, { name: "Marketing", value: 30 }, { name: "Shipping", value: 15 }, { name: "Other", value: 22 }],
        "This Year": [{ name: "Operations", value: 44 }, { name: "Marketing", value: 31 }, { name: "Shipping", value: 15 }, { name: "Other", value: 23 }],
    },
    pieColors: PIE_COLORS_PROFIT,
    tableTitle: "Monthly Profit Details",
    tableHeaders: ["Rank", "Month", "Revenue", "Net Profit"],
    tableRows: [
      ["December", "90,000 EGP", "35,000 EGP"],
      ["November", "80,000 EGP", "31,000 EGP"],
      ["September", "75,000 EGP", "29,000 EGP"],
      ["July", "72,000 EGP", "28,000 EGP"],
      ["October", "71,000 EGP", "28,000 EGP"],
    ],
  },
  Products: {
    cards: {
      "Last Month": [
        { label: "Total Products", value: "128 items", border: "#d0d0d0", color: "#222" },
        { label: "Active Products", value: "104", border: GREEN, color: GREEN },
        { label: "Out of Stock", value: "12 items", border: RED, color: RED },
        { label: "Avg. Rating", value: "4.7 ", border: ORANGE, color: ORANGE },
      ],
      "Last 3 Months": [
        { label: "Total Products", value: "134 items", border: "#d0d0d0", color: "#222" },
        { label: "Active Products", value: "110", border: GREEN, color: GREEN },
        { label: "Out of Stock", value: "9 items", border: RED, color: RED },
        { label: "Avg. Rating", value: "4.7 ", border: ORANGE, color: ORANGE },
      ],
      "Last 6 Months": [
        { label: "Total Products", value: "140 items", border: "#d0d0d0", color: "#222" },{ label: "Active Products", value: "118", border: GREEN, color: GREEN },
        { label: "Out of Stock", value: "7 items", border: RED, color: RED },
        { label: "Avg. Rating", value: "4.8 ", border: ORANGE, color: ORANGE },
      ],
      "This Year": [
        { label: "Total Products", value: "155 items", border: "#d0d0d0", color: "#222" },
        { label: "Active Products", value: "130", border: GREEN, color: GREEN },
        { label: "Out of Stock", value: "5 items", border: RED, color: RED },
        { label: "Avg. Rating", value: "4.8 ", border: ORANGE, color: ORANGE },
      ],
    },
    chartTitle: "Sales by Product Category",
    chartData: {
      "Last Month": [{ l: "Makeup", v: 8400 }, { l: "Skincare", v: 4200 }, { l: "Haircare", v: 1400 }, { l: "Perfumes", v: 2100 }],
      "Last 3 Months": [{ l: "Makeup", v: 25000 }, { l: "Skincare", v: 12500 }, { l: "Haircare", v: 4200 }, { l: "Perfumes", v: 6300 }],
      "Last 6 Months": [{ l: "Makeup", v: 49000 }, { l: "Skincare", v: 24500 }, { l: "Haircare", v: 8200 }, { l: "Perfumes", v: 12300 }],
      "This Year": [{ l: "Makeup", v: 98000 }, { l: "Skincare", v: 49000 }, { l: "Haircare", v: 16400 }, { l: "Perfumes", v: 24600 }, { l: "Tools", v: 9800 }],
    },
    lineKeys: [{ key: "v", color: PINK, name: "Sales (EGP)" }],
    pieTitle: "Inventory Status",
    pieData: {
        "Last Month": [{ name: "In Stock", value: 62 }, { name: "Low Stock", value: 28 }, { name: "Out of Stock", value: 10 }],
        "Last 3 Months": [{ name: "In Stock", value: 64 }, { name: "Low Stock", value: 26 }, { name: "Out of Stock", value: 11 }],
        "Last 6 Months": [{ name: "In Stock", value: 65 }, { name: "Low Stock", value: 25 }, { name: "Out of Stock", value: 12 }],
        "This Year": [{ name: "In Stock", value: 68 }, { name: "Low Stock", value: 22 }, { name: "Out of Stock", value: 13 }],
    },
    pieColors: PIE_COLORS_PRODUCTS,
    tableTitle: "Products Needing Attention",
    tableHeaders: ["Rank", "Product", "Current Stock", "Status"],
    tableRows: [
      ["Rose Gold Lipstick", "8 pcs", "Low Stock"],
      ["Anti-Aging Serum", "5 pcs", "Critical"],
      ["Eye Shadow Palette", "0 pcs", "Out of Stock"],
      ["Vitamin C Serum", "12 pcs", "Low Stock"],
      ["Night Moisturizer", "3 pcs", "Critical"],
    ],
  },
};

export const reportsService = {
    getReportData: (reportType, period) => {
    const report = REPORTS[reportType];
    if (!report) return REPORTS.Sales;
    return {
        cards: report.cards[period] || report.cards["Last 6 Months"],
        chartTitle: report.chartTitle,
        chartData: report.chartData[period] || report.chartData["Last 6 Months"],
        lineKeys: report.lineKeys,
        pieTitle: report.pieTitle,
        pieData: report.pieData[period] || report.pieData["Last 6 Months"],  
        pieColors: report.pieColors,
        tableTitle: report.tableTitle,
        tableHeaders: report.tableHeaders,
        tableRows: report.tableRows,
    };
    },
};


