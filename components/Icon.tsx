import { 
  ChevronDown, 
  Info, 
  ExternalLink, 
  Copy, 
  ArrowRightLeft, 
  Plus, 
  Minus, 
  Search,
  ZoomIn,
  ZoomOut,
  CheckCircle2
} from 'lucide-react';

// 1. Standard UI Icons (Lucide)
export const Icons = {
  ChevronDown,
  Info,
  ExternalLink,
  Copy,
  ArrowRightLeft,
  Plus,
  Minus,
  Search,
  ZoomIn,
  ZoomOut,
  CheckCircle: CheckCircle2
};

// 2. Custom Token/Chain Icons (Paste your SVGs here)
// Instructions:
// 1. Right click icon on your website > Inspect
// 2. Copy the <svg> code
// 3. Paste it as a component below, replacing class/fill attributes with Tailwind classes or props

export const TokenIcons = {
  // Example: Arbitrum Logo
  Arbitrum: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" className="fill-[#2D374B]" />
      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#2D374B"/>
      <path d="M11.8992 4.99023L8.46901 10.6064L10.1429 11.6143L11.8992 8.69975L15.4293 14.457L17.1429 13.4324L11.8992 4.99023Z" fill="#28A0F0"/>
      <path d="M6.7964 13.4082L4.80078 16.667L6.48807 17.6843L9.91825 12.0681L8.24441 11.0602L6.7964 13.4082Z" fill="#28A0F0"/>
      <path d="M13.8547 17.1173L15.542 18.1347L18.8008 12.7632L17.1269 11.7554L13.8547 17.1173Z" fill="#28A0F0"/>
    </svg>
  ),
  // Example: ETH Logo
  ETH: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" className="fill-slate-200"/>
      <path d="M16.0015 4.5L15.8682 4.95263V21.8374L16.0015 21.9707L23.7596 17.3834L16.0015 4.5Z" fill="#343434"/>
      <path d="M16.0015 4.5L8.24316 17.3834L16.0015 21.9707V13.9697V4.5Z" fill="#8C8C8C"/>
      <path d="M16.0017 23.1768L15.9365 23.2561V27.425L16.0017 27.6134L23.7634 18.5918L16.0017 23.1768Z" fill="#3C3C3B"/>
      <path d="M16.0017 27.6134V23.1768L8.24316 18.5918L16.0017 27.6134Z" fill="#8C8C8C"/>
      <path d="M16.0015 21.9708L23.7596 17.3835L16.0015 13.9697V21.9708Z" fill="#141414"/>
      <path d="M8.24316 17.3835L16.0015 21.9708V13.9697L8.24316 17.3835Z" fill="#393939"/>
    </svg>
  ),
  // Updated: USDC Logo (Official from cryptologos.cc)
  USDC: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#2775CA"/>
      <path d="M12.75 15.75H11.25V14.625C9.9375 14.5 9 13.5625 9 12.375C9 11.1875 9.9375 10.25 11.25 10.125V12.375C10.5 12.4375 10.125 12.625 10.125 12.625L9.65625 11.625C9.65625 11.625 10.2188 11.25 11.25 11.25V9H12.75V10.125C14.0625 10.25 15 11.1875 15 12.375C15 13.5625 14.0625 14.5 12.75 14.625V12.375C13.5 12.3125 13.875 12.125 13.875 12.125L14.3438 13.125C14.3438 13.125 13.7812 13.5 12.75 13.5V15.75ZM11.25 12.375V14.5312C12.375 14.3438 12.75 13.875 12.75 13.5C12.75 13.125 12.375 12.6562 11.25 12.375ZM12.75 12.375V10.2188C11.625 10.4062 11.25 10.875 11.25 11.25C11.25 11.625 11.625 12.0938 12.75 12.375Z" fill="white"/>
    </svg>
  )
};