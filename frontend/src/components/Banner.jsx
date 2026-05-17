import { Link } from "react-router";

const Banner = ({ title, subtitle, showCTA = true }) => {
  return (
    <div
      className="relative py-16 px-4 bg-white"
      style={{
        backgroundImage: `url('/banner.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="Kitsune Kissaten logo"
            className="h-24 w-auto"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {title || "Kitsune Kissaten"}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          {subtitle || "Experience the finest Japanese-inspired cafe in town"}
        </p>
        {showCTA && (
          <Link to="/menu" className="btn btn-primary btn-lg">
            Explore Our Menu
          </Link>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Banner;
