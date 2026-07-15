function BottomBar({ lines, setLines }) {

  function undo() {
    setLines(lines.slice(0, -1));
  }

  function clearCanvas() {
    setLines([]);
  }

  return (
    <div className="bottomBar">

      <button onClick={undo}>
        Undo
      </button>

      <button onClick={clearCanvas}>
        Clear
      </button>

      <button>
        Save
      </button>

      <button>
        Upload
      </button>

      <button>
        Generate G-Code
      </button>

    </div>
  );
}

export default BottomBar;