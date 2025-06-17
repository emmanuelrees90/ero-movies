export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 text-sm w-full">
      <div className="max-w-6xl mx-auto px-4">
        &copy; {new Date().getFullYear()} <span className="text-white font-medium">Movie Explorer</span> · All rights reserved.
      </div>
    </footer>
  );
}
