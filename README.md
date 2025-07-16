# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Setting# Firebase Studio
Setting# Firebase Studio
 up your Vercel Deployment

Your application uses the Google AI platform for its core image processing feature. For this to work on your live Vercel deployment, you must add your Google AI API key as an environment variable in Vercel.

### Steps to Add Environment Variable

1.  **Get your API Key:** Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to create and copy your API key.
2.  **Go to your Vercel Project:**
    *   Open your project dashboard on Vercel.
    *   Navigate to the **Settings** tab.
3.  **Add Environment Variable:**
    *   In the side menu, click on **Environment Variables**.
    *   Click **Add New**.
    *   For the **Name**, enter exactly: `GOOGLE_API_KEY`
    *   For the **Value**, paste your API key.
    *   Ensure all environments (Production, Preview, Development) are checked.
    *   Click **Save**.
4.  **Redeploy the Application:**
    *   Go to the **Deployments** tab in Vercel.
    *   Find the latest deployment, click the "..." menu, and select **Redeploy**.

After the new deployment is complete, the image processing error will be resolved.
