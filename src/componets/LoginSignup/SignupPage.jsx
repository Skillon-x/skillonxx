import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/logo.png";
import signupimage from "../../assets/illustrations/loginimage.png";

import { 
  CircleDot, 
  Boxes, 
  Stars, 
  Cloud, 
  Moon, 
  Sun, 
  Sparkles, 
  Circle,
  Home,
  User,
  HelpCircle
} from 'lucide-react';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.8);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.5) rgba(15, 23, 42, 0.3);
  }
`;

const SignupPage = () => {
  const [userType, setUserType] = useState('student');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({length: 10}, (_, i) => currentYear + i);

  useEffect(() => {
    // Smooth scroll polyfill
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const FloatingElement = ({ children, className }) => (
    <div className={`absolute hidden lg:block ${className}`}>
      {children}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/LoginPage');
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] relative overflow-hidden px-4 py-6 lg:p-0">
        {/* Background Elements */}
        <FloatingElement className="top-20 left-20 text-blue-300/20 animate-bounce">
          <CircleDot size={24} />
        </FloatingElement>
        <FloatingElement className="bottom-20 right-20 text-blue-300/20 animate-pulse">
          <Stars size={24} />
        </FloatingElement>
        <FloatingElement className="top-40 right-40 text-blue-300/20 animate-bounce">
          <Boxes size={24} />
        </FloatingElement>
        <FloatingElement className="bottom-40 left-40 text-blue-300/20 animate-pulse">
          <Moon size={24} />
        </FloatingElement>
        <FloatingElement className="top-60 left-60 text-blue-300/20 animate-bounce">
          <Sun size={24} />
        </FloatingElement>
        <FloatingElement className="bottom-60 right-60 text-blue-300/20 animate-pulse">
          <Cloud size={24} />
        </FloatingElement>
        <FloatingElement className="top-80 right-80 text-blue-300/20 animate-bounce">
          <Sparkles size={24} />
        </FloatingElement>
        <FloatingElement className="bottom-80 left-80 text-blue-300/20 animate-pulse">
          <Circle size={24} />
        </FloatingElement>

        {/* Main Container */}
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-5xl bg-[#112240]/30 backdrop-blur-lg rounded-xl shadow-2xl border border-blue-300/10 overflow-hidden">
            <div className="flex flex-col lg:flex-row w-full h-[80vh]">
              {/* Image Section */}
              <div className="hidden lg:block lg:w-5/12 relative">
                <div className="absolute inset-0 bg-blue-900/20">
                  <img
                    src="/api/placeholder/400/800"
                    alt="Signup visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Form Section */}
              <div className="w-full lg:w-7/12 flex flex-col h-full">
                {/* Fixed Header Section */}
                <div className="sticky top-0 z-10 bg-[#112240] backdrop-blur-lg p-4 md:p-6 border-b border-blue-300/10">
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-40 h-auto object-contain"
                    />
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex justify-center">
                    <div className="bg-[#0a192f]/50 p-1 rounded-lg flex gap-1 w-full max-w-sm">
                      <button
                        type="button"
                        onClick={() => setUserType('student')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm md:text-base transition-all ${
                          userType === 'student'
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-300 hover:text-blue-200'
                        }`}
                      >
                        Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('university')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm md:text-base transition-all ${
                          userType === 'university'
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-300 hover:text-blue-200'
                        }`}
                      >
                        University
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {userType === 'student' ? (
                      // Student Fields
                      <div className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-blue-100 text-sm font-medium">First Name</label>
                            <input
                              type="text"
                              placeholder="Enter first name"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-blue-100 text-sm font-medium">Last Name</label>
                            <input
                              type="text"
                              placeholder="Enter last name"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                        </div>

                        {/* Gender Selection */}
                        <div className="space-y-2">
                          <label className="text-blue-100 text-sm font-medium">Gender</label>
                          <div className="flex flex-wrap gap-2">
                            {['Male', 'Female', 'Other'].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setGender(option)}
                                className={`px-4 py-2 rounded-lg transition-all ${
                                  gender === option
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-[#0a192f]/50 text-blue-300 hover:text-blue-200'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-blue-100 text-sm font-medium">Phone Number</label>
                            <input
                              type="tel"
                              placeholder="Enter phone number"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-blue-100 text-sm font-medium">Email</label>
                            <input
                              type="email"
                              placeholder="Enter email address"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                        </div>

                        {/* Address Fields */}
                        <div className="space-y-4">
                          <label className="text-blue-100 text-sm font-medium">Address</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Door Number"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Landmark"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="State"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Pincode"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                        </div>

                        {/* Education Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-blue-100 text-sm font-medium">Current Education</label>
                            <input
                              type="text"
                              placeholder="Enter course/degree"
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-blue-100 text-sm font-medium">Year of Passing</label>
                            <select
                              className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                              required
                            >
                              <option value="">Select Year</option>
                              {yearRange.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // University Fields
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-blue-100 text-sm font-medium">University Name</label>
                          <input
                            type="text"
                            placeholder="Ex: Mysore University"
                            className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-blue-100 text-sm font-medium">Recognized By</label>
                          <input
                            type="text"
                            placeholder="Ex: UGC, AICTE"
                            className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-blue-100 text-sm font-medium">University Address</label>
                          <textarea
                            placeholder="Enter complete university address"
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline
                            -none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Password Fields - Common for both */}
                    <div className="space-y-2">
                      <label className="text-blue-100 text-sm font-medium">Password</label>
                      <input
                        type="password"
                        placeholder="Create password"
                        className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-blue-100 text-sm font-medium">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                        required
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-blue-300/30 bg-[#0a192f]/50 text-blue-600 focus:ring-blue-400"
                        required
                      />
                      <label htmlFor="terms" className="text-blue-100 text-sm">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/terms')}
                          className="text-blue-300 hover:text-blue-200"
                        >
                          Terms and Conditions
                        </button>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mt-6 text-sm md:text-base font-medium"
                    >
                      Sign Up
                    </button>

                    {/* Sign In Link */}
                    <p className="text-center text-blue-100 text-sm md:text-base mt-4">
                      Already have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => navigate('/LoginPage')}
                        className="text-blue-300 hover:text-blue-200"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a192f]/95 backdrop-blur-lg p-4 lg:hidden border-t border-blue-300/10">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="text-blue-300 hover:text-blue-200 text-sm flex flex-col items-center"
            >
              <Home size={20} />
              <span className="mt-1">Home</span>
            </button>
            <button 
              type="button"
              onClick={() => navigate('/profile')}
              className="text-blue-300 hover:text-blue-200 text-sm flex flex-col items-center"
            >
              <User size={20} />
              <span className="mt-1">Profile</span>
            </button>
            <button 
              type="button"
              onClick={() => navigate('/help')}
              className="text-blue-300 hover:text-blue-200 text-sm flex flex-col items-center"
            >
              <HelpCircle size={20} />
              <span className="mt-1">Help</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;