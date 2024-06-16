'use client';

import { Button } from './ui/button';
import { signInWithOAuth } from '@/lib/supabase/auth';
import { type Provider } from '@supabase/supabase-js';
import { FaMicrosoft, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    // {
    //   name: 'azure',
    //   displayName: 'Entrar com Microsoft',
    //   icon: <FaMicrosoft className="h-5 w-5" />,
    // },
    {
        name: 'linkedin_oidc',
        displayName: 'Entrar com Linkedin',
        icon: <FaLinkedin className="h-5 w-5" />,
      },
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      {oAuthProviders.map((provider) => (
        <form key={provider.name} className="pb-2" onSubmit={(e) => handleSubmit(e)}>
          <input type="hidden" name="provider" value={provider.name} />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
