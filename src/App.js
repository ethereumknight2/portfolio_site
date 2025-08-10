import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Twitter,
  Youtube,
  Twitch,
  ExternalLink,
  MessageCircle,
  Send,
} from "lucide-react";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [homeSliderIndexes, setHomeSliderIndexes] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fixed gallery sections with consistent 'src' property and correct paths
  const gallerySections = [
    {
      id: "headshot",
      title: "Headshots",
      images: [
        {
          id: 1,
          src: "/images/headshot1.png", // Fixed: removed /public/
          title: "Headshot Portrait 1",
        },
        {
          id: 2,
          src: "/images/headshot2.png",
          title: "Headshot Portrait 2",
        },
        {
          id: 3,
          src: "/images/headshot3.png",
          title: "Headshot Portrait 3",
        },
        {
          id: 4,
          src: "/images/headshot4.png",
          title: "Bust Portrait 4",
        },
      ],
    },
    {
      id: "fullbody",
      title: "Full Body",
      images: [
        {
          id: 11,
          src: "/images/fullbody2.png",
          title: "Full Body 2",
        },
        {
          id: 12,
          src: "/images/fullbody3.png",
          title: "Full Body 3",
        },
        {
          id: 14,
          src: "/images/fullbody5.png",
          title: "Full Body 5",
        },
      ],
    },
    {
      id: "half body",
      title: "Half Body",
      images: [
        {
          id: 16,
          src: "/images/couple1.png", // Fixed: changed from url to src and proper path
          title: "Couple Art 1",
        },
        {
          id: 17,
          src: "/images/couple2.png",
          title: "Couple Art 2",
        },
        {
          id: 18,
          src: "/images/couple3.png",
          title: "Couple Art 3",
        },
        {
          id: 19,
          src: "/images/couple4.png",
          title: "Couple Art 4",
        },
      ],
    },
    {
      id: "scene",
      title: "Scene",
      images: [
        {
          id: 10,
          src: "/images/fullbody1.png",
          title: "Scene1",
        },
        {
          id: 21,
          src: "/images/scene2.png",
          title: "Scene Art 2",
        },
        {
          id: 22,
          src: "/images/scene3.png",
          title: "Scene Art 3",
        },
        {
          id: 23,
          src: "/images/scene4.png",
          title: "Scene Art 4",
        },
        {
          id: 24,
          src: "/images/scene5.png",
          title: "Scene Art 5",
        },
      ],
    },
    {
      id: "reference",
      title: "Reference",
      images: [
        {
          id: 13,
          src: "/images/fullbody4.png",
          title: "Reference",
        },
        {
          id: 26,
          src: "/images/reference2.png",
          title: "Reference Sheet 2",
        },
        {
          id: 27,
          src: "/images/reference3.png",
          title: "Reference Sheet 3",
        },
        {
          id: 28,
          src: "/images/reference4.png",
          title: "Reference Sheet 4",
        },
      ],
    },
  ];

  const priceData = [
    {
      type: "Bust",
      price: "$50",
      refImage: "/images/price-bust.png", // Fixed: use local images
    },
    {
      type: "Half Body",
      price: "$75",
      refImage: "/images/price-halfbody.png",
    },
    {
      type: "Full Body",
      price: "$100",
      refImage: "/images/price-fullbody.png",
    },
    {
      type: "Couple",
      price: "$150",
      refImage: "/images/price-couple.png",
    },
    {
      type: "Scene",
      price: "$200",
      refImage: "/images/price-scene.png",
    },
    {
      type: "Reference Sheet",
      price: "$250",
      refImage: "/images/price-reference.png",
    },
  ];

  const socialLinks = [
    { name: "VGen", icon: ExternalLink, url: "#", color: "bg-purple-500" },
    { name: "Twitter", icon: Twitter, url: "#", color: "bg-blue-500" },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:artist@example.com",
      color: "bg-red-500",
    },
    { name: "Twitch", icon: Twitch, url: "#", color: "bg-purple-600" },
    { name: "YouTube", icon: Youtube, url: "#", color: "bg-red-600" },
    { name: "Discord", icon: MessageCircle, url: "#", color: "bg-indigo-500" },
  ];

  const openImageViewer = (image, sectionImages, index) => {
    setSelectedImage({ image, sectionImages, index });
    setCurrentImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const nextIndex =
        (currentImageIndex + 1) % selectedImage.sectionImages.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage({
        ...selectedImage,
        image: selectedImage.sectionImages[nextIndex],
        index: nextIndex,
      });
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const prevIndex =
        (currentImageIndex - 1 + selectedImage.sectionImages.length) %
        selectedImage.sectionImages.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage({
        ...selectedImage,
        image: selectedImage.sectionImages[prevIndex],
        index: prevIndex,
      });
    }
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert("Message sent!");
      setContactForm({ name: "", email: "", message: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handlePriceImageClick = () => {
    setActiveTab("Portfolio");
  };

  const nextHomeSliderImage = (sectionId) => {
    const section = gallerySections.find((s) => s.id === sectionId);
    const currentIndex = homeSliderIndexes[sectionId] || 0;
    const nextIndex = (currentIndex + 1) % section.images.length;
    setHomeSliderIndexes((prev) => ({
      ...prev,
      [sectionId]: nextIndex,
    }));
  };

  const prevHomeSliderImage = (sectionId) => {
    const section = gallerySections.find((s) => s.id === sectionId);
    const currentIndex = homeSliderIndexes[sectionId] || 0;
    const prevIndex =
      (currentIndex - 1 + section.images.length) % section.images.length;
    setHomeSliderIndexes((prev) => ({
      ...prev,
      [sectionId]: prevIndex,
    }));
  };

  const SidebarButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`sidebar-item w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          : "text-gray-800 hover:text-white hover:shadow-md"
      }`}
      style={isActive ? {} : { ":hover": { backgroundColor: "#7a9099" } }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = "#7a9099";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = "transparent";
        }
      }}
    >
      {label}
    </button>
  );

  const SocialButton = ({ icon: Icon, name, url, color }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-btn ${color} hover:opacity-80 transition-all duration-300 p-3 rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1`}
      title={name}
    >
      <Icon size={18} />
    </a>
  );

  const GallerySection = ({ section }) => (
    <div className="mb-12 fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        {section.title}
        <span className="ml-4 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {section.images.length} images
        </span>
      </h3>

      <div className="relative">
        <div className="gallery-container flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {section.images.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item flex-shrink-0 group cursor-pointer"
              onClick={() => openImageViewer(image, section.images, index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-glow">
                <img
                  src={image.src} // Fixed: use 'src' instead of 'url'
                  alt={image.title}
                  className="w-64 h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    {image.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Welcome to My Art Studio
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional digital artist specializing in character design,
                illustrations, and custom artwork. Browse through my portfolio
                galleries below.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {gallerySections.map((section) => {
                const currentSliderIndex = homeSliderIndexes[section.id] || 0;
                const currentImage = section.images[currentSliderIndex];

                return (
                  <div
                    key={section.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer hover-glow"
                    onClick={() => setActiveTab("Portfolio")}
                  >
                    <div className="relative mb-4">
                      <img
                        src={currentImage.src}
                        alt={section.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />

                      {/* Left Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevHomeSliderImage(section.id);
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {/* Right Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextHomeSliderImage(section.id);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Image indicator dots */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {section.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentSliderIndex
                                ? "bg-white"
                                : "bg-white bg-opacity-50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {section.images.length} artworks
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "Prices":
        return (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Commission Prices
              </h2>
              <p className="text-lg text-gray-600">
                Click on any reference image to view my portfolio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {priceData.map((item, index) => (
                <div
                  key={index}
                  className="price-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center">
                    <img
                      src={item.refImage}
                      alt={`${item.type} reference`}
                      className="w-32 h-32 mx-auto mb-4 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                      onClick={handlePriceImageClick}
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.type}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Portfolio":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12 fade-in">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                My Portfolio
              </h2>
              <p className="text-lg text-gray-600">
                Browse through my different art categories
              </p>
            </div>

            {gallerySections.map((section) => (
              <GallerySection key={section.id} section={section} />
            ))}
          </div>
        );

      case "T.O.S":
        return (
          <div className="space-y-6 fade-in">
            <h2 className="text-3xl font-bold gradient-text mb-8">
              Terms of Service
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Payment Terms
                </h3>
                <p className="text-gray-600">
                  Full payment is required upfront before work begins. Payments
                  are accepted via PayPal, Venmo, or other agreed methods.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Revisions
                </h3>
                <p className="text-gray-600">
                  Up to 3 minor revisions are included. Major changes or
                  additional revisions will incur extra charges.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Delivery Time
                </h3>
                <p className="text-gray-600">
                  Typical delivery time is 1-2 weeks depending on complexity.
                  Rush orders available for additional fee.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Usage Rights
                </h3>
                <p className="text-gray-600">
                  Client receives full usage rights for personal use. Commercial
                  use requires additional licensing fee.
                </p>
              </div>
            </div>
          </div>
        );

      case "Contact":
        return (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600">
                Ready to commission your perfect artwork? Send me a message!
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  onClick={handleContactSubmit}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#c4dee6" }}>
      {/* Dark Left Sidebar */}
      <aside
        className="w-64 shadow-2xl flex flex-col"
        style={{ backgroundColor: "#93aab0" }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "#7a9099" }}>
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Artist Logo"
              className="w-26 h-26 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {["Home", "Prices", "Portfolio", "T.O.S", "Contact"].map((tab) => (
            <SidebarButton
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </nav>

        {/* Social Links */}
        <div className="p-4 border-t" style={{ borderColor: "#7a9099" }}>
          <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            Connect
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((social) => (
              <SocialButton
                key={social.name}
                icon={social.icon}
                name={social.name}
                url={social.url}
                color={social.color}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X size={24} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronRight size={32} />
            </button>

            <img
              src={selectedImage.image.src} // Fixed: use 'src' instead of 'url'
              alt={selectedImage.image.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-1">
                {selectedImage.image.title}
              </h3>
              <p className="text-sm text-gray-300">
                {currentImageIndex + 1} of {selectedImage.sectionImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
