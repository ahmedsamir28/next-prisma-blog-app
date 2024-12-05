import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-100 text-white py-8 mt-16 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-black">
                    <div>
                        <h3 className="font-semibold text-lg">Company</h3>
                        <ul className="mt-4">
                            <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-400">Careers</a></li>
                            <li><a href="#" className="hover:text-gray-400">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Services</h3>
                        <ul className="mt-4">
                            <li><a href="#" className="hover:text-gray-400">Web Development</a></li>
                            <li><a href="#" className="hover:text-gray-400">App Development</a></li>
                            <li><a href="#" className="hover:text-gray-400">Consulting</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Support</h3>
                        <ul className="mt-4">
                            <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
                            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Follow Us</h3>
                        <ul className="mt-4 flex space-x-4">
                            <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
                            <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
                            <li><a href="#" className="hover:text-gray-400">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>)
}

export default Footer