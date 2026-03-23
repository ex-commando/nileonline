import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiData, setApiData] = useState({ courses: [], siteSettings: { stats: [], heroStats: {} }, testimonials: [] });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCourses = apiData.courses.filter(course => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Degree Programs') return course.category.includes('Degree');
    if (activeFilter === 'Short course') return course.category.includes('Short') || course.category.includes('Professional');
    if (activeFilter === 'EDP') return course.category.includes('Executive');
    return true;
  });

  const heroSlides = [
    {
      badge: 'Nile Online Learning',
      title1: 'Elevate your ',
      highlight: 'career',
      title2: ' anytime, \nanywhere.',
      desc: 'Flexible online and hybrid education designed for working professionals. Choose the right programme and start investing in your future today.'
    },
    {
      badge: 'Degree Programmes',
      title1: 'Accelerate your ',
      highlight: 'academic',
      title2: ' success, \n100% online.',
      desc: 'Earn a recognized Bachelor’s or Master’s degree without putting your life on hold. Study with interactive, flexible world-class curriculums.'
    },
    {
      badge: 'Executive Programmes',
      title1: 'Advance into ',
      highlight: 'leadership',
      title2: ' with \nglobal impact.',
      desc: 'Gain targeted skills and network with professionals globally to boost your management expertise in structured, short-term courses.'
    }
  ];

  // Fetch API payload
  useEffect(() => {
    fetch('/api/data.json')
      .then(res => res.json())
      .then(data => {
        // Simulated network delay for smooth skeleton demonstration
        setTimeout(() => {
          setApiData(data);
          setLoading(false);
        }, 1200);
      })
      .catch(err => {
        console.error("Failed fetching API:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll carousel layout
  useEffect(() => {
    const container = document.getElementById('prog-carousel');
    let autoScrollInterval;

    if (container && !loading) {
      const scrollLoop = () => {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 380, behavior: 'smooth' });
        }
      };

      autoScrollInterval = setInterval(scrollLoop, 3500);

      const pauseScroll = () => clearInterval(autoScrollInterval);
      const resumeScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(scrollLoop, 3500);
      };

      container.addEventListener('mouseenter', pauseScroll);
      container.addEventListener('mouseleave', resumeScroll);
      container.addEventListener('touchstart', pauseScroll, { passive: true });
      container.addEventListener('touchend', resumeScroll, { passive: true });

      return () => {
        clearInterval(autoScrollInterval);
        container.removeEventListener('mouseenter', pauseScroll);
        container.removeEventListener('mouseleave', resumeScroll);
        container.removeEventListener('touchstart', pauseScroll);
        container.removeEventListener('touchend', resumeScroll);
      };
    }
  }, [loading, activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1 });

    // Apply animation tracking to layout blocks globally
    const elements = document.querySelectorAll('.goal-card, .section-header, .testimonial-card, .programme-card, .footer-grid > div, .split-img, .split-content, .reveal-on-scroll');
    elements.forEach((el, i) => {
      el.classList.add('reveal-on-scroll');
      // Add staggered delay based on horizontal flow positioning
      el.style.transitionDelay = `${(i % 3) * 0.15}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollProgrammes = (direction) => {
    const container = document.getElementById('prog-carousel');
    if (container) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const HoverCard = ({ bgImage, tag, date, type, title, duration, icon }) => {
    const [hover, setHover] = useState(false);
    return (
      <div
        className="programme-card"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <a href="#programme">
          <div
            className="prog-image"
            style={{
              backgroundImage: `url('${bgImage}')`,
              transform: hover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          >
            <div className="prog-tag">{tag}</div>
            <div className="prog-date">
              <i className="fa-regular fa-clock"></i> Starts {date}
            </div>
          </div>
          <div className="prog-details">
            <div className="prog-meta">{type}</div>
            <h4>{title}</h4>
            <div className="prog-footer">
              <span className="prog-duration">
                <i className={`fa-solid ${icon}`}></i> {duration}
              </span>
            </div>
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#" className="brand-logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>
            <img src="https://nileonline.com.ng/hubfs/Imported%20images/logo-landscape.svg" alt="Nile Online Logo" style={{ height: '44px' }} />
          </a>

          <div className="nav-links">
            <a href="#business-school" className="nav-link">Nile Business School</a>
            <a href="#organisations" className="nav-link">For Organisations</a>
            <div className="dropdown">
              <a href="#programmes" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#programmes')}>
                Programmes <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className="dropdown-content">
                <a href="#degree-programmes">Degree Programmes</a>
                <a href="#executive-programmes">Executive Programmes</a>
                <a href="#professional-programmes">Professional Programmes</a>
              </div>
            </div>
            <a href="#blog" className="nav-link">Blog</a>
          </div>

          <div className="nav-actions">
            <a href="#login" className="login-btn" style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>Student login</a>
            <a href="#apply" className="apply-btn" style={{ backgroundColor: 'var(--text-primary)', color: '#fff', padding: '12px 28px', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '15px' }}>Applications</a>
          </div>

          <button className="mobile-toggle" id="mobile-toggle">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" id="hero">
        <div className="container">
          <div className="hero-flex">
            <div className="hero-content">
              <div key={`badge-${currentSlide}`} className="hero-badge fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--bg-alt)', border: '1px solid rgba(0,0,0,0.05)', padding: '8px 18px', borderRadius: 'var(--radius-full)', fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '32px' }}>
                <span className="pulse-dot" style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 0 0 rgba(28, 77, 161, 0.4)' }}></span> {heroSlides[currentSlide].badge}
              </div>

              <h1 key={`title-${currentSlide}`} className="fade-up delay-1" style={{ whiteSpace: 'pre-line' }}>
                {heroSlides[currentSlide].title1} <br />
                <span className="text-highlight">{heroSlides[currentSlide].highlight}</span>{heroSlides[currentSlide].title2}
              </h1>
              <p key={`desc-${currentSlide}`} className="fade-up delay-2">
                {heroSlides[currentSlide].desc}
              </p>
              <div className="hero-buttons fade-up delay-3">
                <a href="#tailored-learning" className="btn btn-primary" onClick={(e) => handleSmoothScroll(e, '#tailored-learning')} style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '18px 36px', borderRadius: 'var(--radius-full)', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>
                  Explore Programmes
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                </a>
                <a href="#register" className="btn btn-outline-dark" style={{ border: '1.5px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', background: 'transparent', padding: '18px 36px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  Contact Admissions
                </a>
              </div>

              {/* Slider Dots */}
              <div className="slider-dots" style={{ display: 'flex', gap: '8px', marginTop: '40px' }}>
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    style={{
                      width: i === currentSlide ? '32px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      backgroundColor: i === currentSlide ? 'var(--primary)' : '#ccc',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-bg-circle" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/hero_man.png" alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, position: 'relative' }} />
              </div>
              <div className="hero-dashed-circle"></div>
              <div className="hero-dashed-circle-inner"></div>
              <div className="hero-dashed-circle-mid"></div>

              {/* Programs Wheel */}
              <div className="hero-programs-wheel">
                <div className="program-orbit item-degree" onClick={(e) => { setActiveFilter('Degree Programs'); handleSmoothScroll(e, '#programmes'); }}>
                  <div className="float-card bounce-card">
                    <div className="icon-circle"><i className="fa-solid fa-graduation-cap"></i></div>
                    <div className="card-text">
                      <h4>Degree</h4>
                      <p>Full-time Online</p>
                    </div>
                  </div>
                </div>
                <div className="program-orbit item-short" onClick={(e) => { setActiveFilter('Short course'); handleSmoothScroll(e, '#programmes'); }}>
                  <div className="float-card bounce-card">
                    <div className="icon-circle"><i className="fa-solid fa-laptop-code"></i></div>
                    <div className="card-text">
                      <h4>Shortcourses</h4>
                      <p>Upskill Fast</p>
                    </div>
                  </div>
                </div>
                <div className="program-orbit item-edp" onClick={(e) => { setActiveFilter('EDP'); handleSmoothScroll(e, '#programmes'); }}>
                  <div className="float-card bounce-card">
                    <div className="icon-circle"><i className="fa-solid fa-user-tie"></i></div>
                    <div className="card-text">
                      <h4>EDP</h4>
                      <p>Exec. Development</p>
                    </div>
                  </div>
                </div>
                <div className="program-orbit item-start">
                  <div className="float-card bounce-card">
                    <div className="icon-circle">
                      <i className="fa-solid fa-rocket"></i>
                    </div>
                    <div className="card-text">
                      <h4>Get Started</h4>
                      <p>Admissions Open</p>
                    </div>
                  </div>
                </div>
                <div className="program-orbit item-support">
                  <div className="float-card bounce-card">
                    <div className="icon-circle">
                      <i className="fa-solid fa-headset"></i>
                    </div>
                    <div className="card-text">
                      <h4>24/7</h4>
                      <p>Support Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tailored Learning */}
      <section className="tailored-learning" id="tailored-learning">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Learning tailored for your goals</h2>
              <p className="section-subtitle">We have evolved online and hybrid education to meet the needs of today's students. Choose the offering that suits your current needs and goals.</p>
            </div>
          </div>

          <div className="goals-grid">
            <div className="goal-card">
              <div className="card-img-wrapper">
                <img src="https://nileonline.com.ng/hubfs/Degree%20programmes-min.jpg" alt="Degree Programmes" />
                <div className="card-badge hybrid">HYBRID</div>
              </div>
              <div className="card-content">
                <h3>Degree programmes</h3>
                <p><strong>Flexible online learning</strong> with in-person impact.</p>
                <a href="#explore" className="explore-link">Explore <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
            <div className="goal-card">
              <div className="card-img-wrapper">
                <img src="https://nileonline.com.ng/hubfs/International%20programmes-min.jpg" alt="Executive Programmes" />
                <div className="card-badge hybrid">HYBRID</div>
              </div>
              <div className="card-content">
                <h3>Executive programmes</h3>
                <p>Accelerated leadership training for professionals ready to drive change.</p>
                <a href="#explore" className="explore-link">Explore <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
            <div className="goal-card">
              <div className="card-img-wrapper">
                <img src="https://nileonline.com.ng/hubfs/Short%20courses-min.jpg" alt="Professional Programmes" />
                <div className="card-badge online">ONLINE</div>
              </div>
              <div className="card-content">
                <h3>Professional programmes</h3>
                <p>Gain targeted skills in a few short weeks to boost your career.</p>
                <a href="#explore" className="explore-link">Explore <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integrated Programmes Section */}
      <section className="featured-programmes" id="programmes">
        <div className="container">
          <div className="section-header center">
            <h2>Featured programmes now available</h2>
          </div>

          <div className="programmes-filter reveal-on-scroll" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '35px', flexWrap: 'wrap' }}>
            {['All', 'Degree Programs', 'Short course', 'EDP'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: activeFilter === filter ? '1px solid var(--primary)' : '1px solid rgba(0,0,0,0.1)',
                  background: activeFilter === filter ? 'var(--primary)' : 'transparent',
                  color: activeFilter === filter ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="carousel-wrapper" style={{ position: 'relative' }}>
            <button className="carousel-btn left" onClick={() => scrollProgrammes('left')}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="programmes-carousel" id="prog-carousel">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={`skel-${i}`} className="programme-card skeleton-card">
                    <div className="skeleton" style={{ height: '220px', width: '100%' }}></div>
                    <div className="prog-details">
                      <div className="skeleton" style={{ height: '12px', width: '40%', marginBottom: '12px' }}></div>
                      <div className="skeleton" style={{ height: '28px', width: '80%', marginBottom: '20px' }}></div>
                      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="skeleton" style={{ height: '14px', width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredCourses.map(course => (
                  <HoverCard
                    key={course.id}
                    bgImage={course.image}
                    tag={course.tag}
                    date={course.startDate}
                    type={course.category}
                    title={course.title}
                    duration={course.duration}
                    icon={course.icon}
                  />
                ))
              )}
            </div>
            <button className="carousel-btn right" onClick={() => scrollProgrammes('right')}><i className="fa-solid fa-chevron-right"></i></button>
          </div>

          <div className="center-btn-wrapper mt-40">
            <a href="#view-all" className="btn btn-outline">View all programmes</a>
          </div>
        </div>
      </section>

      {/* Degree Programmes Section */}
      <section className="info-split-section" id="degree-programmes">
        <div className="container">
          <div className="split-grid">
            <div className="split-img reveal-on-scroll">
              <img src="https://nileonline.com.ng/hubfs/Degree%20programmes-min.jpg" alt="Degree Programmes" />
            </div>
            <div className="split-content reveal-on-scroll">
              <span className="sub-badge">Degree Programmes</span>
              <h2>Earn your degree completely online, without compromise.</h2>
              <p>Join a dynamic community of learners and achieve your Bachelor's or Master's degree on your schedule. Designed with working professionals in mind, our interactive curriculum combines rigorous academics with ultimate flexibility.</p>
              <ul className="bullet-list">
                <li><i className="fa-solid fa-check-circle"></i> Flexible, 100% online coursework</li>
                <li><i className="fa-solid fa-check-circle"></i> Globally recognized accreditation</li>
                <li><i className="fa-solid fa-check-circle"></i> Seamless credit transfers available</li>
              </ul>
              <a href="#programmes" className="btn btn-primary mt-20" onClick={(e) => handleSmoothScroll(e, '#programmes')}>Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Programmes Section */}
      <section className="info-split-section alt-bg" id="executive-programmes">
        <div className="container">
          <div className="split-grid reverse">
            <div className="split-content reveal-on-scroll">
              <span className="sub-badge">Executive Programmes (EDP)</span>
              <h2>Accelerate your leadership trajectory.</h2>
              <p>Develop critical thinking and strategic management skills in our Executive Development Programmes. Connect with industry leaders globally and gain immediately applicable insights for the boardroom.</p>
              <ul className="bullet-list">
                <li><i className="fa-solid fa-check-circle"></i> Taught by seasoned industry veterans</li>
                <li><i className="fa-solid fa-check-circle"></i> Comprehensive real-world case studies</li>
                <li><i className="fa-solid fa-check-circle"></i> Elite executive networking alumni cluster</li>
              </ul>
              <a href="#programmes" className="btn btn-outline-dark mt-20" onClick={(e) => handleSmoothScroll(e, '#programmes')}>View Curriculum</a>
            </div>
            <div className="split-img reveal-on-scroll">
              <img src="https://nileonline.com.ng/hubfs/International%20programmes-min.jpg" alt="Executive Programmes" />
            </div>
          </div>
        </div>
      </section>

      {/* Short Courses Section */}
      <section className="info-split-section" id="professional-programmes">
        <div className="container">
          <div className="split-grid">
            <div className="split-img reveal-on-scroll">
              <img src="https://nileonline.com.ng/hubfs/Short%20courses-min.jpg" alt="Short Courses" />
            </div>
            <div className="split-content reveal-on-scroll">
              <span className="sub-badge">Professional & Short Courses</span>
              <h2>Upskill efficiently with laser-focused learning.</h2>
              <p>Stay relevant in a rapidly changing economy. Dive into high-impact, concentrated courses designed to equip you with specific, highly-demanded technical and soft skills in just a few weeks.</p>
              <ul className="bullet-list">
                <li><i className="fa-solid fa-check-circle"></i> 4 to 12 week targeted modules</li>
                <li><i className="fa-solid fa-check-circle"></i> Hands-on project deliverables</li>
                <li><i className="fa-solid fa-check-circle"></i> Instant professional certification</li>
              </ul>
              <a href="#programmes" className="btn btn-primary mt-20" onClick={(e) => handleSmoothScroll(e, '#programmes')}>Find Your Course</a>
            </div>
          </div>
        </div>
      </section>

      {/* For Organisations Section */}
      <section className="info-split-section alt-bg" id="organisations">
        <div className="container center" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span className="sub-badge reveal-on-scroll">For Organisations</span>
          <h2 className="reveal-on-scroll" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '24px' }}>Empower your workforce.</h2>
          <p className="reveal-on-scroll" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            We partner with leading enterprises to deliver customized training, skill-gap analysis, and corporate degree pathways. Equip your teams with the knowledge they need to innovate your business from within.
          </p>
          <a href="#register" className="btn btn-primary reveal-on-scroll" style={{ display: 'inline-block' }}>Partner with Nile</a>
        </div>
      </section>

      {/* Dynamic Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header center">
            <h2>What our students say</h2>
          </div>
          <div className="testimonials-grid">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={`tsk-${i}`} className="testimonial-card">
                  <div className="skeleton" style={{ height: '80px', width: '100%', marginBottom: '20px' }}></div>
                  <div className="testimonial-author">
                    <div className="skeleton" style={{ height: '48px', width: '48px', borderRadius: '50%' }}></div>
                    <div>
                      <div className="skeleton" style={{ height: '14px', width: '120px', marginBottom: '8px' }}></div>
                      <div className="skeleton" style={{ height: '12px', width: '80px' }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              apiData.testimonials.map(t => (
                <div key={t.id} className="testimonial-card fade-up">
                  <p className="quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} />
                    <div className="author-info">
                      <h5 className="author-name">{t.name}</h5>
                      <span className="author-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="https://nileonline.com.ng/hubfs/Imported%20images/logo-landscape.svg" alt="Nile Online Logo" className="footer-logo" />
            <p>Empowering the next generation of leaders with world-class online and hybrid education.</p>
            <div className="social-links">
              <a href="#social"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#social"><i className="fa-brands fa-twitter"></i></a>
              <a href="#social"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#social"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#link">About Us</a></li>
              <li><a href="#link">Nile Business School</a></li>
              <li><a href="#link">For Organisations</a></li>
              <li><a href="#link">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Programmes</h4>
            <ul>
              <li><a href="#link">Degree Programmes</a></li>
              <li><a href="#link">Executive Programmes</a></li>
              <li><a href="#link">Professional Courses</a></li>
              <li><a href="#link">Admissions</a></li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest programmes and insights.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container flex-between">
            <p>&copy; 2026 Nile Online. All rights reserved.</p>
            <div className="legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
