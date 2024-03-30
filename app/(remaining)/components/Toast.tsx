// components/Toast.tsx
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'success', 
    options?: ToastOptions) => {
  toast(message, {
    position: 'bottom-right',
    type: type,
    pauseOnHover: true,
    ...options,
  });
};

export default function Toast(): null {
  return null; // This component doesn't render anything, just initializes toast configuration
}
