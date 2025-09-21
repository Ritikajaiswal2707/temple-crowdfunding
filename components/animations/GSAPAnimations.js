import { useEffect, useRef } from 'react';

// Hero Section Animations
export const useHeroAnimations = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonsRef = useRef();

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Hero animations timeline
        const tl = gsap.timeline();
        
        tl.from(titleRef.current, { 
          duration: 1.2, 
          y: 100, 
          opacity: 0, 
          ease: "power3.out" 
        })
        .from(subtitleRef.current, { 
          duration: 0.8, 
          y: 50, 
          opacity: 0, 
          ease: "power2.out" 
        }, '-=0.6')
        .from(buttonsRef.current, { 
          duration: 0.8, 
          y: 30, 
          opacity: 0, 
          ease: "power2.out" 
        }, '-=0.4');

        // Floating elements animation
        gsap.to('.floating', {
          y: -20,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5
        });

      } catch (error) {
        console.log('GSAP not loaded:', error);
      }
    };

    loadAnimations();
  }, []);

  return { heroRef, titleRef, subtitleRef, buttonsRef };
};

// Scroll-triggered animations
export const useScrollAnimations = () => {
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Animate elements on scroll
        gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
          gsap.fromTo(element, 
            { 
              y: 50, 
              opacity: 0 
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Stagger animations for cards
        gsap.utils.toArray('.animate-cards').forEach((container) => {
          const cards = container.querySelectorAll('.card');
          gsap.fromTo(cards,
            { 
              y: 60, 
              opacity: 0 
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

      } catch (error) {
        console.log('GSAP ScrollTrigger not loaded:', error);
      }
    };

    loadAnimations();
  }, []);
};

// Button hover animations
export const useButtonAnimations = () => {
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Button hover effects
        gsap.utils.toArray('.btn-animated').forEach((button) => {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });

      } catch (error) {
        console.log('GSAP not loaded:', error);
      }
    };

    loadAnimations();
  }, []);
};

// Counter animations
export const useCounterAnimations = () => {
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Animate counters
        gsap.utils.toArray('.counter').forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'));
          
          gsap.fromTo(counter,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

      } catch (error) {
        console.log('GSAP ScrollTrigger not loaded:', error);
      }
    };

    loadAnimations();
  }, []);
};

// Page transition animations
export const usePageTransitions = () => {
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Page enter animation
        gsap.fromTo('.page-content',
          { 
            opacity: 0, 
            y: 30 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }
        );

      } catch (error) {
        console.log('GSAP not loaded:', error);
      }
    };

    loadAnimations();
  }, []);
};

// Loading animations
export const useLoadingAnimations = () => {
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Loading spinner animation
        gsap.to('.loading-spinner', {
          rotation: 360,
          duration: 1,
          ease: "none",
          repeat: -1
        });

        // Pulse animation for loading elements
        gsap.to('.pulse-element', {
          scale: 1.1,
          duration: 1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });

      } catch (error) {
        console.log('GSAP not loaded:', error);
      }
    };

    loadAnimations();
  }, []);
};

// Form animations
export const useFormAnimations = () => {
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        
        // Form field focus animations
        gsap.utils.toArray('.form-field').forEach((field) => {
          field.addEventListener('focus', () => {
            gsap.to(field, {
              scale: 1.02,
              duration: 0.2,
              ease: "power2.out"
            });
          });

          field.addEventListener('blur', () => {
            gsap.to(field, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          });
        });

      } catch (error) {
        console.log('GSAP not loaded:', error);
      }
    };

    loadAnimations();
  }, []);
};

// Default export with all animations
const GSAPAnimations = {
  useHeroAnimations,
  useScrollAnimations,
  useButtonAnimations,
  useCounterAnimations,
  usePageTransitions,
  useLoadingAnimations,
  useFormAnimations
};

export default GSAPAnimations;
