import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube
} from "lucide-react";
import { MoronLogoText } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#1C304A] text-white py-6 border-t-4 border-[#FF4B00]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="bg-[#FF4B00] p-2 rounded-lg border-2 border-black transform -rotate-2">
              <MoronLogoText size="sm" />
            </div>
            <p className="mt-2 text-sm text-gray-300">The streaming service for people who think they're geniuses.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <FooterSection title="EXPLORE">
              <FooterLink href="/browse">Categories</FooterLink>
              <FooterLink href="/">Trending</FooterLink>
              <FooterLink href="/">New Releases</FooterLink>
              <FooterLink href="/most-moronic">Most Moronic</FooterLink>
            </FooterSection>
            
            <FooterSection title="CREATORS">
              <FooterLink href="/">Join As Creator</FooterLink>
              <FooterLink href="/">Creator Portal</FooterLink>
              <FooterLink href="/">Creator Guidelines</FooterLink>
            </FooterSection>
            
            <FooterSection title="ABOUT US">
              <FooterLink href="/">Our Mission</FooterLink>
              <FooterLink href="/">Careers</FooterLink>
              <FooterLink href="/">Press</FooterLink>
              <FooterLink href="/">Contact</FooterLink>
            </FooterSection>
            
            <FooterSection title="LEGAL">
              <FooterLink href="/">Terms of Service</FooterLink>
              <FooterLink href="/">Privacy Policy</FooterLink>
              <FooterLink href="/">Cookie Policy</FooterLink>
            </FooterSection>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Morons.TV - All brain cells lost are non-refundable.
          </div>
          
          <div className="flex space-x-4">
            <SocialLink href="https://facebook.com" icon={<Facebook className="h-5 w-5" />} />
            <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} />
            <SocialLink href="https://instagram.com" icon={<Instagram className="h-5 w-5" />} />
            <SocialLink href="https://youtube.com" icon={<Youtube className="h-5 w-5" />} />
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          Disclaimer: Morons.TV is a satirical platform. Any resemblance to actual idiots is purely coincidental. Except when it's not.
        </div>
      </div>
    </footer>
  );
}

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
};

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="font-['Bangers'] text-lg mb-2">{title}</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        {children}
      </ul>
    </div>
  );
}

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link href={href}>
        <div className="cursor-pointer hover:text-[#FFD600] transition-colors">
          {children}
        </div>
      </Link>
    </li>
  );
}

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-400 hover:text-[#FFD600] transition-colors"
    >
      {icon}
    </a>
  );
}
