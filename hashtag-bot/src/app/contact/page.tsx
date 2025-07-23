'use client';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const contactInfo = [
    { icon: "📱", label: "Téléphone", value: "+33 6 XX XX XX XX" },
    { icon: "📧", label: "Email", value: "contact@hashtagbot.fr" },
    { icon: "💬", label: "Telegram", value: "@HashtagBot_Official" },
    { icon: "🕒", label: "Horaires", value: "7j/7 - 24h/24" }
  ];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout bannerText="CONTACTEZ-NOUS">
      <div className="px-5 max-w-md mx-auto">
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">📞 Nos Coordonnées</div>
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center py-4 border-b border-white/10 last:border-b-0">
              <div className="text-2xl w-12 text-center mr-4">{item.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-red-400 font-semibold">{item.label}</div>
                <div className="text-base mt-1">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-black/70 rounded-2xl p-6 mb-5 border-2 border-red-600 shadow-2xl">
          <div className="text-xl font-bold text-center mb-5 text-red-400">✉️ Nous Écrire</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Votre nom" required
              className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white focus:border-red-600" />
            <input type="email" name="email" placeholder="votre@email.com" required
              className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white focus:border-red-600" />
            <textarea name="message" placeholder="Votre message..." required rows={4}
              className="w-full p-3 border border-gray-600 rounded-lg bg-white/10 text-white focus:border-red-600" />
            <button type="submit" className="w-full p-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-bold">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
