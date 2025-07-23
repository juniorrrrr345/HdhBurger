'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: "📱",
      label: "Téléphone",
      value: "+33 6 XX XX XX XX"
    },
    {
      icon: "📧", 
      label: "Email",
      value: "contact@hashtagbot.fr"
    },
    {
      icon: "💬",
      label: "Telegram", 
      value: "@HashtagBot_Official"
    },
    {
      icon: "🌐",
      label: "Site Web",
      value: "www.hashtagbot.fr"
    },
    {
      icon: "🕒",
      label: "Horaires",
      value: "7j/7 - 24h/24"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout bannerText="CONTACTEZ-NOUS">
      <div className="px-5 max-w-md mx-auto">
        {/* Contact Info */}
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">
            📞 Nos Coordonnées
          </div>
          
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center py-4 border-b border-white/10 last:border-b-0">
              <div className="text-2xl w-12 text-center mr-4">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm text-red-400 font-semibold">{item.label}</div>
                <div className="text-base mt-1">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">
            ✉️ Nous Écrire
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-red-400 font-semibold text-sm">
                Nom *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white text-base focus:outline-none focus:border-red-600 focus:shadow-lg focus:shadow-red-600/30 transition-all"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-red-400 font-semibold text-sm">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white text-base focus:outline-none focus:border-red-600 focus:shadow-lg focus:shadow-red-600/30 transition-all"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-red-400 font-semibold text-sm">
                Sujet
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Sujet de votre message"
                className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white text-base focus:outline-none focus:border-red-600 focus:shadow-lg focus:shadow-red-600/30 transition-all"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-red-400 font-semibold text-sm">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                required
                rows={4}
                className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white text-base resize-none focus:outline-none focus:border-red-600 focus:shadow-lg focus:shadow-red-600/30 transition-all"
              />
            </div>
            
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white text-base font-bold cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/40"
            >
              Envoyer le Message
            </button>
          </form>
        </div>
        
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mx-5 text-center shadow-xl">
          <h3 className="text-lg font-bold mb-2">🚨 CONTACT URGENT</h3>
          <p className="text-sm opacity-90 mb-1">
            Pour toute urgence, contactez-nous directement sur Telegram
          </p>
          <p className="text-sm font-bold">
            @HashtagBot_Urgent
          </p>
        </div>
      </div>
    </Layout>
  );
}