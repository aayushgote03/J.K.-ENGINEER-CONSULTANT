'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/contactform'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const Page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4 flex-1"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            >
              Building Tomorrow's Infrastructure Today
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 drop-shadow-md"
            >
              Leading the way in innovative civil engineering solutions
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors shadow-lg"
            >
              Our Projects
            </motion.button>
          </motion.div>
          
          <div className="flex-1 flex justify-center items-center">
            <DotLottieReact
              src="https://lottie.host/b75e7c9b-4bfe-4a68-84ec-2d9007f905a9/U4LFAz5oHy.lottie"
              autoplay
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-black">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Our Services
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Structural Engineering",
                description: "Comprehensive structural analysis and design for buildings and infrastructure",
                icon: "🏗️"
              },
              {
                title: "Transportation",
                description: "Road, bridge, and transportation infrastructure design and planning",
                icon: "🚧"
              },
              {
                title: "Environmental",
                description: "Sustainable solutions and environmental impact assessment",
                icon: "🌱"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 * index }}
                  className="text-4xl mb-4"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Modern Bridge Design",
                location: "Downtown Metro Area",
                description: "Innovative bridge design combining aesthetics with structural integrity"
              },
              {
                title: "Sustainable Building Complex",
                location: "Business District",
                description: "Eco-friendly commercial complex with modern architectural design"
              }
            ].map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="relative h-96 rounded-lg overflow-hidden group bg-gradient-to-br from-blue-600 to-blue-800"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                >
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200 mb-4">{project.location}</p>
                  <p className="text-gray-300">{project.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-8 text-gray-800"
            >
              About Us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-600 mb-8"
            >
              With over 20 years of experience, we are committed to delivering excellence in civil engineering. 
              Our team of experts combines technical expertise with innovative thinking to create sustainable 
              infrastructure solutions that stand the test of time.
            </motion.p>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              {[
                { number: "20+", text: "Years Experience" },
                { number: "500+", text: "Projects Completed" },
                { number: "50+", text: "Expert Engineers" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 * index }}
                    className="text-4xl font-bold text-blue-600 mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Get in Touch
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              {
                title: "Company Name",
                content: "Building the future through innovative engineering solutions."
              },
              {
                title: "Quick Links",
                links: ["Home", "Services", "Projects", "Contact"]
              },
              {
                title: "Contact Info",
                info: [
                  "123 Engineering Street",
                  "City, State 12345",
                  "Phone: (555) 123-4567",
                  "Email: info@company.com"
                ]
              },
              {
                title: "Follow Us",
                social: ["LinkedIn", "Twitter", "Facebook"]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                {section.content && <p className="text-gray-400">{section.content}</p>}
                {section.links && (
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                      >
                        <a href="#" className="text-gray-400 hover:text-white">{link}</a>
                      </motion.li>
                    ))}
                  </ul>
                )}
                {section.info && (
                  <ul className="space-y-2 text-gray-400">
                    {section.info.map((item, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                )}
                {section.social && (
                  <div className="flex space-x-4">
                    {section.social.map((platform, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-400 hover:text-white"
                      >
                        {platform}
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Page