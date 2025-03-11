import React from "react";
import Header from '@/components/layout/Header';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className=" text-gray-800 max-w-200xl min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-indigo-800 drop-shadow-md">
        Privacy Policy
      </h1>

      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 transition-all hover:shadow-2xl">
        <p className="mb-4 sm:mb-6 text-base sm:text-lg text-gray-600 leading-relaxed bg-blue-50 p-3 sm:p-4 rounded-md border-l-4 border-indigo-500">
          Welcome to our e-commerce bike store. Your privacy is important to us.
          This Privacy Policy outlines how we collect, use, and protect your
          personal information.
        </p>

        {["Information We Collect", "How We Use Your Information", "Data Security", "Cookies", "Third-Party Services", "Changes to This Policy", "Contact Us"].map((section, index) => (
          <section key={index} className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-teal-700 border-b-2 border-teal-300 pb-1 sm:pb-2 transition-colors hover:text-teal-900">
              {index + 1}. {section}
            </h2>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-2 sm:p-3 rounded-md">
              {index === 0 && "We collect personal information such as name, email, phone number, and shipping address when you make a purchase. Payment details are securely processed by third-party payment providers."}
              {index === 1 && "We use your information to process orders, provide customer support, and improve our services. We do not sell or share your data with third parties for marketing purposes."}
              {index === 2 && "We implement security measures to protect your data. However, no online transaction is 100% secure. We encourage you to use strong passwords and keep your account information confidential."}
              {index === 3 && "Our website uses cookies to enhance user experience. You can control or disable cookies through your browser settings."}
              {index === 4 && "We may use third-party services for analytics and payment processing. These services have their own privacy policies that you should review."}
              {index === 5 && "We may update this policy periodically. Any changes will be posted on this page with the effective date."}
              {index === 6 && (
                <>
                  If you have any questions about this Privacy Policy, please contact us at {" "}
                  <a
                    href="mailto:support@bikeecommerce.com"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                  >
                    support@bikeecommerce.com
                  </a>
                  .
                </>
              )}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
