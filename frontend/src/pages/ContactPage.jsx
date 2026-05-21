import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary text-2xl">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" className="input input-bordered w-full" required />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" className="input input-bordered w-full" required />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input type="text" className="input input-bordered w-full" required />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full" rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary text-2xl">Location</h2>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📍</span>
                    <span>Kitsune Kissaten, Plaridel St., Corner Bintawan Rd., Solano</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">🏙️</span>
                    <span>Nueva Vizcaya, Philippines 3709</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary text-2xl">Hours</h2>
                <div className="mt-4 space-y-2">
                  <p className="flex justify-between">
                    <span>Monday</span>
                    <span className="font-bold">Closed</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Tuesday - Thursday</span>
                    <span className="font-bold">10:00 AM - 9:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Friday - Sunday</span>
                    <span className="font-bold">10:00 AM - 10:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary text-2xl">Contact Info</h2>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">【✉️】</span>
                    <span>kitsunekissatenph@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">【ⓕ】</span>
                    <span>https://www.facebook.com/kitsunekissaten</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">【🅾】</span>
                    <span>https://www.instagram.com/kitsunekissaten</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">【ꚠ】</span>
                    <span>https://www.tiktok.com/@kitsunekissaten</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
