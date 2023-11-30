// pages/terms-and-conditions.tsx

import { Fragment } from 'react';
import { Text } from "@radix-ui/themes";
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <Fragment>
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <Text>
          Welcome to Shall We Go! Before using our services, please take a moment to read and understand our terms and conditions. By accessing or using our website, you agree to comply with and be bound by the following terms. If you do not agree with these terms, please refrain from using our services.
        </Text>

        <h2 className="text-xl font-bold mt-4">1. Independent Platform</h2>
        <Text>
          Shall We Go is an independent platform and is not affiliated with any events or organizations. We operate as a standalone service for users to send prom date askouts.
        </Text>

        <h2 className="text-xl font-bold mt-4">2. No Guarantee of Approval</h2>
        <Text>
          We do not guarantee the approval of your prom date askout. While we provide a platform for sending invitations, the acceptance of such invitations is at the discretion of the recipient.
        </Text>

        <h2 className="text-xl font-bold mt-4">3. Personal Responsibility</h2>
        <Text>
          Users are solely responsible for their prom date arrangements and personal conduct. Shall We Go does not assume any responsibility for the outcomes of prom date requests or personal matters. Personal responsibility lies with the user.
        </Text>

        <h2 className="text-xl font-bold mt-4">4. Appropriate Content</h2>
        <Text>
          Users are required to create askouts with relevant and respectful information. Inappropriate content, language, or materials are strictly prohibited.
        </Text>

        <h2 className="text-xl font-bold mt-4">5. Pilot Website</h2>
        <Text>
          Shall We Go is a pilot website for a larger project. Users are encouraged to provide feedback to help improve our services as we work towards our broader goals.
        </Text>

        <h2 className="text-xl font-bold mt-4">6. Privacy and Data Protection</h2>
        <Text>
          We prioritize the privacy and security of your personal information. We will never share your email, name, images, or any other personal data with third parties without your explicit consent. All the images will be deleted from our server after 20th of December 2023.
        </Text>

        <h2 className="text-xl font-bold mt-4">7. Account Deletion and Password Change</h2>
        <Text>
          To delete your account and all associated information, please send an email to <a href="mailto:talexitinfo@gmail.com" className="text-blue-500 underline">talexitinfo@gmail.com</a>. We will process your request promptly and confirm the deletion of your account. However, all the accounts, assosiated information will deleted from our server after 20th of December 2023.
        </Text>

        <Text className="mt-4">
          <br/><br/>By using Shall We Go, you acknowledge and agree to these terms and conditions. We reserve the right to update or modify these terms at any time, and it is your responsibility to review them periodically. Continued use of our services after any changes constitute your acceptance of the revised terms.
        </Text>

            <br/><br/>
        <Text className="mt-4">
          Thank you for choosing Shall We Go for your prom date askouts!
        </Text>
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;
