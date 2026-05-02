import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function useOutside(ref, cb) {
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb, ref]);
}

export default function Filter({ value, options, onChange, align = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setIsOpen(false));

  const styles = {
    container: { position: "relative" },
    button: {
      padding: "8px 16px",
      border: "1.5px solid #e0e0e0",
      borderRadius: "20px",
      background: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "13px",
      fontWeight: "500",
      color: "#333",
      whiteSpace: "nowrap",
    },
    chevron: {
      transition: "transform 0.2s",
      transform: isOpen ? "rotate(180deg)" : "none",
    },
    menu: {
      position: "absolute",
      top: "calc(100% + 6px)",
      [align]: "0",
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      zIndex: 200,
      minWidth: "170px",
      overflow: "hidden",
    },
    item: {
      display: "block",
      width: "100%",
      padding: "10px 16px",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontSize: "13px",
      textAlign: "left",
      color: "#333",
    },
    itemSelected: {
      fontWeight: "700",
      color: "#E8527A",
      borderLeft: "3px solid #E8527A",
    },
  };

  return (
    <div ref={ref} style={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.button}>
        {value}
        <ChevronDown size={14} style={styles.chevron} />
      </button>
      {isOpen && (
        <div style={styles.menu}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              style={{
                ...styles.item,
                ...(opt === value ? styles.itemSelected : {}),
                fontWeight: opt === value ? "700" : "400",
              }}
              onMouseEnter={(e) => {
                if (opt !== value) e.currentTarget.style.background = "#fef2f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}