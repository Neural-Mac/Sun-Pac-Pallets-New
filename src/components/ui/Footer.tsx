export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] border-t border-[var(--color-gold-dark)]/30 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-adamina text-2xl text-white mb-6">SUN PAC PALLETS</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-poppins">
              Engineered for the load. Providing high-capacity, custom-designed wood packaging solutions for global export.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-adamina text-[var(--color-gold-light)] text-lg mb-6">Navigate</h4>
            <ul className="space-y-3 font-poppins text-sm text-gray-400">
              <li><a href="/" className="hover:text-[var(--color-brand-accent)] transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-[var(--color-brand-accent)] transition-colors">Services</a></li>
              <li><a href="/contact" className="hover:text-[var(--color-brand-accent)] transition-colors">Request Audit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-adamina text-[var(--color-gold-light)] text-lg mb-6">Contact</h4>
            <ul className="space-y-3 font-poppins text-sm text-gray-400">
              <li>(555) 123-4567</li>
              <li>engineering@sunpacpallets.com</li>
              <li>Los Angeles, CA</li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="font-adamina text-[var(--color-gold-light)] text-lg mb-6">Compliance</h4>
            <div className="border border-[var(--color-gold-dark)] p-4 inline-block rounded-sm bg-[#202020]">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 text-center">Certified</div>
                <div className="font-mono text-2xl text-white text-center tracking-tighter">ISPM-15</div>
                <div className="text-[10px] text-[var(--color-brand-accent)] text-center mt-1">HT-CERTIFIED EXPORT READY</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-poppins">
          <p>© {currentYear} Sun Pac Pallets. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
