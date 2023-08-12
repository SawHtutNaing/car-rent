export default function IconButton({
  children,
  loading = false,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={loading}
      className={
        "h-10 text-xl w-10 rounded-full grid place-items-center aspect-square hover:bg-opacity-20 ease transition-colors duration-200 disabled:brightness-75 disabled:cursor-not-allowed" +
        " " +
        className
      }
    >
      {loading ? "L" : <>{children}</>}
    </button>
  );
}
