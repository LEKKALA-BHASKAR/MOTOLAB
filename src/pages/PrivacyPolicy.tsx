import React from "react";
import Header from '@/components/layout/Header';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-6 text-gray-800 max-w-4xl min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 drop-shadow-md">
        Privacy Policy
      </h1>

      <div className="bg-white shadow-xl rounded-lg p-8 transition-all hover:shadow-2xl">
        <p className="mb-6 text-lg text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-md border-l-4 border-indigo-500">
          Welcome to our e-commerce bike store. Your privacy is important to us.
          This Privacy Policy outlines how we collect, use, and protect your
          personal information.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            We collect personal information such as name, email, phone number,
            and shipping address when you make a purchase. Payment details are
            securely processed by third-party payment providers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            We use your information to process orders, provide customer support,
            and improve our services. We do not sell or share your data with
            third parties for marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            3. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            We implement security measures to protect your data. However, no
            online transaction is 100% secure. We encourage you to use strong
            passwords and keep your account information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            4. Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            Our website uses cookies to enhance user experience. You can control
            or disable cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            5. Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            We may use third-party services for analytics and payment processing.
            These services have their own privacy policies that you should
            review.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            We may update this policy periodically. Any changes will be posted on
            this page with the effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-300 pb-2 transition-colors hover:text-teal-900">
            7. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:support@bikeecommerce.com"
              className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
            >
              support@bikeecommerce.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;