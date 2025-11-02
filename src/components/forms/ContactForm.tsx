import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/formSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormError, FormDescription } from '@/components/ui/form';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    reset();
    // In a real app, you would call an API here
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel htmlFor="name" required>
          Name
        </FormLabel>
        <Input
          id="name"
          placeholder="John Doe"
          {...register('name')}
          {...(errors.name && { 'aria-invalid': 'true' })}
        />
        {errors.name && <FormError message={errors.name.message} />}
      </FormField>

      <FormField>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          {...(errors.email && { 'aria-invalid': 'true' })}
        />
        {errors.email && <FormError message={errors.email.message} />}
      </FormField>

      <FormField>
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          id="subject"
          placeholder="How can we help?"
          {...register('subject')}
          {...(errors.subject && { 'aria-invalid': 'true' })}
        />
        <FormDescription>Optional subject line</FormDescription>
        {errors.subject && <FormError message={errors.subject.message} />}
      </FormField>

      <FormField>
        <FormLabel htmlFor="message" required>
          Message
        </FormLabel>
        <textarea
          id="message"
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Your message here..."
          {...register('message')}
          {...(errors.message && { 'aria-invalid': 'true' })}
        />
        {errors.message && <FormError message={errors.message.message} />}
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </Form>
  );
}
