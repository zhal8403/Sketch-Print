function TopBar() {
  return (
    <div className="topBar">
      <h2>🖨 SketchPrint</h2>

      <div>
        Ender 3:
        <span style={{ color: "red", marginLeft: 8 }}>
          Disconnected
        </span>
      </div>
    </div>
  );
}

export default TopBar;