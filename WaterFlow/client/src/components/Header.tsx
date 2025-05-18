import { FC } from 'react';

interface HeaderProps {
  lastUpdated: Date | null;
}

const Header: FC<HeaderProps> = ({ lastUpdated }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="fas fa-water text-2xl text-primary"></i>
          <h1 className="text-xl md:text-2xl font-heading font-semibold text-neutral-dark">Water Usage Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-neutral-dark/70">
            <span className="inline-block mr-1">
              <i className="fas fa-clock text-primary-light"></i>
            </span>
            <span>
              {lastUpdated 
                ? `Last updated: ${lastUpdated.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit' 
                  })}`
                : 'Updating...'}
            </span>
          </div>
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-neutral-light transition-colors">
              <i className="fas fa-cog text-neutral-dark/70"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
