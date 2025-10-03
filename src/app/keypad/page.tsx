'use client';

import { Keypad } from '@/components/ui/Keypad';

export default function KeypadPage() {
  const handleSubmit = (data: { type?: string; email: string; password?: string; name?: string }) => {
    console.log('Form submission:', data);
    // You can add more functionality here like API calls
  };

  return <Keypad onSubmit={handleSubmit} />;
}

