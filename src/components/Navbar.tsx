'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

const Navbar: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: "#projects", label: "Projects" },
        { href: "#services", label: "Services" },
        { href: "#infrastructure", label: "Infrastructure" },
        { href: "#consulting", label: "Consulting" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" }
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-500 ${
                scrolled 
                    ? "bg-white shadow-xl py-3" 
                    : "bg-white py-6"
            }`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo with animation */}
                    <div 
                        className="text-2xl font-bold tracking-wider transition-all duration-500 flex items-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span className={`transform transition-all duration-500 ${isHovered ? "scale-110" : ""} block`}>
                            <Image
                                src="/logo.png" 
                                width={100}
                                height={100}
                                alt="Logo" 
                                className="h-16 w-auto object-contain"
                                style={{ maxHeight: '4rem' }}
                            />
                        </span>
                        <span className="ml-2 h-6 w-6 rounded-full bg-yellow-400 animate-bounce hidden sm:block"></span>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex space-x-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href}
                                className={`relative px-4 py-2 rounded-lg transition-all duration-300 
                                ${activeLink === link.href 
                                    ? "text-gray-800 bg-yellow-100" 
                                    : "text-gray-600 hover:text-gray-800"
                                }`}
                                onMouseEnter={() => setActiveLink(link.href)}
                                onMouseLeave={() => setActiveLink('')}
                            >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform origin-left transition-transform duration-300 
                                    ${activeLink === link.href ? "scale-x-100" : "scale-x-0"}`}
                                ></span>
                            </Link>
                        ))}
                        <Link 
                            href="#quote" 
                            className="ml-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-300/50 hover:-translate-y-1"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile navigation button */}
                    <button 
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none group"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-gray-800/60 backdrop-blur-md z-40 md:hidden transition-all duration-500 ${
                    mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={closeMobileMenu}
            >
                <div 
                    className={`absolute top-0 right-0 w-4/5 h-full bg-white shadow-xl transition-all duration-500 transform ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full py-20 px-8 overflow-y-auto">
                        <div className="space-y-6">
                            {navLinks.map((link, index) => (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    className={`block text-xl font-medium tracking-wide text-gray-700 transition-all duration-300 transform ${
                                        mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${150 + index * 75}ms` }}
                                    onClick={closeMobileMenu}
                                >
                                    <div className="flex items-center group">
                                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 transition-all duration-300 group-hover:w-4"></span>
                                        {link.label}
                                    </div>
                                    <div className="h-px w-full bg-gradient-to-r from-yellow-300/40 to-transparent mt-3"></div>
                                </Link>
                            ))}
                        </div>

                        {/* Call to action button */}
                        <Link 
                            href="#quote" 
                            className={`mt-8 w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold text-center rounded-lg shadow-lg transition-all duration-500 transform hover:shadow-xl hover:shadow-yellow-300/30 ${
                                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{ transitionDelay: `${150 + navLinks.length * 75 + 100}ms` }}
                            onClick={closeMobileMenu}
                        >
                            Get Free Quote
                        </Link>

                        {/* Social media icons */}
                        <div className={`mt-auto flex justify-center space-x-6 transition-all duration-500 transform ${
                            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`} style={{ transitionDelay: `${150 + navLinks.length * 75 + 200}ms` }}>
                            {['LinkedIn', 'Twitter', 'Facebook'].map((social, index) => (
                                <a 
                                    key={social} 
                                    href="#" 
                                    className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 hover:bg-yellow-200 hover:text-yellow-700 transition-all duration-300"
                                    aria-label={social}
                                >
                                    {social.charAt(0)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;