import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

export default function Toast({ message, type = "success", duration = 3000, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDone]);

  if (!visible) return null;

  const config = {
    success: {
      icon: <CheckCircle size={18} />,
      iconColor: "#22c55e",
      borderColor: "#d1fae5",
      textColor: "#166534",
    },
    error: {
      icon: <XCircle size={18} />,
      iconColor: "#ef4444",
      borderColor: "#fecaca",
      textColor: "#dc2626",
    },
    warning: {
      icon: <AlertCircle size={18} />,
      iconColor: "#f59e0b",
      borderColor: "#fde68a",
      textColor: "#d97706",
    },
    info: {
      icon: <Info size={18} />,
      iconColor: "#3b82f6",
      borderColor: "#bfdbfe",
      textColor: "#2563eb",
    },
  };

  const current = config[type];

  const styles = {
    position: "fixed",
    top: visible ? "24px" : "-80px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: `1px solid ${current.borderColor}`,
    borderRadius: "12px",
    padding: "12px 20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: "500",
    color: current.textColor,
    zIndex: 9999,
    transition: "top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    whiteSpace: "nowrap",
  };

  const iconStyle = {
    color: current.iconColor,
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={styles}>
      <span style={iconStyle}>{current.icon}</span>
      {message}
    </div>
  );
}