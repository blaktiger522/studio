import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold">Privacy Policy</CardTitle>
          <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Welcome to VisualSage. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Service includes:
          </p>
          <ul>
            <li>
              <strong>Uploaded Images:</strong> We temporarily process the images you upload to provide the OCR service. We do not store your images on our servers after the analysis is complete. The image data is sent to a third-party AI service for processing.
            </li>
            <li>
              <strong>Usage Data:</strong> We may automatically collect certain information when you access the Service, such as your IP address, browser type, operating system, and information about your use of the Service.
            </li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our Service.</li>
            <li>Improve, personalize, and expand our Service.</li>
            <li>Understand and analyze how you use our Service.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with third-party vendors and service providers that perform services for us, such as AI model providers for image analysis. These vendors are contractually obligated to protect your data.
          </p>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us through the contact form on our website.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
