function Sidebar({ tool, setTool }) {

  const tools = [
    "pencil",
    "line",
    "rectangle",
    "circle"
  ];

  return (
    <div className="sidebar">

      {tools.map((t) => (
        <button
          key={t}
          className={tool === t ? "active" : ""}
          onClick={() => setTool(t)}
        >
          {t}
        </button>
      ))}

    </div>
  );
}

export default Sidebar;