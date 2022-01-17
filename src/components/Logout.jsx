export function Logout({ showLog }) {
  const name = JSON.parse(localStorage.getItem("auth")).userName;
  return (
    <div
      style={{ display: showLog ? "block" : "none" }}
      className="log arrow-top"
    >
      <div style={{fontSize:"15px",marginLeft:"-5px"}} id="name">{name}</div>
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
