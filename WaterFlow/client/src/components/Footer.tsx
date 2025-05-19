import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <i className="fas fa-water text-primary"></i>
              <span className="font-heading font-medium text-neutral-dark">Water Usage Dashboard</span>
            </div>
            <p className="text-sm text-neutral-dark/60 mt-1">Monitor and optimize your water consumption</p>
          </div>
          
          <div className="flex space-x-6">
            <button className="text-neutral-dark/60 hover:text-primary transition-colors">
              <i className="fas fa-question-circle"></i>
              <span className="ml-1">Help</span>
            </button>
            <button className="text-neutral-dark/60 hover:text-primary transition-colors">
              <i className="fas fa-cog"></i>
              <span className="ml-1">Settings</span>
            </button>
            <button className="text-neutral-dark/60 hover:text-primary transition-colors">
              <i className="fas fa-file-export"></i>
              <span className="ml-1">Export</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-wave-pattern h-6 w-full bg-no-repeat bg-bottom bg-cover"></div>
    </footer>
  );
};

export default Footer;
