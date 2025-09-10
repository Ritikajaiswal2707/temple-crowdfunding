import { useEffect, useRef } from 'react';

const Stats = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const elements = document.querySelectorAll('.stat-number');
    if (elements.length === 0) return;
    
    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          
          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            element.textContent = Math.floor(current).toLocaleString();
          }, 16);
          
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(animateCounters, {
      threshold: 0.5
    });

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50" ref={statsRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="stat-number text-4xl font-bold text-orange-600 mb-2" data-target="50">0</div>
            <p className="text-gray-600">Temples Funded</p>
          </div>
          <div className="text-center">
            <div className="stat-number text-4xl font-bold text-orange-600 mb-2" data-target="1000000">0</div>
            <p className="text-gray-600">Amount Raised (₹)</p>
          </div>
          <div className="text-center">
            <div className="stat-number text-4xl font-bold text-orange-600 mb-2" data-target="5000">0</div>
            <p className="text-gray-600">Happy Donors</p>
          </div>
          <div className="text-center">
            <div className="stat-number text-4xl font-bold text-orange-600 mb-2" data-target="25">0</div>
            <p className="text-gray-600">Cities Reached</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;