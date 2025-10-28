import { Link } from "react-router-dom";
import { Cloud, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                CloudyAI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Powered Cloudburst Prediction
            </p>
            <p className="text-xs text-muted-foreground">
              Predict extreme weather events, prevent disasters, and support smarter decision-making with CloudyAI.
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} CloudyAI. All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/model" className="hover:text-primary transition-colors">Model</Link></li>
              <li><Link to="/predictions" className="hover:text-primary transition-colors">Predictions</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
