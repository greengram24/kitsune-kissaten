import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      {/* HERO BANNER */}
      <Banner 
        title="Welcome to Kitsune Kissaten"
        subtitle="Japanese-inspired café in Solano serving handcrafted brews and cozy moments for all ☕ Coffee, Matcha, Tea, and a few tales too."
      />

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Premium Coffee</h2>
              <p>
                Expertly crafted beverages using the finest beans from around the world.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Delicious Food</h2>
              <p>
                Authentic Japanese-inspired dishes made with fresh, locally sourced ingredients.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Cozy Atmosphere</h2>
              <p>
                Relax in our beautifully designed space perfect for work or leisure.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;