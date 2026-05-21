import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <h1 className="text-4xl font-bold text-primary mb-8">About Kitsune Kissaten</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary text-2xl">Our Story</h2>
                <p className="mt-4">
                  Kitsune Kissaten was born from a passion for bringing authentic Japanese cafe culture to our community. 
                  Founded in 2025, we've dedicated ourselves to creating a space where tradition meets modern comfort.
                </p>
                <p className="mt-4">
                  The name "Kitsune" (fox) represents cleverness and good fortune in Japanese folklore, while "Kissaten" 
                  refers to traditional coffee houses. Together, they embody our mission to provide a smart, welcoming 
                  environment where every visit brings good fortune through exceptional coffee and food.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary text-2xl">Our Values</h2>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span><strong>Quality:</strong> We source only the finest beans and ingredients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span><strong>Tradition:</strong> Honoring Japanese cafe culture while embracing innovation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span><strong>Community:</strong> Creating a welcoming space for everyone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span><strong>Sustainability:</strong> Environmentally conscious practices in everything we do</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary text-2xl text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-24">
                    <span className="text-3xl">A</span>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-lg">Avriel Valderama</h3>
                <p className="text-sm text-gray-600">Head Barista</p>
              </div>
              <div className="text-center">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-24">
                    <span className="text-3xl">B</span>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-lg">Benedict Sales</h3>
                <p className="text-sm text-gray-600">Executive Chef</p>
              </div>
              <div className="text-center">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-24">
                    <span className="text-3xl">V</span>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-lg">Vhince Pascua</h3>
                <p className="text-sm text-gray-600">Pastry Chef</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
