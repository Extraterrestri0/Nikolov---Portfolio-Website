import React from 'react';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay?: number;
}

function ContactCard({ icon, title, content, delay = 0 }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300">{content}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactInfo() {
  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Location",
      content: "Sofia, Bulgaria",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Phone",
      content: "+359 0885514125",
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email",
      content: "n.ivaylov@yahoo.com",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Website",
      content: "www.nikolov.dev",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Working Hours",
      content: "Mon - Fri, 9:00 - 18:00",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contactCards.map((card, index) => (
        <ContactCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          content={card.content}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}