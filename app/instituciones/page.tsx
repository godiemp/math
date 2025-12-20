import { redirect } from 'next/navigation';

// Redirect to main landing page - B2B content is accessible via the toggle
export default function InstitucionesPage() {
  redirect('/');
}
