export function Logout({ showLog }) {
  return (
    <div
      style={{ display: showLog ? "block" : "none" }}
      className="log arrow-top"
    >
      <div></div>
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
