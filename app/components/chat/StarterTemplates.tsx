import React, { useState } from 'react';
import type { Template } from '~/types/template';
import { STARTER_TEMPLATES } from '~/utils/constants';

interface FrameworkLinkProps {
  template: Template;
}

const FrameworkLink: React.FC<FrameworkLinkProps> = ({ template }) => (
  <a
    href={`/git?url=https://github.com/${template.githubRepo}.git`}
    data-state="closed"
    data-discover="true"
    className="items-center justify-center"
  >
    <div
      className={`inline-block ${template.icon} w-8 h-8 text-4xl transition-theme opacity-25 hover:opacity-100 hover:text-purple-500 dark:text-white dark:opacity-50 dark:hover:opacity-100 dark:hover:text-purple-400 transition-all`}
      title={template.label}
    />
  </a>
);

const StarterTemplates: React.FC = () => {
  const [customUrl, setCustomUrl] = useState('');

  const handleSubmit = () => {
    const githubUrlPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\.git$/;

    if (githubUrlPattern.test(customUrl.trim())) {
      window.location.href = `/git?url=${encodeURIComponent(customUrl.trim())}`;
    } else {
      alert('URL tidak valid. Pastikan formatnya: https://github.com/user/repo.git');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Row input dan button */}
      <div className="flex items-center gap-2 w-full justify-center">
        <input
          type="text"
          placeholder="https://github.com/user/repo.git"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-4 py-2 w-80 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition"
        >
          Use this template
        </button>
      </div>

      {/* Tulisan dan template list */}
      <span className="text-sm text-gray-500 dark:text-gray-400">
        or start a blank app with your favorite stack
      </span>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-sm">
          {STARTER_TEMPLATES.map((template) => (
            <FrameworkLink key={template.name} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarterTemplates;
