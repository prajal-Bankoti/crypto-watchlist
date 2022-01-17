export function Logout({ showLog }) {
  return (
    <div
      style={{ display: showLog ? "block" : "none" }}
      className="log arrow-top"
    >
      <button
        onClick={() => {
          localStorage.removeItem("auth");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
