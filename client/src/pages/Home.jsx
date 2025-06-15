import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Shield, Zap } from 'lucide-react';
import ChatAppNavbar from '../component/NavBar';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <ChatAppNavbar/>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Logo */}
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-800">ChatApp</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
                Simple
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Conversations</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
                Clean, fast, and secure messaging for everyone. Connect with friends, family, and teams in a beautiful, distraction-free environment.
              </p>
            </div>

            {/* Simple Chat Preview */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">A</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-md px-5 py-3">
                        <p className="text-gray-800">Hello! How's your day going?</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 justify-end">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-md px-5 py-3">
                        <p>Great! Just finished the project. Thanks for asking! 😊</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">B</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">A</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-md px-5 py-3">
                        <p className="text-gray-800">Awesome! Let's celebrate later 🎉</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience messaging the way it should be - simple, fast, and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Messages arrive instantly. No delays, no waiting. Just pure, seamless communication that keeps up with your thoughts.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Private & Secure</h3>
              
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Everyone</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether it's family, friends, or work teams, ChatApp adapts to how you communicate with the people who matter most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
     

      {/* Footer */}
      <footer className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">ChatApp</span>
          </div>
          <p className="text-gray-600 mb-8">
            Simple conversations for a connected world.
          </p>
          <div className="text-sm text-gray-400">
            © 2025 ChatApp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
