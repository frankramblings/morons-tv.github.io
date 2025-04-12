import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MenuIcon, X, Search, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoronLogoText } from "@/components/ui/typography";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-[#1C304A] border-b-2 border-[#FF4B00] sticky top-0 z-50 shadow-md">
      {/* Top bar with logo and login */}
      <div className="bg-[#1C304A] py-3 border-b border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="cursor-pointer">
                <MoronLogoText size="md" className="text-shadow-lg" />
              </div>
            </Link>
          </div>
          
          {/* Search and Account */}
          <div className="hidden md:flex space-x-4 items-center">
            <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
              <Search className="text-gray-400 h-4 w-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search for moronic content..." 
                className="bg-transparent text-white text-sm focus:outline-none w-40"
              />
            </div>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="destructive" 
              className="text-white bg-[#FF0000] hover:bg-[#E60000] font-semibold text-sm px-4 py-1 rounded-full"
            >
              SIGN IN
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="text-2xl" /> : <MenuIcon className="text-2xl" />}
          </Button>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="bg-[#0A1B31] py-2">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex space-x-1 justify-center">
            <NavigationLink href="/" isActive={isActive("/")}>
              HOME
            </NavigationLink>
            <NavigationLink href="/browse" isActive={isActive("/browse")}>
              SHOWS
            </NavigationLink>
            <NavigationLink href="/most-moronic" isActive={isActive("/most-moronic")}>
              MOST MORONIC
            </NavigationLink>
            <NavigationLink href="/browse?category=news" isActive={isActive("/browse?category=news")}>
              NEWS
            </NavigationLink>
            <NavigationLink href="/browse?category=sports" isActive={isActive("/browse?category=sports")}>
              SPORTS
            </NavigationLink>
            <NavigationLink href="/browse?category=finance" isActive={isActive("/browse?category=finance")}>
              FINANCE
            </NavigationLink>
            <NavigationLink href="/browse?category=health" isActive={isActive("/browse?category=health")}>
              HEALTH
            </NavigationLink>
            <Button 
              variant="destructive" 
              className="text-white bg-[#FF0000] hover:bg-[#E60000] px-4 py-1 rounded-full text-sm font-semibold ml-2"
            >
              LIVE TV
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1C304A] border-t border-gray-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <MobileNavigationLink href="/" onClick={toggleMenu}>
              HOME
            </MobileNavigationLink>
            <MobileNavigationLink href="/browse" onClick={toggleMenu}>
              SHOWS
            </MobileNavigationLink>
            <MobileNavigationLink href="/most-moronic" onClick={toggleMenu}>
              MOST MORONIC
            </MobileNavigationLink>
            <MobileNavigationLink href="/browse?category=news" onClick={toggleMenu}>
              NEWS
            </MobileNavigationLink>
            <MobileNavigationLink href="/browse?category=sports" onClick={toggleMenu}>
              SPORTS
            </MobileNavigationLink>
            <MobileNavigationLink href="/browse?category=finance" onClick={toggleMenu}>
              FINANCE
            </MobileNavigationLink>
            <MobileNavigationLink href="/browse?category=health" onClick={toggleMenu}>
              HEALTH
            </MobileNavigationLink>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <Button 
                variant="default" 
                className="bg-gray-800 text-white hover:bg-gray-700 text-sm px-4 py-2 rounded-md flex-1 mr-2"
              >
                SIGN IN
              </Button>
              <Button 
                variant="destructive" 
                className="bg-[#FF0000] text-white text-sm px-4 py-2 rounded-md flex-1 ml-2"
              >
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

type NavigationLinkProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

function NavigationLink({ href, isActive, children }: NavigationLinkProps) {
  return (
    <Link href={href}>
      <div className={cn(
        "text-gray-300 hover:text-white px-4 py-2 font-semibold text-sm cursor-pointer",
        isActive && "text-white border-b-2 border-[#FF4B00]"
      )}>
        {children}
      </div>
    </Link>
  );
}

type MobileNavigationLinkProps = {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
};

function MobileNavigationLink({ href, onClick, children }: MobileNavigationLinkProps) {
  return (
    <Link href={href}>
      <div 
        className="text-white hover:text-gray-300 py-2 border-b border-gray-700 font-semibold cursor-pointer"
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );
}
