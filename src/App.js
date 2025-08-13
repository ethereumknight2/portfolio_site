import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Twitter,
  Youtube,
  Twitch,
  ExternalLink,
  Coffee,
  Send,
  Menu,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [homeSliderIndexes, setHomeSliderIndexes] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [magnifierPos, setMagnifierPos] = useState({
    x: 0,
    y: 0,
    imageX: 0,
    imageY: 0,
    imageWidth: 0,
    imageHeight: 0,
  });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
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
          src: "/images/headshot1.png",
          title: "Headshot 1",
        },
        {
          id: 2,
          src: "/images/headshot2.png",
          title: "Headshot 2",
        },
        {
          id: 3,
          src: "/images/headshot3.png",
          title: "Headshot 3",
        },
        {
          id: 4,
          src: "/images/headshot4.png",
          title: "Headshot 4",
        },
      ],
    },
    {
      id: "half body",
      title: "Half Body",
      images: [
        {
          id: 16,
          src: "/images/halfbody1.png",
          title: "Halfbody 1",
        },
        {
          id: 17,
          src: "/images/halfbody2.png",
          title: "Halfbody 2",
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
          title: "Full Body 1",
        },
        {
          id: 12,
          src: "/images/fullbody3.png",
          title: "Full Body 2",
        },
        {
          id: 14,
          src: "/images/fullbody5.png",
          title: "Full Body 3",
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
          title: "Scene 1",
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
          title: "Reference Sheet 1",
        },
        {
          id: 26,
          src: "/images/refsheet1.png",
          title: "Reference Sheet 2",
        },
        {
          id: 27,
          src: "/images/refsheet2.png",
          title: "Reference Sheet 3",
        },
      ],
    },
    {
      id: "design",
      title: "Designs",
      images: [
        {
          id: 28,
          src: "/images/design1.png",
          title: "Design 1",
        },
      ],
    },
  ];

  const priceData = [
    {
      type: "Bust",
      price: "$2-8",
      refImage: "/images/headshot4.png",
    },
    {
      type: "Half Body",
      price: "$5-10",
      refImage: "/images/pricehalfbody.png",
    },
    {
      type: "Full Body",
      price: "$5-15",
      refImage: "/images/pricefullbody.png",
    },
    {
      type: "Scene",
      price: "$25-40",
      refImage: "/images/fullbody1.png",
    },
    {
      type: "Reference Sheet",
      price: "$35-60",
      refImage: "/images/pricerefsheet.png",
    },
    {
      type: "Design/Custom",
      price: "$15-20",
      refImage: "/images/pricedesign.png",
    },
    {
      type: "Emote",
      price: "$5 per",
      refImage: "/images/emote.png",
    },
  ];

  const socialLinks = [
    {
      name: "VGen",
      icon: ExternalLink,
      url: "https://vgen.co/thebananaferret",
      color: "bg-purple-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/thebananaferret",
      color: "bg-blue-500",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:artist@example.com",
      color: "bg-red-500",
    },
    {
      name: "Twitch",
      icon: Twitch,
      url: "https://www.twitch.tv/thebananaferret",
      color: "bg-purple-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@thebananaferret",
      color: "bg-red-600",
    },
    {
      name: "Kofi",
      icon: Coffee,
      url: "https://ko-fi.com/thebananaferret",
      color: "bg-indigo-500",
    },
  ];

  const openImageViewer = (image, sectionImages, index) => {
    setSelectedImage({ image, sectionImages, index });
    setCurrentImageIndex(index);
    setImageTransform({ scale: 1, x: 0, y: 0 });
    setShowMagnifier(false);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setImageTransform({ scale: 1, x: 0, y: 0 });
    setShowMagnifier(false);
    setIsDragging(false);
    // Restore body scroll
    document.body.style.overflow = "unset";
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
      setImageTransform({ scale: 1, x: 0, y: 0 });
      setShowMagnifier(false);
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
      setImageTransform({ scale: 1, x: 0, y: 0 });
      setShowMagnifier(false);
    }
  };

  // Image zoom and pan functions
  const zoomIn = () => {
    setImageTransform((prev) => ({
      ...prev,
      scale: Math.min(prev.scale * 1.5, 5),
    }));
  };

  const zoomOut = () => {
    setImageTransform((prev) => ({
      ...prev,
      scale: Math.max(prev.scale / 1.5, 0.5),
    }));
  };

  const resetTransform = () => {
    setImageTransform({ scale: 1, x: 0, y: 0 });
  };

  // Mouse/touch event handlers for dragging
  const handleMouseDown = (e) => {
    if (imageTransform.scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imageTransform.x,
        y: e.clientY - imageTransform.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && imageTransform.scale > 1) {
      setImageTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }));
    }

    // Magnifier logic - optimized for responsiveness
    if (imageRef.current && !isDragging && imageTransform.scale === 1) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within image bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Calculate position relative to the container immediately
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerX = e.clientX - containerRect.left;
        const containerY = e.clientY - containerRect.top;

        // Update magnifier position immediately without delay
        if (magnifierRef.current) {
          magnifierRef.current.style.left = `${containerX - 75}px`;
          magnifierRef.current.style.top = `${containerY - 75}px`;
          magnifierRef.current.style.backgroundPosition = `-${
            x * 2.5 - 75
          }px -${y * 2.5 - 75}px`;
          magnifierRef.current.style.display = "block";
        }

        if (!showMagnifier) {
          setShowMagnifier(true);
        }
      } else {
        if (magnifierRef.current) {
          magnifierRef.current.style.display = "none";
        }
        if (showMagnifier) {
          setShowMagnifier(false);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (magnifierRef.current) {
      magnifierRef.current.style.display = "none";
    }
    setShowMagnifier(false);
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (imageTransform.scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imageTransform.x,
        y: e.touches[0].clientY - imageTransform.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && imageTransform.scale > 1 && e.touches.length === 1) {
      e.preventDefault();
      setImageTransform((prev) => ({
        ...prev,
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      }));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    if (selectedImage) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setImageTransform((prev) => ({
        ...prev,
        scale: Math.min(Math.max(prev.scale * delta, 0.5), 5),
      }));
    }
  };

  // Add wheel event listener when modal is open
  useEffect(() => {
    if (selectedImage) {
      const handleWheelEvent = (e) => handleWheel(e);
      window.addEventListener("wheel", handleWheelEvent, { passive: false });
      return () => window.removeEventListener("wheel", handleWheelEvent);
    }
  }, [selectedImage, imageTransform.scale]);

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
    setIsMobileMenuOpen(false);
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
      onClick={() => {
        onClick();
        setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
      }}
      className={`sidebar-item w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          : "text-gray-800 hover:text-white hover:shadow-md"
      }`}
      style={isActive ? {} : { ":hover": { backgroundColor: "#8d7c62ff" } }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = "#8d7c62ff";
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
                  src={image.src}
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Banana's Portfolio
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Take a peek at my stuff! Once you're done, you can check the
                prices for each in the prices tab.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Commission Prices
              </h2>
              <p className="text-lg text-gray-600">
                If you click on one of the images, you may return to my
                examples! Contact me for further information on pricing!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Portfolio
              </h2>
              <p className="text-lg text-gray-600">
                Click on images to make them bigger!
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Terms of Service
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  General
                </h3>
                <p className="text-gray-600">
                  - I have the right to turn down any commission for any reason{" "}
                  <br></br>- Do not claim my artwork as your own<br></br>- My
                  ToS and pricing is subject to change, you are only subject to
                  the ToS and pricing at the time of your transaction <br></br>-
                  Commercial use is prohibited unless you have purchased
                  commercial rights along with your commission <br></br>- My TaT
                  time is anywhere from 1-14 days without rush fee, but this
                  time may be longer or shorter depending on schedule and
                  complexity of your commission<br></br>- I allow three free
                  edits after I have sent the sketch and you have paid
                  half/full. When it is completed, you have two free edits, and
                  then they cost +2$ per<br></br>- If my list is full, you will
                  be put onto a waitlist. If rush free is applied, you may skip
                  the waitlist<br></br>- With prices that add +20%, +50%, so on
                  and so forth, it is the base price of add-ons increased by
                  said amount. (ex. ref-sheet with 2 views and 1 item (40
                  dollars) but you request a redesign, which is up by 30%. the
                  final price is now $52)<br></br>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Will Do
                </h3>
                <p className="text-gray-600">
                  - Humans/furries (anthros)<br></br>- Any animals<br></br>-
                  Ships<br></br>- SFW/lightly suggestive<br></br>- Blood/gore
                  <br></br>- Fanart & OC art<br></br>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-800 mb-3">
                  Will Not Do
                </h3>
                <p className="text-gray-600">
                  - NSFW<br></br>- Illegal ship art<br></br>- Mecha<br></br>-
                  Heavy gore<br></br>- Anything political or problematic
                  <br></br>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Payment Process
                </h3>
                <p className="text-gray-600">
                  When purchasing a commission, please tell me the info of what
                  you'd like (please provide reference images in your intimal
                  message of what you would like drawn. If it's a design, please
                  provide a detailed description or some reference images) and
                  if I accept, I will provide a quote. If this pricing is okay
                  with you, I will start on the first sketch.<br></br>
                  Once I finish the first sketch, I will send it over with a
                  watermark, and you will pay half. I will not continue if half
                  is not provided. You can also provide full payment at this
                  point. I am open to payment plans for more expensive
                  commissions. During this phase, you can ask for any edits
                  (refer to above T.O.S section for more details)<br></br>
                  Refunds are only allowed if I have not started on further than
                  the sketch.<br></br>
                </p>
              </div>
            </div>
          </div>
        );

      case "Contact":
        return (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600">
                Send me a message via email!
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
                    placeholder="Tell me about your commission..."
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
    <div
      className="min-h-screen bg-gray-50"
      style={{ backgroundColor: "#beb09bff" }}
    >
      {/* Mobile Header */}
      <div
        className="lg:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center"
        style={{ backgroundColor: "#aa9677ff" }}
      >
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="Artist Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h1 className="text-lg font-bold text-gray-800">
            Banana's Portfolio
          </h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          <Menu size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div
            className="fixed top-0 left-0 h-full w-64 shadow-2xl transform transition-transform duration-300"
            style={{ backgroundColor: "#aa9677ff" }}
          >
            {/* Mobile Menu Header */}
            <div className="p-6 border-b" style={{ borderColor: "#928269ff" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="/images/logo.png"
                    alt="Artist Logo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <h1 className="text-lg font-bold text-gray-800">Banana</h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <X size={20} className="text-gray-800" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 space-y-3">
              {["Home", "Prices", "Portfolio", "T.O.S", "Contact"].map(
                (tab) => (
                  <SidebarButton
                    key={tab}
                    label={tab}
                    isActive={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  />
                )
              )}
            </nav>

            {/* Mobile Social Links */}
            <div className="p-4 border-t" style={{ borderColor: "#9b896fff" }}>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Socials
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
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:flex w-64 shadow-2xl flex-col"
          style={{ backgroundColor: "#aa9677ff" }}
        >
          {/* Logo */}
          <div className="p-6 border-b" style={{ borderColor: "#928269ff" }}>
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
          <div className="p-4 border-t" style={{ borderColor: "#9b896fff" }}>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Socials
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
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Image Viewer Modal - Enhanced with zoom, pan, and magnifier */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 modal-backdrop">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-20 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X size={24} />
            </button>

            {/* Zoom controls - responsive positioning */}
            <div className="absolute top-4 left-4 z-20 flex lg:flex-col flex-row lg:space-y-2 space-x-2 lg:space-x-0">
              <button
                onClick={zoomIn}
                className="text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={zoomOut}
                className="text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={resetTransform}
                className="text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
                title="Reset View"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Navigation arrows - adjusted positioning for mobile */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 lg:left-4 left-2 text-white hover:text-gray-300 transition-colors duration-200 z-20 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 lg:right-4 right-2 text-white hover:text-gray-300 transition-colors duration-200 z-20 bg-black bg-opacity-50 rounded-full p-2"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image container with zoom and pan */}
            <div
              ref={containerRef}
              className="w-full h-full overflow-hidden flex items-center justify-center p-8 relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={selectedImage.image.src}
                alt={selectedImage.image.title}
                className="max-w-full max-h-full object-contain rounded-lg select-none"
                style={{
                  transform: `scale(${imageTransform.scale}) translate(${imageTransform.x}px, ${imageTransform.y}px)`,
                  cursor:
                    imageTransform.scale > 1
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                  transition: isDragging ? "none" : "transform 0.3s ease",
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                draggable={false}
              />
              {/* Magnifying glass - Direct DOM manipulation for better performance */}
              <div
                ref={magnifierRef}
                className="absolute border-4 border-white rounded-full pointer-events-none z-10 shadow-lg"
                style={{
                  width: "150px",
                  height: "150px",
                  display: "none",
                  backgroundImage: `url(${selectedImage.image.src})`,
                  backgroundSize: `${imageRef.current?.offsetWidth * 2.5}px ${
                    imageRef.current?.offsetHeight * 2.5
                  }px`,
                  backgroundRepeat: "no-repeat",
                  border: "3px solid white",
                  boxShadow:
                    "0 0 0 2px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.4)",
                  transition: "none", // Remove any transitions for instant response
                }}
              />
              )}
            </div>

            {/* Image info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-50 rounded-lg p-4 z-20">
              <h3 className="text-lg font-semibold mb-1">
                {selectedImage.image.title}
              </h3>
              <p className="text-sm text-gray-300">
                {currentImageIndex + 1} of {selectedImage.sectionImages.length}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {imageTransform.scale > 1
                  ? "Drag to pan • "
                  : "Hover for magnifier • "}
                Use zoom controls or scroll wheel
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
