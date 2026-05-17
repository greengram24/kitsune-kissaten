const Logo = ({ size = "text-3xl" }) => {
  return (
    <div className={`font-bold ${size} tracking-tight flex items-center`}>
      <img
        src="/logo.jpg"
        alt="Kitsune Kissaten logo"
        className="h-12 w-auto"
        onError={(e) => {
          // Fallback to text if image fails to load
          e.target.style.display = "none";
        }}
      />
    </div>
  );
};

export default Logo;
