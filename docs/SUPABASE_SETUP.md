# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for the SaaS boilerplate.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Choose a project name
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Start with the Free tier
5. Click "Create new project"

## Step 2: Get Your API Keys

Once your project is created:

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 4: Configure Authentication Settings

### Email Authentication

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Ensure **Email** provider is enabled (it's enabled by default)
3. Configure email settings:
   - **Enable email confirmations**: You can disable this for development, or configure email templates
   - **Site URL**: Set to `http://localhost:3000` for development
   - **Redirect URLs**: Add your app URLs:
     - `http://localhost:3000/**` (development)
     - `https://yourdomain.com/**` (production)

### Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize templates for:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

## Step 5: Configure Authentication Settings for Development

For local development, you may want to:

1. Go to **Authentication** → **Settings**
2. **Disable email confirmations** (for faster development):
   - Toggle "Enable email confirmations" to OFF
   - This allows users to sign up without email verification

**Note**: Re-enable this in production!

## Step 6: Set Up Database Schema (Optional)

If you need custom user profiles or additional tables:

1. Go to **SQL Editor** in Supabase dashboard
2. Run the following SQL to create a profiles table:

```sql
-- Create a profiles table that extends auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Create policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 7: Test Authentication

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Try signing up with a new account:
   - Email: `test@example.com`
   - Password: `password123` (or your preferred password)

4. You should be redirected to the dashboard upon successful signup/signin

## Step 8: Verify Authentication in Supabase Dashboard

1. Go to **Authentication** → **Users** in Supabase dashboard
2. You should see the user you just created
3. Check that the user has a verified email (if email confirmation is enabled)

## Common Issues and Solutions

### Issue: "Invalid API key"

**Solution**:

- Verify your `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

### Issue: Email confirmation required

**Solution**:

- For development: Disable email confirmations in Supabase dashboard
- For production: Set up email templates and SMTP settings
- Or check your email (including spam) for the confirmation link

### Issue: Redirect URL not allowed

**Solution**:

- Go to **Authentication** → **URL Configuration** in Supabase
- Add your redirect URLs:
  - `http://localhost:3000/**`
  - `http://localhost:3000/login`
  - `http://localhost:3000/dashboard`

### Issue: CORS errors

**Solution**:

- Ensure your Site URL is set correctly in Supabase dashboard
- Check that your redirect URLs are whitelisted

## Production Setup

### Environment Variables

Make sure your production environment has:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Security Settings

1. **Enable email confirmations** in production
2. **Set up proper redirect URLs** for your production domain
3. **Configure CORS** properly
4. **Enable Row Level Security (RLS)** on all tables
5. **Review API key security** - use the anon key for client-side, service role key only server-side

### Email Configuration

For production, configure SMTP:

1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Configure your email provider (SendGrid, AWS SES, etc.)
3. Test email delivery

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Dashboard](https://supabase.com/dashboard)

## Next Steps

After setting up authentication:

1. ✅ Test sign up flow
2. ✅ Test sign in flow
3. ✅ Test protected routes (dashboard)
4. ✅ Test sign out flow
5. ✅ Configure email templates (optional)
6. ✅ Set up user profiles table (optional)
7. ✅ Configure production settings

Your authentication is now ready to use! 🎉
