import { Link } from "react-router";

const Banner = ({ title, subtitle, showCTA = true }) => {
  return (
    <div
      className="hero min-h-[85vh] w-full relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/banner.jpg')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="hero-overlay bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="hero-content text-center text-white px-4 pb-10">
        <div className="max-w-3xl flex flex-col items-center">

          {/* Logo */}
          <img
            src="/logo.jpg"
            alt="Kitsune Kissaten logo"
            className="h-20 md:h-24 w-auto mb-6"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title || "Kitsune Kissaten"}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base md:text-xl text-white/90 max-w-2xl">
            {subtitle || "Experience the finest Japanese-inspired cafe in town"}
          </p>

          {/* CTA */}
          {showCTA && (
            <Link to="/menu" className="btn btn-primary btn-lg mt-6">
              Explore Our Menu
            </Link>
          )}

        </div>
      </div>
    </div>
  );
};

export default Banner;