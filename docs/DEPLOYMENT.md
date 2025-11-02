# Deployment Guide

This guide covers deploying the SaaS boilerplate to various platforms.

## Prerequisites

- Built application (`npm run build`)
- Environment variables configured
- Database setup (if using Supabase)

## Environment Variables

Ensure all required environment variables are set in your deployment platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GOOGLE_GENAI_API_KEY` (optional)
- `VITE_AGNO_AGENTOS_URL` (optional)

## Docker Deployment

### Production Build

Build the Docker image:

```bash
docker build -f docker/Dockerfile.prod -t saas-boilerplate:latest .
```

### Run Container

```bash
docker run -d \
  -p 3000:80 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_ANON_KEY=your_key \
  --name saas-app \
  saas-boilerplate:latest
```

### Docker Compose

```bash
docker-compose up -d
```

## Vercel Deployment

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Set Environment Variables**

In Vercel dashboard:

- Go to Project Settings > Environment Variables
- Add all required variables

4. **Redeploy**

Vercel automatically redeploys on git push.

## Netlify Deployment

1. **Install Netlify CLI**

```bash
npm i -g netlify-cli
```

2. **Build Command**

```bash
npm run build
```

3. **Publish Directory**

```
dist
```

4. **Set Environment Variables**

In Netlify dashboard:

- Site settings > Environment variables
- Add all required variables

5. **Deploy**

```bash
netlify deploy --prod
```

## AWS S3 + CloudFront

1. **Build Application**

```bash
npm run build
```

2. **Upload to S3**

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront**

- Create distribution
- Set origin to S3 bucket
- Configure error pages (404 → index.html)
- Set environment variables via Lambda@Edge

## Railway Deployment

1. **Install Railway CLI**

```bash
npm i -g @railway/cli
```

2. **Login**

```bash
railway login
```

3. **Initialize Project**

```bash
railway init
```

4. **Deploy**

```bash
railway up
```

5. **Set Environment Variables**

```bash
railway variables set VITE_SUPABASE_URL=your_url
railway variables set VITE_SUPABASE_ANON_KEY=your_key
```

## Environment-Specific Configuration

### Development

```bash
npm run dev
```

Uses `.env` file or `.env.local`.

### Staging

Set environment variables in deployment platform.

### Production

- Use secure environment variable management
- Enable HTTPS
- Configure custom domain
- Set up monitoring and logging

## Post-Deployment Checklist

- [ ] Verify environment variables are set
- [ ] Test authentication flow
- [ ] Verify API endpoints are accessible
- [ ] Check error tracking (if configured)
- [ ] Verify SSL certificate
- [ ] Test on multiple devices/browsers
- [ ] Monitor application logs
- [ ] Set up backup procedures (if applicable)

## Troubleshooting

### Build Fails

- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run type-check`

### Runtime Errors

- Verify environment variables are set
- Check browser console for errors
- Verify Supabase connection
- Check network requests in DevTools

### 404 on Routes

- Ensure SPA routing is configured
- Check server configuration (nginx.conf)
- Verify build output includes index.html

## Performance Optimization

### Build Optimization

- Enable code splitting (already configured)
- Use Vite's build optimizations
- Minimize bundle size
- Enable compression (gzip)

### Runtime Optimization

- Enable browser caching
- Use CDN for static assets
- Optimize images
- Lazy load routes and components

## Monitoring

Consider setting up:

- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Web Vitals)
- Uptime monitoring

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API keys not exposed in client
- [ ] CORS configured correctly
- [ ] Security headers set
- [ ] Regular dependency updates

## Backup and Recovery

- Backup environment variables
- Document deployment process
- Keep deployment logs
- Test recovery procedures
