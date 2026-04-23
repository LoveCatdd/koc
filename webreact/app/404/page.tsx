'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="text-xl">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">The page you are looking for does not exist or has been moved.</p>
        </CardContent>
        <CardContent>
          <Button 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
