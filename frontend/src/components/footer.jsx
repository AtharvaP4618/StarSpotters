import React from "react";

const Footer = () => {
    return (
      <footer className="bg-slate-900/90 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} StarSpotter. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  