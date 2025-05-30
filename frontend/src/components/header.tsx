import logo from "../assets/logo-white.png";
export default function Header() {
  return (
    <header className="flex items-center space-x-20 px-64 py-2 shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {/* Logo / Brand */}
      <div className="text-xl font-bold w-40">
        <img src={logo} alt="logo" />
      </div>

      <nav className=" text-lg space-x-8 pt-4">
        <a href="#features" className="font-medium hover:text-blue-600">
          Features
        </a>
        <a href="#pricing" className="font-medium hover:text-blue-600">
          Pricing
        </a>
        <a href="#about" className=" font-medium hover:text-blue-600">
          About
        </a>
      </nav>
    </header>
  );
}
