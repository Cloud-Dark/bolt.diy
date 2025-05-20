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
    <div className="flex flex-col items-center gap-4">
      {/* Input dan tombol */}
      <div className="flex flex-col items-center gap-2">
        <input
          type="text"
          placeholder="Enter GitHub Public repo URL (e.g. https://github.com/user/repo.git)"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-80 text-sm"
        />
        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Use this template
        </button>
      </div>

      {/* Teks dan template bawaan */}
      <span className="text-sm text-gray-500">
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
