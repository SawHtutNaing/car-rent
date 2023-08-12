export default function Button({
  children,
  loading = false,
  loadingMsg = "Loading...",
  onClick,
  className = "",
  type = "submit",

}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loading}
      className={
        "bg-primary h-10 px-6 text-sm font-bold  mt-4 hover:bg-primarySoft ease transition-colors duration-200 disabled:brightness-75 disabled:cursor-not-allowed" +
        " " +
        className
      }
    >
      {loading ? loadingMsg : <>{children}</>}
    </button>
  );
}
