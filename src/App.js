import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Function to detect the user's OS
    const detectOSAndRedirect = () => {
      const userAgent = navigator.userAgent;

      // Check for iOS
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to the App Store
        window.location.href =
          "https://apps.apple.com/us/app/alipay-simplify-your-life/id333206289"; // Replace with actual link
      }
      // Check for Android
      else if (/Android/.test(userAgent)) {
        // Redirect to Google Play
        window.location.href =
          "https://play.google.com/store/apps/details?id=hk.alipay.wallet&hl=vi"; // Replace with actual link
      } else {
        // Fallback for unsupported OS
        alert(
          "Unsupported OS. Please use a mobile device with iOS or Android."
        );
      }
    };

    // Attempt to open the AlipayHK app first
    const alipayDeepLink =
      "alipayhk://platformapi/startapp?appId=2102020209380055";
    window.location.href = alipayDeepLink;

    // Set a timeout to check if the app is installed
    const timeout = setTimeout(detectOSAndRedirect, 1500);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>Welcome to Our App!</h1>
      <p>If you have AlipayHK installed, you will be redirected shortly.</p>
      <p>If not, please download the app:</p>
      <a href="https://www.example.com/download-alipayhk">Download AlipayHK</a>
    </div>
  );
}

export default App;
